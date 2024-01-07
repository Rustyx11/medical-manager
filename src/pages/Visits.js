import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";

const Visits = () => {
  const [visits, setVisits] = useState([]);

  const getVisits = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-visit", {
        headers: {
          Authorization: `Test ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setVisits(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVisits();
    //eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorId.Name} {record.doctorId.LastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{record.doctorId.Phone}</span>,
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      render: (text, record) => <span>{record.doctorId.Specialization}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => <span>{record.doctorId.status}</span>,
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.date).format("HH:mm")}
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Wizyty użytkownia</h1>
      <Table columns={columns} dataSource={visits} />
    </Layout>
  );
};

export default Visits;
