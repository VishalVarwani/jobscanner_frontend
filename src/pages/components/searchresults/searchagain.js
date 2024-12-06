    import React, { useState } from 'react';
    import './searchagain.css';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom'; // Import useNavigate
    import ParticlesComponent from '../homereact/Searchbarpage/particles';
    export default function Searchagain() {
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [jobs, setJobs] = useState([]); // Store jobs from both platforms
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activePlatform, setActivePlatform] = useState('both'); // Track active platform

    const navigate = useNavigate(); // Initialize useNavigate

    const handleFetchJobs = async (e) => {
        e.preventDefault(); // Prevent form submission and page refresh
        if (!jobTitle || !location) {
            alert('Please enter both job title and location.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            // Post job search request to both platforms
            await Promise.all([
                axios.post('http://localhost:3004/fetch-jobs', {
                    job_title: jobTitle,
                    location: location,
                }),
                axios.post('http://localhost:3001/fetch-jobs', {
                    job_title: jobTitle,
                    location: location,
                }),
            ]);

            // Fetch jobs from both platforms
            const fetchedJobs = await fetchJobs();

            // Navigate to JobListingsPage and pass the fetched jobs as state
            navigate('/jobresults', { state: { jobs: fetchedJobs } });

        } catch (err) {
            setError('Error fetching jobs. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchJobs = async () => {
        try {
            // Fetch jobs from both platforms
            const [indeedResponse, linkedinResponse] = await Promise.all([
                axios.get('http://localhost:3004/jobs'),
                axios.get('http://localhost:3001/get-jobs'),
            ]);

            // Merge job results from both platforms
            const mergedJobs = [
                ...indeedResponse.data.map(job => ({
                    JobTitle: job.JobTitle,
                    CompanyName: job.CompanyName,
                    JobLocation: job.JobLocation,
                    JobLink: job.JobLink,
                    Source: 'Indeed', // Indicate the source
                })),
                ...linkedinResponse.data.map(job => ({
                    JobTitle: job.Title,
                    CompanyName: job.Company,
                    JobLocation: job.Location,
                    JobLink: job.Link,
                    Source: 'LinkedIn', // Indicate the source
                })),
            ];

            setJobs(mergedJobs);
            return mergedJobs; // Return merged jobs for navigation

        } catch (err) {
            setError('Error fetching job listings. Please try again.');
            console.error(err);
            return [];
        }
    };

    const handlePlatformSwitch = (platform) => {
        setActivePlatform(platform);
        if (platform === 'indeed') {
            setJobs(prevJobs => prevJobs.filter(job => job.Source === 'Indeed'));
        } else if (platform === 'linkedin') {
            setJobs(prevJobs => prevJobs.filter(job => job.Source === 'LinkedIn'));
        } else {
            // Re-fetch all jobs if 'both' is selected
            // Alternatively, store all jobs before filtering
            // For simplicity, you can maintain another state variable for all jobs
            // Here, assuming jobs are already stored in `jobs`
            // This may require adjustment based on your actual implementation
            fetchJobs();
        }
    };

    return (
        <div style={{height:"30vh"}}className='ParentHome'>
                    <ParticlesComponent/>

        <div className='Searchforjobssection'>
            
            
            <form style={{border:'none', boxShadow:"none", backgroundColor:"transparent"}}onSubmit={handleFetchJobs} className="search-bar">
            <div className="input-group">

                <input
                className="input1"
                type="text"
                placeholder="Search any job title or any keywords"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
                />
                <input
                className="input1"
                type="text"
                placeholder="Enter your desired location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
    <button type="submit" className="Searchbutton" disabled={loading}>
                                {loading ? 'Searching...' : 'Search'}
                            </button>          </div>
            
            </form>
        </div>
        </div>
    );
    }