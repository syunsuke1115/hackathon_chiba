import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button} from "@mui/material";
import "./Siginup.css";
import { Container } from "react-bootstrap";

function Signup({setLoginUser}) {
  const emailRef = useRef();
  const nameRef = useRef("千葉");
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = (e) => {
    
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <div className="signup--message">
              <h1>Slackへようこそ</h1>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
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
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button
                variant="outlined"
                disabled={loading}
                className="signup--button"
                fullWidth
                component={Link}
                to="/login"
                onClick={(e) => signUp(e)}
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
      </div>
    </Container>
  );
}

export default Signup;
