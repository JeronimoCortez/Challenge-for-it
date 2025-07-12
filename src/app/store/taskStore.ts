import { create } from "zustand";
import { Task } from "../models/task";
import { deleteTask } from "../services/taskService";

interface ITaskStore {
  tasks: Task[];
  taskActive: Task | null;
  setTaskActive: (task: Task) => void;
  setTasks: (tasks: Task[]) => void;
  createTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export const taskStore = create<ITaskStore>((set) => ({
  tasks: [],
  taskActive: null,
  setTaskActive: (task) => set(() => ({ taskActive: task })),
  setTasks: (tasks) => set(() => ({ tasks: tasks })),
  createTask: (newTask) =>
    set((state) => ({ tasks: [...state.tasks, newTask] })),
  updateTask: (updateTask) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === updateTask.id ? { ...t, ...updateTask } : t
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
}));
