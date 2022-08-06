import React from "react";
import infoImage from "../sprites/info.webp";

export default function Info() {
    const [clickedState, setClickedState] = React.useState(false)
    return (
        <section id="info-section">
            <img id="info-image" alt="info" onClick={() => setClickedState(!clickedState)} src={infoImage} />
            {clickedState &&
                <div id="info-wrapper">
                    <div>Click on a task to edit it.</div>
                    <br />
                    <div>You can re-order tasks by dragging and dropping it.</div>
                </div>
            }

        </section>
    )
}