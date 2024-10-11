import * as XSON from "enhancejson";
import { IronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { MongoServerError } from "mongodb";

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

      let body;

      try {
        if (req.body) {
          if (req.headers["content-type"] === "text/xson") {
            body = XSON.parse(req.body);
          } else if (req.headers["content-type"] === "text/json") {
            body = JSON.parse(req.body);
          } else {
            body = req.body;
          }
        }
      } catch {}

      const data = await handler({
        session,
        key: req.query.id as string,
        value: body,
      });

      response.data = data;
      response.success = true;
    } catch (err) {
      if (err instanceof Redirect) {
        response.success = true;
        response.data = { errorCode: "Redirect", reason: err.cause ?? err.name };
        response.redirect = err.message;
      } else if (err instanceof ZodError) {
        const zodError = fromError(err);

        const errorFields: Array<string> = [];

        for (const issue of zodError.details) {
          errorFields.push(issue.path.join("."));
        }

        response.error = `Invalid input value in [${errorFields.join(", ")}]`;
        response.data = { errorCode: "ValidationError", reason: zodError.details };
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

    res.setHeader("content-type", "text/xson").status(200).send(XSON.stringify(response));
  };
}
