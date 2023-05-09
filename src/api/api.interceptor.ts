import axios from 'axios'

import { errorCatch } from './api.helper'
import {
    getAccessToken,
    removeToken
} from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

const axiosOptions = {
    baseURL: process.env.SERVER_URL,
    headers: {
        "Content-Type": "application/json",
    }
}

export const instance = axios.create(axiosOptions)
export const instanceClassic = axios.create(axiosOptions)

instance.interceptors.request.use(config => {
    const accessToken = getAccessToken()

    if (config && config.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`

    return config
})

instance.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config

        if (
            (error?.response?.status === 401 ||
                errorCatch(error) === 'jwt expired' ||
                errorCatch(error) === 'jwt must pe provided') &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true

            try {
                await AuthService.getNewToken()
                return instance.request(originalRequest)
            } catch (error) {
                if (errorCatch(error) === 'jwt expired') {
                    removeToken()
                }
            }
        }
        throw error
    }
)
