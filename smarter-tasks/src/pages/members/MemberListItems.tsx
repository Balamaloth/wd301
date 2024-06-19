import {
  useMembersState,
  useMembersDispatch,
} from "../../context/members/context";

import { deleteMember } from "../../context/members/actions";

export default function MemberListItems() {
  const state: any = useMembersState();
  const dispatchMembers: any = useMembersDispatch();

  const { members, isLoading, isError, errorMessage } = state;

  const deleteMemberHandler = async (id: number) => {
    const response = await deleteMember(dispatchMembers, id);
    console.log(response);
    if (response.ok) {
      console.log("deleted successfully!!!");
    }
  };

  if (members.length === 0 && isLoading) {
    return <span className="text-gray-600">Wait...</span>;
  }
  if (isError) {
    return <span className="text-red-500">{errorMessage}</span>;
  }

  return (
    <>
      {members.map((item: any) => (
        <div key={item.id} className="bg-white p-4 rounded shadow mb-4">
          <h5 className="text-xl font-semibold text-gray-800">{item.email}</h5>
          <h5 className="text-lg text-gray-600">{item.name}</h5>
          <button
            onClick={() => deleteMemberHandler(item.id)}
            className="bg-red-500 text-white px-3 py-1 rounded mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
