export interface IWaste {
    id: number
    createdAt: string
    updatedAt: string
    type: string
    description: string
}

export interface IReqWaste {
    type: string,
    description: string
}
