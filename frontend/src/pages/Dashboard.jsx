import React from 'react';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                <h1 className="text-3xl font-semibold text-blue-600 mb-4 text-center">User Dashboard</h1>
                <p className="text-gray-700 text-lg mb-6 text-center">
                    Welcome to your dashboard! Here you can manage your account and view your personal information.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-medium text-blue-700 mb-2">📄 Account Details</h2>
                        <p className="text-gray-700">View and edit your profile, email, and other account settings.</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-medium text-green-700 mb-2">🔐 Security Settings</h2>
                        <p className="text-gray-700">Update your password, enable 2FA, and review login activity.</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-medium text-yellow-700 mb-2">📬 Notifications</h2>
                        <p className="text-gray-700">Manage email notifications and communication preferences.</p>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-medium text-red-700 mb-2">🗑️ Delete Account</h2>
                        <p className="text-gray-700">Permanently delete your account and associated data.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
