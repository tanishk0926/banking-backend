# Banking Backend API

A secure banking backend built with Node.js, Express.js, MongoDB, and Mongoose.

This project simulates a real-world banking system with user authentication, account management, money transfers, ledger-based accounting, idempotent transactions, email notifications, and MongoDB ACID transactions.

---

## Features

### Authentication

* User Registration
* User Login
* User Logout
* JWT Authentication
* Cookie-Based Authentication
* Password Hashing using bcryptjs
* Token Blacklisting
* Automatic Token Cleanup using TTL Index

### Account Management

* Create Bank Accounts
* View User Accounts
* Get Account Balance
* Multiple Accounts per User
* Account Status Management

  * ACTIVE
  * FROZEN
  * CLOSED

### Transaction Management

* Money Transfer Between Accounts
* Initial Funding via System Account
* MongoDB Transactions & Sessions
* Atomic Money Transfers
* Transaction Status Tracking

### Ledger System

* Double Entry Accounting
* CREDIT Ledger Entries
* DEBIT Ledger Entries
* Immutable Ledger Records
* Balance Derived from Ledger History

### Reliability Features

* Idempotency Keys
* Duplicate Transaction Protection
* Transaction Recovery Support
* Blacklisted Token Validation

### Notifications

* Welcome Email on Registration
* Transaction Email Notifications

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (jsonwebtoken)
* cookie-parser

### Security

* bcryptjs
* Token Blacklisting

### Email Service

* Nodemailer

---

## Project Structure

```text
src/
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── account.controller.js
│   └── transaction.controller.js
│
├── middleware/
│   └── auth.middleware.js
│
├── models/
│   ├── user.model.js
│   ├── account.model.js
│   ├── transaction.model.js
│   ├── ledger.model.js
│   └── blackList.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── account.routes.js
│   └── transaction.routes.js
│
├── services/
│   └── email.service.js
│
└── app.js

server.js
package.json
```

---

## Installation

### Install Dependencies

```bash
npm install
```

### Create Environment File

```env
MONGODB_URI=
JWT_SECRET=
EMAIL_USER=
CLIENT_ID=
CLIENT_SECRET=
REFRESH_TOKEN=

```

### Run Development Server

```bash
npm run dev
```

### Production

```bash
npm start
```

---

## API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| POST   | /api/auth/logout   |

### Accounts

| Method | Endpoint                         |
| ------ | -------------------------------- |
| POST   | /api/accounts                    |
| GET    | /api/accounts                    |
| GET    | /api/accounts/balance/:accountId |

### Transactions

| Method | Endpoint                               |
| ------ | -------------------------------------- |
| POST   | /api/transactions                      |
| POST   | /api/transactions/system/initial-funds |

---

## Authentication Flow

```text
Register/Login
      ↓
Generate JWT
      ↓
Store in Cookie
      ↓
Access Protected Routes
      ↓
Logout
      ↓
Blacklist Token
      ↓
Reject Future Requests
```

---

## Transaction Flow

```text
Validate Request
      ↓
Validate Idempotency Key
      ↓
Check Account Status
      ↓
Check Balance
      ↓
Create Transaction (PENDING)
      ↓
Create DEBIT Ledger
      ↓
Create CREDIT Ledger
      ↓
Mark COMPLETED
      ↓
Commit MongoDB Transaction
      ↓
Send Email Notification
```

---

## Double Entry Ledger System

Every money transfer creates:

### Sender

```text
DEBIT ₹1000
```

### Receiver

```text
CREDIT ₹1000
```

Balance is never stored directly.

It is calculated dynamically from ledger history:

```text
Balance = Total Credits - Total Debits
```

This approach provides better auditability and consistency.

---

## Security Features

* JWT Authentication
* Password Hashing
* Protected Routes
* Token Blacklisting
* TTL-based Blacklist Cleanup
* Immutable Ledger Entries
* Idempotent Transactions
* MongoDB ACID Transactions

---

## Future Improvements

* Transaction History APIs
* Account Statements
* Rate Limiting
* Refresh Tokens
* Admin Dashboard
* Fraud Detection
* Account Freeze/Unfreeze APIs
* Docker Deployment

---

## Author

Tanishk Sulaniya | Backend Developer

Built as a learning project to understand real-world banking systems, transaction processing, ledger accounting, and backend architecture.
