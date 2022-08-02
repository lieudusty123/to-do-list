import React, { useEffect } from "react"
import Boards from "./Boards"
import Nav from "./Nav"
import Tasks from "./Tasks"
import TasksEdits from "./TasksEdits"

let sampleText = ''
export default function App(props) {
  const [hamburger, setHamburger] = React.useState(false)

  const [boardsData, setBoardsData] = React.useState({
    boards: {

    }
  })

  function addBoard(eve) {
    if (eve.target.value !== "") {
      setBoardsData(oldData => ({
        boards: {
          ...oldData.boards,
          [eve.target.value]: {
          }
        }
      }))
    }
  }

  function addTask(eve) {
    const passedData = eve.target.parentElement.children[0].value
    const targetUl = eve.target.parentElement.parentElement.parentElement.children[0].children[0].textContent
    if (passedData !== "") {
      setBoardsData(oldBoardData => ({
        boards: {
          ...oldBoardData.boards,
          [Object.keys(currentBoard)]: {
            ...currentBoard[Object.keys(currentBoard)[0]],
            [targetUl]: {
              ...currentBoard[Object.keys(currentBoard)[0]][targetUl],
              [`${Object.keys(currentBoard[Object.keys(currentBoard)[0]][targetUl]).length + 1}`]: {
                text: passedData
              }
            }
          }
        }
      }))
    }
  }

  function addTaskList(passedData) {
    if (passedData) {
      setBoardsData(oldBoardData => ({
        boards: {
          ...oldBoardData.boards,
          [Object.keys(currentBoard)]: {
            ...currentBoard[Object.keys(currentBoard)],
            [passedData]: {
              1: {
                text: `${Math.floor(Math.random() * 10)}`,
                color: "#ffffff"
              }
            }
          }
        }
      }))
    }
  }

  let [currentBoard, setCurrentBoard] = React.useState()
  function currentBoardFunction(event) {
    sampleText = `${event.target.textContent}`
    setCurrentBoard(() => ({
      [sampleText]: boardsData.boards[`${sampleText}`]
    }))
    if (hamburger === true) {
      document.querySelector('#hamburger').classList.remove('active')
      document.querySelector('.boards-ul').classList.remove('active')
      document.querySelector('#nav-container').classList.remove('active')
      document.querySelector('#boards-nav').classList.remove('active')
      setHamburger(false)
    }
  }

  useEffect(() => {
    if (sampleText) {
      setCurrentBoard(() => ({ [sampleText]: boardsData.boards[`${sampleText}`] }))
    }
  }, [boardsData])

  const [clicked, setClicked] = React.useState()

  let [currentList, setCurrentList] = React.useState()
  function flipClickState(event) {
    let objectKeys = {}
    for (const key in currentBoard) {
      objectKeys = currentBoard[key]
    }
    let closestLi = event.target.closest('li')
    let closestUl = event.target.closest('ul')
    let taskListText = closestUl.children[0].textContent
    let taskListItemID = +closestLi.id + 1


    setClicked(() => ({ [closestLi.id]: objectKeys[taskListText][taskListItemID] }))
    setCurrentList(taskListText)
  }

  function handleChanges(pushChangesData) {

    let insertedValues = {}
    for (const key in pushChangesData) {
      insertedValues = pushChangesData[key]
    }

    setBoardsData(oldBoardData => ({
      boards: {
        ...oldBoardData.boards,
        [Object.keys(currentBoard)]: {
          ...currentBoard[Object.keys(currentBoard)],
          [currentList]: {
            ...currentBoard[Object.keys(currentBoard)][currentList],
            [+Object.keys(pushChangesData)[0] + 1]: {
              text: insertedValues.text,
              color: insertedValues.color,
              date: insertedValues.date,
            }
          }
        }
      }
    }))
  }

  function pushNewTaskData(obj) {
    let newBoardData = {
      [Object.keys(currentBoard)[0]]: {
        ...currentBoard[Object.keys(currentBoard)[0]],
        ...obj
      }
    }
    setCurrentBoard(newBoardData)
    setBoardsData(oldData => ({
      boards: {
        ...oldData.boards,
        ...newBoardData
      }
    }))
  }

  function abortChanges() {
    setClicked(false)
  }
  function handleHamburgerClick(event) {
    if (window.innerWidth >= 600) {

      document.querySelector('#hamburger').classList.remove('active')
      document.querySelector('.boards-ul').classList.remove('active')
      document.querySelector('#nav-container').classList.remove('active')
      document.querySelector('#boards-nav').classList.remove('active')
      setHamburger(false)
    }
    else {
      document.querySelector('#hamburger').classList.toggle('active')
      document.querySelector('.boards-ul').classList.toggle('active')
      document.querySelector('#nav-container').classList.toggle('active')
      document.querySelector('#boards-nav').classList.toggle('active')
      setHamburger(!hamburger)
    }

  }

  return (
    <div id="react-container">
      {clicked && <TasksEdits taskItem={clicked} handleAbort={abortChanges} pushChanges={handleChanges} />}
      <nav id="boards-nav">
        <div id="nav-container">
          <Nav boards={boardsData.boards} handleClick={currentBoardFunction} />
          <Boards handleEvent={addBoard} />
        </div>
      </nav>
      <div id="hamburger" onClick={handleHamburgerClick}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      {hamburger === false && currentBoard && <main id="tasks-display-container">
        <Tasks
          displayBoard={currentBoard}
          addTask={addTask}
          addTaskList={addTaskList}
          handleCurrentTask={flipClickState}
          pushNewTaskData={pushNewTaskData}
        />
      </main>}

    </div>
  )
}