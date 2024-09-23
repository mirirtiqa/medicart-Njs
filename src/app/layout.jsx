import "./globals.css";
import StyledComponentsRegistry from '@/lib/registry'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '../theme';
import { AuthProvider } from "@/contexts/AuthContexts";
import { CartProvider } from "@/contexts/CardContext";
import Header from "@/components/Header1/page";
import MUIHeaderMenu from "@/components/Header/MUIHeaderMenu";
import Search from "@/components/Search";
export const metadata = {
  title: "MediCart",
  description: "One stop shop for your mediccal needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>

          <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthProvider>
                <CartProvider>
                <div>
                  <Header />
              
                  <MUIHeaderMenu />
                  {children}
                </div>
                </CartProvider>
              </AuthProvider>
            </ThemeProvider>
          </StyledComponentsRegistry>

        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
