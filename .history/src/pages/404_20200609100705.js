import React from "react";
import { Container } from "react-bootstrap";
export default function FourOhFourPage() {
  return (
    <div>
      <Container>
        <img src={process.env.PUBLIC_URL + "/images/cryingImg.jpg"} alt="" />
        <h1>Oh no, page not found</h1>
      </Container>
    </div>
  );
}
