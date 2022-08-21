import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    clicked: false,
    target: {}
}

const clickedSlice = createSlice({
    name: 'clicked',
    initialState,
    reducers: {
        flipState(state) {
            state.clicked = !state.clicked
        },
        setTarget(state, action) {
            state.target = action.payload
        },
        resetState(state) {
            state.clicked = false;
            state.target = {};
        }
    }
})

export const { flipState, setTarget, resetState } = clickedSlice.actions

export default clickedSlice.reducer