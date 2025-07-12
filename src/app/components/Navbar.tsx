"use client";
import { Icon } from "@iconify/react";
import { ChangeEvent, useState } from "react";
import { Task } from "../models/task";
import { useMemo } from "react";

import { taskStore } from "../store/taskStore";
import Fuse from "fuse.js";
import { getAllTasks } from "../services/taskService";
import { useTask } from "../hooks/useTask";

const Navbar = () => {
  const [input, setInput] = useState("");
  const { tasks, setTasks } = taskStore();
  const { getTasks } = useTask();

  const fuse = useMemo(() => {
    return new Fuse(tasks, {
      keys: ["title"],
      threshold: 0.3,
    });
  }, [tasks]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleSearch = async () => {
    await getTasks();
    if (!input.trim()) return;
    const result = fuse.search(input).map((r) => r.item);
    setTasks(result);
    console.log("result: ", result);
  };

  return (
    <div className="flex justify-around items-center w-full h-[50px] bg-[#8A8CED]/50">
      <div className=" flex rounded-full bg-[#fff] w-[15rem] ">
        <Icon
          className="cursor-pointer"
          icon="material-symbols-light:search-rounded"
          width="24"
          height="24"
          onClick={handleSearch}
        />
        <input
          className="flex-1 bg-transparent border-none outline-none text-black placeholder-gray-400"
          type="text"
          placeholder="Buscar"
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
    </div>
  );
};

export default Navbar;
