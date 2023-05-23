import * as React from 'react';
import {FC, useState} from 'react';
import {DataGrid, gridClasses, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {grey} from "@mui/material/colors";
import {ICrewMember} from "@/types/crew-member.interface";
import {IUser} from "@/types/user.interface";
import SaveMemberAction from "@/components/ui/CrewTable/SaveMemberAction";
import DeleteMemberAction from "@/components/ui/CrewTable/DeleteMemberAction";
import Link from "next/link";
import {Typography} from "@mui/material";
import {useTranslate} from "@/contexts/TranslateContext";


interface CrewProps {
    members?: ICrewMember[],
    isShipPage?: boolean
}

const Crew: FC<CrewProps> = ({members, isShipPage = true}) => {
    const t = useTranslate();

    const [updatedRow, setUpdatedRow] = useState<null | IUser>(null);
    const [deletedRow, setDeletedRow] = useState<null | IUser>(null);

    const columns: GridColDef[] = [
        {
            field: 'crewId',
            headerName: 'Id',
            width: 60,
            sortable: false,
            filterable: false,

        },
        {field: 'firstName', headerName: t('crew_members.first_name'), width: 120},
        {field: 'lastName', headerName: t('crew_members.last_name'), width: 170},
        {field: 'email', headerName: t('crew_members.email'), width: 200},
        {
            field: 'role',
            headerName: t('crew_members.role'),
            width: 130,
            type: 'singleSelect',
            valueOptions: ['admin', 'operator', 'crew member'],
            editable: true,
        },

        {
            field: 'createdAt',
            headerName: t('crew_members.created_at'),
            width: 200,
            renderCell: (params) => {
                const date = new Date(params.value);
                const options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                } as const
                const locale = t('locale')
                const formattedDate = new Intl.DateTimeFormat(locale, options).format(date)
                return formattedDate
            }

        },
        {
            field: 'save',
            headerName: t('crew_members.save'),
            renderCell: (params: GridRenderCellParams<IUser>) => (
                <SaveMemberAction params={params} updatedRow={updatedRow} setUpdatedRow={setUpdatedRow}/>
            )
        },
        {
            field: 'remove',
            headerName: t('crew_members.remove'),
            renderCell: (params: GridRenderCellParams<IUser>) => (
                <DeleteMemberAction params={params} deletedRow={deletedRow} setDeletedRow={setDeletedRow}
                                    isShipPage={isShipPage}/>
            )
        },
        {
            field: 'profile',
            headerName: t('crew_members.profile'),
            renderCell: (params: GridRenderCellParams<IUser>) => (
                <Link href={`/profile/${params.row.crewId}`}>
                    <Typography sx={{textDecoration: 'underline'}}>profile →</Typography>
                </Link>
            )
        },
    ]

    if (!isShipPage) {

        let field = {
            field: 'ship',
            headerName: t('crew_members.assigned'),
            width: 100,
            renderCell: (params: GridRenderCellParams<ICrewMember>) => {
                return params.row.ship ? 'Yes' : 'No'
            }
        }

        columns.splice(5, 0, field)
    }

    const modifiedMembers = members?.map((member) => {
        const {firstName, lastName, email, role, id} = member.user
        return {
            ...member,
            firstName,
            lastName,
            email,
            role,
            id,
            ship: member.ship,
            crewId: member.id,
        }
    })

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid rows={modifiedMembers || []}
                      columns={columns}
                      getRowId={row => row.id}
                      sx={{
                          [`& .${gridClasses.row}`]: {
                              bgcolor: (theme) =>
                                  theme.palette.mode === 'light' ? grey[200] : grey[900],
                          },
                      }}
                      processRowUpdate={(newRow, oldRow) => setUpdatedRow(newRow)}
                      onRowClick={(params) => setDeletedRow(params.row)}

            />
        </div>
    );
}

export default Crew
