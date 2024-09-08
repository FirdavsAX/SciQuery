import React, { useState, useCallback } from "react";
import "./CommentSection.css";
import CommentList from "../commentDisplay/CommentsList/CommentsList";
import { useFetch } from "../../hooks/useFetch";
import { useCreate } from "../../hooks/useCreate";
import CommentForm from "../CommenForm/CommentForm";

const CommentSection = ({ questionId, answerId }) => {
  const postType = questionId ? 1 : answerId ? 0 : null; // Assuming 1 for questions, 0 for answers
  const postId = questionId || answerId;
  const [refresh, setRefresh] = useState(false); // State to trigger re-fetch

  // Construct the URL for fetching comments
  const url = `comments?postId=${postId}&postType=${postType}`;
  
  // Fetch comments with useFetch hook
  const { data: paginatedList, isPending: loading, error } = useFetch(url, [refresh]);
  const comments = paginatedList && paginatedList.data;

  // Create a new comment
  const { create } = useCreate("Comments");
  
  const handleAddComment = useCallback(async (newComment) => {
    const comment = {
      userId: "",
      post: postType,
      postId: postId,
      body: newComment,
    };
    console.log(comment);
    await create(comment);
    setRefresh(prev => !prev); // Toggle refresh to re-fetch comments
  }, [create, postType, postId]);

  if (loading) return <p>Fikrlar yuklanmoqda...</p>;
  if (error) return <p>Fikrlarni yuklashda xatolik: {error}</p>;

  return (
    <div className="">
      <CommentList comments={comments} />
      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
};

export default CommentSection;
