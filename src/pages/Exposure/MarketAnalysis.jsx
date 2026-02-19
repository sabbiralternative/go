import { useNavigate } from "react-router-dom";
import { useState, useMemo, Fragment } from "react";
import { useSelector } from "react-redux";
import { useGetIndexQuery } from "../../hooks";
import { AdminRole } from "../../constant/constant";
import { useMarketAnalysisQuery } from "../../hooks/marketAnalysis";
import PageHeader from "../../components/shared/PageHeader/PageHeader";

const MarketAnalysis = () => {
  const navigate = useNavigate();
  const { adminRole } = useSelector((state) => state?.auth);
  const [branchId, setBranchId] = useState(0);
  const { data: branches } = useGetIndexQuery({ type: "getBranches" });

  const payload = {};
  if (
    adminRole === AdminRole.hyper_master ||
    adminRole === AdminRole.admin_staff
  ) {
    payload.branch_id = branchId;
  }

  const { data: marketAnalysis } = useMarketAnalysisQuery(payload);

  // ✅ Preprocess data before rendering
  const structuredData = useMemo(() => {
    if (!marketAnalysis?.length) return [];

    // Group data: event -> market -> runners
    const eventMap = new Map();

    for (const item of marketAnalysis) {
      const {
        event_id,
        event_name,
        event_type_id,
        market_name,
        runner_name,
        exposure,
      } = item;

      if (!eventMap.has(event_name)) {
        eventMap.set(event_name, {
          event_id,
          event_name,
          event_type_id,
          markets: new Map(),
        });
      }

      const event = eventMap.get(event_name);

      if (!event.markets.has(market_name)) {
        event.markets.set(market_name, []);
      }

      const runners = event.markets.get(market_name);
      // Avoid duplicate runner names
      if (!runners.some((r) => r.runner_name === runner_name)) {
        runners.push({ runner_name, exposure });
      }
    }

    // Convert maps into arrays for easy mapping in JSX
    return Array.from(eventMap.values()).map((event) => ({
      ...event,
      markets: Array.from(event.markets.entries()).map(
        ([market_name, runners]) => ({
          market_name,
          runners,
        }),
      ),
    }));
  }, [marketAnalysis]);

  return (
    <Fragment>
      {/* Header */}

      <PageHeader title="Market Analysis" />
      {(adminRole === AdminRole.admin_staff ||
        adminRole === AdminRole.hyper_master) && (
        <div
          className="client-card"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              width: "100%",
            }}
          >
            <div>Branch:</div>
            <select
              style={{ width: "100%" }}
              defaultValue="0"
              onChange={(e) => {
                setBranchId(e.target.value);
              }}
              className="form-control"
            >
              <option disabled value="">
                Branch
              </option>
              <option value="0">All Branch</option>
              {branches?.result?.map((site) => (
                <option key={site?.branch_id} value={site?.branch_id}>
                  {site?.branch_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {/* Client */}

      <div className="client-card table-container">
        <table style={{ width: "auto" }}>
          <thead className="table-dark">
            <tr></tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {structuredData.map((event, i) => {
              return (
                <Fragment key={i}>
                  <tr
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid gray",
                      background: "#323e4f",
                      color: "white",
                    }}
                    onClick={() =>
                      navigate(
                        `/game-details/${event.event_type_id}/${event.event_id}`,
                      )
                    }
                  >
                    <td colSpan="100%" style={{ fontWeight: "bold" }}>
                      {event.event_name}
                    </td>
                  </tr>
                  {event?.markets?.map((market, i) => {
                    return (
                      <tr
                        key={i}
                        style={{
                          cursor: "pointer",
                          borderBottom:
                            event?.markets?.length > 1 &&
                            i !== event?.markets?.length - 1
                              ? "1px solid gray"
                              : "1px solid transparent",
                        }}
                        onClick={() =>
                          navigate(
                            `/game-details/${event.event_type_id}/${event.event_id}`,
                          )
                        }
                      >
                        <td>{market.market_name}</td>
                        {market?.runners?.map((runner, i) => {
                          const exposure = runner?.exposure
                            ?.split(",")
                            .join("");
                          return (
                            <td key={i}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <span> {runner.runner_name}</span>{" "}
                                <span
                                  style={{ fontSize: "11px" }}
                                  className={
                                    Number(exposure) > 0
                                      ? "text-success"
                                      : "text-danger"
                                  }
                                >
                                  {runner.exposure}
                                </span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default MarketAnalysis;
