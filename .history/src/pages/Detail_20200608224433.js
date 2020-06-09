import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";

const url = process.env.REACT_APP_BACKEND_SERVER_URL;

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
    <div>
      <Container>
        <div className="detail-content">
          <h1>This is detail page</h1>
          <h2>This is id {id}</h2>
        </div>
      </Container>
    </div>
  );
}
