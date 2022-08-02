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
    let mappedItems = (
        <form onSubmit={(event) => props.pushChanges(pushChangesData) & handleSubmit(event)}>
            <input type="text" name="text" value={changeData.text} onChange={saveInput}></input>
            {<input type="date" name="date" value={changeData.date ? changeData.date : joined} min={joined} onChange={saveInput}></input>}
            {<input type="color" name="color" value={changeData.color ? changeData.color : "#112233"} onChange={saveInput}></input>}
            {props.taskItem.sublist ? <input type="text" value={props.taskItem.sublist}></input> : <input type="text" placeholder="sublist"></input>}
            <button>Submit</button>
        </form>
    )

    return (
        <div id="block-screen">
            {mappedItems}
            <button onClick={props.handleAbort}>X</button>
        </div>
    );
}