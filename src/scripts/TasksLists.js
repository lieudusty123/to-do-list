import React from "react";
import { useDispatch, useSelector } from "react-redux";
import trashIcon from "../sprites/trash.png"
import { flipState, setTarget } from "./Slice/clickedSlice";
import { addTaskSlice, reOrderSlice, deleteTaskListSlice } from "./Slice/toDoSlice";


export default function TasksLists(props) {
    const [taskValue, setTaskValue] = React.useState({ text: "" })
    const mainData = useSelector(state => state.toDo)
    const passedData = props.currentTaskList
    const dispatch = useDispatch()


    let mappedTasks = Object.keys(passedData)
        .map((taskUl, index) => {
            let list = Object.keys(passedData[taskUl]).map((i, index) =>
                <li
                    key={index}
                    id={index}
                    className="tasks-li draggable"
                    onClick={activateEditMode}
                    onDrop={dragDrop}
                    onDragStart={dragStart}
                    onDragOver={dragOver}
                    onTouchEnd={touchDrop}
                    onTouchStart={dragStart}
                    onTouchMove={dragOver}
                    draggable={true}
                >
                    <div className="tasks-li-div">
                        {<div className="tasks-li-color" style={passedData[taskUl][i].color ? { backgroundColor: `${passedData[taskUl][i].color}` } : { backgroundColor: `transparent` }}></div>}
                        <div className="tasks-li-div-text">{passedData[taskUl][i].text}</div>
                        {passedData[taskUl][i].date && <div className="tasks-li-div-date">{passedData[taskUl][i].date}</div>}
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
                            onClick={removeTaskList}
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

    function activateEditMode(event) {
        let closestUl = event.target.closest('ul')
        let closestLi = event.target.closest('li')
        let targetUlText = closestUl.id
        let targetUlObj = mainData.boards[mainData.currentBoard][closestUl.id]
        let targetLiObj = mainData.boards[mainData.currentBoard][closestUl.id][Object.keys(targetUlObj)[0]][closestLi.id]
        let targetLiText = closestLi.id
        dispatch(flipState())
        dispatch(setTarget({ targetUlText: targetUlText, targetUlObj, targetLi: targetLiText, targetLiObj }))
    }


    function removeTaskList(event) {
        let textTarget = event.target.parentElement.parentElement.id
        dispatch(deleteTaskListSlice(textTarget))
    }

    function onNewTaskChange(event) {
        setTaskValue({ text: `${event.target.value}` })
    }

    function newTask(event) {
        event.preventDefault()
        dispatch(addTaskSlice({
            currentList: event.target.parentElement.parentElement.parentElement.id,
            text: taskValue.text
        }))
        event.target.parentElement.children[0].value = ''
        setTaskValue({ text: "" })
    }

    // --------------------------
    // Drag Section
    // --------------------------
    let dragStartIndex;
    let dragStartList;
    let dragEndIndex;
    let dragEndList;
    let dragEndListIndex;

    function dragStart(event) {
        if (event.target.className === "tasks-li-div") {
            dragStartIndex = +event.target.parentElement.id;
            dragStartList = event.target.parentElement.parentElement.parentElement.children[0].children[0].textContent
        }
        else if (event.target.className === "tasks-li-color" || event.target.className === "tasks-li-div-text" || event.target.className === "tasks-li-div-date") {
            dragStartIndex = +event.target.parentElement.parentElement.id;
            dragStartList = event.target.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent
        }
        else {
            dragStartIndex = +event.target.id;
            dragStartList = event.target.parentElement.parentElement.children[0].children[0].textContent
        }

    }

    function dragOver(event) {
        if (event.target.className === "tasks-li-div") {
            dragEndIndex = +event.target.parentElement.id;
            dragEndList = event.target.parentElement.parentElement.parentElement.children[0].children[0].textContent
            dragEndListIndex = event.target.parentElement.parentElement.parentElement.id
        }
        else if (event.target.className === "tasks-li-color" || event.target.className === "tasks-li-div-text" || event.target.className === "tasks-li-div-date") {
            dragEndIndex = +event.target.parentElement.parentElement.id;
            dragEndList = event.target.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent
            dragEndListIndex = event.target.parentElement.parentElement.parentElement.parentElement.id
        }
        else {
            dragEndIndex = +event.target.id;
            dragEndList = event.target.parentElement.parentElement.children[0].children[0].textContent
            dragEndListIndex = event.target.parentElement.parentElement.id
        }
        event.preventDefault()
    }
    function touchDrop(event) {
        let please = document.elementFromPoint(event.changedTouches[0].pageX, event.changedTouches[0].pageY)
        if (please.className === "tasks-li-div") {
            dragEndIndex = +please.parentElement.id;
            dragEndList = please.parentElement.parentElement.parentElement.children[0].children[0].textContent
            dragEndListIndex = please.parentElement.parentElement.parentElement.id
        }
        else if (please.className === "tasks-li-color" || please.className === "tasks-li-div-text" || please.className === "tasks-li-div-date") {
            dragEndIndex = +please.parentElement.parentElement.id;
            dragEndList = please.parentElement.parentElement.parentElement.parentElement.children[0].children[0].textContent
            dragEndListIndex = please.parentElement.parentElement.parentElement.parentElement.id
        }
        else {
            dragEndIndex = +please.id;
            dragEndList = please.parentElement.parentElement.children[0].children[0].textContent
            dragEndListIndex = please.parentElement.parentElement.id
        }
        dragDrop()
    }
    function dragDrop(event) {
        if (dragEndList === dragStartList && Object.keys(passedData)[0] === dragEndList) {
            let firstItem = passedData[dragEndList][dragStartIndex]
            let lastItem = passedData[dragEndList][dragEndIndex]
            return dispatch(reOrderSlice({
                listId: dragEndListIndex,
                listName: dragEndList,
                first: firstItem,
                last: lastItem,
                firstIndex: dragStartIndex,
                lastIndex: dragEndIndex
            }))
        }
        else {
            dragEndIndex = undefined;
            dragStartIndex = undefined;
            dragStartList = undefined;
            dragEndList = undefined;
            dragEndListIndex = undefined;
        }
    }
    // --------------------------
    // Drag Section
    // --------------------------

    return (
        [mappedTasks]
    )
}