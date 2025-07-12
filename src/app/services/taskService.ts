import { Task } from "../models/task";

let tasks: Task[] = [
  {
    id: crypto.randomUUID(),
    title: "Realizar backend challenge",
    description: "Crear CRUD de tareas y realizar pruebas en postman",
    completed: true,
    createdAt: new Date(2025, 7, 10),
  },
  {
    id: crypto.randomUUID(),
    title: "Realizar frontend challenge",
    description: "Crear vistas y formularios",
    completed: false,
    createdAt: new Date(2025, 7, 10),
  },
];

export function getAllTasks() {
  return tasks;
}

export function getTaskById(id: string) {
  const task = tasks.find((t) => t.id === id);
  return task;
}

export function createTaskService(task: Task) {
  tasks.push(task);
  return task;
}

export function deleteTask(id: string): Task | null {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const [deleted] = tasks.splice(index, 1);
  return deleted;
}

export function updateTaskService(
  id: string,
  updateData: Partial<Task>
): Task | null {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  console.log("Current tasks", tasks);

  tasks[index] = { ...tasks[index], ...updateData };
  return tasks[index];
}
