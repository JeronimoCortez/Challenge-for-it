import { Task } from "@/app/models/task";
import {
  deleteTask,
  getTaskById,
  updateTaskService,
} from "@/app/services/taskService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const task = getTaskById(id);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fethcing task" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const body: Partial<Task> = await request.json();
    if (!body) {
      return NextResponse.json(
        { message: "Invalid updated data" },
        { status: 400 }
      );
    }
    const updatedTask = updateTaskService(id, body);

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating tasks" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deletedTask = deleteTask(id);
    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting tasks" },
      { status: 500 }
    );
  }
}
