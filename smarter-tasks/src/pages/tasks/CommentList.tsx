import { useMembersState } from "../../context/members/context";
import { useCommentsState } from "../../context/comment/context";

const CommentList = () => {
  const cState = useCommentsState();
  const mState = useMembersState();

  const { comments, isLoading, isError, errorMessage } = cState;

  const getusername = (uid: number) => {
    const username = mState?.members?.find((mem) => mem.id === uid);
    return username?.name || "Unknown";
  };

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">{errorMessage}</div>;
  }

  const FormatDate = (isoDate: string) => {
    const dateObj = new Date(isoDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Comments:</h1>
      {comments.map((comment) => (
        <div
          key={comment.createdAt}
          className="bg-white comment p-4 rounded-lg shadow-md mb-4"
        >
          <h5 className="text-lg font-semibold text-gray-800">
            {getusername(comment.owner)}
          </h5>
          <h5 className="text-gray-600">{FormatDate(comment.createdAt)}</h5>
          <p className="text-gray-800">{comment.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
