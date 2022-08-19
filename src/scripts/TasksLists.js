import React from "react";
import { useDispatch } from "react-redux";
import trashIcon from "../sprites/trash.png"
import { addTaskSlice, reOrderSlice } from "./Slice/toDoSlice";

export default function TasksLists(props) {
    const [taskValue, setTaskValue] = React.useState({ text: "" })
    let passedValue = {}
    // console.log('props.currentTaskList', props.currentTaskList)
    const dispatch = useDispatch()

    let mappedTasks = Object.keys(props.currentTaskList)
        .map((taskUl, index) => {
            let list = Object.keys(props.currentTaskList[taskUl]).map((i, index) =>
                <li
                    key={index}
                    id={index}
                    className="tasks-li draggable"
                    onClick={props.handleCurrentTask}
                    onDrop={dragDrop}
                    onDragStart={dragStart}
                    onDragOver={dragOver}
                    onTouchEnd={touchDrop}
                    onTouchStart={dragStart}
                    onTouchMove={dragOver}
                    draggable={true}
                >
                    <div className="tasks-li-div">
                        {<div className="tasks-li-color" style={props.currentTaskList[taskUl][i].color ? { backgroundColor: `${props.currentTaskList[taskUl][i].color}` } : { backgroundColor: `transparent` }}></div>}
                        <div className="tasks-li-div-text">{props.currentTaskList[taskUl][i].text}</div>
                        {props.currentTaskList[taskUl][i].date && <div className="tasks-li-div-date">{props.currentTaskList[taskUl][i].date}</div>}
                    </div>
                </li>
            )
            return (
                <ul key={index} id={props.idi}>
                    <div className="list-header">
                        <div>{taskUl}</div>
                        <img
                            alt="trash"
                            className="trash-icon"
                            src={trashIcon}
                            onClick={(event) => props.deleteItem(event)}
                        />
                    </div>
                    <div className="list-body">
                        {list}
                    </div>
                    <div className="list-footer">
                        <form onSubmit={newTask} className="task-list-form">
                            <input type="text" id={taskUl} onChange={onNewTaskChange}></input>
                            <button
                                onClick={newTask}
                                value={taskValue.text}>
                                Add task
                            </button>
                        </form>
                    </div>
                </ul>
            )
        })


    function onNewTaskChange(event) {
        setTaskValue({ text: `${event.target.value}` })
    }
    function newTask(event) {
        event.preventDefault()
        dispatch(addTaskSlice({
            currentList: props.currentTaskList,
            text: taskValue.text
        }))
        event.target.parentElement.children[0].value = ''
        setTaskValue({ text: "" })
    }
    let dragStartIndex;
    let dragStartList;
    function dragStart(event) {
        if (event.target.className === "tasks-li-div") {
            dragStartIndex = +event.target.parentElement.id + 1;
            dragStartList = event.target.parentElement.parentElement.parentElement.children[0].children[0].textContent
        }
        else if (event.target.className === "tasks-li-color" || event.target.className === "tasks-li-div-text" || event.target.className === "tasks-li-div-date") {
            dragStartIndex = +event.target.parentElement.parentElement.id + 1;
            dragStartList = event.target.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent
        }
        else {
            dragStartIndex = +event.target.id + 1;
            dragStartList = event.target.parentElement.parentElement.children[0].children[0].textContent
        }

    }

    let dragEndIndex;
    function dragOver(event) {
        if (event.target.className === "tasks-li-div") {
            dragEndIndex = +event.target.parentElement.id + 1;
            dragEndList = event.target.parentElement.parentElement.parentElement.children[0].children[0].textContent
        }
        else if (event.target.className === "tasks-li-color" || event.target.className === "tasks-li-div-text" || event.target.className === "tasks-li-div-date") {
            dragEndIndex = +event.target.parentElement.parentElement.id + 1;
            dragEndList = event.target.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent
        }
        else {
            dragEndIndex = +event.target.id + 1;
            dragEndList = event.target.parentElement.parentElement.children[0].children[0].textContent
        }

    }
    function touchDrop(event) {
        let please = document.elementFromPoint(event.changedTouches[0].pageX, event.changedTouches[0].pageY)
        if (please.className === "tasks-li-div") {
            dragEndIndex = +please.parentElement.id + 1;
            dragEndList = please.parentElement.parentElement.parentElement.children[0].children[0].textContent
        }
        else if (please.className === "tasks-li-color" || please.className === "tasks-li-div-text" || please.className === "tasks-li-div-date") {
            dragEndIndex = +please.parentElement.parentElement.id + 1;
            dragEndList = please.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent
        }
        else {
            dragEndIndex = +please.id + 1;
            dragEndList = please.parentElement.parentElement.children[0].children[0].textContent
        }
        dragDrop()
    }
    let dragEndList;
    function dragDrop() {
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
            return dispatch(reOrderSlice(passedValue))
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