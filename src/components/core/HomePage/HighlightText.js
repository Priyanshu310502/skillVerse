import React from 'react'

export const HighlightText = ({ text }) => {
    return (
        <span className='font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#15BFF2] to-[#60EDE2] '>
{/* bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-teal-600 */}
            {text}
        </span>
    )
}
