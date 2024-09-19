import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operation/authAPI';

export const ForgotPassword = () => {
    const { loading } = useSelector((state) => state.auth);
    const [email, setEmail] = React.useState('');
    const [emailsent, setemailsent] = useState(false);

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(getPasswordResetToken(email, setemailsent))
    }
    return (
        <div>

            {loading ? (<p>Loading</p>) : (
                <div>
                    <h1>
                        {!emailsent ? "Reset your password" : "Check your email"}
                    </h1>

                    <p>
                        {!emailsent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sen a reset email to you ${email}`}
                    </p>

                    <form onSubmit={handleSubmit}>
                        {
                            !emailsent && (
                                <label>
                                    <p>Enter your Email</p>
                                    <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        placeholder='Email'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                            )
                        }
                        <button type='submit'>
                            {!emailsent ? "Reset Password" : "Reset Email"}
                        </button>
                    </form>

                    <div>
                        <Link to={'/login'}>
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )}


        </div>
    )
}
