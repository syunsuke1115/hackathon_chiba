import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Main from "./components/Main";
import Signup from "./components/Signup";
import SelectUser from "./components/SelectUser";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<Main />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<SelectUser />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Container>
  );
}

export default App;
