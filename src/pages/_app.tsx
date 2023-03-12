import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import Dashboard from "@/components/Dashboard";
import {StyledEngineProvider} from "@mui/material";

export default function App({Component, pageProps}: AppProps) {
    return (
        <StyledEngineProvider injectFirst>
            <Dashboard>
                <Component {...pageProps} />
            </Dashboard>
        </StyledEngineProvider>
    )
}
