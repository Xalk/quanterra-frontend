import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
} from "redux-persist"
import storage from "redux-persist/lib/storage"


import {userSlice} from './user/user.slice'

const persistConfig = {
    key: "quanterra",
    storage,
    // whitelist: []
}

const rootReducer = combineReducers({
    auth: userSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE

                ]
            }
        })
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof rootReducer>