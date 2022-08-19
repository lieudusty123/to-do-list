import React, { useEffect } from "react"
import Boards from "./Boards"
import Footer from "./Footer"
import Nav from "./Nav"
import Tasks from "./Tasks"
import TasksEdits from "./TasksEdits"
import Info from "./Info"
import { useSelector } from 'react-redux'

let sampleText = ''
export default function App(props) {
  const pleaseWork = useSelector(state => state.toDo)
  let [currentBoard, setCurrentBoard] = React.useState()
  const [hamburger, setHamburger] = React.useState(false)

  const [boardsData, setBoardsData] = React.useState({
    boards: {

    }
  })

  useEffect(() => {
    if (sampleText) {
      setCurrentBoard(() => ({ [sampleText]: pleaseWork.boards[`${sampleText}`] }))
    }
    abortChanges()
  }, [pleaseWork])

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
              desc: insertedValues.desc
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

  function handleHamburgerClick() {
    if (window.innerWidth >= 600) {

      document.querySelector('#hamburger-wrapper').classList.remove('active')
      document.querySelector('#hamburger').classList.remove('active')
      document.querySelector('.boards-ul').classList.remove('active')
      document.querySelector('#nav-container').classList.remove('active')
      document.querySelector('#boards-nav').classList.remove('active')
      setHamburger(false)
    }
    else {
      document.querySelector('#hamburger-wrapper').classList.toggle('active')
      document.querySelector('#hamburger').classList.toggle('active')
      document.querySelector('.boards-ul').classList.toggle('active')
      document.querySelector('#nav-container').classList.toggle('active')
      document.querySelector('#boards-nav').classList.toggle('active')
      setHamburger(!hamburger)
    }
  }

  function deleteTask() {
    let newData = { ...boardsData }
    delete newData.boards[Object.keys(currentBoard)][currentList][+Object.keys(clicked) + 1]
    let newInnerData = {}
    let index = 0;
    for (const key in newData.boards[Object.keys(currentBoard)][currentList]) {
      index += 1
      newInnerData = {
        ...newInnerData,
        [index]: {
          ...newData.boards[Object.keys(currentBoard)][currentList][key]
        }
      }
    }
    setBoardsData(({
      boards: {
        ...newData.boards,
        [Object.keys(currentBoard)]: {
          ...currentBoard[Object.keys(currentBoard)],
          [currentList]: {
            ...newInnerData
          }
        }
      }
    }))
    abortChanges()
  }
  function deleteTaskList(event) {
    let newData = { ...boardsData }
    let passedListId = event.target.parentElement.children[0].textContent
    delete newData.boards[Object.keys(currentBoard)][passedListId]
    setBoardsData(({
      ...newData
    }))
  }

  return (
    <div id="react-container">
      {clicked && <TasksEdits taskItem={clicked} handleAbort={abortChanges} pushChanges={handleChanges} deleteItem={deleteTask} />}
      <nav id="boards-nav">
        <div id="nav-container">
          <Nav boards={pleaseWork.boards} />
          <Boards />
        </div>
        <Footer />
      </nav>
      <div id="hamburger-wrapper">
        <div id="hamburger" onClick={handleHamburgerClick}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
      {hamburger === false && pleaseWork.currentBoard && <main id="tasks-display-container">
        <Tasks
          // displayBoard={pleaseWork.currentBoard}
          // addTask={addTask}
          // addTaskList={addTaskList}
          handleCurrentTask={flipClickState}
          pushNewTaskData={pushNewTaskData}
          deleteItem={deleteTaskList}
        />
        <Info />

      </main>}

    </div>
  )
}