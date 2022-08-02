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
                <div id="boards-counter">All Boards: {mappedBoards.length}</div>
                {mappedBoards}
            </ul>
        </div>
    )
}