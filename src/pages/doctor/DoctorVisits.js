import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import moment from "moment";
import { Table, message } from "antd";

const DoctorVisits = () => {
  const [visits, setVisits] = useState([]);

  const getVisits = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-visits", {
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

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Test ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getVisits();
      }
    } catch (error) {
      console.log(error);
      message.error("Coś poszło nie tak");
    }
  };

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
    {
      title: "Akcje",
      dataIndex: "akcje",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "zatwierdz")}
              >
                zatwierdz
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "odrzuc")}
              >
                odrzuc
              </button>
            </div>
          )}
        </div>
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

export default DoctorVisits;
