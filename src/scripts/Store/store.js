import { configureStore } from "@reduxjs/toolkit"
import toDoSlice from "../Slice/toDoSlice"
import clickedSlice from "../Slice/clickedSlice"


export const testStore = configureStore({
    reducer: {
        toDo: toDoSlice,
        editsBool: clickedSlice
    }
})

