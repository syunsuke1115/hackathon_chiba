import React, { useEffect, useState } from "react";
import LeftSidebar from "./Main/LeftSidebar/LeftSidebar";
import RightSidebar from "./Main/RightSidebar/RightSidebar";
import Timeline from "./Main/Timeline/Timeline";
import "./Main.css"

function Main() {
  const [channel, setChannel] = useState(["general"]);

  return (
    <div className="main">
      <LeftSidebar channel={channel}/>
      <Timeline channel={channel}/>
      <RightSidebar channel={channel}/>
    </div>
  );
}

export default Main;
