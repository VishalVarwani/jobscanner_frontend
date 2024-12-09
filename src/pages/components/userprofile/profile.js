    import React from 'react'
    import "./profile.css"
    import Header from '../headerreact/headerpage'
    import { useState, useEffect } from 'react';
    import axios from 'axios';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
    import { Link } from 'react-router-dom';
    // index.js or App.js
    import 'bootstrap/dist/css/bootstrap.min.css';


    export default function User() {
        const [userEmail, setUserEmail] = useState("");
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility



        useEffect(() => {
            const email = localStorage.getItem("loggedInUserEmail"); // Retrieve email from localStorage
            if (email) {
                setUserEmail(email);
                const namePart = email.split("@")[0];
                setUsername(namePart);

                // Fetch user information including password
                axios.post("http://localhost:8000/get-user-info", { email: email })
                    .then(response => {
                        if (response.data) {
                            setPassword(response.data.password); // Set the password from the response
                        } else {
                            console.log("User not found");
                        }
                    })
                    .catch(error => console.error("Error fetching user info:", error));
            }
        }, []);
            // Toggle password visibility
        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };
        
    return (
        <div className='mainprofile'>

    <Header/>

    <div className="container">
    <div className="main-body">
    
        <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
            <div className="card">
            <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width={100} />
                <div className="mt-3">
                    <h4 className='font'>{username}</h4>
                    <p className="text-secondary mb-1 font"></p>
                    <p  className=" font-size-sm font">{userEmail ? userEmail : "Guest"}</p>
                    {/* <button className="btn btn-primary font">Follow</button>
                    <button className="btn btn-outline-primary">Message</button> */}
                </div>
                </div>
            </div>
            </div>
            <div className="card mt-3">
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0 font"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx={12} cy={12} r={10} /><line x1={2} y1={12} x2={22} y2={12} /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>Website</h6>
                <span className=" font">https://bootdey.com</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0 font"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>Github</h6>
                <span className="   font">bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0 font"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>Linkedin</h6>
                <Link className=" Linkedin font">Connect</Link>
                </li>
            
            
            </ul>
            </div>
        </div>
        <div className="col-md-8">
            <div className="card mb-3">
            <div className="card-body">
            
                <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0 font ">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary d-flex align-items-center font">
                {userEmail ? userEmail : "Guest"}
                </div>
                </div>
                <br/>
                <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0 font ">Password</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary d-flex align-items-center font">
                                                {/* Toggle between showing and hiding password */}
                                                <span className=''>{showPassword ? password : '●●●●●●●●'}</span>
                                                <FontAwesomeIcon 
                                                    icon={showPassword ? faEyeSlash : faEye} 
                                                    onClick={togglePasswordVisibility} 
                                                    style={{ marginLeft: '10px', cursor: 'pointer' }} 
                                                />
                                            </div>
                                        </div>
            
                <hr />
                {/* <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">Mobile</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    (320) 380-4539
                </div>
                </div>
                <hr /> */}
                {/* <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">Address</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    Bay Area, San Francisco, CA
                </div>
                </div>
                <hr /> */}
            
            </div>
            </div>
            <div className="row gutters-sm">
            <div className="col-sm-6 mb-3">
                <div className="card h-100">
                <div className="card-body">
                    
                
                
                
                    <small className='font'>Upload Your CV</small>
                    <div className="progress mb-3" style={{height: 5}}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{width: '66%'}} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                </div>
                </div>
            </div>
            <div className="col-sm-6 mb-3">
                <div className="card h-100">
                <div className="card-body">
                    
                
                
                    <small className='font'>Upload Your Resume</small>
                    <div className="progress mb-3" style={{height: 5}}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{width: '66%'}} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
    </div>

    )
    }
