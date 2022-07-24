import React, { useEffect, useState } from "react";
import Post from "./Post";
import "./Timeline.css";
import FlipMove from "react-flip-move";
import MessageBox from "../Widget/MessageBox";

function Timeline({channel}) {
  const [posts, setPosts] = useState([
    {
      text: "初めてのメッセージ",
      username: "千葉駿介",
      createdTime: "7月23日 18:59",
    },
    { text: "次のメッセージ", username: "千葉駿介" },
    { text: "その次のメッセージ", username: "千葉駿介" },
    { text: "最後のメッセージ", username: "千葉駿介" },
    { text: "最後のメッセージ", username: "千葉駿介" },
    { text: "最後のメッセージ", username: "千葉駿介" },
    { text: "最後のメッセージ最後のメッセージ", username: "千葉駿介" },
    { text: "最後のメッセージ", username: "千葉駿介" },
    { text: "最後のメッセージ", username: "千葉駿介" },
  ]);

  return (
    <div className="timeline">
      {/* チャンネル名 */}
      <div className="timeline--header">
        <h2>{channel}</h2>
        <Post />
      </div>
      <FlipMove>
        {posts.map((post) => (
          <MessageBox
            key={post.text}
            username={post.username}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
            createdTime={post.createdTime}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Timeline;
