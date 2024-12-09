import React from 'react';
import './newspage.css'; // CSS for styling the cards

const Card = ({ title, description }) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

const News = () => {
    return (
        <div>
              <div className="featured-news-container">
            <h1 className="rainbow-text">Featured News</h1>
        </div>
        <div className="cards-container">   
            <Card
                title="Developer updates"
                description="With 20+ new tools and APIs, we're opening up more ways to extend Shopify, and making it easier to build apps that customize any commerce experience."
            />
            <Card
                title="Shop App"
                description="Optimize your Shop Store for millions of mobile shoppers. Boost engagement and drive conversions with customized branding, collections, and more."
            />
            <Card
                title="Shopify Admin"
                description="A new, uplifted visual design for the admin. We've reimagined the admin to be more streamlined and intuitive."
            />
             <Card
                title="Shopify Admin"
                description="A new, uplifted visual design for the admin. We've reimagined the admin to be more streamlined and intuitive."
            /> <Card
            title="Shopify Admin"
            description="A new, uplifted visual design for the admin. We've reimagined the admin to be more streamlined and intuitive."
        /> <Card
        title="Shopify Admin"
        description="A new, uplifted visual design for the admin. We've reimagined the admin to be more streamlined and intuitive."
    />
            {/* Add more Card components as needed */}
        </div>
        </div>
    );
};

export default News;
