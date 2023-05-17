import {Role} from "@/enums/role.enum";

export interface IUser {
    firstName: string,
    lastName: string,
    role: Role,
    email: string,
    id: number,
    createdAt: Date,
    updatedAt: Date,
    crewId?: number
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IAuthResponse extends ITokens {
    user: IUser
}

export interface IEmailPassword {
    email: string
    password: string
}

export interface IReqUser extends IEmailPassword {
    firstName: string,
    lastName: string,
}

export interface IUserLogs {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    method: string,
    route: string,
    user: IUser
}
