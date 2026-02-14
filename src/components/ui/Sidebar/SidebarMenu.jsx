import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { usePermission } from "../../../hooks/use-permission";
import { getNavItems } from "./navConfig";
import {
  setShowLeftSidebar,
  setShowAddBranchModal,
  setShowAddBranchStaffModal,
  setShowAddStaffModal,
  setShowAddSuperBranchModal,
  setShowDWLimitModal,
  setShowSocialLinkModal,
} from "../../../redux/features/global/globalSlice";

const SidebarMenu = () => {
  const dispatch = useDispatch();
  const { adminRole } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [sidebarItem, setSidebarItem] = useState(null);
  const [childTabList, setChildTabList] = useState(null);
  const { permissions } = usePermission();

  const handleOpenSidebarItem = (item) => {
    if (sidebarItem === item) {
      setSidebarItem(null);
    } else {
      setSidebarItem(item);
    }
  };
  const handleOpenSidebarChildTabItem = (item) => {
    if (childTabList === item) {
      setChildTabList(null);
    } else {
      setChildTabList(item);
    }
  };

  const navItems = getNavItems(permissions, adminRole, {
    setShowSocialLinkModal,
    setShowAddStaffModal,
    setShowAddSuperBranchModal,
    setShowAddBranchModal,
    setShowAddBranchStaffModal,
    setShowDWLimitModal,
  });

  const handleRenderSidebar = (navItems) => {
    return navItems?.map((navItem, navIndex) => {
      /*! Dashboard text start  */
      if (navItem?.label) {
        if (!navItem?.show) return;
        return (
          <div
            onClick={() => dispatch(setShowLeftSidebar(false))}
            to={navItem?.href}
            key={navIndex}
            className="menu-item"
          >
            <i className="fa-solid fa-chart-pie" />
            <span>{navItem?.label}</span>
            {/* <i className="fa-solid fa-chevron-right" /> */}
          </div>
        );
      }
      /*! Dashboard text end  */

      if (navItem?.tab) {
        if (!navItem?.show) return;
        return (
          <Fragment key={navIndex}>
            {/* All link start */}

            <div
              onClick={() => handleOpenSidebarItem(navItem?.key)}
              className="menu-item"
            >
              <i className="fa-solid fa-chart-pie" />
              <span>{navItem?.tab}</span>
              <i
                className={`fa-solid ${sidebarItem === navItem?.key ? "fa-chevron-down" : "fa-chevron-right"} `}
              />
            </div>
            {/* All link end */}

            {/* Miscellaneous start */}
            {navItem?.willSubTab && sidebarItem === navItem?.key ? (
              navItem?.children?.map((child, childIndex) => {
                if (!child?.show) return;
                return (
                  <div key={childIndex}>
                    <div
                      style={{ padding: "10px 15px", marginLeft: "30px" }}
                      onClick={() => handleOpenSidebarChildTabItem(child?.key)}
                      className="menu-item"
                    >
                      <i className="fa-solid fa-chart-pie" />
                      <span>{child?.tab}</span>
                      <i
                        className={`fa-solid ${childTabList === child?.key ? "fa-chevron-down" : "fa-chevron-right"} `}
                      />
                    </div>

                    <div
                      style={{
                        display: childTabList === child?.key ? "block" : "none",
                        paddingLeft: "20px",
                      }}
                    >
                      {child?.children?.map((child) => {
                        if (!child?.show) return;

                        if (child?.href) {
                          return (
                            <div
                              style={{
                                padding: "10px 15px",
                                marginLeft: "30px",
                              }}
                              key={child?.href}
                              onClick={() => {
                                navigate(child?.href);
                                dispatch(setShowLeftSidebar(false));
                              }}
                              className="menu-item"
                            >
                              <i className="fa-solid fa-chart-pie" />
                              <span>{child?.label}</span>
                              {/* <i className="fa-solid fa-chevron-right" /> */}
                            </div>
                          );
                        }
                        if (child?.setState) {
                          return (
                            <div
                              style={{
                                padding: "10px 15px",
                                marginLeft: "30px",
                              }}
                              key={child?.label}
                              onClick={() => {
                                dispatch(child?.setState(true));
                                dispatch(setShowLeftSidebar(false));
                              }}
                              className="menu-item"
                            >
                              <i className="fa-solid fa-chart-pie" />
                              <span>{child?.label}</span>
                              {/* <i className="fa-solid fa-chevron-right" /> */}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  display: sidebarItem === navItem?.key ? "block" : "none",
                }}
              >
                {navItem?.children?.map((child, childIndex) => {
                  if (!child?.show) return;

                  /* Loss back start */
                  if (child?.willSubTab) {
                    return (
                      <div key={childIndex}>
                        <div
                          style={{ padding: "10px 18px", marginLeft: "30px" }}
                          onClick={() =>
                            handleOpenSidebarChildTabItem(child?.key)
                          }
                          className="menu-item"
                        >
                          <i className="fa-solid fa-chart-pie" />
                          <span>{child?.label}</span>
                          <i className="fa-solid fa-chevron-right" />
                        </div>

                        <div
                          style={{
                            display:
                              childTabList === child?.key ? "block" : "none",
                            paddingLeft: "20px",
                          }}
                        >
                          {child?.children?.map((child) => {
                            if (!child?.show) return;

                            if (child?.href) {
                              return (
                                <div
                                  style={{
                                    padding: "10px 18px",
                                    marginLeft: "30px",
                                  }}
                                  key={child?.href}
                                  onClick={() => {
                                    navigate(child?.href);
                                    dispatch(setShowLeftSidebar(false));
                                  }}
                                  className="menu-item"
                                >
                                  <i className="fa-solid fa-chart-pie" />
                                  <span>{child?.label}</span>
                                  {/* <i className="fa-solid fa-chevron-right" /> */}
                                </div>
                              );
                            }
                            if (child?.setState) {
                              return (
                                <div
                                  style={{
                                    padding: "10px 18px",
                                    marginLeft: "30px",
                                  }}
                                  key={child?.label}
                                  onClick={() => {
                                    dispatch(child?.setState(true));
                                    dispatch(setShowLeftSidebar(false));
                                  }}
                                  className="menu-item"
                                >
                                  <i className="fa-solid fa-chart-pie" />
                                  <span>{child?.label}</span>
                                  {/* <i className="fa-solid fa-chevron-right" /> */}
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    );
                  }
                  /* Loss back end */

                  /* Child link start */

                  if (child?.href) {
                    return (
                      <div
                        style={{ padding: "10px 18px", marginLeft: "30px" }}
                        key={child?.href}
                        onClick={() => {
                          navigate(child?.href);
                          dispatch(setShowLeftSidebar(false));
                        }}
                        className="menu-item"
                      >
                        <i className="fa-solid fa-chart-pie" />
                        <span>{child?.label}</span>
                        {/* <i className="fa-solid fa-chevron-right" /> */}
                      </div>
                    );
                  }
                  if (child?.setState) {
                    return (
                      <div
                        style={{ padding: "10px 18px", marginLeft: "30px" }}
                        key={child?.label}
                        onClick={() => {
                          dispatch(child?.setState(true));
                          dispatch(setShowLeftSidebar(false));
                        }}
                        className="menu-item"
                      >
                        <i className="fa-solid fa-chart-pie" />
                        <span>{child?.label}</span>
                        {/* <i className="fa-solid fa-chevron-right" /> */}
                      </div>
                    );
                  }
                  /* Child link end */
                })}
              </div>
            )}
          </Fragment>
        );
      }
    });
  };
  return (
    <div className="sidebar-menu" style={{ overflow: "auto" }}>
      {handleRenderSidebar(navItems)}
    </div>
  );
};

export default SidebarMenu;
