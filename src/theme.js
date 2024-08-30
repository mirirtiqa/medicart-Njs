'use client';
import { Saira } from "next/font/google";
import { createTheme } from '@mui/material/styles';

const saira = Saira(
    {
      subsets: ["latin"] 
    }
  );

const theme = createTheme({
  typography: {
    fontFamily: saira.style.fontFamily,
    h1: {
        fontSize: '2rem', // Base size for small screens
        '@media (min-width:600px)': {
          fontSize: '3rem', // Medium screens (tablets)
        },
        '@media (min-width:900px)': {
          fontSize: '4rem', // Large screens (desktops)
        },
      },
    },
});

export default theme;