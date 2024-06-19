import { TasksProvider } from "../../context/task/context";
import { Outlet } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";

export default function ProjectDetailsIndex() {
  return (
    <>
      <TasksProvider>
        <ProjectDetails />
        <Outlet />
      </TasksProvider>
    </>
  );
}
