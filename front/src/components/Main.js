import React, { useEffect, useState } from "react";
import LeftSidebar from "./Main/LeftSidebar/LeftSidebar";
import RightSidebar from "./Main/RightSidebar/RightSidebar";
import Timeline from "./Main/Timeline/Timeline";
import "./Main.css";
import axios from "axios";
import base_url from "./URL";
import { Modal } from "@mui/material";
import AddModal from "./Main/Widget/AddModal";

function Main({ loginUser }) {
  const [nowChannel, setNowChannel] = useState({ id: 1, name: "UTTC" });
  const [myChannels, setMyChannels] = useState(["general"]);
  const [notMychannels, setNotMyChannels] = useState(["general"]);
  const [posts, setPosts] = useState([]);
  const [selectPost, setSelectPost] = useState({});
  const [modal, setModal] = useState(false);

  const [threads, setThreads] = useState([
    // {
    //   text: "初めてのスレッド",
    //   username: "千葉駿介",
    //   createdTime: "7月23日 18:59",
    // }
  ]);

  const getMyChannelsData = () => {
    // TODO ワークスペース選択を実装したらspaceを変数にする
    axios
      .get(
        base_url +
          "/mychannel/space/1/user_id/" +
          (loginUser.id ? loginUser.id : 0)
      )
      .then((response) => {
        console.log(response.data);
        setMyChannels(response.data);
      })
      .catch(() => {
        console.log("通信に失敗しました");
      });
  };

  const getNotMyChannelsData = () => {
    // TODO ワークスペース選択を実装したらspaceを変数にする
    axios
      .get(
        base_url +
          "/notmychannel/space/1/user_id/" +
          (loginUser.id ? loginUser.id : 0)
      )
      .then((response) => {
        console.log(response.data);
        setNotMyChannels(response.data);
      })
      .catch(() => {
        console.log("通信に失敗しました");
      });
  };

  useEffect(() => {
    getMyChannelsData();
    getNotMyChannelsData();
  }, []);

  return (
    <div>
      <div className="main">
        <LeftSidebar
          nowChannel={nowChannel}
          myChannels={myChannels}
          notMychannels={notMychannels}
          loginUser={loginUser}
          setNowChannel={setNowChannel}
          setPosts={setPosts}
          setSelectPost={setSelectPost}
          setModal={setModal}
        />
        <Timeline
          nowChannel={nowChannel}
          loginUser={loginUser}
          posts={posts}
          setPosts={setPosts}
          selectPost={selectPost}
          setSelectPost={setSelectPost}
          setThreads={setThreads}
        />
        <RightSidebar
          nowChannel={nowChannel}
          loginUser={loginUser}
          post={selectPost}
          threads={threads}
          setThreads={setThreads}
        />
      </div>
      <AddModal loginUser={loginUser} show={modal} setModal={setModal}/>
    </div>
  );
}

export default Main;
