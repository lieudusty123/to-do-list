import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBoardSlice } from "./Slice/toDoSlice";

export default function Boards(props) {
    const [stateInput, setStateInput] = React.useState({
        text: ""
    })
    const pleaseWork = useSelector(state => state.toDo)
    const dispatch = useDispatch()
    function handleInput(eve) {
        setStateInput(oldInput => ({
            text: eve.target.value
        }))
    }
    function handleSubmit(eve) {
        eve.preventDefault()
        setStateInput(oldState => oldState = "")
    }

    function addBoard() {
        const str = stateInput.text
        let spaceCount = 0
        for (let index = 0; index < str.length; index++) {
            if (index > 0) {
                if (str[index] === " " && str[index - 1] === " ") {
                    spaceCount++
                }
                else {
                    spaceCount = 0
                }
            }
            else {
                if (str[index] === " ") {
                    spaceCount++
                }
            }

        }
        let sameName = false;
        for (const key in pleaseWork.boards) {
            if (key === str) {
                sameName = true
            }
        }
        if (str !== "" && spaceCount < 1 && !sameName) {
            dispatch(addBoardSlice(str))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                id="add-board-text"
                type="text"
                value={stateInput.text || ""}
                name="text"
                placeholder="Board Name..."
                onChange={handleInput}
            />
            <button onClick={addBoard} value={stateInput.text} id="add-board-input">Add board</button>
        </form>
    )
}