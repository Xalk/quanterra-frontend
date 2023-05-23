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
import {IntlProvider, useIntl} from "react-intl";
import {useRouter} from "next/router";
import en from "../../lang/en/en.json"
import ua from "../../lang/ua/ua.json"
import {TranslateContext} from "@/contexts/TranslateContext";

function App({Component, pageProps}: AppProps & TypeComponentAuthFields) {

    const translate = (id: string): string => {
        const intl = useIntl();
        return intl.formatMessage({id});
    };

    const messages: any = {
        en,
        ua
    };
    const {locale} = useRouter();
    const selectedLocale = locale || 'en';
    return (
        <IntlProvider locale={`${locale}`} messages={messages[selectedLocale]}>
            <TranslateContext.Provider value={translate}>
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
            </TranslateContext.Provider>
        </IntlProvider>
    )
}

export default App
