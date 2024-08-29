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
  },
});

export default theme;