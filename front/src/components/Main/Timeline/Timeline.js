import React, { useEffect, useState } from "react";
import Post from "./Post";
import "./Timeline.css";
import FlipMove from "react-flip-move";
import MessageBox from "../Widget/MessageBox";
import axios from "axios";
import base_url from "../../URL";

function Timeline({
  nowChannel,
  loginUser,
  posts,
  setPosts,
  selectPost,
  setSelectPost,
  setThreads,
}) {
  const getPostsData = () => {
    // TODO ワークスペース選択を実装したらspaceを変数にする
    axios
      .get(base_url + "/posts/channel/" + (nowChannel.id ? nowChannel.id : 1))
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((e) => {
        console.log("通信に失敗しました");
        console.log(e);
      });
  };

  // 最後の値を空にしておくと一度だけレンダリング
  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <div className="timeline">
      {/* チャンネル名 */}
      <div className="timeline--header">
        <h2>{nowChannel.name}</h2>
        <Post nowChannel={nowChannel} loginUser={loginUser} />
      </div>
      <FlipMove>
        {posts.map((post) => (
          <MessageBox
            key={post.id}
            post_id={post.id}
            username={post.user_name}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
            createdTime={post.createdTime}
            setSelectPost={setSelectPost}
            setThreads={setThreads}
            nowChannel={nowChannel}
            user_id={post.user_id}
            to_reply={post.to_reply}
            created_at={post.created_at}
            updated_at={post.updated_at}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Timeline;
