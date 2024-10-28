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

export interface ApiSuccessResponse<DataType> {
  status: "success";
  data?: DataType;
}

export interface ApiRedirectResponse {
  status: "redirect";
  data: { url: string; reason: string };
}

export interface ApiErrorResponse {
  status: "error";
  data: { error: string; message: string; reason: any };
}

export type ApiResponse<DataType> = ApiSuccessResponse<DataType> | ApiRedirectResponse | ApiErrorResponse;

export type ApiHandler<ValueType, DataType> = (props: ApiHandlerProps<ValueType>) => DataType;

export function apiHandler<ValueType, DataType>(handler: ApiHandler<ValueType, DataType>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Only POST request is allowed" });

      return;
    }

    let response: ApiResponse<DataType>;

    try {
      await MongoDb.connect();
      const session = await getSession(req, res);

      const data = await handler({
        session,
        key: req.query.id as string,
        value: req.body,
      });

      response = { status: "success", data };
    } catch (err) {
      if (err instanceof Redirect) {
        response = { status: "redirect", data: { url: err.message, reason: err.message } };
      } else if (err instanceof ZodError) {
        response = {
          status: "error",
          data: {
            error: "ValidationError",
            message: "Invalid value",
            reason: err.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
          },
        };
      } else if (err instanceof MongoServerError) {
        if (err.code === 11000) {
          response = {
            status: "error",
            data: { error: "DuplicateEntry", message: "Duplicate entry", reason: err.keyValue },
          };
        } else {
          response = {
            status: "error",
            data: { error: "DatabaseError", message: "Database error", reason: err.message },
          };
        }
      } else if (err instanceof AppError) {
        response = {
          status: "error",
          data: { error: err.name, message: err.message, reason: err.cause },
        };
      } else if (err instanceof Error) {
        response = {
          status: "error",
          data: { error: "Error", message: err.message, reason: err.cause },
        };
      } else {
        response = {
          status: "error",
          data: { error: "Error", message: "Server error", reason: err },
        };
      }
    } finally {
      await MongoDb.close();
    }

    res.status(200).json(response);
  };
}
