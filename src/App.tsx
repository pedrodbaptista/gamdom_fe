import * as React from 'react';
import Container from '@mui/material/Container';
import Header from './components/Header';
import EventsTable from './components/EventsTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Container maxWidth="md">
      <Header />
      <EventsTable />
      <ToastContainer />
    </Container>
  );
}