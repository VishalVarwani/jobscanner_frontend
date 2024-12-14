import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./demo.css"
import goback from "../../../images/goback.png"
import Searchagain from '../searchagain';
import locationimg from "../../../images/location.png";
import clockimg from "../../../images/clock.png";
import calenderimg from "../../../images/calendar.png";
import save from "../../../images/save.png";
import statusimg from "../../../images/status.png";
import indeedimg from "../../../images/indeed.png"
import { baseUrl } from '../../../../Urls';
import Alert from '@mui/material/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../headerreact/headerpage';
import Search from '../../homereact/Searchbarpage/searchbar';

export default function JobResultsdemo() {
const location = useLocation();
const navigate = useNavigate();
const [jobs, setJobs] = useState(location.state?.jobs || []);
const [displayedJobs, setDisplayedJobs] = useState([]);
const [activePlatform, setActivePlatform] = useState('both');
const [expandedDescriptions, setExpandedDescriptions] = useState({});
const [savedJobs, setSavedJobs] = useState(JSON.parse(localStorage.getItem('savedJobs')) || []); // Initialize with saved jobs from localStorage
const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility

useEffect(() => {
    if (jobs.length > 0) {
    setDisplayedJobs(jobs);
    }
}, [jobs]);

const handlePlatformSwitch = (platform) => {
    setActivePlatform(platform);

    if (platform === 'indeed') {
        setDisplayedJobs(jobs.filter((job) => job.Source.toLowerCase() === 'indeed'));
    } else if (platform === 'linkedin') {
        setDisplayedJobs(jobs.filter((job) => job.Source.toLowerCase() === 'linkedin'));
    } else if (platform === 'stepstone') {
        setDisplayedJobs(jobs.filter((job) => job.Source.toLowerCase() === 'stepstone')); // Matches lowercase 'stepstone'
    } else if (platform === 'glassdoor') {
        setDisplayedJobs(jobs.filter((job) => job.Source.toLowerCase() === 'glassdoor'));
    } else {
        setDisplayedJobs(jobs); // Show all jobs
    }
};

const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

const handleSaveJob = async (job) => {
    if (!loggedInUserEmail) {
        alert("User email not available.");
        return;
    }

    try {
        const response = await axios.post(`${baseUrl}/save-job`, {
            email: loggedInUserEmail,
            job
        });

        if (response.data === "Job saved successfully") {
            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 3000);
        } else {
            alert(response.data);
        }
    } catch (error) {
        console.error("Error saving job:", error);
        alert("Failed to save job");
    }
};


useEffect(() => {
    if (jobs.length === 0) {
    navigate('/');
    }
}, [jobs, navigate]);

const toggleDescription = (index) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };
// const truncateDescription = (description = '', isExpanded) => {
//     if (!description) return 'No description available.';
//     if (!isExpanded && description.length > 100) {
//         return `${description.slice(0, 100)}...`;
//     }
//     return description; 
// };
 // Check if description exceeds a certain length (e.g., more than 150 characters) to show the "Read More" button
 const shouldShowReadMore = (description) => {
    // Make sure description is defined and has a length
    return (description || '').length > 250; // Adjust the character count as needed
  };

return (
    <div className='JobResults'>
        <Header/>
         {alertVisible && (
    <Alert variant="filled" severity="success" style={{ marginBottom: '20px', width:"300px" }}>
      Job has been saved successfully!
    </Alert>
  )}
    {/* <Searchagain />
    <Search/> */}
    <div  className='page-container'>
        {/* <div style={{marginLeft:"10px"}} className='sidebar'>
        <h3>Filters</h3>
        <div className='filter-option'>
            <label htmlFor='jobType'>Job Type</label>
            <select id='jobType'>
            <option value=''>All</option>
            <option value='full-time'>Full Time</option>
            <option value='part-time'>Part Time</option>
            <option value='contract'>Contract</option>
            </select>
        </div>
        <div className='filter-option'>
            <label>Location</label>
            <input
            style={{ padding: '8px' }}
            type='text'
            placeholder='Enter your location'
            />
        </div>
        <div className='filter-option'>
            <label htmlFor='companySize'>Company Size</label>
            <select id='companySize'>
            <option value=''>All</option>
            <option value='small'>Small</option>
            <option value='medium'>Medium</option>
            <option value='large'>Large</option>
            </select>
        </div>
        <button className='apply-filters'>Apply Filters</button>
        </div> */}

        <div className='main-content'>
       
        <div style={{gap:"25px"}} className="d-flex justify-content-center flex-wrap mb-3">
            {['indeed', 'linkedin', 'stepstone', 'glassdoor', 'both'].map((platform) => (
              <button style={{gap:"25px"}}
                key={platform}
                onClick={() => handlePlatformSwitch(platform)}
                className={`btn ${activePlatform === platform ? 'btn-primary' : 'btn-secondary'} mx-1`}
              >
                {`View ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
              </button>
            ))}
          </div>

        {jobs.length === 0 ? (
            <p>No jobs found.</p>
        ) : (
            <div className='job-grid'>
            {displayedJobs.map((job, index) => {
                const isExpanded = expandedDescriptions[index];
                return (
                <div
                    key={index}
                    className={`job-item ${isExpanded ? 'expanded-job' : ''}`} 
                >
                  <div className="job-header">
                  <h2 className='jobtitle'>{job.JobTitle}</h2>
<Link className='saveparent' style={{ position: "absolute", right: 20 }}>
    <img
    className='savelogo'
        src={save}
        alt="Save this"
        onClick={() => handleSaveJob(job)} // Save the job when clicking on the save icon
        style={{
            cursor: "pointer",
            paddingLeft: "10px",
           // Adds space from the job title
        }}
    />
</Link>
</div>
<div className="job-actions">
    <Link to={job.Source} className="source">
        {job.Source}
        </Link>
        <Link
        // to={`${job.JobLink}?utm_source=JobScanner&utm_medium=referral&utm_campaign=job_listings`}
        to={job.JobLink}

        target="_blank"
        rel="noopener noreferrer"
        className="apply-link"
    >
        Apply Now
    </Link>
     </div>
                    <div style={{marginTop:"10px"}}>
<div style={{ display: "flex", alignItems: "center" }}>
    <img className="companylogo" src={job.Companylogo} alt="Company Logo"  />
    <p className="companyname" style={{ fontSize: "14px", marginLeft: "21px", color: "whitesmoke" }}>
        {job.CompanyName}
    </p>
</div>

{/* This is the job source link, it will be pushed to the far right */}


<div className='parentcard' style={{ display: "flex", alignItems: "center", gap: "30px", marginLeft: "85px" }}>
    {job.JobLocation && (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img src={locationimg} alt="Location Icon" style={{ marginRight: "5px" }} />
            <p className= 'parentfont' style={{ fontSize: "17px", margin: "0" }}>{job.JobLocation}</p>
            
        </div>
    )}
                         {job.Fulltime && (
        <div style={{ display: "flex", alignItems: "center" }}>
            <p className= 'parentfont'  style={{ fontSize: "17px", margin: "0", }}>.</p>
        </div>
    )}
    {job.Fulltime && (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img src={clockimg} alt="Clock Icon" style={{ marginRight: "5px" }} />
            <p className= 'parentfont'  style={{ fontSize: "17px", margin: "0", }}>Fulltime</p>
        </div>
    )}
                         {job.JobPosted && (
        <div style={{ display: "flex", alignItems: "center" }}>
            <p className= 'parentfont'  style={{ fontSize: "17px", margin: "0", }}>.</p>
        </div>
    )}
    {job.JobPosted && (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img src={calenderimg} alt="Clock Icon" style={{ marginRight: "5px" }} />
            <p className= 'parentfont'  style={{ fontSize: "17px", margin: "0" }}>{job.JobPosted}</p>
        </div>
    )}{job.Salary && (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img src={calenderimg} alt="Clock Icon" style={{ marginRight: "5px" }} />
            <p className= 'parentfont'  style={{ fontSize: "17px", margin: "0" }}>{job.Salary}</p>
        </div>
    )}
                        {job.Status && (
        <div style={{ display: "flex", alignItems: "center" }}>
            <p className= 'parentfont'  style={{ fontSize: "17px", margin: "0", }}>.</p>
        </div>
    )}
    {job.Status && (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img src={statusimg} alt="Status Icon" style={{ marginRight: "5px" }} />
            <p className= 'parentfont' style={{ fontSize: "17px", margin: "0" }}>{job.Status}</p>
        </div> 
    )}
                        </div>
                        <p  style={{marginTop:"20px",}}className={`job-description ${isExpanded ? 'expanded' : 'collapsed'} parentfont` }>{job.Description}</p>
                      {/* Only show Read More button if the description is long enough */}
                      {shouldShowReadMore(job.Description) && (
                        <button style={{textDecoration:"none", color:"white", fontWeight:"700"}}
                          onClick={() => toggleDescription(index)}
                          className="read-more-btn"
                        >
                          {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                      )}
                        {/* <Link className=""style={{color:"white", textDecoration:"none", textAlign:"start",marginLeft:"85px", width:"150px", backgroundColor:"transparent", boxShadow:"none", border:"none"}}
                            onClick={() => toggleDescription(index)}
                        >
                            {isExpanded ? 'View Less' : 'View Detail'}
                        </Link> */}
                   
                    </div>

                   
                   
                </div>
                );
            })}
            </div>
        )}
        </div>
    </div>
    </div>
);
}
