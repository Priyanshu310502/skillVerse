import React from 'react'
import { useSelector } from 'react-redux'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
import * as Icons from 'react-icons'

export const SidebarLinks = ({ link, iconName }) => {
    const { user, loading: profileloading } = useSelector(state => state.profile)
    const { loading: authloading } = useSelector(state => state.auth)

    const location = useLocation()

    // Access the icon component dynamically using the icon name
    const Icon = Icons[iconName]

    if (profileloading || authloading) {
        return (<div>Loading...</div>)
    }

    function matchRoute(Route) {
        return matchPath({ path: Route }, location.pathname) // Fixing 'pathName' to 'pathname'
    }

    return (
        <NavLink
            to={link.path}
            className={`relative px-9 py-2 text-sm font-medium ${matchRoute(link.path) ? " bg-yellow-800" : " bg-opacity-0"}`
            }
        >
            <div className="flex flex-col items-center gap-2">
                <span className={` absolute  left-0 top-0 h-full w-[0.2rem] bg-yellow-50 
                ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}
                `}>
                </span>
                {/* Render the icon if it exists */}
                {Icon && <Icon />}
                <span>{link.name}</span>

            </div>

        </NavLink>
    )
}
