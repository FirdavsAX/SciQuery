import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { GoRepo } from "react-icons/go";
import "./RatingComponent.css";
import { useCreate } from "../hooks/useCreate";

const RatingComponent = ({ postId, postType, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes || 0);
  const { createByUrl, loading } = useCreate("votes/");

  const handleVote = async (voteType) => {
    const url = voteType === 1 ? "upvote" : "downvote";
    const vote = { postId, postType };

    await createByUrl(url, vote);

    voteType === 1 ? setVotes(votes + 1) : setVotes(votes - 1);
  };

  return (
    <div className="icon-container">
      <button
        onClick={() => handleVote(1)}
        className="icon-button upvote-button"
        aria-label="Upvote"
      >
        <FaArrowUp />
      </button>
      <h2 className="votes-count">{votes}</h2>
      <button
        onClick={() => handleVote(-1)}
        className="icon-button downvote-button"
        aria-label="Downvote"
      >
        <FaArrowDown />
      </button>

    </div>
  );
};

export default RatingComponent;
