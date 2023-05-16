import {instance} from "@/api/api.interceptor";
import {ICrewMember} from "@/types/crew-member.interface";
import {IAmountByMonth} from "@/types/collection-record.interface";

const COLLECTION_RECORD = 'collection-records'

export const CollectionRecordService = {


    async avgAmountsByMonth(shipId: string | number) {
        return instance<IAmountByMonth[]>({
            url: `${COLLECTION_RECORD}/average-amounts/${shipId}`,
            method: 'GET'
        })
    },


}
