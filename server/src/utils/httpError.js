export class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function notFound(message = 'Resource not found') {
  return new HttpError(404, message);
}
