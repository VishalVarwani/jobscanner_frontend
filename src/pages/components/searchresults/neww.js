import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../headerreact/headerpage';
import "./save.css";
import { Link } from 'react-router-dom';

export default function SavedRecommendations() {
  const [savedRecommendations, setSavedRecommendations] = useState([]);
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

  // Fetch saved recommendations from MongoDB on component mount
  useEffect(() => {
    const fetchSavedRecommendations = async () => {
      try {
        const response = await axios.post("http://localhost:8000/get-saved-jobs", {
          email: loggedInUserEmail
        });
        if (response.data.savedJobs) {
          setSavedRecommendations(response.data.savedJobs);
        }
      } catch (error) {
        console.error("Error fetching saved recommendations:", error);
      }
    };

    fetchSavedRecommendations();
  }, [loggedInUserEmail]);

  // Handle deleting a saved recommendation
  const handleDeleteRecommendation = async (index) => {
    const recommendationToDelete = savedRecommendations[index];

    try {
      await axios.post("http://localhost:8000/delete-saved-job", {
        email: loggedInUserEmail,
        jobLink: recommendationToDelete.JobLink
      });

      const updatedRecommendations = savedRecommendations.filter((_, i) => i !== index);
      setSavedRecommendations(updatedRecommendations);
    } catch (error) {
      console.error("Error deleting recommendation:", error);
    }
  };

  return (
    <div>
      <Header />
      <h2 className="text-center my-4" style={{ color: "white" }}>Saved Recommendations</h2>
      {savedRecommendations.length === 0 ? (
        <p className="text-center" style={{ color: "white" }}>No saved recommendations found.</p>
      ) : (
        <div className="container">
          <div className="row">
            {savedRecommendations.map((recommendation, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="job-item p-3 h-100 d-flex flex-column">
                  <div className="job-header mb-3">
                    <h3>{recommendation.JobTitle}</h3>
                  </div>
                  <p>
                    <strong>Company:</strong> {recommendation.CompanyName} <br />
                    <strong>Location:</strong> {recommendation.JobLocation}
                  </p>
                  <p><strong>Source:</strong> {recommendation.Source}</p>
                  <div className="button-row mt-auto">
                    <Link
                      to={recommendation.JobLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='apply-link'
                    >
                      Apply Now
                    </Link>
                    <button
                      className='delete-button'
                      onClick={() => handleDeleteRecommendation(index)}
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
