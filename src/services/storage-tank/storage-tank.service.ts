import {instance} from "@/api/api.interceptor";
import {IReqStorageTank, IStorageTank} from "@/types/storage-tank.interface";
import {IShip} from "@/types/ship.interface";
import {IWaste} from "@/types/waste.interface";

const STORAGE_TANKS = 'storage-tank'

export const StorageTankService = {
    async create(data: IReqStorageTank) {
        return instance<IStorageTank>({
            url: STORAGE_TANKS,
            method: 'POST',
            data
        })
    },

    async getById(id: string | number) {
        return instance<IStorageTank>({
            url: `${STORAGE_TANKS}/${id}`,
            method: 'GET'
        })
    },

    async update({id, data}: { id: string | number, data: Partial<IStorageTank> }) {
        return instance<IStorageTank>({
            url: `${STORAGE_TANKS}/${id}`,
            method: 'PATCH',
            data
        })
    },

    async delete(id: string | number) {
        return instance<IStorageTank>({
            url: `${STORAGE_TANKS}/${id}`,
            method: 'DELETE'
        })
    },

    async getAll() {
        return instance<IStorageTank[]>({
            url: STORAGE_TANKS,
            method: 'GET'
        })
    },

}
