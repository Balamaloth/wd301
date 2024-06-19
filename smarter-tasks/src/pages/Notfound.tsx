import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">404 - Not Found</h1>
        <button
          id="backToHomeButton"
          className="mt-4 inline-block text-blue-500 hover:underline"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
