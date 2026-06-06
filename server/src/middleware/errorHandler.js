import { ZodError } from 'zod';

export function errorHandler(error, _req, res, _next) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.errors.map((issue) => ({ path: issue.path.join('.'), message: issue.message }))
    });
  }

  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: statusCode === 500 ? 'Internal server error' : error.message
  });
}
