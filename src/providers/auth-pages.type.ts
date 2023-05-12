import { NextPage } from 'next';
import {Role} from "@/enums/role.enum";

export type TypeRoles = {
    roles: Role[]
}

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles

export type TypeComponentAuthFields = { Component: TypeRoles }