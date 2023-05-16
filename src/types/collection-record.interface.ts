export interface ICollectionRecord {
    id: number
    createdAt: string
    updatedAt: string
    description: string
    treatedAmount: number
    unit: string
}

export interface IAmountByMonth {
    month: string
    kg: number | string| null
    liters: number | string| null
}
