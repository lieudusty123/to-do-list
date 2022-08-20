import { createSlice } from "@reduxjs/toolkit";

let initialState = false

const clickedSlice = createSlice({
    name: 'clicked',
    initialState,
    reducers: {
        flipState(state) {
            state = !state
        }
    }
})

export const { flipState } = clickedSlice.actions

export default clickedSlice.reducer