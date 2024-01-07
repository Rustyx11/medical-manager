import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/accessories/alert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, message, Select } from "antd";
const { Option } = Select;

const DocProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [documentation, setDocumentation] = useState(null);
  const params = useParams();
  const dispach = useDispatch();
  const navigate = useNavigate();

  //Akutalizacja Dokumnetacji
  const handleFinish = async (values) => {
    try {
      dispach(showLoading());
      const res = await axios.patch(
        "/api/v1/documentation/updateDocumentation/" + params.id,
        {
          ...values,
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

  const getDocumentationInfo = async () => {
    try {
      const res = await axios.get(
        "/api/v1/documentation/getDocumentationInfo/" + params.id,
        {
          headers: {
            Authorization: `Test ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDocumentation(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocumentationInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1>Documentation Profile</h1>
      {documentation && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...documentation,
          }}
        >
          <h3 className="text">Documentation Data : </h3>
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
      )}
    </Layout>
  );
};

export default DocProfile;
