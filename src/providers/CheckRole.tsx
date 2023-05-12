import {useRouter} from 'next/router'
import React, {FC, PropsWithChildren} from 'react'

import {useAuth} from '@/hooks/useAuth'

import {TypeComponentAuthFields} from './auth-pages.type'
import {logout} from "@/store/user/user.actions";
import {useActions} from "@/hooks/useActions";

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
                                                                       Component: {roles},
                                                                       children
                                                                   }) => {
    const {user} = useAuth()
    const router = useRouter()
    const {logout, setError} = useActions()

    if (user) {
        if (roles.includes(user.role)) {
            return <>{children}</>;
        } else {
            logout()
            setError('No access')
            return <div>No access</div>;
        }
    } else {
        if (router.pathname !== '/login') {
            router.replace('/login');
        }
        return null;
    }

    // console.log(hasUserRole)
    //
    // if (hasUserRole) {
    //     return <>{children}</>
    // } else {
    //     return <div>No access</div>
    // }
}

export default CheckRole
