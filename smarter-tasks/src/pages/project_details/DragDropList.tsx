import { useTasksDispatch } from "../../context/task/context";
import {
  AvailableColumnsType,
  ProjectDataType,
} from "../../context/task/types";

import React from "react";
import Column from "./Column";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";

import { useParams } from "react-router-dom";

import { reorderTasks, updateTask } from "../../context/task/actions";

const Container = (props: React.PropsWithChildren) => {
  return <div className="flex">{props.children}</div>;
};

export default function (props: { data: ProjectDataType }) {
  const { pid } = useParams();
  const taskDispatch = useTasksDispatch();

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const skey = source.droppableId as AvailableColumnsType;
    const fkey = destination.droppableId as AvailableColumnsType;
    const finish = props.data.columns[fkey];
    const start = props.data.columns[skey];

    if (start === finish) {
      const nTaskIDs = Array.from(start.taskIDs);
      nTaskIDs.splice(source.index, 1);
      nTaskIDs.splice(destination.index, 0, draggableId);
      const nColumn = {
        ...start,
        taskIDs: nTaskIDs,
      };
      const nState = {
        ...props.data,
        columns: {
          ...props.data.columns,
          [nColumn.id]: nColumn,
        },
      };
      reorderTasks(nState, taskDispatch);
      return;
    }

    const sTaskIDs = Array.from(start.taskIDs);

    const uItems = sTaskIDs.splice(source.index, 1);

    const nStart = {
      ...start,
      taskIDs: sTaskIDs,
    };

    const fTaskIDs = Array.from(finish.taskIDs);

    fTaskIDs.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIDs: fTaskIDs,
    };

    const nState = {
      ...props.data,
      columns: {
        ...props.data.columns,
        [nStart.id]: nStart,
        [newFinish.id]: newFinish,
      },
    };
    reorderTasks(nState, taskDispatch);
    const uTask = props.data.tasks[uItems[0]];
    uTask.state = fkey;
    updateTask(pid ?? "", uTask, taskDispatch);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {props.data.columnOrder.map((colID) => {
          const column = props.data.columns[colID];
          const tasks = column.taskIDs.map(
            (taskID: any) => props.data.tasks[taskID],
          );
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
}
