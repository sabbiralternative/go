import { Fragment } from "react";

const ViewClients = () => {
  return (
    <Fragment>
      {/* Header */}
      <header className="header">
        <i className="ph ph-arrow-left" />
        <span style={{ fontSize: "14px" }}>My Clients</span>
        <i className="ph ph-squares-four" />
      </header>
      {/* Search */}
      <div className="search-box">
        <i className="ph ph-magnifying-glass" />
        <input type="text" placeholder="Client Code, Phone" />
      </div>
      {/* Client Card */}
      <div className="client-card">
        <div className="card-top">
          <strong>REX-853126</strong>
          <span className="status">
            <i className="ph ph-lock-key-open" /> Active
          </span>
        </div>
        <div className="row">
          <span>Number</span>
          <span className="right">
            <i className="ph ph-whatsapp-logo" />
            +91 9000736042
            <i className="ph ph-copy" />
          </span>
        </div>
        <div className="row">
          <span>Deposit</span>
          <span>9,000</span>
        </div>
        <div className="row">
          <span>Withdraw</span>
          <span>15,685</span>
        </div>
        <div className="row">
          <span>Balance</span>
          <span>0</span>
        </div>
        <div className="row">
          <span>P/L</span>
          <span className="loss">-6,685</span>
        </div>
        <div className="row">
          <span>Joined On</span>
          <span>26 Jan 2026 | 10:13 PM</span>
        </div>
        <div className="row">
          <span>Last Used</span>
          <span>3 Feb 2026 | 5:11 PM</span>
        </div>
        <div className="actions">
          <button>User bet history</button>
          <button>Transactions</button>
        </div>
      </div>
      {/* Client Card (Disabled buttons) */}
      <div className="client-card">
        <div className="card-top">
          <strong>REX-849671</strong>
          <span className="status">
            <i className="ph ph-lock-key-open" /> Active
          </span>
        </div>
        <div className="row">
          <span>Number</span>
          <span className="right">
            <i className="ph ph-whatsapp-logo" />
            +91 8302521655
            <i className="ph ph-copy" />
          </span>
        </div>
        <div className="row">
          <span>Deposit</span>
          <span>0</span>
        </div>
        <div className="row">
          <span>Withdraw</span>
          <span>0</span>
        </div>
        <div className="row">
          <span>Balance</span>
          <span>0</span>
        </div>
        <div className="row">
          <span>P/L</span>
          <span>0</span>
        </div>
        <div className="row">
          <span>Joined On</span>
          <span>25 Jan 2026 | 3:35 AM</span>
        </div>
        <div className="row">
          <span>Last Used</span>
          <span>27 Jan 2026 | 10:31 PM</span>
        </div>
        <div className="actions">
          <button className="disabled">User bet history</button>
          <button className="disabled">Transactions</button>
        </div>
      </div>
      {/* Code injected by live-server */}
    </Fragment>
  );
};

export default ViewClients;
