import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className=" text-green-600 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link to="/" className="hover:text-green-700 transition">Email Verification App</Link>
                </div>
                <ul className="flex space-x-6 text-md sm:text-base px-2">
                    <li>
                        <Link to="/register" className="hover:underline hover:text-green-700 transition">Register</Link>
                    </li>
                    <li>
                        <Link to="/login" className="hover:underline hover:text-green-700 transition">Login</Link>
                    </li>                   
                    <li>
                        <Link to="/request-reset" className="hover:underline hover:text-green-700 transition">Password Reset</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
