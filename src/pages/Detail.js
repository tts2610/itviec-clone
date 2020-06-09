import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";

export default function Detail() {
  const { id } = useParams();
  const getDetailData = async () => {
    let url = `${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs/${id}`;
    let data = await fetch(url);
    let result = await data.json();
    console.log("show result: ", result);
    console.log("detail");
  };

  useEffect(() => {
    getDetailData();
  });
  return (
    <div style={{ backgroundColor: "#e9e9e9" }}>
      <Container>
        <h1>This is detail page</h1>
        <h2>This is id {id}</h2>

        <div className="detail-content"></div>
      </Container>
    </div>
  );
}
