import { useNavigate } from "react-router-dom";

const PageHeader = ({ title }) => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <i onClick={() => navigate(-1)} className="ph ph-arrow-left" />
      <span style={{ fontSize: "14px" }}>{title}</span>
      <i className="ph ph-squares-four" />
    </header>
  );
};

export default PageHeader;
