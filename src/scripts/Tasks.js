import React, { useState } from "react";
import TasksLists from "./TasksLists";
import { addTaskListSlice } from "./Slice/toDoSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Tasks(props) {
    const [textInput, setTextInput] = useState('')
    const dispatch = useDispatch()
    const pleaseWork = useSelector(state => state.toDo)
    const currentBoardObj = pleaseWork.boards[pleaseWork.currentBoard]
    function onTaskListChange(event) {
        setTextInput(event.target.value)
    }
    function handleSubmit(event) {
        event.preventDefault()
        setTextInput('')
    }

    let mappedItems = []
    let index = 0
    currentBoardObj.forEach(element => {
        for (const key in element) {
            let currentObj = { [key]: element[key] }
            mappedItems.push(
                <TasksLists
                    key={key}
                    idi={index}
                    currentTaskList={currentObj}
                    handleCurrentTask={props.handleCurrentTask}
                />)
            index++
        }
    })

    function blurElement(event) {
        event.target.children[0].blur()
    }
    function addTaskList(e) {
        e.preventDefault()
        let spaceCount = 0
        for (let index = 0; index < textInput.length; index++) {
            if (index > 0) {
                if (textInput[index] === " " && textInput[index - 1] === " ") {
                    spaceCount++
                }
                else {
                    spaceCount = 0
                }
            }
            else {
                if (textInput[index] === " ") {
                    spaceCount++
                }
            }

        }
        let sameName = false;
        for (const key in currentBoardObj) {
            for (const inner in currentBoardObj[key]) {
                if (inner === textInput) {
                    sameName = true
                }
            }
        }
        if (textInput && spaceCount < 1 && !sameName) {
            dispatch(addTaskListSlice(textInput))
        }
    }
    return (
        <div id="task-container">
            {mappedItems}
            <form className="new-column" onSubmit={(event) => addTaskList(event) & handleSubmit(event) & blurElement(event)}>
                <input className="new-column-input" type="text" onChange={onTaskListChange} value={textInput} placeholder="+ New List" />
            </form>
        </div>
    )
}