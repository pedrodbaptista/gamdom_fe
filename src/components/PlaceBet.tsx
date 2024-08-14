import * as React from "react";
import {
  Box,
  Button,
  InputAdornment,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 5,
  alignItems: "center",
  alignContent: "center",
  justifyItems: "center",
};

export default function PlaceBet({
  id,
  showExplosion,
}: {
  id: string;
  showExplosion: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [bet, setBet] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isValidInput = () => {
    if (Number(bet) < 1) {
      return false;
    }

    return true;
  };

  const placeBet = () => {
    if (isValidInput()) {
      toast.success("Your bet was placed successfully.");
      showExplosion();
      handleClose();
    } else {
      toast.error("Please type a valid bet");
    }
  };

  function handleBetChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setBet(event.target.value);
  }

  return (
    <Box sx={{ width: "100%", height: "40px" }}>
      <Button onClick={handleOpen} style={{ color: "black" }}>
        <CasinoIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            style={{ color: "black" }}
            sx={{ p: 5 }}
            variant="h4"
            component="h2"
          >
            Please type your bet
          </Typography>
          <OutlinedInput
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
            id="betValue"
            type="number"
            style={{ width: "200px" }}
            value={bet}
            onChange={handleBetChange}
          ></OutlinedInput>
          <Button variant="contained" onClick={placeBet}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
