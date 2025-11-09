// Logo.js
import React from 'react';
import Box from '@mui/material/Box';
import logo from '../../assets/logo.png'; // adjust path to your logo file

const Logo = () => {
  return (
    <Box
      component="img"
      src={logo}
      alt="App Logo"
      sx={{
        width: 89,        // width in px
        height: 19,       // height in px
        objectFit: 'contain', // keeps aspect ratio
        borderRadius: 2,   // optional: rounded corners
      }}
    />
  );
};

export default Logo;

