export class Redirect extends Error {
  constructor(url: string, reason?: string) {
    super(url);
    this.name = "Redirect";
    this.cause = reason;
  }
}

export class AppError extends Error {
  constructor(type: string, message: string, reason?: Record<string, any>) {
    super(message);
    this.name = type ?? "AppError";
    this.cause = reason;
  }
}

export class InvalidRequestError extends AppError {
  constructor(message: string, reason?: Record<string, any>) {
    super("InvalidRequestError", message, reason);
  }
}

export class InvalidConfigurationError extends AppError {
  constructor(message: string, reason?: Record<string, any>) {
    super("InvalidConfigurationError", message, reason);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string, reason?: Record<string, any>) {
    super("UnauthorizedError", message, reason);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, reason?: Record<string, any>) {
    super("NotFoundError", message, reason);
  }
}

export class NotCreatedError extends AppError {
  constructor(message: string, reason?: Record<string, any>) {
    super("NotCreatedError", message, reason);
  }
}

export class NotModifiedError extends AppError {
  constructor(message: string, reason?: Record<string, any>) {
    super("NotModifiedError", message, reason);
  }
}
