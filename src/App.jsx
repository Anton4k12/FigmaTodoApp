import PlusIcon from "@/assets/plus.svg?react";
import DeleteIcon from "@/assets/delete.svg?react";
import EditIcon from "@/assets/edit.svg?react";
import ConfirmIcon from "@/assets/confirm.svg?react";

import { useState } from "react";

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { name: inputValue, id: crypto.randomUUID(), done: false },
    ]);
    setInputValue("");
  };

  const handleDeleteTask = (idToDelete) => {
    setTasks(
      tasks.filter((task) => {
        return idToDelete !== task.id;
      }),
    );
  };

  const handleTaskDone = () => {
    setTasks([{ done: true }]);
  };

  const doneTasks = tasks.filter((task) => {
    return task.done;
  });

  console.log({ doneTasks });

  return (
    <div className="flex min-h-screen items-center justify-center bg-main-bg">
      <div className="flex min-w-[580px] flex-col justify-center gap-14 rounded-3xl bg-secondary-bg px-12 py-12">
        <div className="flex h-10 w-full items-center gap-2.5">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            value={inputValue}
            placeholder="Add a new task"
            className="h-full flex-1 rounded-[10px] border border-main-foreground bg-transparent px-3.5 placeholder:text-zinc-500 focus:outline-none"
          />

          <button
            onClick={handleAddTask}
            className="flex h-full w-10 items-center justify-center rounded-[10px] bg-main-foreground hover:opacity-90"
          >
            <PlusIcon className="size-7"></PlusIcon>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            {tasks.length === 0
              ? "You don't have any tasks yet"
              : `Tasks to do - ${tasks.length}`}
          </div>

          {tasks.map((task) => {
            return (
              <>
                <div
                  key={task.id}
                  className="flex justify-between rounded-[10px] bg-card p-5 text-main-foreground"
                >
                  {task.name}
                  <div className="flex gap-2">
                    <button onClick={() => handleDeleteTask(task.id)}>
                      <ConfirmIcon className="size-5"></ConfirmIcon>
                    </button>

                    <button>
                      <EditIcon className="size-5"></EditIcon>
                    </button>

                    <button onClick={() => handleTaskDone()}>
                      <DeleteIcon className="size-5"></DeleteIcon>
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
