import { Link } from "react-router-dom";
import { useProjectsState } from "../../context/projects/context";

export default function ProjectListItems() {
  const state: any = useProjectsState();

  const { projects, isLoading, isError, errorMessage } = state;

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">{errorMessage}</div>;
  }

  return (
    <div className="space-y-4">
      {projects.map((item: any) => (
        <Link
          key={item.id}
          to={`${item.id}`}
          className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          <h5 className="text-lg font-semibold text-gray-800">{item.name}</h5>
        </Link>
      ))}
    </div>
  );
}
