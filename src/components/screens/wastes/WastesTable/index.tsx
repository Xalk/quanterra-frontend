import * as React from 'react';
import {FC, useState} from 'react';
import {DataGrid, gridClasses, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {grey} from "@mui/material/colors";
import {IWaste} from "@/types/waste.interface";
import SaveWasteAction from "@/components/screens/wastes/WastesTable/SaveWasteAction";
import DeleteWasteAction from "@/components/screens/wastes/WastesTable/DeleteWasteAction";


interface CrewProps {
    wastes?: IWaste[]
}

const WastesTable: FC<CrewProps> = ({wastes}) => {

    const [updatedRow, setUpdatedRow] = useState<null | IWaste>(null);
    const [deletedRow, setDeletedRow] = useState<null | IWaste>(null);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            width: 60,
            sortable: false,
            filterable: false,

        },
        {field: 'type', headerName: 'Waste type', width: 120, editable: true },
        {
            field: 'description',
            headerName: 'Description',
            width: 300,
            editable: true
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
            field: 'updatedAt',
            headerName: 'Updated At',
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
            renderCell: (params: GridRenderCellParams<IWaste>) => (
                <SaveWasteAction params={params} updatedRow={updatedRow} setUpdatedRow={setUpdatedRow}/>
            )
        },
        {
            field: 'remove',
            headerName: 'Remove',
            type: 'actions',
            renderCell: (params: GridRenderCellParams<IWaste>) => (
                <DeleteWasteAction params={params} deletedRow={deletedRow} setDeletedRow={setDeletedRow}/>
            )
        },
    ]




    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid rows={wastes || []}
                      columns={columns}
                      // getRowId={row => row.id}
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

export default WastesTable
