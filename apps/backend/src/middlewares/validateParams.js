import { ValidationError } from '../errors/ValidationError.js';

export function validateParams(schema) {
  return (request, _response, next) => {
    const result = schema.safeParse(request.params);

    if (!result.success) {
      return next(new ValidationError('Paramètres invalides', result.error.issues));
    }

    request.params = result.data;
    return next();
  };
}
