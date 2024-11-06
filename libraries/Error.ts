import { ZodError } from "zod";

import { User } from "@/services/user/model";

export class Redirect extends Error {
  constructor(url: string, reason?: string) {
    super(url);
    this.name = "Redirect";
    this.cause = reason;
  }
}

export class AppError extends Error {
  constructor(error: string, message: string, reason?: unknown) {
    super(message, { cause: reason });
    this.name = error;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, reason: ZodError) {
    const error = new Map<string, string>();

    for (const err of reason.issues) {
      error.set(err.path.join("."), err.message);
    }

    super("ValidationError", message, Object.fromEntries(error));
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string, reason?: User) {
    super(
      "AuthorizationError",
      message,
      reason ? { userId: reason.userId, name: reason.name, role: reason.role } : null,
    );
  }
}

export class InternalServerError extends AppError {
  constructor(message: string, reason?: Record<string, any>) {
    super("InternalServerError", message, reason);
  }
}
