import React, { useState } from 'react';
import axios from 'axios';
import { scrapingURL } from '../../../Urls';
const JobSearch = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchJobs = async () => {
        setLoading(true);
        try {
            const responses = await Promise.all([
                axios.post(`${scrapingURL}/api/indeed/fetch-jobs`, {
                    job_title: jobTitle,
                    location: location,
                }),
                axios.post(`${scrapingURL}/api/linkedin/fetch-jobs`, {
                    job_title: jobTitle,
                    location: location,
                }),
                axios.post(`${scrapingURL}/api/stepstone/fetch-jobs`, {
                    job_title: jobTitle,
                    location: location,
                }),
                axios.post(`${scrapingURL}/api/glassdoor/fetch-jobs`, {
                    job_title: jobTitle,
                    location: location,
                }),
            ]);

            const allJobs = responses.flatMap(response => response.data);
            setJobs(allJobs);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Job Search</h1>
            <div>
                <input
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button onClick={searchJobs} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            <div>
                {jobs.length === 0 && !loading ? (
                    <p>No results found</p>
                ) : (
                    <ul>
                        {jobs.map((job, index) => (
                            <li key={index}>
                                <h3>{job.title}</h3>
                                <p>{job.company} - {job.location}</p>
                                <a href={job.link} target="_blank" rel="noopener noreferrer">View Job</a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default JobSearch;
