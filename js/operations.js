import React from "react";
import { createOperation } from "./API/operations";
import { useState } from "react";
import Button from "./button";
import Operation from "./single_operation";



const Operations = ({taskID, displayForm, setDisplayForm, operationsList, setOperationsList, status}) => {
    
    const [operationDescription, setOperationDescription] = useState("");

    const addOperation = (e) => {
        e.preventDefault();

        const operation = {
            description: operationDescription,
            timeSpent: 0
        }
        
        createOperation(taskID, operation, (data)=>{
            setOperationsList(prevList=>{
                return [data, ...prevList];
            })
        });

       // Hide new operation form
        setDisplayForm(false);
    
      // Reset operation form input
        setOperationDescription("");
    }
    //id - operation id
    const deleteOperation = (id) => {
        setOperationsList(prevOperationsList=>prevOperationsList.filter(operation=>operation.id !== id));
      };

    return (
        <> 
        {/* //if displayForm is true render <form/> */}
            {displayForm && (
                <div className="card-body">
                    <form onSubmit={addOperation}>
                        <div className="input-group">
                            <input type="text" 
                                className="form-control" 
                                placeholder="Operation description"
                                value={operationDescription}
                                onChange={e => setOperationDescription(e.target.value)} />
                            <div className="input-group-append">
                            <Button color={"info"} icon="fas fa-plus-circle">Add</Button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        
        <ul className="list-group list-group-flush">
            {operationsList.map((operation)=>{
                console.log(operation);
                    return <Operation  key={operation.id} {...operation} onRemoveOperation={deleteOperation} status={status}/>
            })}
        </ul>
      </>
      )
}

export default Operations;