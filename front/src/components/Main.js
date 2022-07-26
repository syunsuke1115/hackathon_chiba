import React, { useEffect, useState } from "react";
import LeftSidebar from "./Main/LeftSidebar/LeftSidebar";
import RightSidebar from "./Main/RightSidebar/RightSidebar";
import Timeline from "./Main/Timeline/Timeline";
import "./Main.css"

function Main({loginUser}) {
  const [channel, setChannel] = useState(["general"]);

  return (
    <div className="main">
      <LeftSidebar channel={channel} loginUser={loginUser}/>
      <Timeline channel={channel} loginUser={loginUser}/>
      <RightSidebar channel={channel} loginUser={loginUser}/>
    </div>
  );
}

export default Main;
