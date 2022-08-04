import React, { useState } from "react";
import { Button } from "@mui/material";
import "./Post.css";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import ButtonGroup from "@mui/material/ButtonGroup";

function Post({ nowChannel, loginUser, setPosts }) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const post = (e) => {
    // ボタンを押しても画面をリロードしない
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_BASE_URL + "/posts", {
        channel_id: nowChannel.id.toString(),
        user_id: loginUser.id.toString(),
        text: message,
        image: image,
        to_reply: "0",
      })
      .then((response) => {
        console.log(response.data);
        axios
          .get(
            process.env.REACT_APP_BASE_URL +
              "/posts/channel/" +
              (nowChannel.id ? nowChannel.id : 1)
          )
          .then((response) => {
            console.log(response.data);
            setPosts(response.data);
          })
          .catch((e) => {
            console.log("通信に失敗しました");
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
        console.log("通信に失敗しました");
      });
    setMessage("");
    setImage("");
  };

  const translatePost = (lang) => {
    const params = new URLSearchParams();
    params.append("auth_key", process.env.REACT_APP_DEEPEL_API_KEY);
    params.append("text", message);
    params.append("target_lang", lang);
    fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      body: params,
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.translations[0].text);
      })
      .catch(() => {
        alert("翻訳に失敗しました");
      });
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
        <ButtonGroup variant="text" aria-label="text button group">
          <Button
            onClick={() => {
              translatePost("EN");
            }}
          >
            EN
          </Button>
          <Button
            onClick={() => {
              translatePost("ZH");
            }}
          >
            ZH
          </Button>
          <Button
            onClick={() => {
              translatePost("JA");
            }}
          >
            JA
          </Button>
        </ButtonGroup>
        <Button
          className={`post--postButton ${
            message.length + image.length && "post--postButton--active"
          }`}
          type="submit"
          onClick={post}
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}

export default Post;
