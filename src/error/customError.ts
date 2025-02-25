export class CustomError extends Error {
  code: number;
  details: unknown;

  constructor(message: string, code: number, details: unknown = null) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = this.constructor.name;

    // Ensures the stack trace is properly captured in V8 engines
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // Se o "details" for um erro, preserva a stack trace original do erro.
    if (details instanceof Error) {
      this.stack = details.stack;
    }
  }
}
