import { createSlice } from '@reduxjs/toolkit';

export const viewModeList = "viewModeList"
export const viewModeCalendar = "viewModeCalendar"

const homePageViewModeSlice = createSlice({
    name : "homePageViewMode",
    initialState : viewModeList,
    reducers : {
        switch : (state, action) => {
            return ((state == viewModeCalendar)?( viewModeList ):( viewModeCalendar ))
        },
        setList : (state, action) => {
            return viewModeList
        },
        setCalendar : (state, action) => {
            return viewModeCalendar
        }
    }
})

export const switchView = homePageViewModeSlice.actions.switch
export const { setCalendar, setList } = homePageViewModeSlice.actions


export default homePageViewModeSlice.reducer
