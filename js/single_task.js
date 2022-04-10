import React, { useState, useEffect } from "react";
import { updateTask, removeTask } from "./API/tasks";
import { getOperations } from "./API/operations";
import Button from "./button";


const Task = ({title, description, id, status: taskStatus, onDeleteTask}) => {

  const [operationsList, setOperationsList] = useState([]);
  const [status, setStatus] = useState(taskStatus);
  const [displayOperationInput, setDisplayOperationInput] = useState(false);


  const finishTask = () => {

    const task = {
      title,
      description,
      status: "closed"
    }

    updateTask(id, task, () => setStatus("closed"));
  }

  const deleteTask = () => {
    removeTask(id, () => onDeleteTask(id));
  }

  const toggleDisplayOperationInput = () => {
    setDisplayOperationInput(prevState => !prevState);
  };



  useEffect(() => {
    /**
     * After component mount fetch all operation in this task
     * @function getOperations - API function
     */
    getOperations(id,setDisplayOperationInput);
  }, []);


  return (
    <section className="card mt-5 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5>{title}</h5>
          <h6 className="card-subtitle text-muted">{description}</h6>
        </div>


        <div>
          {status === "open" && (
            <>
              <Button icon="fas fa-plus-circle"
                      color="info"
                      size="sm"
                      onClick={toggleDisplayOperationInput}
                      className="mr-2">
                Add operation
              </Button>

              <Button icon="fas fa-archive"
                      color="dark"
                      size="sm"
                      onClick={finishTask}>
                Finish
              </Button>
            </>
          )}
          {operationsList.length === 0 &&
          <Button icon={"fas fa-trash"} color={"danger"} outline size={"sm"} onClick={deleteTask}
                  className="ml-2"/>}
        </div>
      </div>
{/* 
      <Operations taskID={id}
                  form={displayOperationInput}
                  setForm={setDisplayOperationInput}
                  operationsList={operationsList}
                  setOperationsList={setDisplayOperationInput}
                  status={status}/> */}
    </section>
  );
}

export default Task;