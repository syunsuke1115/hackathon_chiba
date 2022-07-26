import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./User.css";

function User({ user, setLoginUser}) {
  const login = (e) => {
    setLoginUser({id:user.id,username:user.username});
  };
  
  return (
    <tr>
      <td className="user--text">{user.id}</td>
      <td className="user--text">{user.username}</td>
      <td>
        <Button
          type="button"
          className="user--button"
          component={Link}
          to="/main"
          onClick={(e) => login(e)}
        >
          ログイン
        </Button>
      </td>
    </tr>
  );
}

export default User;
