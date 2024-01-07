import React from "react";
import "../styles/Register.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/accessories/alert";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Zarejestrowano pomyślnie, zweryfkuje swój adres email");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("coś poszło nie tak ;/");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="form-register"
        >
          <h1>Rejestracja</h1>
          <Form.Item label="Imie" name="name">
            <Input type="text" required></Input>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required></Input>
          </Form.Item>
          <Form.Item label="Haslo" name="password">
            <Input type="password" required></Input>
          </Form.Item>
          <Link to="/login" className="form-button">
            Jeżeli posiadasz konto kliknij
          </Link>
          <button className="btn btn-primary" type="submit">
            Zarejestruj
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
