import PlusIcon from "@/assets/plus.svg?react";
import DeleteIcon from "@/assets/delete.svg?react";
import EditIcon from "@/assets/edit.svg?react";
import ConfirmIcon from "@/assets/confirm.svg?react";
import CancelIcon from "@/assets/cancel.svg?react";

import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const initialId = crypto.randomUUID();

export const App = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", [
    { name: "learn react", id: initialId, done: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [editingTaskId, setEditingTaskId] = useState();

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

  const handleTaskDone = (confirmedTaskId) => {
    const nextTasks = tasks.map((task) => {
      if (task.id === confirmedTaskId) {
        return { ...task, done: true };
      } else return task;
    });
    setTasks(nextTasks);
  };

  const handleEditTask = (idToEdit) => {
    setEditingTaskId(idToEdit);
  };

  const handleEditConfirm = (newName) => {
    const nextEditedTasks = tasks.map((task) => {
      if (task.id === editingTaskId) {
        return { ...task, name: newName };
      } else return task;
    });
    setTasks(nextEditedTasks);
    setEditingTaskId(undefined);
  };

  const handleEditCancel = () => {
    setEditingTaskId(undefined);
  };

  const doneTasks = tasks.filter((task) => {
    return task.done;
  });

  const undoneTasks = tasks.filter((task) => {
    return !task.done;
  });

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-main-bg">
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
            {undoneTasks.length === 0 ? (
              <p className="text-center text-white/65">
                You don't have tasks to do yet
              </p>
            ) : (
              `Tasks to do - ${undoneTasks.length}`
            )}
          </div>

          {undoneTasks.map((task) => {
            return task.id !== editingTaskId ? (
              <Task
                task={task}
                onTaskDelete={handleDeleteTask}
                onTaskDone={handleTaskDone}
                onTaskEdit={handleEditTask}
              ></Task>
            ) : (
              <EditingTask
                task={task}
                onEditConfirm={handleEditConfirm}
                onEditCancel={handleEditCancel}
              ></EditingTask>
            );
          })}
        </div>

        {doneTasks.length > 0 && (
          <div className="flex flex-col gap-4">
            <div>Done - {doneTasks.length}</div>

            {doneTasks.map((task) => {
              return (
                <>
                  <div
                    key={task.id}
                    className="flex justify-between rounded-[10px] bg-card p-5 text-[#78CFB0] line-through"
                  >
                    {task.name}
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-1/2 flex w-fit -translate-x-1/2 items-center bg-black text-xs text-white/40">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div> made by </div>
            <a target="_blank" href="https://github.com/Anton4k12">
              Anton4k12
            </a>
          </div>
          <a target="_blank" href="https://github.com/Anton4k12">
            <svg
              height={20}
              aria-hidden="true"
              viewBox="0 0 24 24"
              width={20}
              data-view-component="true"
              className="octicon octicon-mark-github v-align-middle color-fg-default"
            >
              <path
                d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"
                className="fill-white/40"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

function Task({ task, onTaskDone, onTaskDelete, onTaskEdit }) {
  return (
    <div
      key={task.id}
      className="flex justify-between rounded-[10px] bg-card p-5 text-main-foreground"
    >
      {task.name}
      <div className="flex gap-2">
        <button onClick={() => onTaskDone(task.id)}>
          <ConfirmIcon className="size-5"></ConfirmIcon>
        </button>

        <button onClick={() => onTaskEdit(task.id)}>
          <EditIcon className="size-5"></EditIcon>
        </button>

        <button onClick={() => onTaskDelete(task.id)}>
          <DeleteIcon className="size-5"></DeleteIcon>
        </button>
      </div>
    </div>
  );
}

function EditingTask({ task, onEditConfirm, onEditCancel }) {
  const [editingInputText, setEditingInputText] = useState(task.name);
  return (
    <div
      key={task.id}
      className="flex justify-between rounded-[10px] bg-card p-5 text-main-foreground"
    >
      <input
        type="text"
        value={editingInputText}
        onChange={(e) => setEditingInputText(e.target.value)}
        className="-translate-x-1 rounded-[10px] border border-main-foreground bg-transparent px-1 py-0.5 ring-main-foreground focus:outline-none focus:ring"
      />
      <div className="flex gap-2">
        <button onClick={() => onEditConfirm(editingInputText)}>
          <ConfirmIcon className="size-5"></ConfirmIcon>
        </button>

        <button onClick={() => onEditCancel(task.id)}>
          <CancelIcon className="size-5"></CancelIcon>
        </button>
      </div>
    </div>
  );
}
