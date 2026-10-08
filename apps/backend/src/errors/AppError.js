export class AppError extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;

    if (details !== undefined) {
      this.details = details;
    }
  }
}
