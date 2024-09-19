import React from 'react'
import { SideBar } from '../components/DashboardPage/SideBar'
import {Outlet} from 'react-router-dom'


export const Dashboard = () => {
  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem]'>
      <SideBar />
      <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full'>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
