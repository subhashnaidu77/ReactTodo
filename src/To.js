import React, { useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [completedCount, setCompletedCount] = useState(0);
  const [uncompletedCount, setUncompletedCount] = useState(0);

  const updateCounts = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    setCompletedCount(completedTasks);
    setUncompletedCount(tasks.length - completedTasks);
  };

  const addTask = () => {
    const trimmedTask = taskInput.trim();
    if (!trimmedTask) {
      alert("Please write down a task");
      return;
    }

    setTasks([...tasks, { text: trimmedTask, completed: false }]);
    setTaskInput("");
    updateCounts();
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    updateCounts();
  };

  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
      updateCounts();
    }
  };

  return (
    <div>
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
                onChange={() => toggleCompleted(index)}
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

export default TodoList;
