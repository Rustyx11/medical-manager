import React from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/accessories/alert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, Select, message } from "antd";
const { Option } = Select;

const AddDocumentation = () => {
  const { user } = useSelector((state) => state.user);

  const dispach = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      dispach(showLoading());
      const res = await axios.post(
        "/api/v1/user/add-documentation",
        {
          ...values,
          docID: user._id,
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
      <h1 className="text-center">Documentation</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h3 className="text">Personal Data : </h3>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Gender"
              name="Gender"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Type your Gender" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Pesel"
              name="Pesel"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Type your Pesel" />
            </Form.Item>
          </Col>
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
              label="Address"
              name="Address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Type your Address" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="height"
              name="height"
              required
              rules={[{ required: true }]}
            >
              <Input type="numeric" placeholder="Type your height" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="weight"
              name="weight"
              required
              rules={[{ required: true }]}
            >
              <Input type="numeric" placeholder="Type your weight" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="history diseases"
              name="historydiseases"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Type your history diseases" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="current conditions"
              name="currentconditions"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="Type your history current conditions"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Do you smoke?"
              name="smoking"
              required
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select placeholder="Select an option">
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Do you drink alcohol?"
              name="alcohol"
              required
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select placeholder="Select an option">
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Do you take drugs?"
              name="drugs"
              required
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select placeholder="Select an option">
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
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

export default AddDocumentation;
