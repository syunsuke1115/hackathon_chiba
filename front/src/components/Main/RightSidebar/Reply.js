import React, { useState } from "react";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import "./Reply.css";

function Reply() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const reply = (e) => {
    // ボタンを押しても画面をリロードしない
    e.preventDefault();
    setMessage("");
    setImage("");
  };

  return (
    <div className="reply">
      <form>
        <div className="reply--input">
          <input
            placeholder="返信する.."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
        </div>
      </form>
      <div className="reply--imageButton">
        <input
          value={image}
          className="reply--imageInput"
          placeholder="画像のURL"
          type="text"
          onChange={(e) => setImage(e.target.value)}
        ></input>
        <Button className="reply--postButton" type="submit" onClick={reply}>
        <SendIcon/>
        </Button>
      </div>
    </div>
  );
}

export default Reply;