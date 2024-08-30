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
        fontWeight: 800,
        fontSize: '1rem', // Base size for small screens
        '@media (min-width:600px)': {
          fontSize: '2rem', // Medium screens (tablets)
        },
        '@media (min-width:900px)': {
          fontSize: '3rem', // Large screens (desktops)
        },
      },
    },
    palette: {
      primary: {
        main: '#000000', //black
      },
      secondary: {
        main: '#ffffff', //white
      },
      tertiary:{
        main:"#01D6A3", 
    },
  }
});

export default theme;