import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import { ColumnDataType, TaskDetailsType } from "../../context/task/types";
import { forwardRef } from "react";

const Title = (props: React.PropsWithChildren) => {
  return <h3 className="text-xl font-semibold mb-4">{props.children}</h3>;
};

const Container = (props: React.PropsWithChildren) => {
  return <div className="bg-gray-200 p-4 rounded-lg">{props.children}</div>;
};

interface Props {
  column: ColumnDataType;
  tasks: TaskDetailsType[];
}

const TaskList = forwardRef<HTMLDivElement | null, React.PropsWithChildren>(
  (props: React.PropsWithChildren, ref) => {
    return (
      <div ref={ref} {...props}>
        {props.children}
      </div>
    );
  },
);

const Column: React.FC<Props> = (props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
      <Container>
        <Title>{props.column.title}</Title>
        <Droppable droppableId={props.column.id}>
          {(provided) => (
            <TaskList ref={provided.innerRef} {...provided.droppableProps}>
              {props.tasks.map((task, indexValue) => (
                <Task key={task.id} task={task} index={indexValue} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    </div>
  );
};

export default Column;
