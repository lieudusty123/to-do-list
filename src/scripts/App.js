import React from "react"
import Boards from "./Boards"
import Footer from "./Footer"
import Nav from "./Nav"
import Tasks from "./Tasks"
import TasksEdits from "./TasksEdits"
import Info from "./Info"
import { useSelector } from 'react-redux'

export default function App(props) {
  const mainData = useSelector(state => state.toDo)
  const editMode = useSelector(state => state.editsBool)
  const [hamburger, setHamburger] = React.useState(false)

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


  return (
    <div id="react-container">
      {editMode.clicked && <TasksEdits />}
      <nav id="boards-nav">

        <div id="nav-container">
          <Nav boards={mainData.boards} />
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
      {hamburger === false && mainData.currentBoard && <main id="tasks-display-container">
        <Tasks />
        <Info />

      </main>}

    </div>
  )
}