import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    homeJobsData : [],
    totalPages : 0,
    currPage : 1,
}


const homeSlicer = createSlice({
    name : 'home',
    initialState,
    reducers : {
        addHomeJobs : (state , action) => {
            state.homeJobsData = action.payload.data
            state.totalPages = action.payload.totalPages
            state.currPage = action.payload.currPage
        },

        addCurrentPage : (state , action) => {
            state.currPage = action.payload
        }
    } 
})

export const {addHomeJobs , addCurrentPage} = homeSlicer.actions

export default homeSlicer.reducer