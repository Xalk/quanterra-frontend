import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "@/services/auth/auth.service";
import {IAuthResponse, IEmailPassword, IReqUser} from "@/types/user.interface";
import {removeTokensFromStorage} from "@/services/auth/auth.helper";
import {AxiosError} from "axios";
import {errorCatch} from "@/api/api.helper";

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

export const login = createAsyncThunk<IAuthResponse, IEmailPassword, { rejectValue: any | AxiosError }>(
    "auth/login",
    async (data, thunkApi) => {
        try {
            const response = await AuthService.login(data)
            return response
        } catch (error: any | AxiosError) {
            return thunkApi.rejectWithValue(error.response?.data.message)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        removeTokensFromStorage()
    }
)

export const checkAuth = createAsyncThunk<IAuthResponse>(
    "auth/check-auth",
    async (_, thunkApi) => {
        try {
            const response = await AuthService.getNewTokens()
            return response.data
        } catch (error) {
            if (errorCatch(error) === "jwt expired") {
                thunkApi.dispatch(logout)
            }
            return thunkApi.rejectWithValue(error)
        }
    }
)