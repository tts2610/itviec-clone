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
          top: "20%",
          left: "5%",
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/images/404_not_found.jpg"}
          alt=""
        />
      </Container>
    </div>
  );
}
