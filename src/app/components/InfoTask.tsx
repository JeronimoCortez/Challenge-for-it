import { FC } from "react";
import { Task } from "../models/task";
import { taskStore } from "../store/taskStore";
import { Icon } from "@iconify/react/dist/iconify.js";

type IPropsInfoTask = {
  onClose: VoidFunction;
};

const InfoTask: FC<IPropsInfoTask> = ({ onClose }) => {
  const { taskActive } = taskStore();
  return (
    <div className="absolute z-[999] bg-[#D9D9D9]/75 w-[100vw] h-[100vh] top-0 left-0 flex justify-center items-center">
      <div
        className={`${
          taskActive!.completed ? "bg-green-200" : " bg-yellow-200"
        } relative font-semibold  p-6 rounded`}
      >
        <Icon
          className="cursor-pointer absolute right-1 top-1 "
          onClick={onClose}
          icon="material-symbols-light:close"
          width="24"
          height="24"
        />
        <p>{taskActive!.title}</p>
        <p>{taskActive!.description}</p>
        <p>{taskActive!.completed ? "Completada" : "Pendiente"}</p>
        <p>
          Creado: {new Date(taskActive!.createdAt).toISOString().split("T")[0]}
        </p>
      </div>
    </div>
  );
};

export default InfoTask;
