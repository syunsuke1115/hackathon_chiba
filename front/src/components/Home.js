import React from "react";
import "./Main";
import { Link, NavLink } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import "./Home.css";
import HomeImage from "../img/home_image.svg";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <img src={HomeImage} />
        <div className="home--message">
          <h1>ChiBackへようこそ</h1>
        </div>
        <Button
          variant="outlined"
          className="home--login"
          fullWidth
          component={Link}
          to="/login"
        >
          {" "}
          ログイン
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "&::before, &::after": {
              borderTop: "solid 1px",
              content: '""',
              flexGrow: 1,
            },
            "&::before": {
              mr: 1,
            },
            "&::after": {
              ml: 1,
            },
          }}
          className="home--horizontal-line"
        >
          <Typography variant="h5" className="home--horizontal-text">
            あるいは
          </Typography>
        </Box>
        <Button
          variant="outlined"
          className="home--siginup"
          fullWidth
          component={Link}
          to="/signup"
        >
          {" "}
          新規登録
        </Button>
      </div>
    </Container>
  );
}

export default Home;
