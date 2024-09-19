import React from 'react'
import InstructorImage from '../../../assets/Images/Instructor.png'
import { HighlightText } from './HighlightText'
import CTAButton from '../../../components/core/HomePage/Button.js'
import { FaArrowRight } from 'react-icons/fa'
export const Instructor = () => {
    return (
        <div className='lg:mt-20 sm:mt-16 mb-20 flex items-center justify-between'>
            <div className='flex sm:flex-col lg:flex-row mt-5 gap-20'>
                <div className='lg:w-[48%] sm:w-full'>
                    <img src={InstructorImage} alt='Instructor' />
                </div>


                <div className='flex flex-col  justify-center gap-10 lg:w-[50%] sm:w-full'>

                    <div className='text-4xl flex flex-col font-semibold items-start '>
                        <div className='text-white'>
                            Become an{" "}

                        </div>
                        <div className='flex '>
                            <HighlightText text={"instructor"} />
                        </div>
                    </div>



                    <div className='text-richblack-400 w-[80%] items-start'>
                        <p>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                    </div>
                    <div className='items-start w-fit'>
                        <CTAButton
                            active={true}
                            linkto={'signup'}
                        >
                            <div className='flex items-center gap-4'>
                                Start Teaching Today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}
