import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import { HighlightText } from './HighlightText'
import { Cards } from './Cards'
export const ExploreMore = () => {
    const tabsName = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths",
        // "premium",
        // "instructor-led",
        // "online-courses",
        // "coding-challenges",
        // "webinars",
    ]

    const [currentTab, setcurrentTab] = useState(tabsName[0])
    const [courses, setcourse] = useState(HomePageExplore[0].courses)
    const [currentcard, setcurrentcard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCard = (value) => {
        setcurrentTab(value);
        const result = HomePageExplore.filter((element) => {
            return element.tag === value
        });
        setcourse(result[0].courses);
        setcurrentcard(result[0].courses[0].heading);
    }
    return (
        <div className='flex flex-col items-center gap-3'>

            <div className='flex items-center text-4xl font-semibold'>
                Unlock the{' '}
                <HighlightText text={"Power of Code"} />
            </div>

            <div className='flex items-center text-richblack-200 text-[18px]'>
                Learn to Build Anything You Can Imagine
            </div>



            <div className='flex flex-row gap-3 bg-richblack-800 items-center font-semibold border-richblack-100 mt-5 px-2 py-1 mb-5 rounded-full text-[16px]'>
                {
                    tabsName.map((element, index) => {
                        return (
                            <div key={index} className={`flex flex-row items-center gap-2 ${currentTab === element ? "bg-richblack-900 text-white font-medium" : "text-richblack-200"} rounded-full hover:bg-richblack-900 hover:text-richblack-5 transition-all cursor-pointer duration-200 px-7 py-3`}
                                onClick={(element) => { setMyCard(element) }}
                            >
                                {element}
                            </div>
                        )
                    })
                }
            </div>
            <div className='h-[150px]'></div>

            <div className='flex flex-row items-center absolute gap-2 justify-between w-full '>
                {/* {
                    courses.map((element, index) => {
                        return (
                            <div>
                                <Cards
                                    key={index}
                                    cardData={element}
                                    currentTab={currentTab}
                                    setcurrentcard={setcurrentcard}
                                />
                            </div>
                        )
                    })
                } */}
            </div>
        </div>
    )
}
