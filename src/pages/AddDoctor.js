import React from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/accessories/alert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import moment from "moment";

const AddDoctor = () => {
  //const { user } = useSelector((state) => state.user);

  const dispach = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      dispach(showLoading());
      const res = await axios.post(
        "/api/v1/user/add-doctor",
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
        message.success(res.data.success);
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
  return (
    <Layout>
      <h1 className="text-center">Add doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h3 className="text">Personal Data : </h3>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              data-testid="Name"
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
              data-testid="LastName"
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
              data-testid="Phone"
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
              data-testid="Email"
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
              data-testid="Specialization"
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
            <button className="btn btn-primary form-btn">Submit</button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default AddDoctor;
