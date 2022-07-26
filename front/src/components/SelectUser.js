import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import User from "./User";
import "./SelectUser.css"

function SelectUser({setLoginUser}) {
  const [users, setUsers] = useState([
    {
      id: "1",
      username: "千葉駿介",
      createdTime: "7月23日 18:59",
    },
    {
      id: "2",
      username: "千葉駿介2",
      createdTime: "7月23日 18:59",
    },
    {
      id: "3",
      username: "千葉駿介3",
      createdTime: "7月23日 18:59",
    },

  ]);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="selectUser--header">
          <h1>
            アカウントを選択
          </h1>
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
                <User
                  key={user.id}
                  user={user}
                  setLoginUser={setLoginUser}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default SelectUser;
