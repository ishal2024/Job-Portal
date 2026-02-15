import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlicer'
import homeReducer from './homeSlicer'

export const store = configureStore({
    reducer : {
        user : userReducer,
        home : homeReducer
    }
})