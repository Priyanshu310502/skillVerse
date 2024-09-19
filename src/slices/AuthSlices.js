import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload;
            console.log("Slice from SignupData",value.payload)

        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload
            console.log("Slice from token",value.payload)

        }
    }
});

export const { setToken, setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;





//. with cookie========================================================================================
// import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

// const initialState = {
//     token: localStorage.getItem("token")
//         ? JSON.parse(localStorage.getItem("token"))
//         : Cookies.get("token") // fallback to cookie if localStorage doesn't have it
//             ? Cookies.get("token")
//             : null,
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState: initialState,
//     reducers: {
//         setSignupData(state, value) {
//             state.signupData = value.payload;
//         },
//         setLoading(state, value) {
//             state.loading = value.payload;
//         },
//         setToken(state, action) {
//             state.token = action.payload;
//             // Store token in localStorage
//             localStorage.setItem("token", JSON.stringify(action.payload));
//             // Store token in cookies with 7 days expiration
//             Cookies.set("token", action.payload, { expires: 7 });
//         },
//     },
// });

// export const { setToken, setLoading, setSignupData } = authSlice.actions;
// export default authSlice.reducer;



// let token = null;
// try {
//     const storedToken = localStorage.getItem('token');
//     token = storedToken ? JSON.parse(storedToken) : null;
// } catch (error) {
//     console.error('Error parsing token from localStorage:', error);
// }

// const initialState = {
//     signupData: null,
//     token: token,
//     loading: false,
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setToken(state, action) {
//             state.token = action.payload;
//         },
//         setLoading(state, action) {
//             state.loading = action.payload;
//         },
//         setsignupData(state, action) {
//             state.signupData = action.payload;
//         },
//     },
// });

// export const { setToken, setLoading, setsignupData } = authSlice.actions;

// export default authSlice.reducer;
