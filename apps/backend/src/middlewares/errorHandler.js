function getErrorResponse(error) {
  let status = error.statusCode || 500;
  let message = status === 500 ? 'Une erreur interne est survenue' : error.message;
  let details = error.details;

  if (error.type === 'entity.parse.failed') {
    status = 400;
    message = 'Le corps JSON est invalide';
  } else if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    status = 401;
    message = error.name === 'TokenExpiredError' ? 'Token expiré' : 'Token invalide';
  } else if (error.code === 11000) {
    status = 409;
    const fields = Object.keys(error.keyPattern || error.keyValue || {});
    message = fields.includes('email')
      ? 'Cette adresse e-mail est déjà utilisée'
      : 'Cette ressource existe déjà';
    details = { fields };
  } else if (error.name === 'CastError') {
    status = 400;
    message = 'Identifiant invalide';
  } else if (error.name === 'ValidationError') {
    status = 400;
    message = 'Données invalides';
    details = Object.values(error.errors).map((validationError) => ({
      field: validationError.path,
      message: 'Valeur invalide',
    }));
  }

  return { status, message, details };
}

export function errorHandler(error, _request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  const { status, message, details } = getErrorResponse(error);

  return response.status(status).json({
    error: {
      message,
      ...(details && { details }),
    },
  });
}
