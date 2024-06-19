import React from "react";
import "./TaskCard.css";

interface TaskCardProps {
  dueDate?: string;
  completedAtDate?: string;
  title: string;
  assigneeName: string;
}

const TaskCard = (props: TaskCardProps) => {
  return (
    <div className="TaskItem">
      <h2 className="text-xl font-bold"> {props.title} </h2>
      {props.dueDate && <p>Due on: {props.dueDate}</p>}
      {props.completedAtDate && <p>Completed on: {props.completedAtDate}</p>}
      <p>Assignee: {props.assigneeName} </p>
    </div>
  );
};

export default TaskCard;
