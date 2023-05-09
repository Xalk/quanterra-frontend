import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "@/services/auth/auth.service";
import {IAuthResponse, IEmailPassword, IReqUser} from "@/types/user.interface";
import {removeToken} from "@/services/auth/auth.helper";

export const register = createAsyncThunk<IAuthResponse, IReqUser>(
    "auth/register",
    async (data, thunkApi) => {
        try {
            const response = await AuthService.register(data)
            return response
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
    "auth/login",
    async (data, thunkApi) => {
        try {
            const response = await AuthService.login(data)
            return response
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        removeToken()
    }
)

// export const checkAuth = createAsyncThunk<IAuthResponse>(
//     "auth/check-auth",
//     async (_, thunkApi) => {
//         try {
//             const response = await AuthService.getNewTokens()
//             return response.data
//         } catch (error) {
//             if (errorCatch(error) === "jwt expired") {
//                 thunkApi.dispatch(logout)
//             }
//             return thunkApi.rejectWithValue(error)
//         }
//     }
// )