import {instance} from "@/api/api.interceptor";
import {IAmountByMonth, ICollectionRecord} from "@/types/collection-record.interface";

const COLLECTION_RECORD = 'collection-records'

export const CollectionRecordService = {

    async getAll() {
        return instance<ICollectionRecord[]>({
            url: COLLECTION_RECORD,
            method: 'GET'
        })
    },

    async avgAmountsByMonth(shipId: string | number) {
        return instance<IAmountByMonth[]>({
            url: `${COLLECTION_RECORD}/average-amounts/${shipId}`,
            method: 'GET'
        })
    },


}
