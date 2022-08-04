import "./App.css";
import React, {useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Main from "./components/Main";
import Signup from "./components/Signup";
import SelectUser from "./components/SelectUser";
import { usePersist } from './usePersist'

function App() {
  // ログイン中のユーザーを管理する
  // TODO リロードするとログイン情報が消えてしまう。
  const [mydata, setMydata] = usePersist('mydata', null)
  const [loginUser, setLoginUser] = useState(mydata ||{id:"",username:""});

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main loginUser={loginUser} />} />
          <Route
            path="/signup"
            element={<Signup setLoginUser={setLoginUser}  />}
          />
          <Route
            path="/login"
            element={<SelectUser setLoginUser={setLoginUser} setMydata={setMydata}/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
