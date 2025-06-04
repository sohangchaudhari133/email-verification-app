import express from "express";
import { Register, VerifyEmail, requestPasswordReset, resetPassword, Login } from "../controllers/Auth.controller.js";

// Create a new router instance for authentication routes
const AuthRoutes = express.Router();

// Route for user registration
AuthRoutes.post('/register', Register);

// Route for email verification
AuthRoutes.post('/verify-email', VerifyEmail);

// Route for user login
AuthRoutes.post('/login', Login);

// Route to request a password reset link
AuthRoutes.post('/request-reset', requestPasswordReset);

// Route to reset password using a token
AuthRoutes.post('/reset-password/:token', resetPassword);

// Export the authentication routes to be used in the main app
export default AuthRoutes;