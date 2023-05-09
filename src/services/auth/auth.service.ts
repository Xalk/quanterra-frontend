import {saveToken} from "./auth.helper";
import { instanceClassic } from "@/api/api.interceptor";
import {IEmailPassword, IReqUser, IAuthResponse} from "@/types/user.interface";

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
            saveToken(response.data.accessToken)
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
            saveToken(response.data.accessToken)
        }

        return response.data
    },

    async getNewToken() {
        const response = await instanceClassic.post<string, {data: { refresh: string }}>(
            `auth/refresh`
        )

        if (response.data.refresh) {
            saveToken(response.data.refresh)
        }

        return response
    }
}

