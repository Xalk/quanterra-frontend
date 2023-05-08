import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import {StyledEngineProvider} from "@mui/material";

export default function App({Component, pageProps}: AppProps) {
    return (
        <StyledEngineProvider injectFirst>
                <Component {...pageProps} />
        </StyledEngineProvider>
    )
}
