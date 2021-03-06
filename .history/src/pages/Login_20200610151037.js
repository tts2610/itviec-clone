import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
export default function Login({ history }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const login = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("please fill in your credentials");
      return;
    }
    let user = { email: email, password: password };
    dispatch({ type: "LOGIN", payload: user });
    // history.push("/");
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
          <Form
            style={{ width: "-webkit-fill-available" }}
            onSubmit={(e) => login(e)}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
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
