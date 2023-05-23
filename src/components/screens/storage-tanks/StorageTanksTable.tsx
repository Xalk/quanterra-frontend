import * as React from 'react';
import {FC} from 'react';
import {DataGrid, gridClasses, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {grey} from "@mui/material/colors";

import Link from "next/link";
import {Typography} from "@mui/material";
import {IStorageTank} from "@/types/storage-tank.interface";
import {useTranslate} from "@/contexts/TranslateContext";


interface StorageTanksTableProps {
    storageTanks?: IStorageTank[]
}

const StorageTanksTable: FC<StorageTanksTableProps> = ({storageTanks}) => {
    const t = useTranslate();

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            width: 60,
            sortable: false,
            filterable: false,

        },
        {field: 'capacity', headerName: t('storage_tanks.capacity'), width: 80},
        {field: 'unit', headerName: t('storage_tanks.unit'), width: 80},
        {field: 'occupancyPercentage', headerName: t('storage_tanks.occupancy_percentage'), width: 100},
        {field: 'type', headerName: t('storage_tanks.waste_type'), width: 100},
        {field: 'description', headerName: t('storage_tanks.description'), width: 220},
        {
            field: 'sensor',
            headerName: t('storage_tanks.sensor_status'),
            width: 150,
            renderCell: (params) => {
                return <>{(params.row.sensor ? params.row.sensor.status: 'not created')}</>
            }
        },

        {
            field: 'createdAt',
            headerName: t('storage_tanks.created_at'),
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
        {
            width: 200,
            field: 'storage-tank',
            headerName: t('storage_tanks.link'),
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
