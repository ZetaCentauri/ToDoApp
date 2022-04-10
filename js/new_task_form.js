import React, { useEffect, useState } from "react";
import Button from "./button";
import { createTask } from "./API/tasks";

const NewTaskForm = ({onAddTask}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const addTask = e => {
        e.preventDefault();

        let task = {
            title,
            description,
            status: "open"
            };

        console.log(task);

        createTask(task, onAddTask);
    }


    return (
     <div className="card shadow">
        <div className="card-body">
        <h1 className="card-title">New task</h1>
        <form onSubmit={addTask}>
            <div className="form-group">
                <input type="text"
                    className="form-control"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
                <input type="text"
                    className="form-control"
                    name="description"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}/>
            </div>
            <Button color={"info"} icon={"fas fa-plus-circle"}>Add task</Button>
        </form>
        </div>
    </div>
    )
}

export default NewTaskForm;