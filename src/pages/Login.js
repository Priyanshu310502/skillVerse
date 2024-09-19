import React from 'react'
import { Template } from '../components/common/Template'
import LoginImage from '../assets/Images/login.webp'
export const Login = ({ setIsLoggedIn }) => {
  return (
    <Template
      title="Welcome Back
"
      desc1="Build skills for today, tomorrow, and beyond"
      desc2="Education to future-proof your career."
      image={LoginImage}
      formtype="login"
    // setIsLoggedIn={setIsLoggedIn}
    />)
}
