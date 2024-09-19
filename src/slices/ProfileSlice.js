import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload
            console.log(value.payload)
        },
        setLoading(state, value) {
            state.loading = value.payload
        },
    }
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;



// .with cookie======================================================================================

// import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie"; // Import js-cookie for cookie handling

// // Initial state with user data fetched from localStorage or cookies
// const initialState = {
//     user: localStorage.getItem("user")
//         ? JSON.parse(localStorage.getItem("user"))
//         : Cookies.get("user") // Fallback to cookies if localStorage doesn't have it
//             ? JSON.parse(Cookies.get("user"))
//             : null,
//     loading: false,
// };

// // Creating the profile slice
// const profileSlice = createSlice({
//     name: "profile",
//     initialState: initialState,
//     reducers: {
//         // Reducer to set user data
//         setUser(state, action) {
//             state.user = action.payload;

//             // Store the user in localStorage
//             // localStorage.setItem("user", JSON.stringify(action.payload));

//             // Also store the user in cookies with a 7-day expiration
//             Cookies.set("user", JSON.stringify(action.payload), { expires: 7 });
//         },
//         // Reducer to set loading state
//         setLoading(state, action) {
//             state.loading = action.payload;
//         },
//     },
// });

// // Exporting actions for use in components
// export const { setUser, setLoading } = profileSlice.actions;

// // Exporting the reducer to be used in the store
// export default profileSlice.reducer;

