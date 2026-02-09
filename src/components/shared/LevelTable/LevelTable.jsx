const LevelTable = () => {
  return (
    <div className="card" style={{ padding: "20px" }}>
      {" "}
      <table className="level-table">
        <tr>
          <th style={{ background: "#242e3c" }}>Deposit Range</th>
          <td>0–5</td>
          <td>6–20</td>
          <td>21–30</td>
          <td>31–100</td>
          <td>100+</td>
        </tr>
        <tr>
          <th style={{ background: "#242e3c" }}>Level</th>
          <td>Not Trusted</td>
          <td>Trusted</td>
          <td>VIP</td>
          <td>VVIP</td>
          <td>Premium</td>
        </tr>
      </table>
    </div>
  );
};

export default LevelTable;
