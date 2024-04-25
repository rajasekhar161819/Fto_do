import './App.css';
import React, { useState, useEffect} from "react";
import axios from 'axios';

function App() {
  const [taskList, settaskList] = useState([]);
  const [taskData, setTaskData] = useState({ title: "", body: ""});
  
  const [editTask, setEditTask] = useState(null);
  const [editedTaskData, setEditedTaskData] = useState({ title: "", body: ""});

  useEffect(() => {fetchTasks()}, []);

  const fetchTasks = ()=>{
    axios
    .get('http://127.0.0.1:8000/api')
    .then(res => {settaskList(res.data)})
    .catch(err => {console.log(err)});
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setTaskData({
      ...taskData,
      [e.target.name]: value
    });
  };

  const handleCreate = (e)=>{
    e.preventDefault()
    axios
        .post('http://127.0.0.1:8000/api/', taskData)
        .then(() => fetchTasks())
        .catch((error) =>{ console.error('Error deleting task:', error)      
      })
    setTaskData({ title: '', body: '',});
  };

  const handleEditChange = (e) => {
    const value = e.target.value;
    setEditedTaskData({
      ...editedTaskData,
      [e.target.name]: value
    });
  };


  const handleEditClick = (task) => {
    setEditTask(task);
    setEditedTaskData({title: task.title, body: task.body });
  };

  const handleEditSave = () => {
      axios.put(`http://127.0.0.1:8000/api/${editTask.id}/`, editedTaskData)
           .then(() => fetchTasks())
           .catch((error) =>{ console.error('Error deleting task:', error)});
      setEditTask(null);
      setEditedTaskData({title: '', body: '',});
  };

  const handleDelete = (task) => {
    axios
      .delete(`http://127.0.0.1:8000/api/${task}/`)
      .then(() => fetchTasks())
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <>
    <div className="all">
      <h1>Todo List</h1>
      <div className="header">
                <form action=""  onSubmit={handleCreate} >
                    <input placeholder="Enter Task Title" type="text" name="title" value={taskData.title} onChange={handleChange} />
                    <br />
                    <input placeholder="Eneter Task Description" type="text" value={taskData.body} name="body" onChange={handleChange} />
                    <br />
                    <button type="submit">Create</button>
                </form>
            </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              taskList.map((element,index) =>
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{element.title}</td>
                  <td>{element.body}</td>
                  <td>
                    <button type="submit" id="DeleteButton" onClick={()=>handleDelete(element.id)}>Delete</button>
                    </td>
                  <td>  
                    <button type="submit" onClick={() => handleEditClick(element)} id="EditButton">Edit</button>
                  </td>
                </tr>
                )
            }    
          </tbody>   
        </table>

        {editTask && (
        <div className="edit-popup">
          <h2>Edit Task</h2>
          <label htmlFor="editedTitle">Title:</label>
          <input type="text" id="editedTitle" Value={editedTaskData.title} name="title" onChange={handleEditChange}/>
          <label htmlFor="editedBody">Body:</label>
          <textarea id="editedBody" defaultValue={editedTaskData.body} name="body" onChange={handleEditChange}/>
          <button type="button" onClick={handleEditSave}> Save </button>
        </div>
      )}
      </div>
    </div>
    </>
  );
}

export default App;
