import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import "./Siginup.css";

function Signup() {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match")
    // }

    // try {
    //   setError("")
    //   setLoading(true)
    //   await signup(emailRef.current.value, passwordRef.current.value)
    //   history.push("/")
    // } catch {
    //   setError("Failed to create an account")
    // }

    // setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <div className="signup--message">
            <h1>Slackへようこそ</h1>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name" className="signup--input-box">
              <Form.Label>名前</Form.Label>
              <Form.Control type="name" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="email" className="signup--input-box">
              <Form.Label>メールアドレス</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" className="signup--input-box">
              <Form.Label>パスワード</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm" className="signup--input-box">
              <Form.Label>パスワード（確認用）</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button
              variant="outlined"
              disabled={loading}
              className="signup--button"
              fullWidth
              component={Link}
              to="/main"
            >
              {" "}
              新規登録
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="signup--login-link">
        <Link to="/login" className="signup--login-text">
          ログイン
        </Link>
      </div>
    </>
  );
}

export default Signup;
