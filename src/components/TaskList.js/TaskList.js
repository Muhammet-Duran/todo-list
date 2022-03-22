import React from "react";
import { MdOutlineCheckCircleOutline, MdClose } from "react-icons/md";
import { BsListCheck } from "react-icons/bs";
import Button from "./../../UI/Button";
import styles from "./TaskList.module.scss";

const TaskList = ({
  tasks,
  markItem,
  setTask,
  handleDeleteCompleted,
  allMarkCompleted,
  isActive,
  editId,
  handleEditChange,
  editInput,
  setEditInput,
  editTask,
  taskLength,
}) => {
  const handleMarkItem = (id) => {
    markItem(id);
  };

  const handleItemDelete = (id) => {
    const newList = tasks.filter((task) => task.id !== id);
    setTask(newList);
  };

  return (
    <div className={styles.list__area}>
      <div className={styles.action__area}>
        <BsListCheck
          size="42px"
          className={`${styles.selectAll__Svg} ${isActive && styles.active}`}
          onClick={allMarkCompleted}
        />
        <Button onClick={handleDeleteCompleted}>CLEAR COMPLETED</Button>
      </div>
      <ul className={styles.tasklist}>
        {tasks.map((task) => (
          <li className={styles.tasklist__item} key={task.id}>
            <MdOutlineCheckCircleOutline
              size="36px"
              className={`${styles.itemSvg} ${
                task.completed ? styles.mark : ""
              }`}
              onClick={() => handleMarkItem(task.id)}
            />
            {editId === task.id ? (
              <form
                className={styles.tasklist__item__form}
                onSubmit={(e) => editTask(task.id, editInput)}
              >
                <input
                  className={styles.edit__input}
                  value={editInput}
                  onChange={(event) => setEditInput(event.target.value)}
                />
              </form>
            ) : (
              <span
                className={`${styles.tasklist__item__title} ${
                  task.completed ? styles.mark : ""
                }`}
                onClick={() => handleEditChange(task.id, task.title)}
              >
                {task.title}
              </span>
            )}

            <MdClose
              className={`${styles.itemSvg} ${styles.closeSvg}`}
              size="36px"
              onClick={() => handleItemDelete(task.id)}
            />
          </li>
        ))}
      </ul>
      <div className={styles.list__area__info}>
        {taskLength !== 0 ? (
          <p>
            <span className={styles.list__area__info__number}>
              {taskLength}
            </span>{" "}
            items left
          </p>
        ) : (
          <p style={{ textAlign: "center" }}>Tasks completed 😀</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
