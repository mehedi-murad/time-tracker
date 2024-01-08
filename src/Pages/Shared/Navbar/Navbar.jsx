import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const Navbar = () => {
    const {user, logOut} = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
          .then(() => {})
          .catch((error) => console.log(error));
      };
    return (
        <div className="navbar bg-gray-900 fixed z-10 text-white px-20">
        <div className="flex-1">
            <h2>TimeTracker</h2>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            {user && <li><Link to="/dashboard">Dashboard</Link></li>}
            <li id="#about"><Link>About</Link></li>
            <li><Link>Contact</Link></li>
            <li>
                <details>
                <summary>
                    Parent
                </summary>
                <ul className="p-2 bg-[#FE7800] rounded-t-none">
                    {user && <h2 className='text-center bg-gray-900 text-white p-2 rounded-lg mb-5'>{user?.displayName}</h2>}
                    { user ?
                        <li>
                            <p onClick={handleLogOut}>Logout</p>
                        </li>
                        :
                        <li><Link to="/login">Login</Link></li>
                    }
                    <li><Link to="/signup">Register</Link></li>
                </ul>
                </details>
            </li>
            </ul>
            <div className="avatar flex justify-center p-6">
                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {user ? 
                        <img src={user?.photoURL} />
                        :
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Navbar;