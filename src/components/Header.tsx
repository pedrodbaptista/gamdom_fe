import * as React from 'react';
import { Box } from '@mui/material';
import Logo from './Logo';

export default function Header() {
  return (
    <Box 
      display="flex"
      alignItems="center"
      alignContent="center" 
      justifyItems="center"
      flexDirection="row"
      sx={{ p: 5, width: "100%", height: "40px" }}
    >
      <Logo />
    </Box>
  );
}