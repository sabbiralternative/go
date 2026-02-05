import { Fragment } from "react";
import Summary from "../../components/module/Home/Summary";
import { usePermission } from "../../hooks/use-permission";
import { Permission } from "../../constant/constant";
import Header from "../../components/ui/Header/Header";

const Home = () => {
  const { permissions } = usePermission();
  return (
    <Fragment>
      <Header />
      <section className="profile" />
      {permissions.includes(Permission.dashboard) && <Summary />}

      <section className="grid">
        <div className="card">
          <i className="fas fa-chart-pie" />
          Dashboard
        </div>
        <div className="card">
          <i className="fas fa-gauge" />
          BMK Dashboard
        </div>
        <div className="card">
          <i className="fas fa-dice" />
          Casino Dashboard
        </div>
        <div className="card">
          <i className="fas fa-users" />
          My Clients
        </div>
        <div className="card">
          <i className="fas fa-right-left" />
          All Transactions
        </div>
        <div className="card">
          <i className="fas fa-chart-column" />
          Unregistered Clients
        </div>
        <div className="card">
          <i className="fas fa-user-group" />
          My Team
        </div>
        <div className="card">
          <i className="fas fa-money-check" />
          Payout Screenshots
        </div>
        <div className="card">
          <i className="fas fa-bullhorn" />
          Promotion Material
        </div>
        <div className="card">
          <i className="fas fa-handshake" />
          My Partners
        </div>
        <div className="card">
          <i className="fas fa-headset" />
          Support Number
        </div>
        <div className="card">
          <i className="fas fa-at" />
          Set Social Media
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
