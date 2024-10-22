import { IronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { MongoServerError } from "mongodb";
import { ZodError } from "zod";

import getSession, { SessionData } from "./IronSession";
import { AppError, Redirect } from "./Error";
import MongoDb from "./MongoDb";

export interface ApiHandlerProps<ValueType> {
  session: IronSession<SessionData>;
  key?: string;
  value?: ValueType;
}

export interface ApiResponse<DataType> {
  success: boolean;
  data?: DataType | { errorCode: string; reason: unknown };
  error?: string;
  redirect?: string;
}

export type ApiHandler<ValueType, DataType> = (props: ApiHandlerProps<ValueType>) => DataType;

export function apiHandler<ValueType, DataType>(handler: ApiHandler<ValueType, DataType>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Only POST request is allowed" });

      return;
    }

    const response: ApiResponse<DataType> = { success: false };

    try {
      await MongoDb.connect();
      const session = await getSession(req, res);

      const data = await handler({
        session,
        key: req.query.id as string,
        value: req.body,
      });

      response.data = data;
      response.success = true;
    } catch (err) {
      if (err instanceof Redirect) {
        response.success = true;
        response.data = { errorCode: "Redirect", reason: err.cause ?? err.name };
        response.redirect = err.message;
      } else if (err instanceof ZodError) {
        response.error = "Invalid value";
        response.data = {
          errorCode: "ValidationError",
          reason: err.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
        };
      } else if (err instanceof MongoServerError) {
        if (err.code === 11000) {
          response.error = "Duplicate entry";
          response.data = { errorCode: "DuplicateEntry", reason: err.keyValue };
        } else {
          response.error = "Database error";
          response.data = { errorCode: "DatabaseError", reason: err.message };
        }
      } else if (err instanceof AppError) {
        response.error = err.message;
        response.data = { errorCode: err.name, reason: err.cause };
      } else if (err instanceof Error) {
        response.error = err.message;
        response.data = { errorCode: "Error", reason: err.cause };
      } else {
        response.error = "Server error";
        response.data = { errorCode: "Error", reason: err };
      }
    } finally {
      await MongoDb.close();
    }

    res.status(200).json(response);
  };
}
