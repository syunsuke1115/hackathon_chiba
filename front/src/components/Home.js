import React from "react";
import "./Main";
import { Link } from "react-router-dom"

function Home() {
  return (
    <>
      <div>Home</div>
      <div className="w-100 text-center mt-2">
        ログイン <Link to="/login">login</Link>
      </div>
      <div className="w-100 text-center mt-2">
        サインアップ <Link to="/signup">sign up</Link>
      </div>
    </>
  );
}

export default Home;
