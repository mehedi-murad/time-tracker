import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-gray-900 fixed z-10 text-white px-20">
        <div className="flex-1">
            <h2>TimeTracker</h2>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            <li><Link>Dashboard</Link></li>
            <li id="#about"><Link>About</Link></li>
            <li><Link>Contact</Link></li>
            <li>
                <details>
                <summary>
                    Parent
                </summary>
                <ul className="p-2 bg-[#FE7800] rounded-t-none">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Register</Link></li>
                </ul>
                </details>
            </li>
            </ul>
        </div>
        </div>
    );
};

export default Navbar;