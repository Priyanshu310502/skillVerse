import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { HighlightText } from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4'
import { CodeBlocks } from '../components/core/HomePage/CodeBlocks';
import { TimelineSection } from '../components/core/HomePage/TimelineSection';
import { LearningLanguage } from '../components/core/HomePage/LearningLanguage';
import { Instructor } from '../components/core/HomePage/Instructor';
import { ExploreMore } from '../components/core/HomePage/ExploreMore';
import { Footer } from '../components/common/Footer';

export const Home = () => {
    return (

        <div>
            {/* Section 1 */}
            <div
                className='mx-auto relative flex flex-col w-11/12 items-center justify-between text-white'>

                <Link to='signUp'>
                    <div
                        className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold transition-all duration-200 hover:border border-richblue-300 hover:scale-95 w-fit max-w-maxContent'>
                        <div
                            className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                            <p >
                                Become a Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link >

                <div
                    className='flex gap-2 mt-7 text-center sm:flex-col lg:flex-row text-4xl font-semibold'>
                    <p>Empower your Future with</p>
                    <HighlightText text={"Coding Skills"} />
                </div>
                <div
                    className='mt-7 w-[70%] text-center font-bold md:text-lg text-richblack-300' >
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>
                <div
                    className='flex gap-7 mt-7 ' >
                    <CTAButton active={true}>
                        <div className='text-richblack-900 font-extrabold'>
                            Learn More
                        </div>
                    </CTAButton>

                    <CTAButton active={false}>
                        Book a Demo
                    </CTAButton>
                </div>

                {/* Video Part */}
                <div
                    className='my-12 mx-auto'>
                    <video
                        muted
                        loop
                        autoPlay >
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/* Code Section 1 */}
                <div className='w-full my-16'>
                    <CodeBlocks
                        position={'flex lg:flex-row sm:flex-col'}
                        heading={
                            <div className='text-4xl sm:flex-col font-semmibold'>
                                Unlock your{" "}
                                <HighlightText text={"coding potential"} />
                                {" "}with our online courses.
                            </div>}
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={
                            {
                                btnText: "Try it Yourself",
                                active: true,
                                linkto: '/signup'
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                active: false,
                                linkto: '/login'
                            }
                        }
                        backgroudGradient={'grad'}

                        codeblock={
                            `<!DOCTYPE html>
<html lang="en">
<head>
    <title>This is myPage</title>
</head>
<body>
    <h1><a href="/">Header</a></h1>
    <nav>
        <a href="/one">One</a><a href="/two">Two</a>
        <a href="/three">Three</a></nav>
</body></html>`
                        }
                    // codeColor={
                    //     {
                    //         color: '#F6CA35',
                    //         text: 'rgb(246,202,53)'
                    //     }
                    // }
                    />
                </div>

                {/* Code Section 2 */}
                <div className='my-16 w-full'>
                    <CodeBlocks
                        position={'flex lg:flex-row-reverse sm:flex-col'}
                        heading={
                            <div className='text-4xl font-semmibold'>
                                Start{" "}
                                <HighlightText text={"coding in seconds"} />
                            </div>}

                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.."}
                        ctabtn1={
                            {
                                btnText: "Continue Lesson",
                                active: true,
                                linkto: '/signup'
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                active: false,
                                linkto: '/login'
                            }
                        }


                        codeblock={
                            `<!DOCTYPE html>
<html lang="en">
<head>
    <title>This is myPage</title>
</head>
<body>
    <h1><a href="/">Header</a></h1>
    <nav>
        <a href="/one">One</a><a href="/two">Two</a>
        <a href="/three">Three</a></nav>
</body></html>`
                        }
                        codeColor={
                            {
                                color: '#4776E6',
                                text: 'rgb(71, 118, 230)'
                            }
                        }
                        backgroudGradient={'grad2'}
                    />
                </div>

                {/* Cards */}
                <ExploreMore />
            </div >

            {/* Section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='backurl_bg h-[310px]'>
                    <div className='w-11/12 max-w-maxContent flex items-center gap-5 mx-auto flex-col justify-between'>
                        <div className='h-[150px]'></div>
                        <div className='flex gap-7 text-white items-center mx-auto '>
                            {/* 1 button */}
                            <CTAButton
                                active={true}
                                linkto={'signup'}>
                                <div className='flex items-center text-richblack-900 font-extrabold gap-2'>
                                    Explore Full Catlog
                                    <FaArrowRight />
                                </div>
                            </CTAButton >

                            {/* 2 button */}
                            <CTAButton
                                active={false}
                                linkto={'signup'}
                            >
                                <div className='flex items-center gap-2'>
                                    Learn More
                                </div>
                            </CTAButton >

                        </div>
                    </div>
                </div>





                {/* Section 2 -> demand-coure */}
                <div className='w-11/12 mx-auto flex flex-col items-center justify-between gap-7'>
                    <div className='w-[100%] h-fit flex sm:flex-col lg:flex-row items-center mb-12 mt-[95px] gap-[10%] justify-between'>
                        <div className='lg:w-[50%] sm:w-full font-semibold text-[39px]'>
                            Get the skills you need for a{" "}
                            <HighlightText text={"job that is in demand."} />
                        </div>
                        <div className='flex lg:w-[40%] sm:w-full flex-col text-[17px] lg:gap-10 sm:my-8'>
                            <div className=''>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                            <div className='w-fit sm:mt-8 lg:mt-0' >
                                <CTAButton
                                    active={true}
                                    linkto={'signup'}>

                                    Learn More
                                </CTAButton >

                            </div>
                        </div>
                    </div>
                    <div>

                    </div>

                </div>



                {/* Section 2 -> TimeLine Section*/}

                <TimelineSection />

                {/* Learning Language */}
                <LearningLanguage />

            </div>


            {/* Section 3 */}
            <div className='w-11/12 mx-auto flex flex-col items-center justify-between gap-7'>
                <Instructor />


            </div>
            
            {/* Footer */}
            <Footer />


        </div>


    )
}
