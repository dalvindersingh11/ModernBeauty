// src/redux/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authSliceReducer from '../Modules/authsSlice';

const rootReducer = combineReducers({
 authsSlice: authSliceReducer
});

export default rootReducer;
