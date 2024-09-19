// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import OTPInput from 'react-otp-input';
// import { Link, useNavigate } from 'react-router-dom';
// import { sendOTP, signUp } from '../services/operation/authAPI';




// export const VerifyEmail = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate();
//     const [otp, setotp] = useState("");

//     const { loading, signupData } = useSelector((state) => state.auth);

//     const {
//         accountType,
//         firstName,
//         lastName,
//         email,
//         password,
//         confirmPassword,
//     } = signupData;



//     useEffect(() => {
//         if (!signupData) {
//             navigate("/signup")
//         }
//     },[])


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(signUp(
//             accountType,
//             firstName,
//             lastName,
//             email,
//             password,
//             confirmPassword,
//             navigate,
//             otp
//         ))
//     }
//     return (
//         <div>
//             {
//                 loading ?
//                     (
//                         <div>
//                             Loading...
//                         </div>) :
//                     (
//                         <div>
//                             <h1>
//                                 Verify Your Email
//                             </h1>
//                             <p>
//                                 Please check your inbox for a verification link. If you don't receive it within a few minutes, please check your spam folder. If you continue to have trouble, please contact our support team.
//                             </p>
//                             <form onSubmit={handleSubmit}>
//                                 <OTPInput
//                                     value={otp}
//                                     onChange={setotp}
//                                     numInputs={6}
//                                     renderInput={
//                                         (props) => {
//                                             return (
//                                                 <input {...props} />
//                                             )
//                                         }
//                                     }
//                                     inputStyle="w-[20px] rounded-[8px] border-[1px] border-richblack-500 text-[3rem] text-center"
//                                     renderSeparator={<span>-</span>}
//                                     focusStyle="border-[5px] border-red-500"
//                                     isInputNum={true}
//                                     shouldAutoFocus={true}
//                                     containerStyle="flex justify-between gap-4"
//                                 />




//                                 <button type='submit'>
//                                     Verify OTP
//                                 </button>
//                             </form>
//                             <div>

//                                 <div>
//                                     <Link to={'/login'}>
//                                         <p>Back to Login</p>
//                                     </Link>
//                                 </div>

//                                 <div>
//                                     <button
//                                         onClick={() => dispatch(sendOTP(email, navigate))}>
//                                         Resend OTP
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//         </div>
//     )
// }







import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { sendOTP, signUp } from '../services/operation/authAPI';
import { toast } from 'react-hot-toast';  // Ensure toast is imported

export const VerifyEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");

    const { loading, signupData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [signupData, navigate]);  // Added dependency array

    const handleSubmit = (e) => {
        e.preventDefault();
        if (signupData) {
            const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;

            dispatch(signUp(
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                navigate,
                otp
            ));
        } else {
            toast.error("Sign up data is missing");
            navigate("/signup");
        }
    };

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>Verify Your Email</h1>
                    <p>
                        Please check your inbox for a verification link. If you don't receive it within a few minutes, please check your spam folder. If you continue to have trouble, please contact our support team.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => <input {...props} />}
                            inputStyle="w-[20px] rounded-[8px] border-[1px] border-richblack-500 text-[3rem] text-center"
                            renderSeparator={<span>-</span>}
                            focusStyle="border-[5px] border-red-500"
                            isInputNum={true}
                            shouldAutoFocus={true}
                            containerStyle="flex justify-between gap-4"
                        />
                        <button type='submit'>Verify OTP</button>
                    </form>
                    <div>
                        <div>
                            <Link to={'/login'}>
                                <p>Back to Login</p>
                            </Link>
                        </div>
                        <div>
                            <button onClick={() => dispatch(sendOTP(signupData.email, navigate))}>
                                Resend OTP
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
