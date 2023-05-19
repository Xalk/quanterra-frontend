import {instance} from "@/api/api.interceptor";
import {ICrewMember} from "@/types/crew-member.interface";
import {IStorageTank} from "@/types/storage-tank.interface";
import {IShip} from "@/types/ship.interface";

const CREW = 'crew-members'

export const CrewService = {


    async getAll() {
        return instance<ICrewMember[]>({
            url: CREW,
            method: 'GET'
        })
    },

    async delete(id: string | number) {
        return instance<ICrewMember>({
            url: `${CREW}/${id}`,
            method: 'DELETE'
        })
    },

    async deleteFromShip(id: string | number) {
        return instance<IShip>({
            url: `${CREW}/from-ship/${id}`,
            method: 'DELETE'
        })
    },

    async getById(id: string | number) {
        return instance<ICrewMember>({
            url: `${CREW}/by-id/${id}`,
            method: 'GET'
        })
    },

    async update({id, data}: { id: string | number, data: Partial<{ shipId: number, userId: number }> }) {
        return instance<ICrewMember>({
            url: `${CREW}/${id}`,
            method: 'PATCH',
            data
        })
    },


}
