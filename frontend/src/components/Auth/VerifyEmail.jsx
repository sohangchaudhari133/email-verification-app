import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../services/api';

const VerifyEmail = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await verifyEmail(code);
            setMessage(data.message);
            if (data.success) {
                navigate('/dashboard'); // Redirect to dashboard on success
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Verify Your Email</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                            Verification Code:
                        </label>
                        <input
                            type="text"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter the code sent to your email"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition duration-200"
                    >
                        Verify
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-center font-medium ${message.includes('successfully') ? 'text-green-600' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
