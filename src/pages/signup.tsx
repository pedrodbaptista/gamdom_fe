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
import { isValidUser } from "../helpers/validator";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signup = () => {
    try {
      if (!isValidUser(name, email, password)) {
        return;
      }
      fetch("http://localhost:3000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })
        .then((r) => r.json())
        .then((r) => {
          if ("success" === r.message) {
            localStorage.setItem(
              "gamdom_user",
              JSON.stringify({ email, token: r.token })
            );
            navigate("/");
          }
          if ("User already exist" === r.message) {
            toast.error("User already exist");
          } else {
            toast.error("Wrong email or password");
          }
        });
    } catch (err) {
      console.log("err", err);
      toast.error("Error on signing up.");
    }
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
        Signup
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
            Name
          </InputLabel>
          <TextField
            id="name"
            variant="outlined"
            style={{ backgroundColor: "white" }}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
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
            variant="outlined"
            style={{ backgroundColor: "white" }}
            placeholder="Password"
            type="password"
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
          onClick={signup}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;
