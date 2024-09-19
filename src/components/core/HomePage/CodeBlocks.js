import React from 'react'
import CTAbutton from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation';

export const CodeBlocks = ({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroudGradient, codeColor }) => {
    return (
        <div className={`flex ${position} my-70 justify-between gap-18`}>
            {/* section 1 -> block 1 */}
            <div className='flex flex-col lg:w-[50%] sm:w-full gap-6 font-semibold'>
                {heading}
                <div className='text-richblack-300 font-bold w-[84%]'>
                    {subheading}
                </div>

                <div className='flex gap-7 mt-7 sm:mb-10 lg:mb-0'>
                    <CTAbutton
                        active={ctabtn1.active}
                        linkto={ctabtn1.linkto} >
                        <div className='flex gap-2 items-center text-richblack-900 font-extrabold'>
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAbutton>

                    <CTAbutton
                        active={ctabtn2.active} linkto={ctabtn2.linkto} >
                        {ctabtn2.btnText}
                    </CTAbutton>
                </div>

            </div>

            {/* section 1 block 2 */}
            <div className='h-fit relative flex flex-row lg:text-[15px] sm:text-[10px] border border-[#635d60] lg:w-[40%] sm:w-full py-3 '>

                <div className={`w-[10%] relative z-10 flex flex-col font-bold text-richblack-400 font-inter text-center`}>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col font-bold gap-2 font-mono lg:text-yellow-25 sm:text-white`}>
                    <div className={`${backgroudGradient} rounded-full`}></div>
                    <TypeAnimation
                        sequence={[codeblock, 1000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={{
                            display: 'block',
                            whiteSpace: "pre-line",
                        }}
                        gradient={backgroudGradient}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div >
    )
}
