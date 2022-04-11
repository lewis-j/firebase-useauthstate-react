import React, { useEffect, useRef } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, loginEmailPsw, loginGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    loginEmailPsw(emailRef.current.value, passwordRef.current.value);
  }

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigate("/");
    }
  }, [user, loading]);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center- mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-2" type="submit">
              Log In
            </Button>
            <Button
              variant="danger"
              disabled={loading}
              className="w-100 mt-2"
              onClick={loginGoogle}
            >
              Sign in With Google
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
