import React from "react";


export default function TasksLists(props) {
    const [taskValue, setTaskValue] = React.useState({ text: "" })
    let passedValue = {}

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
        event.target.children[0].value = ''
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

        event.preventDefault()
    }
    let dragEndList;
    function dragDrop() {
        console.log(dragStartIndex)
        console.log(dragEndIndex)
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