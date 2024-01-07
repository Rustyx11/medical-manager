import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/appointment-list/${doctor._id}`)}
      >
        <div className="card-header">
          Dr. {doctor.Name} {doctor.LastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specjalizacja</b> {doctor.Specialization}
          </p>
          <p>
            <b>Godziny pracy</b> {doctor.Time[0]} - {doctor.Time[1]}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
