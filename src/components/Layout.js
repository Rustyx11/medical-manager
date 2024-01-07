import React from "react";
import "../styles/Layout.css";
import { Badge, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { adminMenu, userMenu } from "../data/data";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Wylogowano pomyslnie");
    navigate("/login");
  };
  //Menu doktora
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-hospital",
    },
    {
      name: "Visits",
      path: "/doctor-visits",
      icon: "fa-solid fa-clipboard-list",
    },
    {
      name: "My Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-address-card",
    },
  ];

  const SideBar = user?.admin
    ? adminMenu
    : user?.doctor
    ? doctorMenu
    : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">Moje Logo</div>
            <div className="menu">
              {SideBar.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-items ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-items`} onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <Link to="/login">Log out</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    class="fa-solid fa-envelope"
                    style={{ cursor: "pointer" }}
                  ></i>
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
