import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ children, active, linkto }) => {
    return (
        <div>
            <Link to={linkto}>
                <div className={`text-2xl text-center text-[15px] py-2 px-5 border-r-2 border-b-2 border-[#2E353E] rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
                    ${active ? "bg-[#FFD60A] text-richblack-700 font-extrabold" : "bg-richblack-800"} hover:scale-95 transition-all duration-200`} >
                    {children}
                </div>
            </Link>
        </div>
    )
}

export default Button;

