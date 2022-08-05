import React, { useEffect } from "react";

export default function TasksEdits(props) {

    const [changeData, setChangeData] = React.useState(props.taskItem[Object.keys(props.taskItem)[0]])
    let pushChangesData = { [Object.keys(props.taskItem)[0]]: changeData }
    function getDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const joined = [year, month, day].join('-');
        return joined;
    }
    const joined = getDate()

    function saveInput(event) {
        setChangeData(oldData => ({
            ...oldData,
            [event.target.name]: event.target.value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
    }
    // console.log(pushChangesData)
    let mappedItems = (
        <form onSubmit={(event) => props.pushChanges(pushChangesData) & handleSubmit(event)}>
            <h1>{props.taskItem[Object.keys(props.taskItem)[0]].text}</h1>

            <div>Title</div>
            <input type="text" name="text" value={changeData.text} onChange={saveInput}></input>

            <div>description</div>
            {<textarea type="desc" name="desc" value={changeData.desc ? changeData.desc : ''} onChange={saveInput}></textarea>}

            <div>deadline</div>
            {<input type="date" name="date" value={changeData.date ? changeData.date : joined} min={joined} onChange={saveInput}></input>}

            <div>color</div>
            {<input type="color" name="color" id="color-input" value={changeData.color ? changeData.color : "#112233"} onChange={saveInput}></input>}

            {/* {props.taskItem.desc ? <textarea type="text" value={props.taskItem.desc}></textarea> : <textarea type="text" placeholder="desc"></textarea>} */}
            <button>Submit</button>
            <button type="button" onClick={props.deleteItem}>Delete</button>
        </form>
    )

    return (
        <div id="edit-task-wrapper">
            {mappedItems}
            <button onClick={props.handleAbort}>X</button>
        </div>
    );
}