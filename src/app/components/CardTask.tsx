import { FC } from "react";
import { Task } from "../models/task";
import { Icon } from "@iconify/react";

interface IPropsCardTask {
  task: Task;
}

const CardTask: FC<IPropsCardTask> = ({ task }) => {
  const handleInfoIcon = () => {};
  return (
    <div>
      <h5>{task.title}</h5>
      <p>{task.description}</p>
      <p>Completada: {task.completed ? "SI" : "NO"}</p>
      <button onClick={handleInfoIcon}>
        <Icon icon="material-symbols-light:info-i" width="24" height="24" />
      </button>
      <button>
        <Icon
          icon="material-symbols-light:edit-outline-rounded"
          width="24"
          height="24"
        />
      </button>
    </div>
  );
};

export default CardTask;
