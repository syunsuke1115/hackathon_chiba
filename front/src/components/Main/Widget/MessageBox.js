import React, { forwardRef, useState } from "react";
import "./MessageBox.css";
import { Avatar } from "@mui/material";
import axios from "axios";
import base_url from "../../URL";
import { FavoriteBorder } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageIcon from "@mui/icons-material/Message";
import { IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const MessageBox = forwardRef(
  (
    {
      nowChannel,
      username,
      post_id,
      text,
      avatar,
      image,
      createdTime,
      setSelectPost,
      setThreads,
      user_id,
      to_reply,
      created_at,
      updated_at,
    },
    ref
  ) => {
    const _selectPost = () => {
      setSelectPost({
        id: post_id,
        username: username,
        avatar: avatar,
        text: text,
        image: image,
        user_id: user_id,
        to_reply: to_reply,
        createdTime: createdTime,
      });

      axios
        .get(base_url + "/posts/reply/" + (post_id ? post_id : 0))
        .then((response) => {
          console.log(response.data);
          setThreads(response.data);
        })
        .catch((e) => {
          console.log("通信に失敗しました");
          console.log(e);
        });
    };
    const addFavorite = () => {};
    const fixPost = () => {
      setFixMode(true);
    };
    const [fixMode, setFixMode] = useState(false);
    const [fixText, setFixText] = useState(text);

    const updatePost = () => {
      axios
        .put(base_url + "/posts", {
          channel_id: nowChannel.id.toString(),
          user_id: user_id.toString(),
          text: fixText,
          image: image,
          to_reply: to_reply,
          id: parseInt(post_id),
        })
        .then((response) => {
          console.log(response.data);
          setFixMode(false);
          alert("投稿を修正しました");
        })
        .catch((e) => {
          console.log("通信に失敗しました");
          console.log(e);
        });
    };
    const deletePost = () => {
      if (post_id == undefined || post_id == "") {
        alert("削除に失敗しました");
        return;
      }
      axios
        .delete(base_url + "/posts/" + post_id, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          alert("投稿を削除しました");
        })
        .catch((e) => {
          console.log("通信に失敗しました");
          console.log(e);
        });
    };

    return (
      <div
        className="message"
        ref={ref}
        onClick={to_reply == "0" ? _selectPost : () => {}}
      >
        <div className="message--avatar">
          <Avatar src={avatar} variant="rounded" />
        </div>
        <div className="message--body">
          <div className="message--header">
            <div className="message--headerText">
              <h3>
                {username}
                <span className="message--headerSpecial">{createdTime}</span>
              </h3>
            </div>
          </div>
          <div className="message--headerDescription">
            {fixMode ? (
              <div>
                {" "}
                <input
                  value={fixText}
                  type="text"
                  onChange={(e) => setFixText(e.target.value)}
                ></input>
                <IconButton
                  onClick={() => {
                    updatePost();
                  }}
                >
                  <CheckCircleIcon fontSize="small" />
                </IconButton>
              </div>
            ) : (
              <>
                {" "}
                <p>{text}</p>
                {created_at != updated_at && <p className="message--fixed-message">（編集済み）</p>}
              </>
            )}
          </div>
          {image && <img src={image} />}
          <div className="message--footer">
            <IconButton
              onClick={() => {
                addFavorite();
              }}
            >
              <FavoriteBorder fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => {
                fixPost();
              }}
            >
              <MessageIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => {
                deletePost();
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
);

export default MessageBox;
