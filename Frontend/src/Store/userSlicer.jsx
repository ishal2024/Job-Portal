import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userData : null,
    userDashboardData : [],
    status : false
}

const userSlicer = createSlice({
    name : 'user',
    initialState,

    reducers : {
        addDetail : (state , action) => {
            state.userData = action.payload?.user
            state.status = true
        },
        removeUserData : (state ) => {
            state.userData = null
            state.userDashboardData = []
            state.status = false
        },

        addDashboardDetail : (state , action) => {
            state.userDashboardData = action.payload
        }
    }
})


export const {addDetail , removeUserData , addDashboardDetail} = userSlicer.actions

export default userSlicer.reducer