import React, { useState } from "react";
import TasksLists from "./TasksLists";
import Info from "./Info";

export default function Tasks(props) {
    const [textInput, setTextInput] = useState('')

    function onTaskListChange(event) {
        setTextInput(event.target.value)
    }
    function handleSubmit(event) {
        event.preventDefault()
        setTextInput('')
    }
    let objectKeys = {}
    for (const key in props.displayBoard) {
        objectKeys = props.displayBoard[key]
    }


    let mappedItems = []
    let index = 0
    for (const key in objectKeys) {
        let currentObj = { [key]: objectKeys[key] }
        mappedItems.push(<TasksLists addTask={(event) => props.addTask(event)} key={key} idi={index} pushNewTaskData={(data) => props.pushNewTaskData(data)} currentTaskList={currentObj} handleCurrentTask={props.handleCurrentTask} />)
        index++
    }

    return (
        <div id="task-container">
            {mappedItems}
            <form className="new-column" onSubmit={(event) => props.addTaskList(textInput) & handleSubmit(event)}>
                <input className="new-column-input" type="text" onChange={onTaskListChange} value={textInput} placeholder="+ New List" />
            </form>
            <Info />
        </div>
    )
}