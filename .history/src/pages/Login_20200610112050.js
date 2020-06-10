import React from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";

export default function Login() {
  return (
    <div>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="detail-content py-5 px-5"></div>
      </Container>
    </div>
  );
}
