import { NextApiRequest, NextApiResponse } from "next";
import { BadRequestError, CriticalError, NotFoundError, UnauthorizedError } from "./reqres-error";

export class Respawn {
  private getHandler?: (params: NextApiRequest) => Promise<any>;
  private postHandler?: (params: NextApiRequest) => Promise<any>;
  private putHandler?: (params: NextApiRequest) => Promise<any>;
  private deleteHandler?: (params: NextApiRequest) => Promise<any>;

  get(handler: (params: NextApiRequest) => Promise<any>) {
    this.getHandler = handler;

    return this;
  }

  post(handler: (params: NextApiRequest) => Promise<any>) {
    this.postHandler = handler;

    return this;
  }

  put(handler: (params: NextApiRequest) => Promise<any>) {
    this.putHandler = handler;

    return this;
  }

  delete(handler: (params: NextApiRequest) => Promise<any>) {
    this.deleteHandler = handler;

    return this;
  }

  handle() {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        let response: any = null;

        if (req.method === "GET" && this.getHandler) {
          response = await this.getHandler(req);
        } else if (req.method === "POST" && this.postHandler) {
          response = await this.postHandler?.(req);
        } else if (req.method === "PUT" && this.putHandler) {
          response = await this.putHandler?.(req);
        } else if (req.method === "DELETE" && this.deleteHandler) {
          response = await this.deleteHandler?.(req);
        }

        if (response) {
          res.status(200).json(response);
        } else {
          res.status(204);
        }
      } catch (error) {
        if (error instanceof NotFoundError) {
          res.status(404).json({ error: error.message });
        } else if (error instanceof UnauthorizedError) {
          res.status(401).json({ error: error.message });
        } else if (error instanceof BadRequestError) {
          res.status(400).json({ error: error.message });
        } else if (error instanceof CriticalError) {
          res.status(500).json({ error: error.message });
        } else if (error instanceof Error) {
          console.error("Unexpected error:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    };
  }
}
