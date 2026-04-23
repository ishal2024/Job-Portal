import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlicer'
import homeReducer from './homeSlicer'
import filterReducer from './filterSlicer'

export const store = configureStore({
    reducer : {
        user : userReducer,
        home : homeReducer,
        filter : filterReducer
    }
})