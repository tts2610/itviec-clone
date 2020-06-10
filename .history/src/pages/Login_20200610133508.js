import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
export default function Login() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = (e) => {
    e.preventDefault();
    let user = { email: email, password: password, isAuthenticated: true };
    dispatch({ type: "LOGIN", payload: user });
    history.goBack();
  };
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  });
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      </div>
    );
  }

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
        <div
          className="detail-content py-5 px-5"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div class="login-title-box">
            <img
              src="https://itviec.com/favicon-96x96.png"
              width="40px"
              alt=""
            ></img>
            <h1 class="login-title">Login</h1>
          </div>
          <Form style={{ width: "-webkit-fill-available" }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="danger" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}
