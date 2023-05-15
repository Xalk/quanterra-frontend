import {instance} from "@/api/api.interceptor";
import {IReqStorageTank, IStorageTank} from "@/types/storage-tank.interface";

const WASTES = 'storage-tank'

export const StorageTankService = {
    async create(data: IReqStorageTank) {
        return instance<IStorageTank>({
            url: WASTES,
            method: 'POST',
            data
        })
    },

}