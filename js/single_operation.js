import React from "react";
import { removeOperation, updateOperation } from "./API/operations";
import { useState } from "react";
import Button from "./button";

const Operation = ({description, id, timeSpent: _timeSpent, onRemoveOperation, status}) => {

  const [timeSpent,setTimeSpent] = useState(_timeSpent);
  const [displayTimeInput, setDisplayTimeInput] = useState(false);
  const [timeInput, setTimeInput] = useState("");


  const saveTime = (e) => {
    e.preventDefault();

    //Validattion
    if(isNaN(parseInt(timeInput)) || timeInput < 0) {
      return;
    }

    const operation = {
      description,
      timeSpent: parseInt(timeInput) + parseInt(timeSpent)
    }

    updateOperation(id, operation, ()=>setTimeSpent(operation.timeSpent))

    setDisplayTimeInput(false);
  }

  const deleteOperation = () => {
    removeOperation(id, ()=>onRemoveOperation(id));
  }

  const hours = Math.floor(timeSpent / 60);
  const minutes = timeSpent % 60;


return (
<li className="list-group-item d-flex justify-content-between align-items-center">
  <div>
    {description}

    {/* <!-- Czas wyświetlany tylko jeżeli większy od 0 --> */}
    {timeSpent > 0 && (
      <span className="badge badge-success badge-pill ml-2"> {hours}h {minutes}m </span>
    )}
  </div>

  {/* <!-- Formularz wyświetlany po naciśnięciu "Add time", po zapisie czasu znika --> */}
  {displayTimeInput && (
    <form onSubmit={saveTime}>
    <div className="input-group input-group-sm">
      <input type="number" 
      className="form-control" 
      placeholder="Spent time in minutes" 
      value={timeInput}
      onChange={e=>setTimeInput(e.target.value)}
      style={{width: "12rem" }}/>
      <div className="input-group-append">
        <Button color="success" outline={true} icon="fas fa-save" />
        <Button color="dark" outline={true} icon="fas fa-times false"/>
      </div>
    </div>
  </form>
  )}
  

  {/* <!-- div wyświetlany domyślnie, znika po wciśnięciu "Add time" --> */}
  {!displayTimeInput && (
    <div>
    {/* <!-- Przycisk widoczny tylko jeżeli status zadania jest "open" --> */}
    {status === "open" && (
      <Button color="success" outline={true} small={true} icon="fas fa-clock ml-1" className={"mr-2"} onClick={()=>setDisplayTimeInput(true)}>Add time</Button>
    )}
    <Button color="danger" outline={true} small={true} icon="fas fa-trash" onClick={deleteOperation}/>
  </div>
  )}
  
</li>
)
}

export default Operation;