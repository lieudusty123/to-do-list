import { configureStore } from "@reduxjs/toolkit"
import toDoSlice from "../Slice/toDoSlice"


export const testStore = configureStore({
    reducer: {
        toDo: toDoSlice
    }
})

