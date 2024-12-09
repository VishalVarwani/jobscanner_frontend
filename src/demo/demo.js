import React, { useState } from 'react';

function Demo() {
  const [pdfFile, setPdfFile] = useState(null);
  const [recommendation, setRecommendation] = useState('');

  // Function to handle file input
  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  // Function to upload the PDF and get job recommendation
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('pdf', pdfFile);

    fetch('http://localhost:5000/upload-pdf', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setRecommendation(data.recommendation);
      })
      .catch((error) => {
        console.error('Error fetching job recommendation:', error);
      });
  };

  return (
    <div className="App">
      <h1 style={{color:"white"}}>Job Recommendation</h1>
      <input style={{color:"white"}} type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Get Recommendation</button>
      <p style={{color:"white"}}>{recommendation}</p>
    </div>
  );
}

export default Demo;
