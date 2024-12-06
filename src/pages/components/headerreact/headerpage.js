import React, { useState, useEffect } from 'react';
import "./headerpage.css";
import logo from "../../images/logo.png"
import { useNavigate } from 'react-router-dom';
import saveheader from "../../images/saveheader.png"
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState(JSON.parse(localStorage.getItem('savedJobs')) || []);
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
    navigate("/login"); // Redirect to login page
  };
  useEffect(() => {
    const email = localStorage.getItem("loggedInUserEmail"); // Retrieve email from localStorage
    if (email) {
      const namePart = email.split("@")[0]; // Get the part before '@'
      setUsername(namePart);
    }
  }, []);
  return (
    <div>
      <header>
        <nav className='navheader'>
          <img src={logo} className='logo'/>
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
              <a href="#">About Us</a>
            </li>
            <li className='accountinfo'>
              <Link className='Myprofile' to="/profile">{username}</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={{ background: "none", border: "none", color: "#ffffff" }}>
                Logout
              </button>
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
