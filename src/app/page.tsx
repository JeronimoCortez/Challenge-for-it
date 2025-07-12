"use client";

import { useEffect, useState } from "react";
import { useTask } from "./hooks/useTask";
import { taskStore } from "./store/taskStore";
import { Task } from "./models/task";
import { Icon } from "@iconify/react/dist/iconify.js";
import InfoTask from "./components/InfoTask";
import EditTask from "./components/EditTask";
import CreateTask from "./components/CreateTask";

const page = () => {
  const [filteredTask, setFilteredTask] = useState("");
  const [visibleTasks, setVisibleTasks] = useState<Task[]>([]);
  const [viewInfo, setViewInfo] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const { getTasks, deleteTaskHook } = useTask();
  const { setTaskActive } = taskStore();
  const tasks = taskStore((state) => state.tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      await getTasks();
      const latestTasks = taskStore.getState().tasks;
      setVisibleTasks(latestTasks);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    setVisibleTasks(tasks);
  }, [tasks]);

  const handleFilteredTask = (filter: "pending" | "completed") => {
    if (filteredTask === filter) {
      setFilteredTask("");
      setVisibleTasks(tasks);
    } else {
      setFilteredTask(filter);
      const filtered =
        filter === "pending"
          ? tasks.filter((t) => !t.completed)
          : tasks.filter((t) => t.completed);
      setVisibleTasks(filtered);
    }
  };

  const handleOpenInfo = (task: Task) => {
    setTaskActive(task);
    setViewInfo(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskActive(task);
    setEditTask(true);
  };

  const handleCreateTask = () => {
    setOpenCreateTask(true);
  };

  return (
    <div>
      <button
        onClick={handleCreateTask}
        className="all:unset cursor-pointer mx-auto block my-2 flex "
      >
        Crear tarea
        <Icon
          className="bg-green-500 mx-1 rounded-full text-white"
          icon="material-symbols-light:add"
          width="24"
          height="24"
        />
      </button>
      <div className="text-center mx-auto">
        <input
          onChange={() => handleFilteredTask("pending")}
          checked={filteredTask === "pending"}
          id="pending"
          type="checkbox"
          className="mx-2 cursor-pointer"
        />
        <label htmlFor="pending">Mostrar solo pendientes</label>

        <input
          onChange={() => handleFilteredTask("completed")}
          checked={filteredTask === "completed"}
          id="completed"
          type="checkbox"
          className="mx-2 cursor-pointer"
        />
        <label htmlFor="completed">Mostrar solo completadas</label>
      </div>
      {visibleTasks.length === 0 ? (
        <div className="text-center">
          <p>No hay tareas para mostrar</p>
        </div>
      ) : (
        <div className="flex w-full  justify-center flex-wrap gap-2 mt-2">
          {visibleTasks.map((t: Task, index: number) => (
            <div
              key={index}
              className=" rounded shadow-lg w-[20rem] h-[10rem]  p-4"
            >
              <p
                className={`${
                  t.completed ? "text-green-500" : "text-yellow-500"
                }`}
              >
                {t.title}
              </p>
              <p>{t.description}</p>
              <p className="font-bold">
                {t.completed ? "COMPLETADO" : "PENDIENTE"}
              </p>
              <div className="flex justify-center gap-2">
                <div
                  onClick={() => handleOpenInfo(t)}
                  className="cursor-pointer  rounded-full bg-gray-400 p-1"
                >
                  <Icon
                    className="text-[#fff]"
                    icon="material-symbols-light:info-i"
                    width="24"
                    height="24"
                  />
                </div>
                <div
                  onClick={() => handleEditTask(t)}
                  className="cursor-pointer  rounded-full bg-orange-500 p-1"
                >
                  <Icon
                    className="text-[#fff]"
                    icon="material-symbols-light:edit-outline"
                    width="24"
                    height="24"
                  />
                </div>
                <div
                  onClick={() => deleteTaskHook(t.id)}
                  className="cursor-pointer  rounded-full bg-red-500 p-1"
                >
                  <Icon
                    className="text-[#fff]"
                    icon="material-symbols-light:delete"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {viewInfo && <InfoTask onClose={() => setViewInfo(false)} />}
      {editTask && <EditTask onClose={() => setEditTask(false)} />}
      {openCreateTask && (
        <CreateTask onClose={() => setOpenCreateTask(false)} />
      )}
    </div>
  );
};

export default page;
