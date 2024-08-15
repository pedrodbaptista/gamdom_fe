import * as React from "react";
import { Box } from "@mui/material";
import Logo from "./Logo";
import { Login } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      alignContent="center"
      justifyItems="center"
      justifyContent="space-between"
      flexDirection="row"
      sx={{ p: 5, width: "100%", height: "40px" }}
    >
      <Logo />
      <Login onClick={handleLogout} />
    </Box>
  );
}
