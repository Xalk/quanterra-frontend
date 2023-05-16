import {ISensor} from "@/types/sensor.interface";
import {IWaste} from "@/types/waste.interface";
import {ICollectionRecord} from "@/types/collection-record.interface";
import {IShip} from "@/types/ship.interface";

export interface IStorageTank {
    id: number
    createdAt: string
    updatedAt: string
    unit: string
    capacity: number
    occupancyPercentage: number
    waste: IWaste
    sensor?: ISensor
    collectionRecords: ICollectionRecord[],
    ship: IShip
}

export interface IReqStorageTank {
    unit: string,
    capacity: number,
    occupancyPercentage: number,
    shipId: number,
    wasteId: number
}
