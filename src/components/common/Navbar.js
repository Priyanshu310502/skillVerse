import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ProfileDropdown } from '../core/Auth/ProfileDropdown'
import { apiConnector } from '../../services/ApiConnector'
import { categories } from '../../services/Api'
import { IoIosArrowDropdown } from "react-icons/io";
import { ACCOUNT_TYPE } from '../../utils/constants'

export const Navbar = () => {
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath(
            { path: route }, location?.pathname
        )
    }


    //? reducers=======
    const { token } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.profile)
    const { totalItems } = useSelector(state => state.cart)

    // const [sublinks, setSublinks] = useState([])
    // useEffect(() => {
    //     const fetchApi = async () => {
    //         try {
    //             const result = await apiConnector('GET', categories.CATEGORIES_URL);
    //             setSublinks(result.data)
    //         } catch (error) {
    //             console.log('error:', error)
    //         }
    //     }

    //     fetchApi()
    // }, [])

    const sublinks = [
        {
            path: "/",
            title: "Python"
        },
        {
            path: "/",
            title: "Data Science"
        },
        {
            path: "/",
            title: "AI/ML"
        },
        {
            path: "/",
            title: "Web Development"
        },
        {
            path: "/",
            title: "Android Development"
        },
        {
            path: "/",
            title: "Linux"
        }
    ]

    return (
        <div className='h-14 relative flex items-center border-b-2 border-richblack-500 justify-between'>
            <div className='w-11/12 relative flex mx-auto  max-w-maxContent flex-row item-center sm:w- justify-between' >
                {/* logo */}
                <div className='flex '>
                    <Link to={'/'}>
                        <img src={Logo} width={'160px'} height={'42px'} loading='lazy' alt='logo' />
                    </Link>
                </div>

                {/* nav Items */}
                <nav>
                    <ul className='flex items-center gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index} className=''>
                                    {
                                        link.title === 'Catalog' ? (
                                            <div className='flex gap-2 group relative items-center'>
                                                <p>{link.title}</p>
                                                <IoIosArrowDropdown className='text-[18px] ' />

                                                <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"

                                                >

                                                    <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 bg-richblack-5 rounded translate-x-[80%] translate-y-[-50%]'></div>
                                                    {/* Catelog dropdown */}
                                                    {
                                                        sublinks.map((sublink, index) => {
                                                            return (
                                                                <Link key={index} to={`${sublink.path}`}>
                                                                    <p className='text-richblack-900 border-2 border-richblack-900 px-4 py-3 rounded-full m-1' >
                                                                        {sublink.title}
                                                                    </p>
                                                                </Link>
                                                            )

                                                        })
                                                    }
                                                </div>

                                            </div>
                                        ) : (
                                            <Link to={link.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* login signup dashboard */}
                <div className='flex items-center gap-x-4'>

                    {/* cart show or not */}
                    {
                        user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                            <Link to={`/dashboard/cart`}>
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }

                    {/* login Button Show or not */}
                    {
                        token === null && (
                            <Link to={'/login'}>
                                <button className='border border-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-full'>
                                    Login
                                </button>
                            </Link>
                        )
                    }

                    {/* SignUp  Button show or not */}
                    {
                        token === null && (
                            <Link to={'/signup'}>
                                <button className='border border-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-full'>
                                    SignUp
                                </button>                            </Link>
                        )
                    }

                    {/* Dashboard show or not */}
                    {
                        token !== null && (
                            <Link to={'/dashboard/my-profile'}>
                                <ProfileDropdown />
                            </Link>
                        )
                    }
                </div>
            </div>

        </div>
    )
}
