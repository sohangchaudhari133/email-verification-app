import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="max-w-3xl w-full text-center bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                <h1 className="text-4xl font-bold text-green-600 mb-4">Welcome to the Email Verification App</h1>
                <p className="text-gray-700 text-lg mb-6 mt-4">
                    This application helps you securely register, verify your email address, and manage your account with ease.
                </p>
                <div className="text-left text-gray-600 space-y-3">
                    <p>✅ Register a new account with your email address.</p>
                    <p>📩 Receive a verification link in your inbox.</p>
                    <p>🔒 Verify your email to activate full access.</p>
                    <p>📁 Manage your profile and account settings easily.</p>
                </div>
                <div className="mt-6">
                    
                    <Link
                        to="/register"
                        className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition duration-300"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
