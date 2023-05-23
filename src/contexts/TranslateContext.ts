import {createContext, useContext} from "react";

export const TranslateContext = createContext<(id: string) => string>(() => "");

export const useTranslate = (): ((id: string) => string) => useContext(TranslateContext);
