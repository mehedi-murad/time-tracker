
import { Helmet } from 'react-helmet-async';
import { FaHome, FaTasks } from 'react-icons/fa';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const Dashboard = () => {
    const location = useLocation()
    // const noWelcomeNote =  location.pathname.includes('dashboard/userProfile') || location.pathname.includes('dashboard/createTask') || location.pathname.includes('dashboard/toDo') || location.pathname.includes('dashboard/updateToDo') 
  return (
    <div className="flex flex-col md:flex-row">
            <Helmet>
                <title>TimeTracker | Dashboard</title>
            </Helmet>
      <div className="bg-[#F92659] md:w-96 min-h-screen text-white p-10">
        <ul className="menu p-4 space-y-4">
            <li>
                <NavLink to="/dashboard/userprofile">
                    <FaHome></FaHome>User Profile
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/createTask">
                    <FaTasks></FaTasks>Create Task
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/allTask">
                    <FaTasks></FaTasks>All Tasks
                </NavLink>
            </li>
            
            
        </ul>
        <div className="divider"></div>
        <ul className="menu p-4 space-y-4">
            <li>
                <NavLink to="/">
                    <FaHome></FaHome>Home
                </NavLink>
            </li>
        </ul>
      </div>
      <div className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-500">
        {/* {noWelcomeNote || <WelcomeNote></WelcomeNote>} */}
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;