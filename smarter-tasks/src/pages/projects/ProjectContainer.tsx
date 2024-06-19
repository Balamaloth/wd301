import { Outlet } from "react-router-dom";
import { useMembersDispatch } from "../../context/members/context";
import { fetchMembers } from "../../context/members/actions";
import { useEffect } from "react";
import { useProjectsDispatch } from "../../context/projects/context";
import { fetchProjects } from "../../context/projects/actions";

export default function ProjectContainer() {
  const memberDispatch = useMembersDispatch();
  const projectDispatch = useProjectsDispatch();

  useEffect(() => {
    fetchProjects(projectDispatch);
    fetchMembers(memberDispatch);
  }, [projectDispatch, memberDispatch]);
  return <Outlet />;
}
