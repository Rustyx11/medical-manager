import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../../components/Layout";
import { Table } from "antd";
import { Link } from "react-router-dom";

const Documentations = () => {
  const [documentations, setDocumentations] = useState([]);
  const getDocumentations = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDocumentations", {
        headers: {
          Authorization: `Test ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDocumentations(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocumentations();
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
      title: "Gender",
      dataIndex: "Gender",
      render: (text, record) => <span>{record.Gender}</span>,
    },
    {
      title: "Pesel",
      dataIndex: "Pesel",
      render: (text, record) => <span>{record.Pesel}</span>,
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
          <div className={`menu-items`}>
            <i className="btn"></i>
            <Link to={`/documentation/docprofile/${record._id}`}>
              {" "}
              <button className="btn btn-success">Podgląd</button>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center">Wszystkie Dokumentacje</h1>
      <Table columns={columns} dataSource={documentations} />
    </Layout>
  );
};

export default Documentations;
