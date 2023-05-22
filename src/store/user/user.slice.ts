import {createSlice} from '@reduxjs/toolkit';
import {IInitialState} from './user.interface';
import {register, login, logout, checkAuth} from './user.actions';


const initialState: IInitialState = {
    user: null,
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload
        },
        setProfile: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
            })
            .addCase(register.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.error = ''
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.error = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false
                state.user = null
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false
                state.user = null
            })
    }
})
