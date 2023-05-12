import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import {StyledEngineProvider} from "@mui/material";
import {Provider} from "react-redux";
import {persistor, store} from "@/store/store";
import React from "react";
import AuthProvider from "@/providers/AuthProvider";
import {TypeComponentAuthFields} from "@/providers/auth-pages.type";
import {PersistGate} from "redux-persist/integration/react";

export default function App({Component, pageProps}: AppProps & TypeComponentAuthFields) {
    return (
        <StyledEngineProvider injectFirst>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AuthProvider Component={{roles: Component.roles}}>
                        <Component {...pageProps} />
                    </AuthProvider>
                </PersistGate>
            </Provider>
        </StyledEngineProvider>
    )
}
