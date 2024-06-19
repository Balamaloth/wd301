import { addMember } from "../../context/members/actions";
import { useMembersDispatch } from "../../context/members/context";
import { useForm, SubmitHandler } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type Inputs = {
  email: string;
  password: string;
  name: string;
};

const NewMember = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<Inputs>();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const dispatchMembers = useMembersDispatch();

  const openM = () => {
    setOpen(true);
  };

  const closeM = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { password, name, email } = data;

    const res = await addMember(dispatchMembers, {
      name,
      email,
      password,
    });

    if (res.ok) {
      setOpen(false);
    } else {
      setError(res.error as React.SetStateAction<null>);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openM}
        id="new-member-btn"
        className=" rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        New Member
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
                    id="new-member-btn"
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add new Member
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {error && <span>{error}</span>}
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter user name..."
                        autoFocus
                        {...register("name", { required: true })}
                        className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                      {errors.name && <span>This field is required</span>}
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter user email..."
                        autoFocus
                        {...register("email", { required: true })}
                        className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {errors.email && <span>This field is required</span>}
                      <input
                        type="text"
                        id="password"
                        placeholder="Enter user password..."
                        autoFocus
                        {...register("password", { required: true })}
                        className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                          errors.password ? "border-red-500" : ""
                        }`}
                      />
                      {errors.password && <span>This field is required</span>}
                      <button
                        type="submit"
                        id="create-member-btn"
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
export default NewMember;
