import Header from "./components/Header";
import Tasks from "./components/Tasks";
// import React from "react"
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";


function App() {
// goes in app so that it's app level state, accessible to multiple components
// defines the piece of state as tasks and updates the state with the function setTasks
const [tasks, setTasks] = useState([
  //Without json server backend
  // {
  //   id: 1,
  //   text: "Doctors Appointment",
  //   day: "Feb 5th at 2:30pm",
  //   reminder: true,
  // },
  // {
  //   id: 2,
  //   text: "Meeting at School",
  //   day: "Feb 6th at 1:30pm",
  //   reminder: true,
  // },
  // {
  //   id: 3,
  //   text: "Food Shopping",
  //   day: "Feb 5th at 2:30pm",
  //   reminder: false,
  //   }
  ])

  //runs when page loaded
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
    // Dependencies go into brackets
  }, [])

  //Fetch Tasks from json server
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()
    
    return data
  }

  const fetchTask = async (id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
    }

  const[showAddTask, setShowAddTask] = useState(false)

  //Add Task
  const addTask = async (task) => {
    //create POST request to add to json server
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })

    //update ui
    const data = await res.json()
    setTasks([...tasks, data])

    // Handle Id without json server
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  //Delete Task
  const deleteTask = async (id) => {
    //create DELETE request for json server
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })

    //Filters out the tasks that match the id updates ui
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    //update in json server
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder:!taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updTask)
    })

    //update in ui
    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  return (
    <Router>
    <div className="container">
      {/* Can use <Header title: "Task Tracker" /> to pass a title property to the component */}
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      <Routes>
      <Route path="/" element={<>
        {showAddTask && <AddTask onAdd={addTask} />}
        {/* Shows tasks if they exist, otherwise no tasks to show */}
        {/* onDelete passed down to Tasks module as the deleteTask function */}
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete = {deleteTask} onToggle = {toggleReminder} /> : ("No Tasks To Show")}
      </>}
      />
      <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

// class App extends React.Component {
//   render() {
//     return <h1>Hello from a class</h1>
//   }
// }

export default App;
