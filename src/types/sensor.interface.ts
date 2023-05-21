export interface ISensor {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    connectionKey: string
    status: string
}

export interface IReqSensor {
    name: string,
    status?: string
    storageTankId?: number| string
}
