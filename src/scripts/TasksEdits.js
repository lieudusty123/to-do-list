import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyChanges, deleteTaskSlice } from "./Slice/toDoSlice";
import { resetState } from "./Slice/clickedSlice";

export default function TasksEdits(props) {
    const inputData = useSelector(state => state.editsBool)
    const targetLiObj = inputData.target.targetLiObj
    const [newData, setNewData] = useState(targetLiObj)
    const dispatch = useDispatch()
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
        setNewData(oldData => ({
            ...oldData,
            [event.target.name]: event.target.value
        }))
    }
    function handleSubmit(event) {
        event.preventDefault()
        dispatch(applyChanges({
            targetLiText: inputData.target.targetLi,
            targetUlText: inputData.target.targetUlText,
            targetUlObj: inputData.target.targetUlObj,
            data: newData
        }))
        dispatch(resetState())
    }
    function deleteItem() {
        dispatch(deleteTaskSlice(inputData.target))
        dispatch(resetState())
    }
    let mappedItems = (
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="edit-task-form-header">
                <h1>{newData.text}</h1>
                <button type="button" id="x-button" onClick={() => dispatch(resetState())}>X</button>
            </div>

            <div>Title</div>
            <input type="text" name="text" value={newData.text} onChange={saveInput}></input>

            <div>description</div>
            {<textarea type="desc" name="desc" value={newData.desc ? newData.desc : ''} onChange={saveInput}></textarea>}

            <div>deadline</div>
            {<input type="date" name="date" value={newData.date ? newData.date : joined} min={joined} onChange={saveInput}></input>}

            <div>color</div>
            {<input type="color" name="color" id="color-input" value={newData.color ? newData.color : "#112233"} onChange={saveInput}></input>}

            <button>Submit</button>
            <button type="button" onClick={deleteItem}>Delete</button>
        </form>
    )

    return (
        <div id="edit-task-wrapper">
            {mappedItems}
        </div>
    );
}