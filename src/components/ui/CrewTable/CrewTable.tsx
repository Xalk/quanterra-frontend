import * as React from 'react';
import {FC, useMemo, useState} from 'react';
import {DataGrid, gridClasses, GridColDef, GridRenderCellParams, GridRowId, GridRowsProp} from '@mui/x-data-grid';
import {grey} from "@mui/material/colors";
import {ICrewMember} from "@/types/crew-member.interface";
import {Role} from "@/enums/role.enum";
import {IUser} from "@/types/user.interface";
import SaveMemberAction from "@/components/ui/CrewTable/SaveMemberAction";
import DeleteMemberAction from "@/components/ui/CrewTable/DeleteMemberAction";


interface CrewProps {
    members?: ICrewMember[]
}

const Crew: FC<CrewProps> = ({members}) => {

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
        {field: 'firstName', headerName: 'First name', width: 170},
        {field: 'lastName', headerName: 'Last name', width: 170},
        {field: 'email', headerName: 'Email', width: 200},
        {
            field: 'role',
            headerName: 'Role',
            width: 130,
            type: 'singleSelect',
            valueOptions: ['admin', 'operator', 'crew member'],
            editable: true,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
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
                const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
                return formattedDate
            }

        },
        {
            field: 'save',
            headerName: 'Save',
            type: 'actions',
            renderCell: (params: GridRenderCellParams<IUser>) => (
                <SaveMemberAction params={params} updatedRow={updatedRow} setUpdatedRow={setUpdatedRow}/>
            )
        },
        {
            field: 'remove',
            headerName: 'Remove',
            type: 'actions',
            renderCell: (params: GridRenderCellParams<IUser>) => (
                <DeleteMemberAction params={params} deletedRow={deletedRow} setDeletedRow={setDeletedRow}/>
            )
        },
    ]

    const modifiedMembers = members?.map((member) => {
        const {firstName, lastName, email, role, id} = member.user
        return {
            ...member,
            firstName,
            lastName,
            email,
            role,
            id,
            crewId: member.id,
        }
    })

    console.log(modifiedMembers)

    return (
        <div style={{height: 500, width: '100%'}}>
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
