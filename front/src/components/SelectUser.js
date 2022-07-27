import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import User from "./User";
import "./SelectUser.css";

function SelectUser({ setLoginUser }) {
  const [users, setUsers] = useState([]);

  const getUsersData = () => {
    axios
    .get("http://localhost:8000/users")
    .then((response) => {
      console.log(response.data)
      setUsers(response.data);
    })
    .catch(() => {
      console.log("通信に失敗しました");
    });
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="selectUser--header">
          <h1>アカウントを選択</h1>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="selectUser--title">ID</th>
              <th className="selectUser--title">名前</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <User key={user.id} user={user} setLoginUser={setLoginUser} />
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default SelectUser;
