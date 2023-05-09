import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import {StyledEngineProvider} from "@mui/material";
import {Provider} from "react-redux";
import {store} from "@/store/store";

export default function App({Component, pageProps}: AppProps) {
    return (
        <StyledEngineProvider injectFirst>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </StyledEngineProvider>
    )
}
