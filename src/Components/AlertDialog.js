import React, { useState } from 'react';

function AlertDialog({ isOpen, onClose, onDelete }) {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <p>Do you want to delete this video?</p>
          <button onClick={onDelete}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    )
  );
}

export default AlertDialog