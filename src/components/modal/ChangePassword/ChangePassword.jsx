const ChangePassword = () => {
  return (
    <div className="modal-overlay">
      <div className="change-password-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <span>Create Password</span>
          <span className="close-icon">✕</span>
        </div>
        {/* Modal Body */}
        <div className="modal-body">
          <label>Old password</label>
          <input type="password" placeholder="Old Password" />
          <label>Enter new password</label>
          <input type="password" placeholder="Enter Password" />
          <label>Confirm Password</label>
          <input type="password" placeholder="Re-Enter Password" />
        </div>
        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
