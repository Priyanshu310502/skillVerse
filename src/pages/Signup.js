import React from 'react'
import { Template } from '../components/common/Template'
import Signupimage from '../assets/Images/signup.webp'
import { useSelector } from 'react-redux'
export const Signup = () => {

  const { loading } = useSelector(state => state.auth)
  return (
    <div>
      {
        loading ? (
          <div className="text-center" > Loading...</div>
        ) :
          (
            <Template
              title="Join the millions learning to code with StudyNotion for free"
              desc1="Build skills for today, tomorrow, and beyond."
              desc2="Education to future-proof your career."
              image={Signupimage}
              formtype="signup"
            />)
      }
    </div>

  )
}