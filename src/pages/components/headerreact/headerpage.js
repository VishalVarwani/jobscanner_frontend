import React, { useState, useEffect } from 'react';
import "./headerpage.css";
import logo from "../../images/logo.png"
import { useNavigate } from 'react-router-dom';
import saveheader from "../../images/saveheader.png"
import { Link } from 'react-router-dom';
import jobscanner from "../../images/jobscanner.png"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState(JSON.parse(localStorage.getItem('savedJobs')) || []);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status

  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // const handleSaveJob = (job) => {
  //   const updatedSavedJobs = [...savedJobs, job]; 
  //   setSavedJobs(updatedSavedJobs);
  //   localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs)); 
  // }
  const handleLogout = () => {
    localStorage.removeItem("loggedInUserEmail"); // Remove logged-in user data from localStorage
    setIsLoggedIn(false); // Update login status

    navigate("/login"); // Redirect to login page
  };
  useEffect(() => {
    const email = localStorage.getItem("loggedInUserEmail"); // Retrieve email from localStorage
    if (email) {
      const namePart = email.split("@")[0]; // Get the part before '@'
      setUsername(namePart);
      setIsLoggedIn(true); // Update login status
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);
  return (
    <div>
      <header>
        <nav className='navheader'>
          <img src={jobscanner} className='logo'/>
          <div className="burger" onClick={toggleMenu}>
            <div className={`line1 ${isOpen ? 'toggle' : ''}`}></div>
            <div className={`line2 ${isOpen ? 'toggle' : ''}`}></div>
            <div className={`line3 ${isOpen ? 'toggle' : ''}`}></div>
          </div>
          <ul className={ isOpen ? 'nav-links open' : 'nav-links ulheader'}>
            <li style={{listStyle:"none"}}>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <a href="/">About Us</a>
            </li>
            <li className='accountinfo'>
              <Link className='Myprofile' to="/profile">{username}</Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  style={{ background: "none", border: "none", color: "#ffffff" }}
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  style={{ background: "none", border: "none", color: "#ffffff" }}
                >
                  Login
                </button>
              )}
            </li>
            <li>
            <button style={{background:"none", border:"none"}}
              onClick={() => navigate('/savedjobs', { state: { savedJobs } })} // Navigate to the saved jobs page
            >
                <img  className='saved-jobs-header'src={saveheader} />
            </button>
            </li>
           
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
