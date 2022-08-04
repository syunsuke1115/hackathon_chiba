import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

import SendIcon from "@mui/icons-material/Send";
import "./PostButton.css";

const options = ["英語に翻訳", "中国語に翻訳", "日本語に翻訳"];
const deepl_option = ["EN", "ZH", "JA"];

export default function SplitButton({
  message,
  image,
  setMessage,
  handleClick
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleMenuItemClick = (index) => {
    translatePost(deepl_option[index]);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };



  const translatePost = (lang) => {
    const params = new URLSearchParams();
    params.append("auth_key", process.env.REACT_APP_DEEPEL_API_KEY);
    params.append("text", message);
    params.append("target_lang", lang);
    fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      body: params,
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.translations[0].text);
      })
      .catch(() => {
        alert("翻訳に失敗しました");
      });
  };

  return (
    <React.Fragment>
      <ButtonGroup
        ref={anchorRef}
        aria-label="split button"
        className="post-Button"
      >
        <Button
          className={`post--postButton ${
            message.length + image.length && "post--postButton--active"
          }`}
          type="submit"
          onClick={(message.length + image.length)?handleClick:()=>{}}
        >
          <SendIcon />
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          className={`post--translateButton ${
            message.length + image.length && "post--translateButton--active"
          }`}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      onClick={(event) => handleMenuItemClick(index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
