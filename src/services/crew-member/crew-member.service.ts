import {instance} from "@/api/api.interceptor";
import {ICrewMember} from "@/types/crew-member.interface";
import {IShip} from "@/types/ship.interface";

const CREW = 'crew-members'

export const CrewService = {


    async delete(id: string | number) {
        return instance<ICrewMember>({
            url: `${CREW}/${id}`,
            method: 'DELETE'
        })
    },

    async getById(id: string | number) {
        return instance<ICrewMember>({
            url: `${CREW}/by-id/${id}`,
            method: 'GET'
        })
    },


}
