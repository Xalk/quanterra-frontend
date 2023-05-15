import {instance} from "@/api/api.interceptor";
import {IWaste} from "@/types/waste.interface";

const WASTES = 'wastes'

export const WasteService = {
    async getAll() {
        return instance<IWaste[]>({
            url: WASTES,
            method: 'GET'
        })
    },

}