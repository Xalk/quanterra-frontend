import {Role} from "@/enums/role.enum";

export interface IUser {
    firstName: string,
    lastName: string,
    role: Role,
    email: string,
    id: number,
    createdAt: Date,
    updatedAt: Date
}

export interface IAuthResponse {
    user: IUser
    accessToken: string,
}

export interface IEmailPassword {
    email: string
    password: string
}

export interface IReqUser extends IUser {
    firstName: string,
    lastName: string,
}