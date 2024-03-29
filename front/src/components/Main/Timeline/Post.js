import React, { useState } from "react";
import "./Post.css";
import SplitButton from "../Widget/PostButton.js";
import axios from "axios";

function Post({ nowChannel, loginUser, setPosts }) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const sendPost = (e) => {
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
        <SplitButton 
          message={message}
          image={image}
          setMessage={setMessage}
          handleClick={sendPost}
        />
      </div>
    </div>
  );
}

export default Post;
