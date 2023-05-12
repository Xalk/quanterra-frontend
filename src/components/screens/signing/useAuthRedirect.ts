import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/router";
import { useEffect } from 'react';

export const useAuthRedirect = () => {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (user) {
            router.replace("/")
        }
    }, [user])
}