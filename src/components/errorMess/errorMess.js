import React from "react";
import "./errorMess.css";
import img from "./error.jpg";

const ErrorMessage = () => {
  return (
    <>
      <img src={img} alt={"error"}></img>
      <span>ERROR LOADING</span>
    </>
  );
};

export default ErrorMessage;
