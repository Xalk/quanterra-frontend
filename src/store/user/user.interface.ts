import {IUser} from "@/types/user.interface";

export interface IInitialState {
    user: IUser | null
    isLoading: boolean
}