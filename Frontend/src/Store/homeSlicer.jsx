import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isHomeJobsDataPresent : false,
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
            state.isHomeJobsDataPresent = true
        },

        addCurrentPage : (state , action) => {
            state.currPage = action.payload
        },

        refetchHomeJobsData : (state ) => {
            state.isHomeJobsDataPresent = false
        }
    } 
})

export const {addHomeJobs , addCurrentPage , refetchHomeJobsData} = homeSlicer.actions

export default homeSlicer.reducer