import React, { useState } from "react";
import { Button } from "@mui/material";
import "./Post.css";

function Post() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const post = (e) => {
    // ボタンを押しても画面をリロードしない
    e.preventDefault();
    setMessage("");
    setImage("");
  };

  return (
    <div className="post">
      <form>
        <div className="post--input">
          <input
            placeholder="チャンネルへのメッセージ"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
        </div>
      </form>
      <div className="post--imageButton">
        <input
          value={image}
          className="post--imageInput"
          placeholder="画像のURL"
          type="text"
          onChange={(e) => setImage(e.target.value)}
        ></input>
        <Button className="post--postButton" type="submit" onClick={post}>
          投稿
        </Button>
      </div>
    </div>
  );
}

export default Post;
