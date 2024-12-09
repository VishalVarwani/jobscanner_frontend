        import React, { useState } from 'react';
        import './searchbar.css';
        import axios from 'axios';
        import { useNavigate } from 'react-router-dom';
        import ParticlesComponent from './particles';
        import indeedimg from "../../../images/indeed.png"
import { scrapingURL } from '../../../../Urls';
        export default function Search() {
        const [jobTitle, setJobTitle] = useState('');
        const [location, setLocation] = useState('');
        const [jobs, setJobs] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState('');

        const navigate = useNavigate();

        const handleFetchJobs = async (e) => {
            e.preventDefault();
            if (!jobTitle || !location) {
            alert('Please enter both job title and location.');
            return;
            }
            setError('');
            setLoading(true);

            try {
                // Send requests to all 4 endpoints
                await Promise.all([
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
            const fetchedJobs = await fetchJobs();
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
            const [indeedResponse, linkedinResponse, stepstoneResponse, glassdoorResponse] = await Promise.all([
                axios.get(`${scrapingURL}/api/indeed/indeed-jobs`),
                axios.get(`${scrapingURL}/api/linkedin/get-jobs`),
                axios.get(`${scrapingURL}/api/stepstone/stepstone-jobs`),
                axios.get(`${scrapingURL}/api/glassdoor/glassdoor-jobs`),
            ]);

            const mergedJobs = [
                ...indeedResponse.data.map(job => ({
                JobTitle: job.indeedtitle,
                CompanyName: job.indeedcompany,
                JobLocation: job.indeedlocation,
                JobLink: job.indeedlink,
                JobPosted: job.indeedjobPosted,
                Description: job.indeeddescription,
                Companylogo: indeedimg,

                Source: 'Indeed',
                })),
                ...linkedinResponse.data.map(job => ({
                JobTitle: job.Title,
                CompanyName: job.Company,
                JobLocation: job.Location,
                JobLink: job.Link,
                JobPosted: job.Jobposted,
                Companylogo: job.Imagesrc,
                Source: 'LinkedIn',
                })),
                ...stepstoneResponse.data.map(job => ({
                    JobTitle: job.title,
                    CompanyName: job.company,
                    JobLocation: job.location,
                    JobLink: job.link,
                    JobPosted: job.jobPosted,
                    Description: job.description,
                    Companylogo: job.imageSrc,
                    Status: job.status,                
                    Source: 'Stepstone',
                    
                })),
                ...glassdoorResponse.data.map(job => ({
                    JobTitle: job.role,
                    CompanyName: job.company,
                    JobLocation: job.location,
                    JobLink: job.link,
                    JobPosted: job.jobPosted,
                    Description: job.description,
                    Salary: job.salary,
                    Status: job.status,
                    Companylogo: job.logo,
                    Source: 'Glassdoor'
                }))
                
            ];

            setJobs(mergedJobs);
            return mergedJobs;
            } catch (err) {
            setError('Error fetching job listings. Please try again.');
            console.error(err);
            return [];
            }
        };

        return (
            <div className='ParentHome'>
            <ParticlesComponent />

            <div className='Searchforjobssection'>
                <h2 className="dynamic-typing">You might be one step away from a new opportunity</h2>
                
                <h4 className='searchforjobs'>Search For Jobs</h4>
                
                <form onSubmit={handleFetchJobs} className="search-bar">
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
                    <select className="Positionsinput">
                    <option>All Positions</option>
                    <option>Work Student</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    </select>
                    <button type="button" className="more-filters">More Filters</button>

                    <button type="submit" className="Searchbutton" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
                </form>

                {/* Loading Overlay */}
                {loading && (
                <div className="loader-overlay">
                    <span className="loader"></span>
                </div>
                )}

                {/* Display error if there is one */}
                {error && <p className="error-message">{error}</p>}
            </div>
            </div>
        );
        }
