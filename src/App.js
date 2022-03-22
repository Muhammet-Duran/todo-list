import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import styles from "./App.module.scss";
import TaskAdd from "./components/TaskAdd/TaskAdd";
import TaskList from "./components/TaskList.js/TaskList";

const initialState = [
  { id: nanoid(), title: "Shopping", completed: true },
  { id: nanoid(), title: "Take a rest", completed: false },
  { id: nanoid(), title: "Have dinner", completed: false },
  { id: nanoid(), title: "Go to work", completed: false },
];

function App() {
  const [task, setTask] = useState(initialState);
  const [isActive, setIsActive] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");

  //1--> New add item
  const AddNewTitle = (item) => {
    const newTitle = {
      id: nanoid(),
      title: item,
      completed: false,
    };
    const newTaskList = [...task, newTitle];
    setTask(newTaskList);
  };

  //2-->Delete ıtem
  const markItem = (id) => {
    setTask(
      task.map((el) =>
        el.id === id ? { ...el, completed: !el.completed } : el
      )
    );
  };

  //4---> ALl ıtem make false or true
  const allMarkCompleted = () => {
    const isAllTrue = task.every((el) => el.completed === true);
    setTask(task.map((el) => ({ ...el, completed: isAllTrue ? false : true })));
    if (isAllTrue) return isActive;
  };

  //3-->Clear completed
  const handleDeleteCompleted = () => {
    const activeTask = task.filter((item) => !item.completed);
    setTask(activeTask);
  };

  //5-->Select element to edit
  const handleEditChange = (id, text) => {
    setEditId(id);
    setEditInput(text);
  };

  //6-->Edit task
  const editTask = (id, text) => {
    if (text.trim().length > 0) {
      let editTasks = task.map((item) => {
        if (item.id === id) {
          item.title = text;
          item.completed = false;
        }
        return item;
      });
      setTask(editTasks);
    }
    setEditId(null);
  };

  //7---> taskLeftLength
  const leftItem = task.filter((item) => !item.completed);
  const taskLength = leftItem.length;

  //local storage getItem
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("task-list"));
    if (savedTasks) {
      setTask(savedTasks);
    }
  }, []);

  //Local Storage setItem
  useEffect(() => {
    localStorage.setItem("task-list", JSON.stringify(task));
  }, [task]);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>TODO LİST</h1>
      <div className={styles.todo__area}>
        <TaskAdd AddNewTitle={AddNewTitle} />
        <TaskList
          // isActive={isActive}
          taskLength={taskLength}
          tasks={task}
          setTask={setTask}
          markItem={markItem}
          handleDeleteCompleted={handleDeleteCompleted}
          allMarkCompleted={allMarkCompleted}
          isActive={isActive}
          editId={editId}
          handleEditChange={handleEditChange}
          editInput={editInput}
          setEditInput={setEditInput}
          editTask={editTask}
        />
      </div>
    </div>
  );
}

export default App;
