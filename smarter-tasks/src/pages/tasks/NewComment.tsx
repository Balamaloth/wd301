import { useCommentsDispatch } from "../../context/comment/context";
import { addComment } from "../../context/comment/actions";
import { useForm, SubmitHandler } from "react-hook-form";
import { CommentsPayload } from "../../context/comment/types";
import { useParams } from "react-router-dom";

export default function NewComment() {
  const Submit: SubmitHandler<CommentsPayload> = async (data) => {
    try {
      await addComment(
        commentDispatchType,
        pid ?? "",
        tid ?? "",
        data.description,
      );
    } catch (error) {
      console.log("Error While adding comment", error);
    }
  };
  const commentDispatchType = useCommentsDispatch();

  const { register, handleSubmit } = useForm<CommentsPayload>({});

  const { pid, tid } = useParams();

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit(Submit)} className="flex items-center">
        <input
          type="text"
          required
          placeholder="Add Comment"
          id="commentBox"
          {...register("description", { required: true })}
          className="w-full p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          type="submit"
          id="addCommentBtn"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
}
