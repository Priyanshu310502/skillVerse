import React from 'react'
import { HighlightText } from './HighlightText'
import know from '../../../assets/Images/Know_your_progress.png';
import plan from '../../../assets/Images/Plan_your_lessons.png';
import compare from '../../../assets/Images/Compare_with_others.png';
import CTAbutton from '../../../components/core/HomePage/Button'
export const LearningLanguage = () => {
    return (
        <div className='lg:w-11/12 mx-auto flex flex-col items-center justify-between gap-7'>
            <div className='flex flex-col gap-4 items-center' >
                <div className='text-4xl sm:px-7 text-center lg:px-0 font-semibold'>
                    Your swiss knife for <HighlightText text={"learning any language"} />
                </div>

                <div className='w-[80%] text-[18px] text-center'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
            </div>
            <div className='flex gap-5 sm:flex-col lg:flex-row relative items-center justify-center'>

                <img src={know} alt='know'
                    className='object-contain lg:-mr-32' />

                <img src={compare} alt='know' className='object-contain sm:-mt-20 lg:mt-0' />

                <img src={plan} alt='know'
                    className='object-contain lg:-ml-36 sm:-mt-24 lg:mt-0 ' />

            </div>
            <div className='lg:mb-20 sm:mb-16'>
                <CTAbutton
                    active={true}
                    linkto={'signup'}
                >
                    Learn More
                </CTAbutton>

            </div>
        </div>
    )
}
