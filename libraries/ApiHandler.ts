import { IronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";

import getSession, { SessionData } from "./IronSession";
import { AppError, Redirect } from "./Error";
import MongoDb from "./MongoDb";

export interface ApiHandlerProps {
  session: IronSession<SessionData>;
  key?: string;
  value?: any;
}

export interface ApiResponse<DataType = any> {
  success: boolean;
  data?: DataType;
  error?: string;
  redirect?: string;
}

export type ApiHandler = (props: ApiHandlerProps) => any;

export function apiHandler(handler: ApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Only POST request is allowed" });

      return;
    }

    const response: ApiResponse = { success: false };

    try {
      await MongoDb.connect();
      const session = await getSession(req, res);

      response.data = await handler({
        session,
        key: req.query.id as string,
        value: req.body,
      });

      response.success = true;
    } catch (err) {
      if (err instanceof Redirect) {
        response.success = true;
        response.data = err.cause ?? err.name;
        response.redirect = err.message;
      } else if (err instanceof ZodError) {
        const zodError = fromError(err);

        response.error = zodError.message;
        response.data = zodError.details;
      } else if (err instanceof AppError) {
        response.error = err.message;
        response.data = { type: err.name, reason: err.cause };
      } else if (err instanceof Error) {
        response.error = err.message;
      } else if (typeof err === "string") {
        response.error = err;
      } else {
        response.error = "Unknown error";
      }
    } finally {
      await MongoDb.close();
    }

    res.status(200).json(response);
  };
}
