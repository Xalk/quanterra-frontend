import {instance} from "@/api/api.interceptor";
import {IReqWaste, IWaste} from "@/types/waste.interface";

const WASTES = 'wastes'

export const WasteService = {
    async getAll() {
        return instance<IWaste[]>({
            url: WASTES,
            method: 'GET'
        })
    },

    async update({id, data}: { id: string | number, data: Partial<IWaste> }) {
        return instance<IWaste>({
            url: `${WASTES}/${id}`,
            method: 'PATCH',
            data
        })
    },

    async create(data: IReqWaste) {
        return instance<IWaste>({
            url: WASTES,
            method: 'POST',
            data
        })
    },
    async delete(id: string | number) {
        return instance<IWaste>({
            url: `${WASTES}/${id}`,
            method: 'DELETE'
        })
    },

}
