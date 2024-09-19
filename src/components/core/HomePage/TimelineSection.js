import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'

import TimelineImage from '../../../assets/Images/TimelineImage.png'
export const TimelineSection = () => {
    const data = [
        {
            logo: logo1,
            Heading: "Leadership",
            Description: "Fully committed to the success company"
        },
        {
            logo: logo2,
            Heading: "Innovation",
            Description: "Leading in technological advancements"
        },
        {
            logo: logo3,
            Heading: "Growth",
            Description: "Building a strong and sustainable business"
        },
        {
            logo: logo4,
            Heading: "Leadership",
            Description: "Fully committed to the success company"
        },
    ]
    return (
        <div className='w-11/12 mx-auto flex flex-col items-center justify-between gap-7'>
            <div className='flex lg:flex-row sm:flex-col items-center w-full lg:mt-10 justify-between mb-[150px]'>
                <div className='flex flex-col lg:gap-20 lg:w-[50%] sm:w-full sm:gap-10 lg:translate-x-10 sm:translate-x-4'>
                    {
                        data.map((element, index) => {
                            return (
                                <div key={index} className='flex flex-row gap-6 items-start' >
                                    <div className='w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]'>
                                        <img src={element.logo} alt='logo1' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='font-semibold text-[18px]'>
                                            {element.Heading}
                                        </div>
                                        <div className='text-richblack-600 text-base'>
                                            {element.Description}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='relative lg:w-[50%] sm:w-full sm:mt-20 lg:mt-0 shadow-blue-200'>
                    <img src={TimelineImage} alt='TimeLineImage' className='object-cover h-fit' />

                    <div className='absolute lg:translate-x-12 sm:translate-x-9 lg:-translate-y-14 sm:-translate-y-7 bg-[#014A32]  lg:w-[82%] sm:w-[77%] flex lg:px-16 sm:px-3 lg:py-10 sm:py-3 lg:pr-8 justify-between items-center uppercase'>
                        <div className='flex items-center lg:gap-5 sm:gap-3 lg:w-[46%] sm:w-[48%] border-r-2 border-[#037856]'>
                            <p className='text-white font-bold lg:text-[30px] sm:text-[20px]'>10</p>
                            <p className='text-[#05A174] lg:text-[15px] sm:text-[10px]'>Years experience</p>
                        </div>
                        <div className='flex items-center gap-5 w-[45%]'>
                            <p className='text-white font-bold lg:text-[30px] sm:text-[20px]'>250</p>
                            <p className='text-[#05A174] lg:text-[15px] sm:text-[10px]'>types of courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
