import {instance} from "@/api/api.interceptor";
import {IMain, IReqShip, IShip} from "@/types/ship.interface";
import {ICrewMember, IReqCrew} from "@/types/crew-member.interface";


const SHIPS = 'ships'

export const ShipService = {
    async getAll(searchTerm?: string) {
        return instance<IShip[]>({
            url: `${SHIPS}?search=${searchTerm}`,
            method: 'GET'
        })
    },

    async getById(id: string | number) {
        return instance<IShip>({
            url: `${SHIPS}/by-id/${id}`,
            method: 'GET'
        })
    },

    async create(data: IReqShip) {
        return instance<IShip>({
            url: SHIPS,
            method: 'POST',
            data
        })
    },

    async update({id, data}: { id: string | number, data: Partial<IShip> }) {
        return instance<IShip>({
            url: `${SHIPS}/${id}`,
            method: 'PATCH',
            data
        })
    },

    async delete(id: string | number) {
        return instance<IShip>({
            url: `${SHIPS}/${id}`,
            method: 'DELETE'
        })
    },


    async getByUserId() {
        return instance<IShip>({
            url: `${SHIPS}/by-user-id`,
            method: 'GET'
        })
    },

    async assign({id, data}: {id: string | number, data: IReqCrew}) {
        return instance<ICrewMember>({
            url: `${SHIPS}/${id}/assign`,
            method: 'POST',
            data
        })
    },

    async main() {
        return instance<IMain>({
            url: `${SHIPS}/main`,
            method: 'GET'
        })
    },
}
