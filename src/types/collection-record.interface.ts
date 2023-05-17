import {IStorageTank} from "@/types/storage-tank.interface";

export interface ICollectionRecord {
    id: number
    createdAt: string
    updatedAt: string
    description: string
    treatedAmount: number
    unit: string
    storageTank: IStorageTank
}

export interface IAmountByMonth {
    month: string
    kg: number | string| null
    liters: number | string| null
}
