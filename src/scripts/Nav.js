import React from "react";
export default function Nav(props) {

    let mappedBoards = Object.keys(props.boards).map((data, key) =>
        <li className="boards-li" key={key}>
            <button
                onClick={props.handleClick}
            >{data}</button>
        </li>
    )


    return (

        <div id="boards">
            <ul className="boards-ul">
                {mappedBoards.length !== 0 && <div id="boards-counter">You have ({mappedBoards.length}) board{mappedBoards.length === 1 ? "" : "s"} </div>}
                {mappedBoards}
            </ul>
        </div>
    )
}