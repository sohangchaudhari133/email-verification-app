import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import VerifyEmail from '../components/Auth/VerifyEmail';
import RequestPasswordReset from '../components/Auth/RequestPasswordReset';
import ResetPassword from '../components/Auth/ResetPassword';

// Defines all application routes using React Router
const AppRoutes = () => {
    return (
        <Routes>
            {/* Home page route */}
            <Route path="/" element={<Home />} />
            {/* Dashboard page route */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Login page route */}
            <Route path="/login" element={<Login />} />
            {/* Register page route */}
            <Route path="/register" element={<Register />} />
            {/* Email verification page route */}
            <Route path="/verify-email" element={<VerifyEmail />} />
            {/* Request password reset page route */}
            <Route path="/request-reset" element={<RequestPasswordReset />} />
            {/* Reset password page route with token parameter */}
            <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
    );
};

export default AppRoutes;