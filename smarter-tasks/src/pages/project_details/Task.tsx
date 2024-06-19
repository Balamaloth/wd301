import React, { forwardRef } from "react";
import "./TaskCard.css";
import { Link, useParams } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import { useTasksDispatch } from "../../context/task/context";
import { TaskDetailsType } from "../../context/task/types";
import { deleteTask } from "../../context/task/actions";

const Task = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{ task: TaskDetailsType }>
>((props, ref) => {
  const { task } = props;
  const taskDispatch = useTasksDispatch();
  const { pid } = useParams();
  return (
    <div
      ref={ref}
      {...props}
      className="bg-white p-4 rounded-lg shadow-md mb-4"
    >
      <Link to={`tasks/${task.id}`}>
        <div>
          <div>
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p className="text-gray-600">
              {new Date(task.dueDate).toDateString()}
            </p>
            <p className="text-gray-800">Description: {task.description}</p>
            <p className="text-gray-800">
              Assignee: {task.assignedUserName ?? "-"}
            </p>
          </div>
          <button
            onClick={(event) => {
              event.preventDefault();
              deleteTask(pid ?? "", task, taskDispatch);
            }}
            className="text-red-500 deleteTaskButton hover:text-red-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 fill-red-200 hover:fill-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </button>
        </div>
      </Link>
      <div></div>
    </div>
  );
});

export default function Container(
  props: React.PropsWithChildren<{ index: number; task: TaskDetailsType }>,
) {
  return (
    <>
      <Draggable index={props.index} draggableId={`${props.task.id}`}>
        {(provided) => (
          <Task
            task={props.task}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          />
        )}
      </Draggable>
    </>
  );
}
