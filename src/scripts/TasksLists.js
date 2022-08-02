import React from "react";
import editButtonImage from "../sprites/editButton.png";
import xButtonImage from "../sprites/x.webp"
import dragButton from "../sprites/hamburger.png"


export default function TasksLists(props) {
    const [taskValue, setTaskValue] = React.useState({ text: "" })
    const [editListMode, setEditListMode] = React.useState(false)
    let passedValue = {}

    let mappedTasks = Object.keys(props.currentTaskList)
        .map((taskUl, index) => {
            let list = Object.keys(props.currentTaskList[taskUl]).map((i, index) =>
                <li key={index} id={index} className="tasks-li" >
                    <div className="tasks-li-div">
                        {<div className="tasks-li-color" style={props.currentTaskList[taskUl][i].color ? { backgroundColor: `${props.currentTaskList[taskUl][i].color}` } : { backgroundColor: `transparent` }}></div>}
                        <div className="tasks-li-div-text">{props.currentTaskList[taskUl][i].text}</div>
                        {props.currentTaskList[taskUl][i].date && <div className="tasks-li-div-text">{props.currentTaskList[taskUl][i].date}</div>}
                    </div>
                    {!editListMode && <button className="edit-task-button" onClick={props.handleCurrentTask}>
                        <img className="edit-task-image" src={editButtonImage} alt="edit" />
                    </button>}
                    {
                        editListMode && <button className="move-task-button draggable" draggable={true} >
                            <img
                                className="move-task-image"
                                src={dragButton}
                                onDrop={dragDrop}
                                onDragStart={dragStart}
                                onDragOver={dragOver}
                                alt="move" />
                        </button>
                    }
                </li>
            )
            return (
                <ul key={index} id={props.idi}>
                    <div className="list-header">
                        <div>{taskUl}</div>
                        <button className="edit-list-button" onClick={switchEditListModeState}>
                            <img className="edit-list-image" alt="edit" src={editListMode ? xButtonImage : editButtonImage} />
                        </button>
                    </div>
                    <div className="list-body">
                        {list}
                    </div>
                    <div className="list-footer">
                        <form onSubmit={newTask} className="task-list-form">
                            <input type="text" id={taskUl} onChange={onNewTaskChange}></input>
                            <button
                                onClick={props.addTask}
                                value={taskValue.text}>
                                add tasks li
                            </button>
                        </form>
                    </div>
                </ul>
            )
        })



    function switchEditListModeState() {
        setEditListMode(!editListMode)
    }

    function onNewTaskChange(event) {
        setTaskValue({ text: `${event.target.value}` })
    }
    function newTask(event) {
        event.preventDefault()
        event.target.children[0].value = ''
        setTaskValue({ text: "" })
    }
    let dragStartIndex;
    let dragStartList;
    function dragStart(event) {
        dragStartIndex = +event.target.parentElement.parentElement.id + 1;
        dragStartList = event.target.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent

    }

    let dragEndIndex;
    function dragOver(e) {
        dragEndIndex = +e.target.parentElement.parentElement.id + 1;
        dragEndList = e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent
        e.preventDefault()
    }
    let dragEndList;
    function dragDrop(event) {
        console.log(Object.keys(props.currentTaskList)[0])
        if (dragEndList === dragStartList && Object.keys(props.currentTaskList)[0] === dragEndList) {

            let firstItem = props.currentTaskList[dragEndList][dragStartIndex]
            let lastItem = props.currentTaskList[dragEndList][dragEndIndex]
            passedValue = {
                [dragEndList]: {
                    ...props.currentTaskList[dragEndList],
                    [dragStartIndex]: lastItem,
                    [dragEndIndex]: firstItem
                }
            }
            return props.pushNewTaskData(passedValue)
        }
        else {
            dragEndIndex = undefined;
            dragStartIndex = undefined;
            dragStartList = undefined;
            dragEndList = undefined;
        }
    }

    return (
        [mappedTasks]
    )
}