const GoForm = ({ children, onSubmit }) => {
  return (
    <form className="change-password-modal" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default GoForm;
