import PlusIcon from "@/assets/plus.svg?react";
import DeleteIcon from "@/assets/delete.svg?react";
import EditIcon from "@/assets/edit.svg?react";
import ConfirmIcon from "@/assets/confirm.svg?react";
import CancelIcon from "@/assets/cancel.svg?react";

import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const App = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
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
