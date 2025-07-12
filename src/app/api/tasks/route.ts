import { Task } from "@/app/models/task";
import { createTaskService, getAllTasks } from "@/app/services/taskService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const tasks = getAllTasks();
    if (tasks.length === 0) {
      return NextResponse.json({ tasks: [] }, { status: 200 });
    }

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching to tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    if (!body.title || !body.description) {
      return NextResponse.json(
        { message: "Invalid task data" },
        { status: 400 }
      );
    }

    const taskCreate: Task = {
      id: crypto.randomUUID(),
      title: body.title,
      description: body.description,
      completed: false,
      createdAt: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDay()
      ),
    };

    createTaskService(taskCreate);

    return NextResponse.json(taskCreate, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error create tasks" },
      { status: 500 }
    );
  }
}
