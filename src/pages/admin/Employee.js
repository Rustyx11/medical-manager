import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table } from "antd";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  const getEmployee = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllEmployee", {
        headers: {
          Authorization: `Test ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setEmployee(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doktor",
      dataIndex: "doktor",
      render: (text, record) => <span>{record.doctor ? "Tak" : "Nie"}</span>,
    },
    {
      title: "Akcje",
      dataIndex: "akcje",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Zablokuj</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center">Employee</h1>
      <Table columns={columns} dataSource={employee} />
    </Layout>
  );
};

export default Employee;
