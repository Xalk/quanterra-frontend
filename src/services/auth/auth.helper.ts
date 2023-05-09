import Cookies from "js-cookie"


export const getAccessToken =  () => {
    const accessToken = Cookies.get("accessToken")
    return accessToken || null
}


export const saveToken = (accessToken : string) => {
    Cookies.set('accessToken', accessToken)
}

export const removeToken = () => {
    Cookies.remove('accessToken')
}
