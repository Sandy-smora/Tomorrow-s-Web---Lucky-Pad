import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../context/ContextProvider";

import { FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';



const Navbar = ({setQuery}) => {
    const {user} = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.removeItem('token');
        // Redirect to login page
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="logo-title">
                <img src={logo} alt="Logo" className="logo" />
                <h1>Lucky Pad</h1>
            </div>
            
            <div className="search-container"> 
                <FaSearch className="search-icon" /> // Redirect to login page
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Searching the clovers..."
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div>
                {!user ? (
                    <>
                        <Link className="btn btn-action btn-spacing" to='/login'>
                            Login
                        </Link>

                        <Link className="btn btn-action-nd btn-spacing" to='/signup'>
                            Signup
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="btn-spacing">{user.name}</span>

                        <button className="btn btn-danger" onClick={handleLogout}> Logout </button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar