import React from "react";
import LeftSidebar from "./Main/LeftSidebar/LeftSidebar";
import RightSidebar from "./Main/RightSidebar/RightSidebar";
import Timeline from "./Main/Timeline/Timeline";
import "./Main.css"

function Main() {
  return (
    <div className="main">
      <LeftSidebar />
      <Timeline />
      <RightSidebar />
    </div>
  );
}

export default Main;
