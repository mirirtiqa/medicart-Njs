import "./globals.css";
import StyledComponentsRegistry from '@/lib/registry'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '../theme';

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body>
      <AppRouterCacheProvider>
      
      <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        {children}
        </ThemeProvider>
      </StyledComponentsRegistry>
      
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}
