import * as React from 'react';
import {FC} from 'react';
import {DataGrid, gridClasses, GridColDef} from '@mui/x-data-grid';
import {grey} from "@mui/material/colors";
import {IUserLogs} from "@/types/user.interface";
import {useTranslate} from "@/contexts/TranslateContext";


interface UserLogsTableProps {
    logs?: IUserLogs[]
}

const UserLogsTable: FC<UserLogsTableProps> = ({logs}) => {
    const t = useTranslate();

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            width: 60,
            sortable: false,
            filterable: false,

        },
        {field: 'method', headerName: t('users_logs.action'), width: 80},
        {field: 'route', headerName: t('users_logs.route'), width: 200},
        {field: 'firstName', headerName: t('users_logs.first_name'), width: 100},
        {field: 'lastName', headerName: t('users_logs.last_name'), width: 100},
        {field: 'email', headerName: t('users_logs.email'), width: 220},

        {
            field: 'createdAt',
            headerName: t('users_logs.created_at'),
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
                const locale = t('locale')
                const formattedDate = new Intl.DateTimeFormat(locale, options).format(date)
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
