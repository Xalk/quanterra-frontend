import {instance} from "@/api/api.interceptor";
import {IReqSensor, ISensor} from "@/types/sensor.interface";

const SENSORS = 'sensors'

export const SensorService = {

    async create(data: IReqSensor) {
        return instance<ISensor>({
            url: SENSORS,
            method: 'POST',
            data
        })
    },
    async update({id, data}: { id: string | number, data: Partial<ISensor> }) {
        return instance<ISensor>({
            url: `${SENSORS}/${id}`,
            method: 'PATCH',
            data
        })
    },

}
