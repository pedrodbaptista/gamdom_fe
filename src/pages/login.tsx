import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = () => {
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => r.json())
      .then((r) => {
        if ("success" === r.message) {
          localStorage.setItem(
            "gamdom_user",
            JSON.stringify({ email, token: r.token })
          );
          navigate("/");
        } else {
          toast.error("Wrong email or password");
        }
      });
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Header />
      <Typography variant="h3" component="h3">
        Login
      </Typography>
      <br />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <InputLabel
            style={{
              color: "white",
              fontWeight: "bold",
              width: "100px",
              alignContent: "center",
            }}
          >
            Email
          </InputLabel>
          <TextField
            id="email"
            variant="outlined"
            style={{ backgroundColor: "white" }}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <InputLabel
            style={{
              color: "white",
              fontWeight: "bold",
              width: "100px",
              alignContent: "center",
            }}
          >
            Password
          </InputLabel>
          <TextField
            id="password"
            type="password"
            variant="outlined"
            style={{ backgroundColor: "white" }}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      </Box>
      <br />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: 2,
        }}
      >
        <Button
          style={{
            backgroundColor: "rgb(0, 255, 134)",
            color: "rgb(29, 35, 41)",
          }}
          variant="contained"
          onClick={login}
        >
          Login
        </Button>
      </Box>
      <br />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: 2,
        }}
      >
        <Button
          style={{
            backgroundColor: "rgb(0, 255, 134)",
            color: "rgb(29, 35, 41)",
          }}
          variant="contained"
          onClick={() => navigate("/signup")}
        >
          Signup
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
