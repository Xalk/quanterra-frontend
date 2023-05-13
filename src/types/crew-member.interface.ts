import {IUser} from "@/types/user.interface";

export interface ICrewMember {
    id: number
    createdAt: string
    updatedAt: string
    desc: string
    user: IUser
}