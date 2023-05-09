import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from './user.interface';
import { register, login, logout } from './user.actions';


const initialState: IInitialState = {
    user: null,
    isLoading: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
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
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false
                state.user = null
            })
            // .addCase(checkAuth.fulfilled, (state, action) => {
            //     state.isLoading = false
            //     state.user = action.payload.user
            // })
            // .addCase(checkAuth.rejected, (state) => {
            //     state.isLoading = false
            //     state.user = null
            // })
    }
})