import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Main from "./components/Main";
import Signup from "./components/Signup";
import SelectUser from "./components/SelectUser";


function App() {
  return (
      <div >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<Main />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<SelectUser />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
