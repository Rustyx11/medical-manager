import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/accessories/alert";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());
      debugger;
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Zalogowano pomyślnie");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Coś poszło nie tak test");
    }
  };
  return (
    <div className="form-container">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="form-register"
      >
        <h1>Logowanie</h1>
        <Form.Item label="Email" name="email">
          <Input type="email" required></Input>
        </Form.Item>
        <Form.Item label="Haslo" name="password">
          <Input type="password" required></Input>
        </Form.Item>
        <Link to="/register" className="form-button">
          Jeżeli nie posiadasz konta kliknij
        </Link>
        <button className="btn btn-primary" type="submit">
          Zaloguj
        </button>
      </Form>
    </div>
  );
};

export default Login;
