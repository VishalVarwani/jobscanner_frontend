import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './pages/components/headerreact/headerpage';
import Home from './pages/components/homereact/homepage';
import Search from './pages/components/homereact/Searchbarpage/searchbar';

import News from './pages/components/featured/newspage';
import RainbowCursorTrail from './pages/components/curserpage/curser';
import Results from './pages/components/searchresults/results';
import JobResults from './pages/components/searchresults/results';
import Searchagain from './pages/components/searchresults/searchagain';
import SavedJobs from './pages/components/searchresults/save';
import Login from './pages/components/auth/login/login';
import Signup from './pages/components/auth/signup/Signup';
import User from './pages/components/userprofile/profile';
import Demo from './demo/demo';
import SavedRecommendations from './pages/components/searchresults/neww';
import JobResultsdemo from './pages/components/searchresults/demoresults/demores';

function App() {
  return (
    <div className="App">
      <RainbowCursorTrail/>
      <BrowserRouter>
      <Routes>
       
    <Route path='/' element={<Home/>}/>
    <Route path='search' element={<Search/>}/>

    <Route path='news' element={<News/>}/>
    {/* <Route path='jobresults' element={<JobResults/>}/> */}
    <Route path='searchagain' element={<Searchagain/>}/>

    <Route path='/savedjobs' element={<SavedJobs/>}/> 
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/profile' element={<User/>}/>
       <Route path='/demo' element={<Demo/>}/>
       <Route path='/job' element={<SavedRecommendations/>}/>
       <Route path='jobresults' element={<JobResultsdemo/>}/>








    




        
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
