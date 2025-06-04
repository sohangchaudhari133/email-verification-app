# Email Verification MERN App

A full-stack MERN (MongoDB, Express, React, Node.js) application for user registration, email verification, login, and password reset with secure email-based workflows.

---

## Features

- **User Registration:** New users can register with name, email, and password.
- **Email Verification:** Users receive a verification code via email to activate their account.
- **Login:** Only verified users can log in.
- **Password Reset:** Users can request a password reset link via email.
- **Welcome Email:** After verification, users receive a welcome email.
- **Dashboard:** Simple dashboard after login.
- **Responsive UI:** Built with React and Tailwind CSS.

---

## Project Structure

```
email_verification/
│
├── backend/
│   ├── .env_sample
│   ├── package.json
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── Auth.controller.js
│   ├── middleware/
│   │   ├── Email.config.js
│   │   ├── Email.js
│   │   ├── EmailTemplate.js
│   │   └── GenerateToken.js
│   ├── models/
│   │   └── User.model.js
│   └── routes/
│       └── Auth.routes.js
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── components/
        │   ├── Auth/
        │   │   ├── Login.jsx
        │   │   ├── Register.jsx
        │   │   ├── RequestPasswordReset.jsx
        │   │   ├── ResetPassword.jsx
        │   │   └── VerifyEmail.jsx
        │   └── Common/
        │       └── Navbar.jsx
        ├── pages/
        │   ├── Dashboard.jsx
        │   └── Home.jsx
        ├── routes/
        │   └── AppRoutes.jsx
        └── services/
            └── api.js
```

---

## How It Works

### 1. Registration & Email Verification

- User registers with name, email, and password.
- Backend hashes the password, generates a 6-digit verification code, and sends it via email.
- User enters the code on the frontend to verify their email.
- On successful verification, the user is marked as verified and receives a welcome email.

### 2. Login

- Only verified users can log in.
- On login, a JWT token is generated and returned.

### 3. Password Reset

- User requests a password reset by entering their email.
- Backend generates a JWT reset token and emails a reset link.
- User clicks the link, enters a new password, and the backend updates their password.

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- Gmail account for sending emails (with App Password enabled)

### 1. Backend Setup

1. **Install dependencies:**

   ```sh
   cd backend
   npm install
   ```

2. **Configure environment variables:**

   - Copy `.env_sample` to `.env` and fill in the values:
     ```
     MONGO_URI=mongodb://localhost:27017
     PORT=5000
     DB_NAME=email_verification
     JWT_SECRET=your_jwt_secret
     RESET_TOKEN_EXPIRY=15m
     NODE_ENV=dev
     EMAIL=your_gmail@gmail.com
     EMAIL_PASSWORD=your_gmail_app_password
     CLIENT_URL=http://localhost:5173
     ```

3. **Start the backend server:**
   ```sh
   npm start
   ```
   The backend runs on `http://localhost:5000`.

### 2. Frontend Setup

1. **Install dependencies:**

   ```sh
   cd frontend
   npm install
   ```

2. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```
   The frontend runs on `http://localhost:5173`.

---

## Email Configuration

- The backend uses Gmail SMTP via Nodemailer.
- You must enable 2-Step Verification on your Gmail account and create an [App Password](https://support.google.com/accounts/answer/185833?hl=en).
- Use this App Password in your `.env` and in `backend/middleware/Email.config.js`.

---

## API Endpoints

All endpoints are prefixed with `/api/auth`:

- `POST /register` — Register a new user.
- `POST /verify-email` — Verify email with code.
- `POST /login` — Login with email and password.
- `POST /request-reset` — Request password reset link.
- `POST /reset-password/:token` — Reset password with token.

---

## Key Files

- **Backend**

  - [`server.js`](backend/server.js): Express app entry point.
  - [`controllers/Auth.controller.js`](backend/controllers/Auth.controller.js): Auth logic.
  - [`middleware/Email.js`](backend/middleware/Email.js): Email sending functions.
  - [`models/User.model.js`](backend/models/User.model.js): Mongoose user schema.

- **Frontend**
  - [`src/services/api.js`](email-frontend/src/services/api.js): API calls to backend.
  - [`src/components/Auth/`](email-frontend/src/components/Auth/): Auth-related React components.
  - [`src/pages/`](email-frontend/src/pages/): Main pages (Home, Dashboard).
  - [`src/routes/AppRoutes.jsx`](email-frontend/src/routes/AppRoutes.jsx): React Router routes.

---

## Security Notes

- Passwords are hashed with bcrypt before storing.
- JWT tokens are used for authentication and password reset.
- CORS is configured to allow only the frontend origin.
- Sensitive config is stored in `.env` files (never commit these).

---

## Customization

- Update email templates in [`middleware/EmailTemplate.js`](backend/middleware/EmailTemplate.js).
- Change frontend branding in [`src/pages/Home.jsx`](email-frontend/src/pages/Home.jsx) and [`src/components/Common/Navbar.jsx`](email-frontend/src/components/Common/Navbar.jsx).

---

## License

This project is licensed under the ISC License.

---

## Author

- Sohang Chaudhari

---

## Troubleshooting

- **Emails not sending?**

  - Check your Gmail App Password and enable "Less secure app access" if needed.
  - Make sure your `.env` values match those in `Email.config.js`.

- **MongoDB connection issues?**

  - Ensure MongoDB is running and your URI is correct.

- **Frontend/Backend CORS errors?**
  - Confirm `CLIENT_URL` and CORS settings match your frontend URL.

---

## Contributing

Pull requests and issues are welcome!
