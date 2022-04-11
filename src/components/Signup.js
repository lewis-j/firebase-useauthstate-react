import React, { useRef, useEffect, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [customError, setCustomError] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function handleSubmit(e) {
    e.preventDefault();
    setCustomError("");
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setCustomError("Passwords do not match");
    }
    registerWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then(() => {
      navigate("/dashboard");
    });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center- mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {customError && <Alert variant="danger">{customError}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confrimation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Have an account? <Link to="/login">Log In</Link>{" "}
      </div>
    </>
  );
}
