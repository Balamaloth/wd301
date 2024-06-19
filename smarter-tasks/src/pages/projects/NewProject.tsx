import { useForm, SubmitHandler } from "react-hook-form";

import { addProject } from "../../context/projects/actions";

import { useProjectsDispatch } from "../../context/projects/context";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type Inputs = {
  name: string;
};

const NewProject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatchProjects = useProjectsDispatch();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const closeM = () => {
    setOpen(false);
  };

  const openM = () => {
    setOpen(true);
  };

  const Submit: SubmitHandler<Inputs> = async (data) => {
    const { name } = data;

    const response = await addProject(dispatchProjects, { name });

    if (response.ok) {
      setOpen(false);
    } else {
      setError(response.error as React.SetStateAction<null>);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openM}
        id="newProjectBtn"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        New Project
      </button>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeM}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create new project
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(Submit)}>
                      {error && <span>{error}</span>}
                      <input
                        type="text"
                        placeholder="Enter project name..."
                        autoFocus
                        {...register("name", { required: true })}
                        className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                      {errors.name && <span>This field is required</span>}
                      <button
                        type="submit"
                        id="submitNewProjectBtn"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                      <button
                        type="submit"
                        onClick={closeM}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default NewProject;
