import React from "react";
import "./Channel.css";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

function Channel({ text, Icon, active, addIcon }) {
  return (
    <div className={`channel ${active && "channel--active"}`}>
      <Icon />
      <h2>{text}</h2>
      <div className="channel--add-icon">
        {addIcon && (
          <IconButton
            onClick={() => {
              alert("clicked");
            }}
            style={{ color: "#666666", margin: 0, padding: 0 }}
          >
            <AddIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default Channel;
