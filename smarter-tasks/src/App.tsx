import { CommentsProvider } from "./context/comment/context";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ThemeContext } from "./context/theme";
import { ProjectsProvider } from "./context/projects/context";
import { MembersProvider } from "./context/members/context";
import { useContext } from "react";
import "./App.css";

export default function App() {
  const CurrentTheme = useContext(ThemeContext);
  return (
    <div
      className={`h-screen w-full mx-auto py-2 ${
        CurrentTheme.theme === "dark" ? "dark" : ""
      }`}
    >
      <ProjectsProvider>
        <MembersProvider>
          <CommentsProvider>
            <RouterProvider router={router} />
          </CommentsProvider>
        </MembersProvider>
      </ProjectsProvider>
    </div>
  );
}
