
import "./To.css";
import React, { useState, useEffect } from "react";

function To
() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [completedCount, setCompletedCount] = useState(0);
  const [uncompletedCount, setUncompletedCount] = useState(0);

  useEffect(() => {
    let completed = 0;
    let uncompleted = 0;
    tasks.forEach(task => {
      if (task.completed) {
        completed++;
      } else {
        uncompleted++;
      }
    });
    setCompletedCount(completed);
    setUncompletedCount(uncompleted);
  }, [tasks]);

  const addTask = () => {
    const trimmedTask = taskInput.trim();
    if (!trimmedTask) {
      alert("Please write down a task");
      return;
    }

    setTasks([...tasks, { text: trimmedTask, completed: false }]);
    setTaskInput("");
  };

  const Completed = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    if (window.confirm("you want to delete this task?")) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && addTask()}
        placeholder="Add new todo"
      />
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {
                  Completed(index);
                  setCompletedCount(prevCount => prevCount + (task.completed ? -1 : 1));
                  setUncompletedCount(prevCount => prevCount + (task.completed ? 1 : -1));
                }}
              />
              <span>{task.text}</span>
            </label>
            <button onClick={() => editTask(index, prompt("Edit task:", task.text))}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <p>Completed: {completedCount}</p>
      <p>Uncompleted: {uncompletedCount}</p>
    </div>
  );
}

export default To;
