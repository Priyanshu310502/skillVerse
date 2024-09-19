import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/AuthSlices';
import profileReducer from '../slices/ProfileSlice';
import cartReducers from '../slices/CartSlice';
import courseReducers from '../slices/courseSlice';

export const rootReducers = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducers,
    course: courseReducers
})



