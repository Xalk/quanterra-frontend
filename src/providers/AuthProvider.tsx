import dynamic from 'next/dynamic'
import React, { FC, PropsWithChildren, useEffect } from 'react'

import { TypeComponentAuthFields } from './auth-pages.type'
import { useAuth } from '@/hooks/useAuth'
import { useActions } from '@/hooks/useActions'
import { useRouter } from 'next/router'
import { getAccessToken } from '@/services/auth/auth.helper'
import Cookies from 'js-cookie'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
                                                                          Component: { isOnlyUser },
                                                                          children
                                                                      }) => {
    const { user } = useAuth()
    const { checkAuth, logout } = useActions()
    const { pathname } = useRouter()

    useEffect(() => {
        const accessToken = getAccessToken()
        if (accessToken) {
            checkAuth()
        }
    }, [])

    useEffect(() => {
        const refreshToken = Cookies.get("refreshToken")
        if (user && !refreshToken) {
            logout()
        }
    }, [pathname])


    return isOnlyUser ? (
        <DynamicCheckRole Component={{ isOnlyUser }} children={children}/>
    ) : (
        <>{children}</>
    )
}

export default AuthProvider