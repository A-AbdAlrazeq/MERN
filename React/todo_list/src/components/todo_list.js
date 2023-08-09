import React, { useState, useEffect } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage on component mount
  /* localStorage.getItem('tasks') retrieves the stored data from the tasks key in the localStorage.
JSON.parse() is used to parse the retrieved JSON data and convert it into a JavaScript array.
|| [] is used to provide an empty array as a default value in case there are no saved tasks in the localStorage.
setTasks(savedTasks) updates the state with the retrieved tasks, initializing the tasks state with the tasks loaded from localStorage.*/
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  /* localStorage.setItem('tasks', JSON.stringify(tasks)) stores the current tasks array in the localStorage as a JSON string.
[tasks] is the dependency array passed as the second argument to the useEffect hook. This ensures that the hook runs whenever the tasks state changes.*/
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj = {
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="todo-list">
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <span
              className={task.completed ? "completed" : ""}
              onClick={() => toggleTaskCompletion(index)}
            >
              {task.text}
            </span>
            <button onClick={() => removeTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
