export class CustomError extends Error {
  code: number;
  details: unknown;

  constructor(message: string, code: number, details: unknown = null) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = this.constructor.name;

    // Object.setPrototypeOf(this, new.target.prototype);

    // Ensures the stack trace is properly captured in V8 engines
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
