import React, { useState } from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./Reply.css";
import axios from "axios";
import base_url from "../../URL";

function Reply({ nowChannel, loginUser, selectPost,setThreads}) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const reply = (e) => {
    // ボタンを押しても画面をリロードしない
    e.preventDefault();
    axios
      .post(base_url + "/posts", {
        channel_id: nowChannel.id.toString(),
        user_id: loginUser.id.toString(),
        text: message,
        image: image,
        to_reply: selectPost.id.toString(),
      })
      .then((response) => {
        console.log(response.data);
        axios
          .get(base_url + "/posts/reply/" + selectPost.id.toString())
          .then((response) => {
            console.log(response.data);
            setThreads(response.data);
          })
          .catch((e) => {
            console.log("通信に失敗しました");
            console.log(e);
          });
      })
      .catch((e) => {
        console.log("通信に失敗しました");
      });
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
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}

export default Reply;
