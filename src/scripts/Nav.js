import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentBoardSlice } from "./Slice/toDoSlice";

export default function Nav(props) {
    const pleaseWork = useSelector(state => state.toDo)
    const dispatch = useDispatch()

    function currentBoardFunction(event) {
        let sampleText = `${event.target.textContent}`

        if (!pleaseWork.currentBoard || Object.keys(pleaseWork.currentBoard)[0] !== sampleText) {
            dispatch(currentBoardSlice(sampleText))
        }

        // if (props.hamburger === true) {
        //     document.querySelector('#hamburger-wrapper').classList.remove('active')
        //     document.querySelector('#hamburger').classList.remove('active')
        //     document.querySelector('.boards-ul').classList.remove('active')
        //     document.querySelector('#nav-container').classList.remove('active')
        //     document.querySelector('#boards-nav').classList.remove('active')
        //     setHamburger(false)
        // }
    }

    let mappedBoards = Object.keys(props.boards).map((data, key) =>
        <li className="boards-li" key={key}>
            <button
                onClick={currentBoardFunction}
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