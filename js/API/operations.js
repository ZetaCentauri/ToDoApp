import { API_KEY, API_URL } from "./API";

/**
 * Fetch all operations
 * @param {string} id - ID of task
 * @param {function} successCallback - Function that saves incoming data
 */

export const getOperations = (id, successCallback) => {
  fetch(`${API_URL}/tasks/${id}/operations`, {
    headers: {
      Authorization: API_KEY,
    },
  })
    .then((r) => r.json())
    .then((data) => {
      if (data.error === false && typeof successCallback === "function") {
        successCallback(data.data);
      }
    })
    .catch((err) => console.log(err));
};

export const createOperation = (id, operation, successCallback) => {
  fetch(`${API_URL}/tasks/${id}/operations`, {
    headers: {
      "Authorization": API_KEY,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(operation)
  })
  .then(r=>r.json())
  .then(data=>{
    if(data.error === false && typeof successCallback === "function") {
      successCallback(data.data);
    }
  })
  .catch();
}