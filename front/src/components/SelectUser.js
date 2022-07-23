import React from "react";
import { Link } from "react-router-dom"

function SelectUser() {
  return (
    <>
      <div>SelectUser</div>
      <div className="w-100 text-center mt-2">
        ユーザーAでログイン <Link to="/main">ユーザーA</Link>
      </div>
      <div className="w-100 text-center mt-2">
        ユーザーBでログイン <Link to="/main">ユーザーB</Link>
      </div>
      <div className="w-100 text-center mt-2">
        サインアップ <Link to="/signup">sign up</Link>
      </div>
    </>
  );
}

export default SelectUser;
