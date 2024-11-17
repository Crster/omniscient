import { IronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

import getSession, { SessionData } from "./IronSession";
import { Redirect, AppError } from "./Error";

import { ApiResponse } from "@/components/hook/useApiRequest";

export interface ApiHandlerProps<ValueType> {
  session: IronSession<SessionData>;
  key?: string;
  value?: ValueType;
}

export type ApiHandler<ValueType, DataType> = (props: ApiHandlerProps<ValueType>) => DataType;

export function apiHandler<ValueType = any, DataType = any>(handler: ApiHandler<ValueType, DataType>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Only POST request is allowed" });

      return;
    }

    if (req.body && req.headers["content-type"]?.includes("application/json") === false) {
      res.status(415).json({ error: "Only EnhanceJson content is allowed" });

      return;
    }

    let response: ApiResponse<DataType>;

    try {
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
      } else if (err instanceof AppError) {
        response = {
          status: "error",
          data: { error: err.name, message: err.message, reason: err.cause },
        };
      } else if (err instanceof Error) {
        response = {
          status: "error",
          data: { error: "GenericError", message: err.message, reason: err.cause },
        };
      } else {
        response = {
          status: "error",
          data: { error: "UnknownError", message: "Unknown error", reason: err },
        };
      }
    }

    res.status(200).json(response);
  };
}
