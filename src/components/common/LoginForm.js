import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { login } from '../../services/operation/authAPI';
import { useDispatch } from 'react-redux';


export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [FormData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showpassword, setShowPassword] = useState(false);

    function changeHandler(event) {
        setFormData({ ...FormData, [event.target.name]: event.target.value })
    }
    const { email, password } = FormData;

    const finalData = {
        ...FormData
    }
    function submitHandler(event) {
        event.preventDefault();
        console.log(finalData)
        navigate('/dashboard');
        // backend call
        if (!email || !password) {
            toast.error('Please fill all fields');
            return;
        }

        dispatch(login(email, password, navigate))
        setFormData(finalData)
    }
    return (
        <form onSubmit={submitHandler}>
            <label>
                <p className='text-white'>Email Address<sup className='text-red-600'>*</sup></p>
                <input className='w-full bg-slate-600 rounded-md h-[30px]'
                    type="text"
                    name="email"
                    value={FormData.email}
                    onChange={changeHandler}
                    placeholder='Enter your Email'
                />
            </label>
            <label>
                <p className='text-white'>Password<sup className='text-red-700'>*</sup></p>
                <input
                    className='w-full bg-slate-600 rounded-md h-[30px]'
                    type={showpassword ? ('password') : ('text')}
                    name="password"
                    value={FormData.password}
                    onChange={changeHandler}
                    placeholder='Enter your password'
                />
                <span className='flex -mt-5 mr-3 justify-end' onClick={() => setShowPassword(!showpassword)}>
                    {showpassword ?
                        <AiOutlineEyeInvisible /> :
                        <AiOutlineEye />}
                </span>
                <Link to='/forgotpassword' className='flex justify-end text-green-600'>
                    forgot password</Link>
            </label>
            <button className='bg-yellow-500 w-full mt-10 rounded-md'
                type='submit'>Login</button>
        </form>

    )
}
