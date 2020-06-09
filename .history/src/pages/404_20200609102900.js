import React from "react";
import { Container } from "react-bootstrap";
export default function FourOhFourPage() {
  return (
    <div>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          margin: "0",
          position: "absolute",
          top: "50%",
          left: "10%",
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/images/404_not_found.jpg"}
          alt=""
        />
        <h1>Oh no, page not found</h1>
      </Container>
    </div>
  );
}
