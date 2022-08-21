import { createSlice } from "@reduxjs/toolkit";

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
        },
        reOrderSlice(state, action) {
            let target = state.boards[state.currentBoard][action.payload.listId][action.payload.listName]

            const temp = target[action.payload.firstIndex]
            target[action.payload.firstIndex] = target[action.payload.lastIndex]
            target[action.payload.lastIndex] = temp
        },
        deleteTaskListSlice(state, action) {
            state.boards[state.currentBoard].splice(action.payload, 1)
        },
        deleteTaskSlice(state, action) {
            state.boards[state.currentBoard][action.payload.targetUlText][Object.keys(action.payload.targetUlObj)[0]]
                .splice(+action.payload.targetLi, 1)
        },
        applyChanges(state, action) {
            state.boards[state.currentBoard]
            [action.payload.targetUlText]
            [Object.keys(action.payload.targetUlObj)[0]]
            [action.payload.targetLiText] = action.payload.data
        }
    }
})

export const { addBoardSlice, addTaskListSlice, currentBoardSlice, addTaskSlice, reOrderSlice, deleteTaskListSlice, deleteTaskSlice, applyChanges } = toDoSlice.actions

export default toDoSlice.reducer