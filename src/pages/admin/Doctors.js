import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../../components/Layout";
import { Table, message } from "antd";
import { Link } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Test ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, _id: record._id, status: status },
        {
          headers: {
            Authorization: `Test ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Coś poszło nie tak");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.Name} {record.LastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => <span>{record.status}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{record.Phone}</span>,
    },
    {
      title: "Akcje",
      dataIndex: "akcje",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "zatwiedzony")}
            >
              Zatwierdz
            </button>
          ) : (
            <button className="btn btn-danger">Odrzuc</button>
          )}
          <div className={`menu-items`}>
            <i className="btn"></i>
            <Link to={`/doctor/profile/${record._id}`}>Zobacz profil</Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center">Wszyscy Doktorzy</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
