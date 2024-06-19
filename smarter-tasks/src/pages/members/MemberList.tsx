import { fetchMembers } from "../../context/members/actions";
import { useMembersDispatch } from "../../context/members/context";
import { useEffect } from "react";

import MemberListItems from "./MemberListItems";
export default function MemberList() {
  const dispatchMembers = useMembersDispatch();

  useEffect(() => {
    fetchMembers(dispatchMembers);
  }, []);
  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
      <MemberListItems />
    </div>
  );
}
