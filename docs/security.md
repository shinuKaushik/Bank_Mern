# Security Notes

- Passwords are hashed with `bcryptjs` before storage.
- Transaction PINs are hashed with `bcryptjs` before storage.
- Protected API routes require a bearer JWT.
- Role permissions are enforced by server middleware.
- Transaction inputs are validated with Zod.
- Helmet, CORS, request body limits, and rate limiting are enabled.
- Critical actions are written to the audit log collection.

For production, replace `JWT_SECRET`, restrict CORS to the deployed client domain, enable HTTPS, and run MongoDB as a replica set so transfer sessions are fully transactional.
