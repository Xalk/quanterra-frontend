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

export interface IMain {
    crewCount: number,
    shipsCount: number,
    totalTreatedAmount: ITotalTreatedAmount[]
    last10Members: ICrewMember[]
}

export interface ITotalTreatedAmount {
    month: string,
    totalTreatedAmount: number
}
