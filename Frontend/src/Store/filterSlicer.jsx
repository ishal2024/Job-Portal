import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    jobType : ["all"],
    freshness : 30        // 30 Days 
}

const filterSlicer = createSlice({
    name : "filter",
    initialState,
    reducers : {
        onJobTypeChange : (state , action) => {
            state.jobType = action.payload
        },
        onFreshnessChange : (state , action) => {
            state.freshness = action.payload
        }
    }
})

export const {onJobTypeChange , onFreshnessChange } = filterSlicer.actions

export default filterSlicer.reducer