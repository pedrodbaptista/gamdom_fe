import * as React from "react";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import EventsTable from "../components/EventsTable";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IUser } from "../types/User";

const Home = () => {
  const [user, setUser] = React.useState(null as IUser | null);

  const navigate = useNavigate();

  React.useEffect(() => {
    const loggedUser = localStorage.getItem("gamdom_user");
    if (!loggedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(loggedUser) as IUser);
  }, []);

  return (
    <Container maxWidth="md">
      <Header />
      {user && <EventsTable user={user} />}
    </Container>
  );
};

export default Home;
