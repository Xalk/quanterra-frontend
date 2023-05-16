import {instance} from "@/api/api.interceptor";
import {ICrewMember} from "@/types/crew-member.interface";

const CREW = 'crew-members'

export const CrewService = {


    async delete(id: string | number) {
        return instance<ICrewMember>({
            url: `${CREW}/${id}`,
            method: 'DELETE'
        })
    },


}
