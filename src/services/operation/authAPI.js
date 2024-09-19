import Cookies from "js-cookie";
import { setToken } from "../../slices/AuthSlices"
import { setUser } from "../../slices/ProfileSlice"
import { endpoints } from "../Api"
import { apiConnector } from "../ApiConnector"
import { toast } from 'react-hot-toast'
const { setLoading } = '../../slices/AuthSlices.js'


export const sendOTP = (email, navigate) => {
    return async (dispatch) => {
        // dispatch(setLoading(true));
        const toastId = toast.loading("loading...")
        try {
            const response = await apiConnector("POST", endpoints.SENDOTP_API, { email })
            console.log("response fron otp ,", response)
            if (!response.data.success) {
                throw new Error("error somthing")
            }
            toast.success("Verification code has been sent to your email. Please check your inbox.")

            navigate('/verify-emails')
        } catch (error) {
            toast.error("Error sending OTP")
            console.error("error of otp", error?.response?.data?.message);
        }
        toast.dismiss(toastId)
        // dispatch(setLoading(false))
    }
}





export const signUp = (firstName, lastName, email, password, confirmPassword, accountType, navigate, otp) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector('POST', endpoints.SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp
            });
            console.log("response from sign up:", response);
            if (!response.data.success) {
                throw new Error("Error: Something went wrong.");
            }
            toast.success("Account created successfully. Please verify your email.");
            navigate("/login");
        } catch (error) {
            toast.error("Error signing up");
            console.error("1 wala", error.message);
            console.error("kuch", error?.response?.data?.message);
            navigate("/signup");
        }
        toast.dismiss(toastId);
    };
}

export const login = (email, password, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("POST", endpoints.LOGIN_API, { email, password });
            console.log("response from login:", response);
            if (!response.data.success) {
                throw new Error("Error: Invalid email or password.");
            }
            toast.success(
                "Logged in successfully. Welcome back!"
            );
            const token = response.data.data.token;
            const user = response.data.data.user;
            dispatch(setToken(token));

            const userImage = user?.image
                ? user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`

            dispatch(setUser({ ...user, image: userImage }))
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", JSON.stringify(token))
            navigate("/dashboard/my-profile")

        } catch (error) {
            toast.error("Error logging in");
            console.error(error.message);
            console.error(error?.response?.data?.message);

        }
        toast.dismiss(toastId);
    }
}






export function logout(navigate) {
    return (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            dispatch(setToken(null))
            dispatch(setUser(null))
            // dispatch(resetCart())
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            toast.success("Logged Out")
            navigate("/")
        } catch (error) {
            console.error("Error in logout:", error.message);
            toast.error("Error logging out")

        }
        toast.dismiss(toastId)

    }
}


export const getPasswordResetToken = (email, setemailsent) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")

        // dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", endpoints.RESETPASSTOKEN_API, { email })
            console.log("response fron reset token ,", response)

            if (!response.data.success) {
                throw new Error("error somthing")
            }
            toast.success(
                "Password reset token has been sent to your email. Please check your inbox."
            )
            setemailsent(true);
        } catch (error) {
            toast.error(error.message)
            console.error(error);

        }
        toast.dismiss(toastId)
        // dispatch(setLoading(false))
    }
}

export const resetpassword = (password, confirmpassword, token) => {
    return async (dispatch) => {
        // dispatch(setLoading(true));
        const toastId = toast.loading("loading...")
        try {
            const response = apiConnector('POST', endpoints.SIGNUP_API, { password, confirmpassword, token });

            console.log("response", response);

            if (!response.data.success) {
                throw new Error("error somthing")
            }
            toast.success("Password reset successful. You can now log in.")


        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
        // dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}