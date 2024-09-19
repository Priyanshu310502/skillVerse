import React from 'react'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'

export const Footer = () => {
    return (
        <div>
            {/* Footer Part */}
            <footer className="bg-[#161D29] text-richblack-400">
                <div className="w-11/12 max-w-maxContent mx-auto lg:px-4 sm:px-1 py-11 flex flex-col">
                    <div className="flex sm:flex-col lg:flex-row lg:flex-wrap">
                        <div className='lg:w-[50%] sm:full flex sm:space-x-10 lg:space-0 justify-evenly lg:border-r border-[#2C333F]'>
                            {/* Company Section */}
                            <div className="flex-1 mb-8 lg:mb-0">
                                {/* <h3 className="text-white text-xl font-bold mb-4">StudyNotion</h3> */}
                                <img src={Logo} className='lg:w-[150px] sm:w-[100px]' alt='Logo' />
                                <ul>
                                    <li className='text-richblack-50 font-semibold lg:text-[16px] sm:text-[14px]'>Company</li>
                                    <li>About</li>
                                    <li>Careers</li>
                                    <li>Affiliates</li>
                                </ul>
                                <div className="flex lg:space-x-4 sm:space-x-1 mt-4">
                                    <Link to="#"><FaFacebook /></Link>
                                    <Link to="#"><FaGoogle /></Link>
                                    <Link to="#"><FaTwitter /></Link>
                                    <Link to="#"><FaYoutube /></Link>
                                </div>
                            </div>

                            {/* Resources Section */}
                            <div className="flex-1 mb-8 lg:mb-0">
                                <h3 className="text-richblack-50 font-semibold lg:text-[16px] sm:text-[14px]">Resources</h3>
                                <ul>
                                    <li>Articles</li>
                                    <li>Blog</li>
                                    <li>Chart Sheet</li>
                                    <li>Code Challenges</li>
                                    <li>Docs</li>
                                    <li>Projects</li>
                                    <li>Videos</li>
                                    <li>Workspaces</li>
                                </ul>
                                {/* Support Section */}
                                <h3 className="text-richblack-50 font-semibold lg:text-[16px] sm:text-[14px] mt-8">Support</h3>
                                <ul>
                                    <li>Help Center</li>

                                </ul>
                            </div>

                            {/* Plans Section */}
                            <div className="flex-1 mb-8 lg:mb-0 sm:-mr-6 lg:mr-0">
                                <h3 className="text-richblack-50 font-semibold lg:text-[16px] sm:text-[14px]">Plans</h3>
                                <ul>
                                    <li>Paid Memberships</li>
                                    <li>For Students</li>
                                    <li>Business Solutions</li>
                                </ul>
                                {/* Community Section */}
                                <h3 className="text-richblack-50 font-semibold lg:text-[16px] sm:text-[14px] mt-8">Community</h3>
                                <ul>
                                    <li>Forums</li>
                                    <li>Chapters</li>
                                    <li>Events</li>
                                </ul>
                            </div>
                        </div>


                        <div className='lg:w-[50%] sm:w-full flex justify-evenly lg:space-x-9 sm:space-x-10 lg:pl-5'>
                            {/* Subjects Section */}
                            <div className="flex-1 mb-8 lg:mb-0">
                                <h3 className="text-richblack-50 font-semibold lg:text-[16px] sm:text-[14px]">Subjects</h3>
                                <ul>
                                    <li>AI</li>
                                    <li>Cloud Computing</li>
                                    <li>Code Foundations</li>
                                    <li>Computer Science</li>
                                    <li>Cybersecurity</li>
                                    <li>Data Analytics</li>
                                    <li>Data Science</li>
                                    <li>Data Visualization</li>
                                    <li>Developer Tools</li>
                                    <li>DevOps</li>
                                    <li>Game Development</li>
                                    <li>IT</li>
                                    <li>Machine Learning</li>
                                    <li>Math</li>
                                    <li>Mobile Development</li>
                                    <li>Web Design</li>
                                    <li>Web Development</li>
                                </ul>
                            </div>

                            {/* Languages Section */}
                            <div className="flex-1 mb-8 lg:mb-0">
                                <h3 className="text-richblack-50 font-semibold lg:text-[16px] sm:text-[14px]">Languages</h3>
                                <ul>
                                    <li>Bash</li>
                                    <li>C++</li>
                                    <li>C#</li>
                                    <li>Go</li>
                                    <li>HTML & CSS</li>
                                    <li>Java</li>
                                    <li>JavaScript</li>
                                    <li>Kotlin</li>
                                    <li>PHP</li>
                                    <li>Python</li>
                                    <li>R</li>
                                    <li>Ruby</li>
                                    <li>SQL</li>
                                    <li>Swift</li>
                                </ul>
                            </div>

                            {/* Career Building Section */}
                            <div className="flex-1 mb-8 lg:mb-0">
                                <h3 className="text-richblack-50 font-semibold lg:text-[16px] sm:text-[14px]">Career Building</h3>
                                <ul>
                                    <li>Career Paths</li>
                                    <li>Career Services</li>
                                    <li>Interview Prep</li>
                                    <li>Professional Certification</li>
                                    <li>Full Catalog</li>
                                    <li>Beta Content</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Footer Bottom */}
                    <div className="mt-5 flex lg:flex-row sm:flex-col sm:gap-4 lg:gap-0 items-center justify-between border-t pt-12 border-richblack-700
                    ">
                        <div className="text-sm text-gray-500 flex">
                            <ul className='flex gap-5'>
                                <li>Privacy Policy</li>
                                <li className='border-r border-l px-4'>Cookie Policy</li>
                                <li>Terms</li>
                            </ul>

                        </div>
                        <div className="text-sm text-gray-500">
                            <p>
                                Made with <span className="text-red-500">❤️</span> by Priyanshu &copy; 2023 StudyNotion
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
