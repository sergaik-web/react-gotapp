import React from "react";
import "./errorMess.css";
import img from "./error.jpg";

export default function ErrorMessage() {
  return (
    <>
      <img src={img} alt={"error"} />
      <span>ERROR LOADING</span>
    </>
  );
}
