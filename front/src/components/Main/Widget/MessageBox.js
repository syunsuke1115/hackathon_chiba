import React, { forwardRef } from "react";
import "./MessageBox.css"
import { Avatar } from "@mui/material";

const MessageBox = forwardRef(
    ({username,text, avatar, image,createdTime}, ref) => {
      return (
        <div className="message" ref={ref}>
          <div className="message--avatar">
            <Avatar src={avatar} variant="rounded"/>
          </div>
          <div className="message--body">
            <div className="message--header">
              <div className="message--headerText">
                <h3>
                  {username}
                  <span className="message--headerSpecial">{createdTime}</span>
                </h3>
              </div>
            </div>
            <div className="message--headerDescription">
              <p>{text}</p>
            </div>
            <img src={image} />
          </div>
        </div>
      );
    }
  );

export default MessageBox