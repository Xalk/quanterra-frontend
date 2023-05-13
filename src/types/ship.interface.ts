import {IStorageTank} from "@/types/storage-tank.interface";
import {ICrewMember} from "@/types/crew-member.interface";

export interface IShip {
    id: number
    createdAt: string
    updatedAt: string
    shipName: string
    shipType: string
    buildYear: number
    crewMember: ICrewMember[]
    storageTanks: IStorageTank[]
}

export interface IReqShip {
    shipName: string,
    shipType: string,
    buildYear: number
}