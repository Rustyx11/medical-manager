import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const params = useParams();
  const getVerify = async () => {
    try {
      const res = await axios.get("/api/v1/user/verify/" + params.id, {
        headers: {
          Authorization: `Test ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  getVerify();
  return (
    <div>
      <p>Weryfikacja...111</p>
    </div>
  );
};

export default Verify;
