const LevelTable = () => {
  return (
    <div className="client-card">
      {" "}
      <div className="card-top">
        <strong>Key</strong>
        <span className="status">
          <i className="ph ph-lock-key-open" /> Value
        </span>
      </div>
      <div className="row">
        <span>0–5</span>
        <span className="right">Not Trusted</span>
      </div>
      <div className="row">
        <span>6–20</span>
        <span className="right">Trusted</span>
      </div>
      <div className="row">
        <span>21–30</span>
        <span className="right">VIP</span>
      </div>
      <div className="row">
        <span>31–100</span>
        <span className="right">VVIP</span>
      </div>
      <div className="row">
        <span>100+</span>
        <span className="right">Premium</span>
      </div>
    </div>
  );
};

export default LevelTable;
