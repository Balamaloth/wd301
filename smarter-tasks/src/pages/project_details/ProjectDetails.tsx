import DragDropList from "./DragDropList";
import { Link, useParams } from "react-router-dom";
import { useProjectsState } from "../../context/projects/context";
import { useTasksDispatch, useTasksState } from "../../context/task/context";

import { useEffect } from "react";

import { refreshTasks } from "../../context/task/actions";

const ProjectDetails = () => {
  const taskDispatch = useTasksDispatch();
  const projectState = useProjectsState();
  const tState = useTasksState();

  const { pid } = useParams();
  useEffect(() => {
    if (pid) refreshTasks(taskDispatch, pid);
  }, [pid, taskDispatch]);

  const sProject = projectState?.projects.filter(
    (proj) => `${proj.id}` === pid,
  )?.[0];

  if (tState.isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!sProject) {
    return <div className="text-center mt-8">No such Project!</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">{sProject.name}</h2>
        <Link to={`tasks/new`}>
          <button
            id="newTaskBtn"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            New Task
          </button>
        </Link>
      </div>
      <div>
        <DragDropList data={tState.projectData} />
      </div>
    </div>
  );
};

export default ProjectDetails;
