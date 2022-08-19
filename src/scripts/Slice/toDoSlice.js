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
                [action.payload]: {}
            })
        },
        currentBoardSlice(state, action) {
            state.currentBoard = (action.payload)
        },
        addTaskListSlice(state, action) {
            state.boards = ({
                ...state.boards,
                [state.currentBoard]: {
                    ...state.boards[state.currentBoard],
                    [action.payload]: {
                    }
                }
            })
        },
        addTaskSlice(state, action) {
            state.boards = ({
                ...state.boards,
                [state.currentBoard]: {
                    ...state.boards[state.currentBoard],
                    [Object.keys(action.payload.currentList)[0]]: {
                        ...action.payload.currentList[`${Object.keys(action.payload.currentList)[0]}`],
                        [Object.keys(action.payload.currentList[`${Object.keys(action.payload.currentList)[0]}`]).length + 1]: {
                            text: action.payload.text
                        }
                    }
                }
            })
        },
        reOrderSlice(state, action) {
            console.log(action.payload)
        }
    }
})

export const { addBoardSlice, addTaskListSlice, currentBoardSlice, addTaskSlice, reOrderSlice } = toDoSlice.actions

export default toDoSlice.reducer