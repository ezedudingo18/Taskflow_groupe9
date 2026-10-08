import { ValidationError } from '../errors/ValidationError.js';

export function validateBody(schema) {
  return (request, _response, next) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      return next(new ValidationError('Données invalides', result.error.issues));
    }

    request.body = result.data;
    return next();
  };
}
