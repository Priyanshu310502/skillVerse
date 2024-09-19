import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { resetpassword } from '../services/operation/authAPI'
import { Link, useLocation } from 'react-router-dom'

export const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const { loading } = useSelector((state) => state.auth)
    const [formData, setformData] = useState({
        password: '',
        confirmPassword: '',
    })
    const { password, confirmPassword } = formData;
    const [showpassword, setShowpassword] = useState(false);
    const [confirmshowpassword, setShowconfirmpassword] = useState(false);


    const inputHandler = (e) => {
        setformData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1)
        dispatch(resetpassword(password, confirmPassword, token))
    }

    return (
        <div>

            {loading ? (<div>Loading...</div>) : (
                <div>
                    <h1>
                        Choose new Password
                    </h1>
                    <p>
                        Enter a new password for your account.
                    </p>

                    <form onSubmit={SubmitHandler}>
                        <label>
                            <p>New Password</p>
                            <input
                                type={showpassword ? "text" : "password"}
                                name="password"
                                placeholder='New Password'
                                value={password}
                                onChange={inputHandler}
                                required />
                            <span
                                onClick={setShowpassword((prev) => !prev)}
                            >
                                {showpassword ? (
                                    <AiFillEyeInvisible />
                                ) : (
                                    <AiFillEye />
                                )}
                            </span>
                        </label>

                        <label>
                            <p>confirm New Password</p>
                            <input
                                type={confirmshowpassword ? "text" : "password"}
                                name="confirmpassword"
                                placeholder='Confirm New Password'
                                value={confirmPassword}
                                onChange={inputHandler}
                                required />

                            <span
                                onClick={setShowconfirmpassword((prev) => !prev)}>
                                {confirmshowpassword ? (
                                    <AiFillEyeInvisible />
                                ) : (
                                    <AiFillEye />
                                )}
                            </span>
                        </label>
                    </form>
                    
                    <div>
                        <Link to={'/login'}>
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )
            }
        </div >
    )
}
