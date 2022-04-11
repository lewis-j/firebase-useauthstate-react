import React, { useEffect, useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  // console.log("user", user.accessToken);
  console.log("redered====>");
  const navigate = useNavigate();
  // const user = { email: "testing" };

  const handleLogout = async () => {
    await logout();
    navigate("./login");
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          <strong>{user.email}</strong>
          <Link to="/update-profile" className="btn btn-primary w-100 m-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
