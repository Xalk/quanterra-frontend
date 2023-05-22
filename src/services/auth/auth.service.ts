import {saveToStorage} from "./auth.helper";
import {instance, instanceClassic} from "@/api/api.interceptor";
import {IEmailPassword, IReqUser, IAuthResponse, IUser} from "@/types/user.interface";
import Cookies from "js-cookie";

export const AuthService = {
    async login(
        data: IEmailPassword
    ) {
        const response = await instanceClassic<IAuthResponse>({
            url: `auth/login`,
            method: "POST",
            data
        })

        if (response.data.accessToken) {
            saveToStorage(response.data)
        }

        return response.data
    },

    async register(
        data: IReqUser
    ) {
        const response = await instanceClassic<IAuthResponse>({
            url: `auth/register`,
            method: "POST",
            data
        })

        if (response.data.accessToken) {
            saveToStorage(response.data)
        }

        return response.data
    },

    async getNewTokens() {
        const refreshToken = Cookies.get("refreshToken")

        const response = await instanceClassic.post<string, {data: IAuthResponse}>(
            `auth/refresh`,
            {refreshToken},
        )

        if (response.data.accessToken) {
            saveToStorage(response.data)
        }

        return response
    },


    async updateProfile(data: Partial<IUser>) {
        return instance<IUser>({
            url: 'auth/profile',
            method: 'PATCH',
            data
        })
    },
}

