import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Main from "./components/Main";
import Signup from "./components/Signup";
import SelectUser from "./components/SelectUser";

function App() {
  // ログイン中のユーザーを管理する
  // TODO リロードするとログイン情報が消えてしまう。
  const [loginUser, setLoginUser] = useState({id:"",username:""});

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main loginUser={loginUser} />} />
          <Route
            path="/signup"
            element={<Signup setLoginUser={setLoginUser} />}
          />
          <Route
            path="/login"
            element={<SelectUser setLoginUser={setLoginUser} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
