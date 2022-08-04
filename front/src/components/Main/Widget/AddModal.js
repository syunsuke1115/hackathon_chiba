import React, { useState } from "react";
import "./AddModal.css";
import { Button } from "@mui/material";
import axios from "axios";
import base_url from "../../URL";
import CloseIcon from "@mui/icons-material/Close";

function AddModal({ show, loginUser, setModal }) {
  const [inputText, setInputText] = useState("");

  const addChannelData = () => {
    if (loginUser.id == undefined || loginUser.id == "") {
      alert("ログインしてください");
      return;
    }
    if (inputText == undefined || inputText == "") {
      alert("チャンネル名を入力してください");
      return;
    }
    // 新しいチャンネルを作成し、自分自身を追加する。
    // TODO ワークスペース選択を実装したらspaceを変数にする
    axios
      .post(base_url + "/channels", {
        Name: inputText,
        Space_id: 1,
      })
      .then((response) => {
        axios
          .post(base_url + "/channelUsers", {
            User_id: loginUser.id,
            Channel_id: response.data,
            withCredentials: true,
          })
          .then(() => {
            alert(inputText + "を作成しました");
            setModal(false);
          })
          .catch((e) => {
            console.log("通信に失敗しました");
          });
      })
      .catch((e) => {
        console.log("通信に失敗しました");
      });
  };

  if (show) {
    return (
      <div className="modal--overlay">
        <div className="modal--content">
          <div className="modal--header">
            <h2>チャンネルを作成する</h2>
            <CloseIcon className="modal--close"
              onClick={() => {
                setModal(false);
              }}
            />
          </div>

          <h5>名前</h5>
          <input
            className="modal--input"
            placeholder="例：class1"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></input>
          <div>
            {" "}
            <Button
              type="submit"
              className={`modal--Button ${inputText.length && "modal--Button-active"}`}
              onClick={() => {
                addChannelData();
                
              }}
            >
              作成
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddModal;
