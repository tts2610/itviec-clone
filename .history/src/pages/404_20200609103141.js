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

          position: "absolute",
          top: "10%",
          marginLeft: "auto",
          marginRight: "auto",
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
