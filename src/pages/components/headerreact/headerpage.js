import React, { useState, useEffect } from 'react';
import "./headerpage.css";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import jobscanner from "../../images/jobscanner.png";
import saveheader from "../../images/saveheader.png";

const Header = () => {
  const [savedJobs, setSavedJobs] = useState(JSON.parse(localStorage.getItem('savedJobs')) || []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUserEmail");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const email = localStorage.getItem("loggedInUserEmail");
    if (email) {
      const namePart = email.split("@")[0];
      setUsername(namePart);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img style={{height:"40px"}}src={jobscanner} alt="JobScanner Logo" className="logo" />
          </Link>
          <button
          color='white'
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{background:"white"}}
          
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto ulheader">
              <li className="nav-item">
                <Link style={{color:"white", fontSize:"14px",fontWeight:"400" }} className="nav-link" to="/">Home Page</Link>
              </li>
              <li className="nav-item">
                <Link style={{color:"white", fontSize:"14px",fontWeight:"400"}} className="nav-link" to="/about">About Us</Link>
              </li>
              {username && (
                <li className="nav-item accountinfo">
                  <Link style={{color:"white", fontSize:"14px",fontWeight:"400"}} className="nav-link Myprofile" to="/profile">{username}</Link>
                </li>
              )}
              <li className="nav-item">
                {isLoggedIn ? (
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                    style={{ textDecoration: 'none', color:"white", fontSize:"14px",fontWeight:"400"  }}
                  >
                    Logout
                  </button>
                ) : (
                  <Link style={{color:"white", fontSize:"14px",fontWeight:"400"}} className="nav-link" to="/login">Login</Link>
                )}
              </li>
              <li style={{color:"white", fontSize:"14px",fontWeight:"400"}} className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={() => navigate('/savedjobs', { state: { savedJobs } })}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <img src={saveheader} alt="Saved Jobs" className="saved-jobs-header" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
