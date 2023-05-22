import * as React from 'react';
import {FC} from 'react';
import {DataGrid, gridClasses, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {grey} from "@mui/material/colors";

import Link from "next/link";
import {Typography} from "@mui/material";
import {IStorageTank} from "@/types/storage-tank.interface";


interface StorageTanksTableProps {
    storageTanks?: IStorageTank[]
}

const StorageTanksTable: FC<StorageTanksTableProps> = ({storageTanks}) => {

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            width: 60,
            sortable: false,
            filterable: false,

        },
        {field: 'capacity', headerName: 'Capacity', width: 80},
        {field: 'unit', headerName: 'Unit', width: 80},
        {field: 'occupancyPercentage', headerName: 'Occupancy percentage', width: 100},
        {field: 'type', headerName: 'Waste type', width: 100},
        {field: 'description', headerName: 'Description', width: 220},
        {
            field: 'sensor',
            headerName: 'Sensor status',
            width: 150,
            renderCell: (params) => {
                return <>{(params.row.sensor ? params.row.sensor.status: 'not created')}</>
            }
        },

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
        {
            width: 200,
            field: 'storage-tank',
            headerName: 'Link',
            renderCell: (params: GridRenderCellParams<IStorageTank>) => (
                <Link href={`/ships/storage-tank/${params.row.id}`}>
                    <Typography sx={{textDecoration: 'underline'}}>storage tank →</Typography>
                </Link>
            )
        },
    ]

    const modifiedTanks = storageTanks?.map((tank) => {

        return {
            ...tank,
            type: tank.waste.type,
            description: tank.waste.description,
            status: tank.sensor?.status,
        }
    })



    return (
        <div style={{height: '100%', width: '100%'}}>
            <DataGrid rows={modifiedTanks || []}
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

export default StorageTanksTable
