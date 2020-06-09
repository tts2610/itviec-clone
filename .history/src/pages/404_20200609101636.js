import React from "react";
import { Container } from "react-bootstrap";
export default function FourOhFourPage() {
  return (
    <div>
      <Container
        className="mt-5"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/images/cryingImg.jpg"}
          width="50"
          height="50"
          alt=""
        />
        <h1>Oh no, page not found</h1>
      </Container>
    </div>
  );
}
