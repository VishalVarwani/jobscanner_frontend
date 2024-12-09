import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './results.css';
import Searchagain from './searchagain';

export default function JobResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(location.state?.jobs || []);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [activePlatform, setActivePlatform] = useState('both');
  const [expandedDescriptions, setExpandedDescriptions] = useState({}); 

  useEffect(() => {
    if (jobs.length > 0) {
      setDisplayedJobs(jobs);
    }
  }, [jobs]);

  const handlePlatformSwitch = (platform) => {
    setActivePlatform(platform);
    if (platform === 'indeed') {
      setDisplayedJobs(jobs.filter((job) => job.Source === 'Indeed'));
    } else if (platform === 'linkedin') {
      setDisplayedJobs(jobs.filter((job) => job.Source === 'LinkedIn'));
    } else {
      setDisplayedJobs(jobs);
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

  const truncateDescription = (description = '', isExpanded) => {
    const randomText = ' Here is some additional random information about the job that you might find useful. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    if (!isExpanded && description.length > 100) {
      return `${description.slice(0, 100)}...`;
    }
    return isExpanded ? `${description}${randomText}` : description;
  };

  return (
    <div className='JobResults'>
      <Searchagain />
      <div className='page-container'>
        <div className='sidebar'>
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
              style={{ width: '90%', padding: '8px' }}
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
        </div>

        <div className='main-content'>
          <div className='optionbutton'>
            <button
              onClick={() => handlePlatformSwitch('indeed')}
              disabled={jobs.length === 0}
              className={`options  ${activePlatform === 'indeed' ? 'active-button' : ''}`}
            >
              View Indeed
            </button>
            <button
              onClick={() => handlePlatformSwitch('linkedin')}
              disabled={jobs.length === 0}
              className={`options  ${activePlatform === 'linkedin' ? 'active-button' : ''}`}
            >
              View LinkedIn
            </button>
            <button
              onClick={() => handlePlatformSwitch('both')}
              disabled={jobs.length === 0}
              className={`options  ${activePlatform === 'both' ? 'active-button' : ''}`}
            >
              View Both
            </button>
            <button
              className='Backtosearch options'
              onClick={() => navigate('/')}
            >
              Back to Search
            </button>
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
                    <div className='job-header'>
                      <h2 style={{ textAlign: 'center' }}>{job.JobTitle}</h2>
                    </div>
                    <p>
                      <strong>Company:</strong> {job.CompanyName}{' '}
                      <strong>Location:</strong> {job.JobLocation}
                    </p>
                    <a
                      href={job.JobLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='apply-link'
                    >
                      Apply now
                    </a>
                    <div className='job-details'>
                      <h3 style={{ color: 'white' }}>Job Description</h3>
                      <p>{truncateDescription(job.JobDescription || '', isExpanded)}</p>
                      <button
                        onClick={() => toggleDescription(index)}
                        className='read-more-less-btn'
                      >
                        {isExpanded ? 'Read Less' : 'Read More'}
                      </button>
                    </div>
                    <p>
                      <strong>Source:</strong> {job.Source}
                    </p>
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
