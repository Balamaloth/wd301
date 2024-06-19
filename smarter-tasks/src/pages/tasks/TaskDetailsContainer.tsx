import { useProjectsState } from "../../context/projects/context";
import TaskDetails from "./TaskDetails";
import { useParams } from "react-router-dom";
import { useTasksState } from "../../context/task/context";

const TaskDetailsContainer = () => {
  const pState = useProjectsState();
  const tLState = useTasksState();
  const { tid } = useParams();
  const loading = tLState.isLoading;
  const sTask = tLState.projectData.tasks?.[tid || ""];

  if (loading || !pState || pState?.isLoading) {
    return <>Loading...</>;
  }
  if (!sTask) {
    return <>No such task!</>;
  }

  return <TaskDetails />;
};

export default TaskDetailsContainer;
