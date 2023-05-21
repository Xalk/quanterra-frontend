import {instance} from "@/api/api.interceptor";
import {IMain, IReqShip, IShip} from "@/types/ship.interface";
import {IReqUser} from "@/types/user.interface";
import {ICrewMember, IReqCrew} from "@/types/crew-member.interface";
import {IStorageTank} from "@/types/storage-tank.interface";

const SHIPS = 'ships'

export const ShipService = {
    async getAll() {
        return instance<IShip[]>({
            url: SHIPS,
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
