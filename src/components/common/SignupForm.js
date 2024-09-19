import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { ACCOUNT_TYPE } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../../slices/AuthSlices';
import { sendOTP } from '../../services/operation/authAPI';
import Tab from './Tab';

export const SignupForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [FormData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showpassword, setShowPassword] = useState(false);
    const [showpasswordConfirm, setShowpasswordConfirm] = useState(false);
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)


    function changeHandler(event) {
        setFormData({ ...FormData, [event.target.name]: event.target.value })
    }

    function submitHandler(event) {
        event.preventDefault();

        if (!FormData.firstName || !FormData.lastName || !FormData.email || !FormData.password || !FormData.confirmPassword) {
            toast.error("All fields are required")
            return;
        }
        if (FormData.password.length < 4) {
            toast.error("Password should be at least 4 characters long")
            return;
        }

        if (FormData.password !== FormData.confirmPassword) {
            toast.error("Passwords do not match")
            return;
        }
        const signupData = {
            ...FormData,
            accountType
        }
        console.log("signup data", signupData)

        dispatch(setSignupData(signupData));

        dispatch(sendOTP(FormData.email, navigate))

        // Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)


    }

    // data to pass to Tab component
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]
    return (

        <div>
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />

            <form
                onSubmit={submitHandler} >

                <div className='flex h-[3rem] w-full gap-6 bg-slate-600 rounded-lg mt-5 mb-5 justify-evenly'>

                    {/* <button
                        onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}
                        className={accountType === ACCOUNT_TYPE.STUDENT ? 'bg-[#333333] rounded-lg text-white' : 'bg-transparent text-black py-2 px-5 rounded-full transition-all duration-200'}>
                        Student
                    </button>
                    <button
                        onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}
                        className={accountType === ACCOUNT_TYPE.INSTRUCTOR ? 'bg-[#333333] rounded-lg text-white' : 'bg-transparent text-black py-2 px-5 rounded-full transition-all duration-200'}>
                        Instructor
                    </button> */}
                </div>

                <div>
                    <label>
                        <p className='text-white'>First Name<sup className='text-red-700'>*</sup></p>
                        <input
                            className='w-full bg-slate-600 rounded-md h-[30px]'
                            required
                            type="text"
                            name="firstName"
                            value={FormData.firstName}
                            onChange={changeHandler}
                            placeholder='Enter firstName'
                        />
                    </label>
                    <label>
                        <p className='text-white'>Last Name<sup className='text-red-700'>*</sup></p>
                        <input
                            className='w-full bg-slate-600 rounded-md h-[30px]'
                            required
                            type="text"
                            name="lastName"
                            value={FormData.lastName}
                            onChange={changeHandler}
                            placeholder='Enter lastName'
                        />
                    </label>
                </div>
                <label>
                    <p className='text-white'>Email Address<sup className='text-red-700'>*</sup></p>
                    <input
                        className='w-full bg-slate-600 rounded-md h-[30px]'
                        required
                        type="email"
                        name="email"
                        value={FormData.email}
                        onChange={changeHandler}
                        placeholder='Enter your Email'
                    />
                </label>
                <div>
                    <label>
                        <p className='text-white'>Password<sup className='text-red-700'>*</sup></p>
                        <input
                            className='w-full bg-slate-600 rounded-md h-[30px]'
                            required
                            type={showpassword ? 'text' : 'password'}
                            name="password"
                            value={FormData.password}
                            onChange={changeHandler}
                            placeholder='Enter your password'
                        />
                        <span className='flex -mt-5 mr-3 justify-end' onClick={() => setShowPassword((prev) => !prev)}>
                            {showpassword ?
                                <AiOutlineEyeInvisible /> :
                                <AiOutlineEye />}
                        </span>
                    </label>

                    <label>
                        <p className='text-white'>Confirm Password<sup className='text-red-700'>*</sup></p>
                        <input
                            className='w-full bg-slate-600 rounded-md h-[30px]'
                            required
                            type={showpasswordConfirm ? 'text' : 'password'}
                            name="confirmPassword"
                            value={FormData.confirmPassword}
                            onChange={changeHandler}
                            placeholder='Enter confirm password'
                        />
                        <span className='flex -mt-5 mr-3 justify-end' onClick={() => setShowpasswordConfirm((prev) => !prev)}>
                            {showpasswordConfirm ?
                                <AiOutlineEyeInvisible /> :
                                <AiOutlineEye />}
                        </span>
                    </label>
                </div>
                <button className='bg-yellow-500 w-full mt-10 rounded-md'
                    type='submit'
                >
                    Create Account
                </button>
            </form >
        </div>
    )
}
