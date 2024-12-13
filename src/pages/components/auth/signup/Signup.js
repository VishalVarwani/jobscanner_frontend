import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./signup.css"
import email_icon from '../../../images/email.png'
import password_icon from '../../../images/password.png'
import googlelogo from "../../../images/googlelogin.png"
import linkedinlogo from "../../../images/linkedinlogin.png"
import axios from 'axios'
import { baseUrl } from '../../../../Urls'
const Signup = () => {
  const history = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post(`${baseUrl}/signup`, {
        email,
        password
      })
        .then(res => {
          if (res.data === "exist") {
            alert("User already exists")
          } else if (res.data === "notexist") {
            history("/login", { state: { id: email } })
          }
        })
        .catch(e => {
          alert("Wrong details")
          console.log(e);
        })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='containersignup'>
      <div className='header'>
        <div className='text'>
          Create a new account
        </div>
        <div className='underline'></div>
      </div>
      <form className='inputs' onSubmit={submit}>
        <div className='input'>
          <img src={email_icon} alt='email icon' />
          <input type='email' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='input'>
          <img src={password_icon} alt='password icon' />
          <input type='password' placeholder='Set your new password' required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='submit-container'>
          <button type='submit' className='submit btnauth'>
            <i className="animation"></i><i className="animation"></i>Sign up
          </button>
        </div>
      </form>
      <div style={{color:"white"}} className='loginalready'>
        Are you an existing user?
        <span>
          <Link to="/Login" style={{ textDecoration: "none", color: "#148ecb" }}>Login</Link>
        </span>
      </div>
     <div className='line'>
               <div className='text-centerauth'>
                 <Link to = '/' className='Ortext options'>Guest user</Link>
               </div>
             </div>
    </div>
  )
}

export default Signup