import {instance} from "@/api/api.interceptor";
import {IUser} from "@/types/user.interface";

const SHIPS = 'users'

export const UserService = {


    async update({id, data}: {id: string | number, data: Partial<IUser>}) {
        return instance<IUser>({
            url: `${SHIPS}/${id}`,
            method: 'PATCH',
            data
        })
    },

    async delete(id: string | number) {
        return instance<IUser>({
            url: `${SHIPS}/${id}`,
            method: 'DELETE'
        })
    },


}