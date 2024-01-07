import React from "react";
import Layout from "./../components/Layout";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/accessories/alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/notification",
        {
          _id: user._id,
        },
        {
          headers: {
            Authorization: `Test ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.message) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Coś poszło nie tak");
    }
  };

  //Usuwanie Powiadomień

  const handledeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-notification",
        { _id: user._id },
        {
          headers: {
            Authorization: `Test ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Coś poszło nie tak w powiadomieniach");
    }
  };
  return (
    <Layout>
      <h3 className="text-center">Strona z powiadomieniami</h3>
      <Tabs>
        <Tabs.TabPane tab="Not Read" key={0}>
          <div className="justify-content-end d-flex">
            <h5
              className="text-center text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleAllRead}
            >
              Wszystkie przeczytane
            </h5>
          </div>
          {user?.notification.map((notficationMess) => (
            <div className="box" style={{ cursor: "pointer" }}>
              <div
                className="box-text"
                onClick={navigate(notficationMess.onClickPath)}
              >
                {notficationMess.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="justify-content-end d-flex">
            <h5
              className="text-center text-primary"
              style={{ cursor: "pointer" }}
              onClick={handledeleteAllRead}
            >
              Usuń wszystkie przeczytane
            </h5>
          </div>
          {user?.shownotification.map((notficationMess) => (
            <div className="box" style={{ cursor: "pointer" }}>
              <div
                className="box-text"
                onClick={navigate(notficationMess.onClickPath)}
              >
                {notficationMess.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notification;
