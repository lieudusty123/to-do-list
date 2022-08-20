import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    boards: {

    },
    currentBoard: null
}

const toDoSlice = createSlice({
    name: "slice",
    initialState,
    reducers: {
        addBoardSlice(state, action) {
            state.boards = ({
                ...state.boards,
                [action.payload]: []
            })
        },
        currentBoardSlice(state, action) {
            state.currentBoard = (action.payload)
        },
        addTaskListSlice(state, action) {
            state.boards[state.currentBoard].push({ [action.payload]: [] })
        },
        addTaskSlice(state, action) {
            let target = state.boards[state.currentBoard][action.payload.currentList][Object.keys(state.boards[state.currentBoard][action.payload.currentList])[0]]
            target.push({
                text: action.payload.text
            })
            console.log(current(state.boards))
        },
        reOrderSlice(state, action) {
            let target = state.boards[state.currentBoard][action.payload.listId][action.payload.listName]

            const temp = target[action.payload.firstIndex]
            target[action.payload.firstIndex] = target[action.payload.lastIndex]
            target[action.payload.lastIndex] = temp
        },
        deleteTaskListSlice(state, action) {
            state.boards[state.currentBoard].splice(action.payload, 1)
        }
    }
})

export const { addBoardSlice, addTaskListSlice, currentBoardSlice, addTaskSlice, reOrderSlice, deleteTaskListSlice } = toDoSlice.actions

export default toDoSlice.reducer