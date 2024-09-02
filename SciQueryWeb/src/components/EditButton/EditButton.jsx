import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserIdFromToken } from "../hooks/useUserIdFromToken";

function EditButton({ postUserId, onClick }) {
  // Render the button only if the current user is the owner of the question
  const { userId } = useUserIdFromToken(window.localStorage.getItem(`token`));

  if (userId === postUserId) {
    return (
      <div className="update-button">
        <button className="btn btn-primary" onClick={onClick}>
          Tahrirlash
        </button>
      </div>
    );
  }
  return null; // Return null if the user is not the owner
}

EditButton.propTypes = {
  postUserId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EditButton;
