import * as React from 'react';
import {FC, useState} from 'react';
import {DataGrid, gridClasses, GridColDef, GridRenderCellParams, GridRowId, GridRowsProp} from '@mui/x-data-grid';
import {grey} from "@mui/material/colors";
import Link from "next/link";
import {Typography} from "@mui/material";
import {IStorageTank} from "@/types/storage-tank.interface";
import {ICollectionRecord} from "@/types/collection-record.interface";


interface CollectionRecordsTableProps {
    collectionRecords?: ICollectionRecord[]
}

const CollectionRecordsTable: FC<CollectionRecordsTableProps> = ({collectionRecords}) => {


    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            width: 60,
            sortable: false,
            filterable: false,

        },
        {field: 'treatedAmount', headerName: 'Treated amount', width: 80},
        {field: 'unit', headerName: 'Unit', width: 80},
        {field: 'type', headerName: 'Waste type', width: 100},
        {field: 'description', headerName: 'Description', width: 220},
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

    const modifiedTanks = collectionRecords?.map((record) => {

        return {
            ...record,
            type: record.storageTank?.waste?.type
        }
    })

    console.log(modifiedTanks)


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

export default CollectionRecordsTable
