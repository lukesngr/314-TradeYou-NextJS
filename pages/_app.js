import {SessionProvider} from 'next-auth/react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

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

function MyApp({Component, pageProps: {session, ... pageProps}}) {
    return (
        <ThemeProvider theme={theme}>
            <SessionProvider>
                <Component {... pageProps}></Component>
            </SessionProvider>
        </ThemeProvider>
    )
}

export default MyApp