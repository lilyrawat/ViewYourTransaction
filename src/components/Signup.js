import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import * as authActions from "../store/action/authenticate";
import * as userActions from "../store/action/user";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [signUp, setSignUp] = useState(true);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authenticate = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      if (signUp) {
        if (Password !== confirmPassword) {
          return setError("Passwords do not match");
        } else {
          await dispatch(authActions.signup(Email, Password));
          await dispatch(userActions.createuser(Email));
        }
      } else {
        await dispatch(authActions.login(Email, Password));
        await dispatch(userActions.fetchuser());
      }
    } catch (err) {
      return setError(err.message);
      // console.log(error);
    }
    navigate("/home");
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">{signUp ? "Sign Up" : "Login"}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(event) => {
                    setError(null);
                    setEmail(event.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(event) => {
                    setError(null);
                    setPassword(event.target.value);
                  }}
                  required
                />
              </Form.Group>
              {signUp && (
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(event) => {
                      setError(null);
                      setConfirmPassword(event.target.value);
                    }}
                    required
                  />
                </Form.Group>
              )}
              <Link to="/home">
                <Button
                  onClick={authenticate}
                  className="w-100 my-3"
                  type="submit"
                >
                  {signUp ? "Sign Up" : "Login"}
                </Button>
              </Link>
            </Form>
          </Card.Body>
        </Card>
        {signUp ? (
          <div className="w-100 text-center mt-2">
            Already have an account?{" "}
            <span
              style={{ color: "blue" }}
              onClick={(value) => {
                setSignUp(false);
              }}
            >
              Log In
            </span>
          </div>
        ) : (
          <div className="w-100 text-center mt-2">
            Create a New Account.{" "}
            <span
              style={{ color: "blue" }}
              onClick={(value) => {
                setSignUp(true);
              }}
            >
              Sign Up
            </span>
          </div>
        )}
      </div>
    </Container>
  );
}
