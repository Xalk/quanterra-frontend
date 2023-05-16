import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import {StyledEngineProvider} from "@mui/material";
import {Provider} from "react-redux";
import {persistor, store} from "@/store/store";
import React from "react";
import AuthProvider from "@/providers/AuthProvider";
import {TypeComponentAuthFields} from "@/providers/auth-pages.type";
import {PersistGate} from "redux-persist/integration/react";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import queryClient from "@/config/query-client";

export default function App({Component, pageProps}: AppProps & TypeComponentAuthFields) {
    return (
        <QueryClientProvider client={queryClient}>
            <StyledEngineProvider injectFirst>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <AuthProvider Component={{roles: Component.roles}}>
                            <Component {...pageProps} />
                        </AuthProvider>
                    </PersistGate>
                </Provider>
            </StyledEngineProvider>
            <ReactQueryDevtools initialIsOpen={true}/>
        </QueryClientProvider>
    )
}
