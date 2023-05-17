import * as React from 'react';
import {FC} from 'react';
import {DataGrid, gridClasses, GridColDef} from '@mui/x-data-grid';
import {grey} from "@mui/material/colors";
import {IUserLogs} from "@/types/user.interface";


interface UserLogsTableProps {
    logs?: IUserLogs[]
}

const UserLogsTable: FC<UserLogsTableProps> = ({logs}) => {

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            width: 60,
            sortable: false,
            filterable: false,

        },
        {field: 'method', headerName: 'Action', width: 80},
        {field: 'route', headerName: 'Route', width: 200},
        {field: 'firstName', headerName: 'First name', width: 100},
        {field: 'lastName', headerName: 'Last name', width: 100},
        {field: 'email', headerName: 'Email', width: 220},

        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 100,
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
                return formattedDate.slice(0, 10)
            }

        },
    ]

    const modifiedLogs = logs?.map((log) => {

        return {
            ...log,
            firstName: log.user.firstName,
            lastName: log.user.lastName,
            email: log.user.email,
        }
    })



    return (
        <div style={{height: '100%', width: '100%'}}>
            <DataGrid rows={modifiedLogs || []}
                      columns={columns}
                      getRowId={row => row.id}
                      sx={{
                          [`& .${gridClasses.row}`]: {
                              bgcolor: (theme) =>
                                  theme.palette.mode === 'light' ? grey[200] : grey[900],
                          },
                      }}

            />
        </div>
    );
}

export default UserLogsTable
