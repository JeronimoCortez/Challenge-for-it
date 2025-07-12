import { useShallow } from "zustand/shallow";
import { taskStore } from "../store/taskStore";
import { createTaskService } from "../services/taskService";
import { Task } from "../models/task";
import Swal from "sweetalert2";

export const useTask = () => {
  const { tasks, setTasks, createTask, updateTask, deleteTask } = taskStore(
    useShallow((state) => ({
      tasks: state.tasks,
      setTasks: state.setTasks,
      createTask: state.createTask,
      updateTask: state.updateTask,
      deleteTask: state.deleteTask,
    }))
  );
  const getTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.log("Error fetching tasks");
    }
  };

  const updateTaskHook = async (id: string, updateData: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la tarea");
      }

      const updatedTask: Task = await response.json();
      console.log(updatedTask);
      updateTask(updatedTask);

      Swal.fire(
        "¡Actualizó con éxito!",
        "La tarea se actualizó con éxito",
        "success"
      );
    } catch (error) {
      console.log("Error updating tasks", error);
      Swal.fire("Error", "No se pudo actualizar la tarea", "error");
    }
  };

  const createTaskHook = async (data: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al crear la tarea");
      }

      const createdTask: Task = await response.json();
      console.log(createdTask);
      createTask(createdTask);

      Swal.fire("Creó con éxito!", "La tarea se creo con éxito", "success");
    } catch (error) {
      console.log("Error creating tasks", error);
      Swal.fire("Error", "No se pudo crear la tarea", "error");
    }
  };

  const deleteTaskHook = async (id: string) => {
    const confirm = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      deleteTask(id);
      Swal.fire(
        "Elimino con éxito!",
        "La tarea se elimino con éxito",
        "success"
      );
    } catch (error) {
      console.log("Error deleting tasks", error);
      Swal.fire("Error", "No se pudo eliminar la tarea", "error");
    }
  };
  return {
    getTasks,
    deleteTaskHook,
    updateTaskHook,
    createTaskHook,
  };
};
