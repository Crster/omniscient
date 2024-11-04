export class Redirect extends Error {
  constructor(url: string, reason?: string) {
    super(url);
    this.name = "Redirect";
    this.cause = reason;
  }
}

export class AppError extends Error {
  constructor(type: string, message: string, reason?: unknown) {
    super(message);
    this.name = type ?? "AppError";
    this.cause = reason;
  }
}

export class InternalServerError extends AppError {
  constructor(message: string, reason?: Record<string, any>) {
    super("InternalServerError", message, reason);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, reason?: unknown) {
    super("DatabaseError", message, reason);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, reason?: Record<string, any>) {
    super("BadRequestError", message, reason);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string, reason?: Record<string, any>) {
    super("AuthorizationError", message, reason);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, reason?: unknown) {
    super("NotFoundError", message, reason);
  }
}

export class NotCreatedError extends AppError {
  constructor(message: string, reason?: unknown) {
    super("NotCreatedError", message, reason);
  }
}

export class NotModifiedError extends AppError {
  constructor(message: string, reason?: unknown) {
    super("NotModifiedError", message, reason);
  }
}
