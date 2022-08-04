import React from "react";
import "./Channel.css";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import axios from "axios";

function Channel({
  text,
  Icon,
  active,
  addIcon,
  loginUser,
  channel_id,
  setNowChannel,
  setPosts,
}) {
  const addChannelUserData = () => {
    // TODO ワークスペース選択を実装したらspaceを変数にする
    if (loginUser.id == undefined || loginUser.id == "") {
      alert("ログインしてください");
      return;
    }
    axios
      .post(process.env.REACT_APP_BASE_URL + "/channelUsers", {
        User_id: loginUser.id,
        Channel_id: channel_id,
        withCredentials: true,
      })
      .then((response) => {
        alert(text + "に参加しました");
      })
      .catch((e) => {
        console.log("通信に失敗しました");
      });
  };

  const changeChannel = () => {
    console.log(channel_id);
    setNowChannel({ id: channel_id, name: text });
    // TODO ワークスペース選択を実装したらspaceを変数にする
    // タイムラインを更新
    axios
      .get(
        process.env.REACT_APP_BASE_URL +
          "/posts/channel/" +
          (channel_id ? channel_id : 1)
      )
      .then((response) => {
        setPosts(response.data);
      })
      .catch((e) => {
        console.log("通信に失敗しました");
        console.log(e);
      });
  };

  return (
    <div
      className={`channel ${active && "channel--active"}`}
      onClick={~addIcon && changeChannel}
    >
      <Icon />
      <h2>{text}</h2>
      <div className="channel--add-icon">
        {addIcon && (
          <IconButton
            onClick={() => {
              addChannelUserData();
            }}
            style={{ color: "#666666", margin: 0, padding: 0 }}
          >
            <AddIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default Channel;
