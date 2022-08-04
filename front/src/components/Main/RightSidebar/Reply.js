import React, { useState } from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./Reply.css";
import axios from "axios";
import SplitButton from "../Widget/PostButton.js";

function Reply({ nowChannel, loginUser, selectPost, setThreads }) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const reply = (e) => {
    // ボタンを押しても画面をリロードしない
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_BASE_URL + "/posts", {
        channel_id: nowChannel.id.toString(),
        user_id: loginUser.id.toString(),
        text: message,
        image: image,
        to_reply: selectPost.id.toString(),
      })
      .then((response) => {
        console.log(response.data);
        axios
          .get(
            process.env.REACT_APP_BASE_URL +
              "/posts/reply/" +
              selectPost.id.toString()
          )
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
        <SplitButton 
          message={message}
          image={image}
          setMessage={setMessage}
          handleClick={reply}
        />
      </div>
    </div>
  );
}

export default Reply;
