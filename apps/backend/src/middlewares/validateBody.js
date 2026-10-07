export function validateBody(schema) {
  return (request, _response, next) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      const error = new Error('Données invalides');
      error.statusCode = 400;
      error.details = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return next(error);
    }

    request.body = result.data;
    return next();
  };
}
