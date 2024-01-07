import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/accessories/alert";

export const AppointmentList = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailiable, setIsAvailiable] = useState(false);
  const dispatch = useDispatch();
  const getUData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Test " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Rezerwacja
  const handleReservation = async () => {
    try {
      setIsAvailiable(true);
      if (!date && !time) {
        return alert("Podaj date i czas");
      }
      dispatch(showLoading);
      const res = await axios.post(
        "/api/v1/user/reservation",
        {
          doctorId: params.doctorId,
          doctorInfo: doctors,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: `Test ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleCheck = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/check-reservation",
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Test ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailiable(true);
        console.log(isAvailiable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1>Lista Wizyt</h1>
      <div className="container">
        {doctors && (
          <div>
            <h3>
              Dr.{doctors.Name} {doctors.LastName}
            </h3>
            <h3>
              Godziny wizyt: {doctors.Time && doctors.Time[0]} -{" "}
              {doctors.Time && doctors.Time[1]}{" "}
            </h3>
            <h3>Kontakt: {doctors.Phone}</h3>
            <div className="d-flex flex-column w-2">
              <DatePicker
                className="m-3"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                className="m-3"
                format="HH:mm"
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button className="btn btn-primary mt-2" onClick={handleCheck}>
                Sprawdź dostępność
              </button>

              <button className="btn btn-dark mt-2" onClick={handleReservation}>
                Zarezerwuj wizyte
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
