import { Navigate, createBrowserRouter } from "react-router-dom";

import TaskDetailsContainer from "../pages/tasks/TaskDetailsContainer";
import ProjectContainer from "../pages/projects/ProjectContainer";
import NotFound from "../pages/Notfound";
import AccountLayout from "../layouts/account";
import ProtectedRoute from "./ProtectedRoute";
import Projects from "../pages/projects";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import ProjectDetails from "../pages/project_details";
import Members from "../pages/members";
import Logout from "../pages/logout";
import NewTask from "../pages/tasks/NewTask";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/account/projects" replace /> },
  { path: "/", element: <Signin /> },
  { path: "/notfound", element: <NotFound /> },
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/account",
    element: (
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/account/projects" replace /> },
      {
        path: "projects",
        element: <ProjectContainer />,
        children: [
          { index: true, element: <Projects /> },
          {
            path: ":pid",
            element: <ProjectDetails />,
            children: [
              { index: true, element: <></> },
              {
                path: "tasks",
                children: [
                  { index: true, element: <Navigate to="../" replace /> },
                  { path: "new", element: <NewTask /> },
                  {
                    path: ":tid",
                    children: [
                      { index: true, element: <TaskDetailsContainer /> },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "members",
        element: <Members />,
      },
    ],
  },
  { path: "/logout", element: <Logout /> },
]);

export default router;
