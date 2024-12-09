import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../headerreact/headerpage';
import "./save.css";
import { Link } from 'react-router-dom';
export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.post("http://localhost:8000/get-saved-jobs", {
          email: loggedInUserEmail
        });
        if (response.data.savedJobs) {
          setSavedJobs(response.data.savedJobs);
        }
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    fetchSavedJobs();
  }, [loggedInUserEmail]);

  const handleDeleteJob = async (index) => {
    const jobToDelete = savedJobs[index];

    try {
      await axios.post("http://localhost:8000/delete-saved-job", {
        email: loggedInUserEmail,
        jobLink: jobToDelete.JobLink
      });

      const updatedJobs = savedJobs.filter((_, i) => i !== index);
      setSavedJobs(updatedJobs);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div>
      <Header />
      <h2 className="text-center my-4" style={{ color: "white" }}>Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <p className="text-center" style={{ color: "white" }}>No saved jobs found.</p>
      ) : (
        <div className="container">
          <div className="row">
            {savedJobs.map((job, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="job-item p-3 h-100 d-flex flex-column">
                  <div className="job-header mb-3">
                    <h3>{job.JobTitle}</h3>
                  </div>
                  <p>
                    <strong>Company:</strong> {job.CompanyName} <br />
                    <strong>Location:</strong> {job.JobLocation}
                  </p>
                  <p><strong>Source:</strong> {job.Source}</p>
                  <div className="button-row mt-auto">
                    <Link
                      to={job.JobLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='apply-link'
                    >
                      Apply Now
                    </Link>
                    <button
                      className='delete-button'
                      onClick={() => handleDeleteJob(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
