import React, { useState } from "react";
import "./LeftSidebar.css";
import SidebarOption from "./SidebarOption";
import SearchIcon from "@mui/icons-material/Search";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AppsIcon from "@mui/icons-material/Apps";
import Channel from "./Channel";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AddIcon from "@mui/icons-material/Add";
import { dialogClasses, IconButton } from "@mui/material";
import { TrafficOutlined } from "@mui/icons-material";
import axios from "axios";
import base_url from "../../URL";

function LeftSidebar({
  nowChannel,
  myChannels,
  notMychannels,
  loginUser,
  setNowChannel,
  setPosts,
}) {
  const [newChannelName, setNewChannelName] = useState("");
  const addChannelData = () => {
    if (loginUser.id == undefined || loginUser.id == "") {
      alert("ログインしてください");
      return;
    }
    if (newChannelName == undefined || newChannelName == "") {
      alert("チャンネル名を入力してください");
      return;
    }

    // 新しいチャンネルを作成し、自分自身を追加する。
    // TODO ワークスペース選択を実装したらspaceを変数にする
    axios
      .post(base_url + "/channels", {
        Name: newChannelName,
        Space_id: 1,
      })
      .then((response) => {
        axios
          .post(base_url + "/channelUsers", {
            User_id: loginUser.id,
            Channel_id: response.data,
            withCredentials: true,
          })
          .then((response) => {
            alert(newChannelName + "に参加しました");
          })
          .catch((e) => {
            console.log("通信に失敗しました");
          });
      })
      .catch((e) => {
        console.log("通信に失敗しました");
      });
  };

  return (
    <div className="left-sidebar">
      {/* ワークスペース名 */}
      <div className="left-sidebar--header">
        <h2>UTTC-{loginUser.username}</h2>
      </div>
      {/* 設定ボタン */}
      <div className="left-sidebar--setting">
        <SidebarOption text="話題を検索" Icon={SearchIcon} />
        <SidebarOption text="下書き" Icon={TextSnippetIcon} />
        <SidebarOption text="プロフィール" Icon={PermIdentityIcon} />
        <SidebarOption text="通知" Icon={NotificationsNoneIcon} />
        <SidebarOption text="その他" Icon={AppsIcon} />
      </div>
      {/* チャンネル選択 */}
      <div className="left-channel--header">
        <div className="left-channel--header-top">
          <h2>チャンネル</h2>
          <input
            className="left-channel--add-input"
            placeholder="作成"
            type="text"
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
          ></input>
          <div className="channel--add-icon">
            <IconButton
              onClick={() => {
                addChannelData();
              }}
              style={{ color: "#666666", margin: 0, padding: 0 }}
            >
              <AddIcon />
            </IconButton>
          </div>
        </div>
        {myChannels.map((channel) => {
          return (
            <Channel
              key={channel.id}
              text={channel.name}
              Icon={LockOpenIcon}
              active={nowChannel.id==channel.id}
              setNowChannel={setNowChannel}
              setPosts={setPosts}
              channel_id={channel.id}
            />
          );
        })}
      </div>
      <div className="left-channel--header-bottom">
        <h2>他のチャンネルに参加</h2>
        {notMychannels.map((notMychannel) => {
          return (
            <Channel
              key={notMychannel.id}
              text={notMychannel.name}
              Icon={LockOpenIcon}
              active={false}
              addIcon={true}
              loginUser={loginUser}
              channel_id={notMychannel.id}
              setNowChannel={()=>{}}
            />
          );
        })}
      </div>
    </div>
  );
}

export default LeftSidebar;
