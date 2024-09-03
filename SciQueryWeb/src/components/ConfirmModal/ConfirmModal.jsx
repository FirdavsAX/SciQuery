import React from "react";
import PropTypes from "prop-types";
import "./ConfirmModal.css"; // Import the CSS file

function ConfirmationModal({ show, onConfirm, onCancel }) {
  if (!show) return null; // Do not render if not showing

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Ishonchingiz komilmi?</h4>
        <p>
          Haqiqatan ham ushbu elementni o'chirmoqchimisiz? Ushbu jarayonni
          qaytarib bo'lmaydi.
        </p>

        <div className="modal-buttons">
          <button className="btn btn-danger" onClick={onConfirm}>
            Ha, o'chirish
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;
