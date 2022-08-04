import React, { useEffect, useState } from "react";
import "./RightSidebar.css";
import FlipMove from "react-flip-move";
import MessageBox from "../Widget/MessageBox";
import "./RightSidebar.css";
import Reply from "./Reply";

function RightSidebar({ nowChannel, loginUser, post, threads, setThreads }) {
  return (
    <div className="right-sidebar">
      {/* チャンネル名 */}
      <div className="right-sidebar--header">
        <h2>スレッド</h2>
        <span className="right-sidebar--headerSpecial">{nowChannel.name}</span>
      </div>
      <div className="right-sidebar--post">
        <MessageBox
          key={post.id}
          username={post.username}
          text={post.text}
          avatar={post.avatar}
          image={post.image}
          createdTime={post.createdTime}
          nowChannel={nowChannel}
          user_id={post.user_id}
          to_reply={post.to_reply}
          created_at={post.created_at}
          updated_at={post.updated_at}
        />
        <div className="right-sidebar--reply">
          <h6>{threads.length}件の返信</h6>
        </div>
      </div>

      <FlipMove>
        {threads.map((thread) => (
          <MessageBox
            key={thread.id}
            username={thread.user_name}
            text={thread.text}
            avatar={thread.avatar}
            image={thread.image}
            createdTime={thread.createdTime}
            setSelectPost={()=>{}}
            nowChannel={nowChannel}
            user_id={thread.user_id}
            to_reply={thread.to_reply}
            created_at={post.created_at}
            updated_at={post.updated_at}
          />
        ))}
      </FlipMove>
      <Reply
        nowChannel={nowChannel}
        loginUser={loginUser}
        selectPost={post}
        setThreads={setThreads}
      />
    </div>
  );
}

export default RightSidebar;
