import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "./login.css"
import email_icon from "../../../images/email.png"
import password_icon from '../../../images/password.png'
import googlelogo from "../../../images/googlelogin.png"
import linkedinlogo from "../../../images/linkedinlogin.png"
import axios from 'axios'
import { baseUrl } from '../../../../Urls'
const Login = () => {
  const history = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post(`${baseUrl}/`, {
        email,
        password
      })
        .then(res => {
            if (res.data === "exist") {
                localStorage.setItem("loggedInUserEmail", email); // Save email to local storage
                history("/", { state: { id: email } });
            }else if (res.data === "notexist") {
            alert("User has not signed up")
          }
        })
        .catch(e => {
          alert("Incorrect details")
          console.log(e);
        })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='containerlogin'>
      <div className='header'>
        <div className='text'>
          Welcome Back, New Opportunities Await
        </div>
        <div className='underline'></div>
      </div>
      <form className='inputs' onSubmit={submit}>
        <div className='input'>
          <img src={email_icon} alt='email icon' />
          <input  type='email' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='input'>
          <img src={password_icon} alt='password icon' />
          <input type='password' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='submit-container'>
          <button type='submit' className='submit btnauth'>
            <i className="animation"></i><i className="animation"></i>Login
          </button>
        </div>
      </form>
      <div style={{color:"white"}}className='loginalready'>
        New to our platform?
        <span>
          <Link to="/Signup" style={{ textDecoration: "none", color: "#148ecb" }}>Signup</Link>
        </span>
      </div>
      <div className='line-container'>
        <div className='text-centerauth'>
          <span className='Ortext'>Or sign in with</span>
        </div>
      </div>
      <div className='orelseimg'>
        <Link className='social-icon'>
          <img className='logo google' src={googlelogo} alt='sign in with google' />
        </Link>
        <Link className='social-icon'>
          <img className='logo linkedin' src={linkedinlogo} alt='sign in with linkedin' />
        </Link>
      </div>
    </div>
  )
}

export default Login