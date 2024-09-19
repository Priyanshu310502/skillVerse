import React from 'react'
import frame from '../../assets/Images/frame.png'
import { SignupForm } from './SignupForm'
import { LoginForm } from './LoginForm'
export const Template = ({ title, desc1, desc2, image, formtype, setIsLoggedIn }) => {
    return (
        <div className='flex flex-row justify-center h-[94vh] w-[100vw] bg-[#0F1128]'>
            <div className=' mt-10 mr-[10rem]'>
                <h1 className='text-white font-bold text-3xl' >{title}</h1>
                <p >
                    <span className='text-white '>{desc1}<br /></span>
                    <span className='text-green-400'>{desc2}</span>
                </p>

                {formtype === 'signup' ?
                    (<SignupForm setIsLoggedIn={setIsLoggedIn} />) :
                    (<LoginForm setIsLoggedIn={setIsLoggedIn} />)}

                <div className='flex mt-7 gap-1'>
                    <div className='bg-black h-1 w-[50%]'></div>
                    <span className='-mt-3'>Or</span>
                    <div className='bg-black h-1 w-[50%]'></div>
                </div>
                <button className='w-full mt-8 text-white border'>
                    Sign in with google
                </button>
            </div>

            <div className='relative w-96 h-96 mt-10'>
                <img className='absolute top-0 left-0 w-full h-full object-cover '
                    src={frame} alt='frame' width={450} height={150} />
                <img className='absolute bottom-0 left-0 top-0 w-[90%] h-[90%] object-cover'
                    src={image} alt='pattern' width={440} height={140} />
            </div>
        </div>
    )
}
