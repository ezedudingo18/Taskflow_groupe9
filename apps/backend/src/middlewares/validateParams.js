export function validateParams(schema) {
  return (request, _response, next) => {
    const result = schema.safeParse(request.params);

    if (!result.success) {
      const error = new Error('Paramètres invalides');
      error.statusCode = 400;
      error.details = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return next(error);
    }

    request.params = result.data;
    return next();
  };
}
