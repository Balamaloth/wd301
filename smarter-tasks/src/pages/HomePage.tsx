import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Task Manager</h1>
      <p className="text-lg text-gray-600">
        Welcome to the Task Manager application!
      </p>
    </div>
  );
};
export default HomePage;
