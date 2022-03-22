import React, { useState } from "react";
import styles from "./TaskAdd.module.scss";
import { MdEditNote } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";

const TaskAdd = ({ AddNewTitle }) => {
  const [addTask, setAddTask] = useState("");

  const handleAddItem = (event) => {
    event.preventDefault();
    if (addTask.trim().length > 0) {
      AddNewTitle(addTask);
      setAddTask("");
    }
  };

  const onChangeText = (event) => {
    const newTask = event.target.value;
    setAddTask(newTask);
  };

  return (
    <form className={styles.form} onSubmit={handleAddItem}>
      <MdEditNote className={styles.svgIcon} size="28px" />
      <input
        className={styles.new__item}
        placeholder="Enter your task..."
        value={addTask}
        onChange={onChangeText}
      />
      <BsPlusCircleFill
        className={`${styles.svgIcon} ${styles.iconPlus}`}
        size="28px"
        onClick={handleAddItem}
      />
    </form>
  );
};

export default TaskAdd;
