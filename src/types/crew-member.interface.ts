import {IUser} from "@/types/user.interface";
import {Role} from "@/enums/role.enum";
import {IShip} from "@/types/ship.interface";

export interface ICrewMember {
    id: number
    createdAt: string
    updatedAt: string
    desc: string
    user: IUser
    ship: IShip
}

export interface IReqCrew {
    firstName: string,
    lastName: string,
    email: string,
    role: Role.CREW_MEMBER | Role.OPERATOR
}