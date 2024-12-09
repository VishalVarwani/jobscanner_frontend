import React from 'react';
import './homepage.css';
import { Link } from 'react-router-dom';
import banner from "../../images/banner.png";
import Search from './Searchbarpage/searchbar';
import News from '../featured/newspage';
import Demo from '../testfolder/test';
import Header from '../headerreact/headerpage';


const Home = () => {

  
  return (
    <div className="Homepage">

      <Header/>
      {/* <div>
    <Link to="/demo">Demo</Link>
    <hr/>
    <Link to="/job">job</Link>
      </div> */}
       <div className="Searchbarsection">
        <Search/>
      </div>
      <div className="Banner">
        <h2 className='abouttitle'>JobScanner aggregates data from all major job boards, <br/>offering a centralized hub for comprehensive job listings,<br/> across industries.</h2>
        <Link to="/" className="banner-content">
      
          <span className="banner-text-left typewriter">Tired of jumping between job boards?</span>
          <img className="banner-image" src={banner} alt="Banner" />
          <span className="banner-text-right typewriter">
            We gather listings from all platforms so <br />
            you can find the perfect job all in one place
          </span>
        </Link>
      </div>
     
      {/* <div>
        <News />
      </div> */}
    </div>
  );
};

export default Home;
