import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

function SelectUser() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div>SelectUser</div>
        <div className="w-100 text-center mt-2">
          ユーザーAでログイン <Link to="/main">ユーザーA</Link>
        </div>
        <div className="w-100 text-center mt-2">
          ユーザーBでログイン <Link to="/main">ユーザーB</Link>
        </div>
        <div className="w-100 text-center mt-2">
          サインアップ <Link to="/signup">sign up</Link>
        </div>
      </div>
    </Container>
  );
}

export default SelectUser;
