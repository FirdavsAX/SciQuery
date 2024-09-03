import React, { useState } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserIdFromToken } from "../hooks/useUserIdFromToken";
import ConfirmationModal from "../ConfirmModal/ConfirmModal";

function DeleteButton({ postUserId, onClick }) {
  const { userId } = useUserIdFromToken(window.localStorage.getItem(`token`));
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => setShowModal(true);
  const handleConfirm = () => {
    setShowModal(false);
    onClick();
  };
  const handleCancel = () => setShowModal(false);

  if (userId === postUserId) {
    return (
      <>
        <div className="delete-button">
          <button className="btn btn-danger" onClick={handleDelete}>
            O'chirish
          </button>
        </div>
        <ConfirmationModal
          show={showModal}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </>
    );
  }
  return null;
}

DeleteButton.propTypes = {
  postUserId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
