import { AppError } from './AppError.js';

export class ValidationError extends AppError {
  constructor(message, issues) {
    super(
      message,
      400,
      issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    );
    this.name = 'AppValidationError';
  }
}
