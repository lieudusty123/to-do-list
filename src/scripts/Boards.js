import React from "react";

export default function Boards(props) {
    const [stateInput, setStateInput] = React.useState({
        text: ""
    })

    function handleInput(eve) {
        setStateInput(oldInput => ({
            text: eve.target.value
        }))
    }
    function handleSubmit(eve) {
        eve.preventDefault()
        setStateInput(oldState => oldState = "")
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
            <button onClick={props.handleEvent} value={stateInput.text} id="add-board-input">Add board</button>
        </form>
    )
}