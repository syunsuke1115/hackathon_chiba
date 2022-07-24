import React from "react";
import "./LeftSidebar.css";
import SidebarOption from "./SidebarOption";
import SearchIcon from "@mui/icons-material/Search";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AppsIcon from "@mui/icons-material/Apps";
import Channel from "./Channel";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Fab } from "@mui/material";

function LeftSidebar() {
  return (
    <div className="left-sidebar">
      {/* ワークスペース名 */}
      <div className="left-sidebar--header">
        <h2>UTTC</h2>
      </div>
      {/* 設定ボタン */}
      <div className="left-sidebar--setting">
        <SidebarOption text="話題を検索" Icon={SearchIcon}/>
        <SidebarOption text="下書き" Icon={TextSnippetIcon} />
        <SidebarOption text="プロフィール" Icon={PermIdentityIcon} />
        <SidebarOption text="通知" Icon={NotificationsNoneIcon} />
        <SidebarOption text="その他" Icon={AppsIcon} />
      </div>
      {/* チャンネル選択 */}
      <div className="left-channel--header">
        <h2>チャンネル</h2>
        <Channel text="general" Icon={LockOpenIcon} active />
      </div>
      <div className="left-channel--header">
        <h2>他のチャンネルに参加</h2>
        <Channel text="運営" Icon={LockOpenIcon} addIcon />
        <Channel text="class100000" Icon={LockOpenIcon} addIcon />
      </div>
    </div>
  );
}

export default LeftSidebar;
