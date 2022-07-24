import React, { useEffect, useState } from "react";
import "./RightSidebar.css";
import FlipMove from "react-flip-move";
import MessageBox from "../Widget/MessageBox";
import "./RightSidebar.css";
import Reply from "./Reply";

function RightSidebar({ channel }) {
  const [post, setPost] = useState({
    text: "投稿",
    username: "千葉駿介",
    createdTime: "7月23日 18:59",
  });
  const [threads, setThreads] = useState([
    {
      text: "初めてのスレッド",
      username: "千葉駿介",
      createdTime: "7月23日 18:59",
    }
  ]);
  return (
    <div className="right-sidebar">
      {/* チャンネル名 */}
      <div className="right-sidebar--header">
        <h2>スレッド</h2>
        <span className="right-sidebar--headerSpecial">{channel}</span>
      </div>
      <div className="right-sidebar--post">
        <MessageBox
          key={post.text}
          username={post.username}
          text={post.text}
          avatar={post.avatar}
          image={post.image}
          createdTime={post.createdTime}
        />
        <div className="right-sidebar--reply">
          <h6>返信</h6>
        </div>
      </div>

      <FlipMove>
        {threads.map((thread) => (
          <MessageBox
            key={thread.text}
            username={thread.username}
            text={thread.text}
            avatar={thread.avatar}
            image={thread.image}
            createdTime={thread.createdTime}
          />
        ))}
      </FlipMove>
      <Reply/>
    </div>
  );
}

export default RightSidebar;
