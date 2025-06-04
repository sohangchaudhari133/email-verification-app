import React, { useState } from 'react';
import { requestPasswordReset } from '../../services/api.js';

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await requestPasswordReset(email);
            setMessage(response.message);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Request Password Reset</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter your registered email"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition duration-200 cursor-pointer"
                    >
                        Request Reset Link
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-green-600 text-sm text-center font-medium">{message}</p>
                )}
                {error && (
                    <p className="mt-4 text-red-500 text-sm text-center font-medium">{error}</p>
                )}
            </div>
        </div>
    );
};

export default RequestPasswordReset;
