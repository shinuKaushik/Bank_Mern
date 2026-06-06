# API Summary

## Auth

- `POST /api/auth/register`: Creates a customer user and account.
- `POST /api/auth/login`: Verifies password and returns a JWT.
- `GET /api/auth/profile`: Returns the current user and account.

## Accounts

- `GET /api/accounts`: Customers see their account; employees and admins see all accounts.
- `GET /api/accounts/:id`: Reads an account with ownership checks for customers.
- `PUT /api/accounts/freeze/:id`: Admin only.
- `PUT /api/accounts/activate/:id`: Admin only.

## Transactions

- `POST /api/transactions/deposit`: Customer only.
- `POST /api/transactions/withdraw`: Customer only, requires valid PIN and balance.
- `POST /api/transactions/transfer`: Customer only, requires valid receiver, PIN, and balance.
- `GET /api/transactions/history`: Customer history or all transactions for staff roles.

## Users

Admin only:

- `GET /api/users`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
