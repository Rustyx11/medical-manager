import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/accessories/alert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispach = useDispatch();
  const navigate = useNavigate();

  //Akutalizacja profilu
  const handleFinish = async (values) => {
    try {
      dispach(showLoading());
      const res = await axios.patch(
        "/api/v1/doctor/updateProfile/" + params.id,
        {
          ...values,
          Time: [
            moment(values.Time[0]).format("HH:mm"),
            moment(values.Time[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `test ${localStorage.getItem("token")}`,
          },
        }
      );
      dispach(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispach(hideLoading());
      console.log(error);
      message.error("Coś poszło nie tak!");
    }
  };

  const getDoctorInfo = async () => {
    try {
      console.log(params);
      const res = await axios.get("/api/v1/doctor/getDoctorInfo/" + params.id, {
        headers: {
          Authorization: `Test ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctor(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1>Profil</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...doctor,
            Time: [
              moment(doctor.Time[0], "HH:mm"),
              moment(doctor.Time[1], "HH:mm"),
            ],
          }}
        >
          <h3 className="text">Personal Data : </h3>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Name"
                name="Name"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Type your name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="LastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Type your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone"
                name="Phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="numeric" placeholder="Type your phone number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="Email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Type your Email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="Specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Type your Specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Time" name="Time" required>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn">Update</button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
