import * as React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ISportEvents } from "../types/SportsEvents";
import { apiConfig } from "../config/api";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import Loader from "./Loader";
import PlaceBet from "./PlaceBet";
import ConfettiExplosion from "react-confetti-explosion";
import { IUser } from "../types/User";

export default function EventsTable({ user }: { user: IUser | null }) {
  const [data, setData] = React.useState([] as ISportEvents[]);
  const [loading, setLoading] = React.useState(true);
  const [isExploding, setIsExploding] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiConfig.base_url}/events`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        const events = await response.json();
        setData(events as unknown as ISportEvents[]);
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      toast.error("Error getting sport events!");
    } finally {
      setLoading(false);
    }
  };

  const showExplosion = () => {
    setIsExploding(true);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <Box sx={{ p: 5, width: "100%" }}>
      {loading ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Loader />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Event Id</StyledTableCell>
                <StyledTableCell align="left">Event Name</StyledTableCell>
                <StyledTableCell align="center">Odds</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data || []).map((row) => (
                <StyledTableRow key={row.event_id}>
                  <StyledTableCell component="th" scope="row">
                    {row.event_id}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.event_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.odds}</StyledTableCell>
                  <StyledTableCell align="center">
                    <PlaceBet id={row.event_id} showExplosion={showExplosion} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isExploding && (
        <ConfettiExplosion
          style={{ position: "absolute", top: "50%", left: "50%" }}
          duration={3000}
          force={0.8}
        />
      )}
    </Box>
  );
}
