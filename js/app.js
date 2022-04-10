import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { API_KEY, API_URL } from "./API/API";
import { getTasks } from "./API/tasks";
import NewTaskForm from "./new_task_form";
import Task from "./single_task";


function App() {

  const [tasksArray, setTasksArray] = useState([]);


  useEffect(()=> {
  getTasks(setTasksArray);
  }, [])


  // -------------------------------------

  useEffect (()=>{
    console.log(`Tasks updated`);
    console.log(tasksArray);
  })


 /**
   * Add new task local state
   * @param {Object} task - Complete object with task details
   * @param {string} task.title - Task title
   * @param {string} task.description - Task description
   * @param {string} task.status - Task status (open/closed)
   * 
   */


const addTask = (task) => {
setTasksArray((prevTasksArray) => [task, ...prevTasksArray]);
};

 /**
   * Remove task from local state
   * @param {string} id - ID of task
   */

const deleteTask = (id) => {
  setTasksArray(prevTasksArray=>prevTasksArray.filter(task=>task.id !== id));
};

  return (
    <>
     <NewTaskForm onAddTask={addTask} /> 
    {
      tasksArray.map((task)=> { 
        return <Task key={task.id} title={task.title} {...task} onDeleteTask={deleteTask}/>
      })
    }
    </>
  )
}

ReactDOM.render(<App/>, document.querySelector("#app"));