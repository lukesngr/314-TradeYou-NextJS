import {SessionProvider} from 'next-auth/react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//Made with mui-theme-creator
const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#3C3C3C',
      },
      secondary: {
        main: '#F9F9F9',
      },
    },
});

const queryClient = new QueryClient()

function MyApp({Component, pageProps: {session, ... pageProps}}) {
    return (
        <ThemeProvider theme={theme}>
            <SessionProvider>
                <QueryClientProvider client={queryClient}>
                  <Component {... pageProps}></Component>
                  <ReactQueryDevtools />
                </QueryClientProvider>
            </SessionProvider>
        </ThemeProvider>
    )
}

export default MyApp