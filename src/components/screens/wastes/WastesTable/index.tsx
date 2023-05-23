import * as React from 'react';
import {FC, useState} from 'react';
import {DataGrid, gridClasses, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {grey} from "@mui/material/colors";
import {IWaste} from "@/types/waste.interface";
import SaveWasteAction from "@/components/screens/wastes/WastesTable/SaveWasteAction";
import DeleteWasteAction from "@/components/screens/wastes/WastesTable/DeleteWasteAction";
import {useTranslate} from "@/contexts/TranslateContext";


interface CrewProps {
    wastes?: IWaste[]
}

const WastesTable: FC<CrewProps> = ({wastes}) => {
    const t = useTranslate();

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
        {field: 'type', headerName: t('wastes.waste_type'), width: 120, editable: true },
        {
            field: 'description',
            headerName: t('wastes.description'),
            width: 300,
            editable: true
        },
        {
            field: 'createdAt',
            headerName: t('wastes.created_at'),
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
                const locale =t('locale')
                const formattedDate = new Intl.DateTimeFormat(locale, options).format(date)
                return formattedDate
            }
        },
        {
            field: 'updatedAt',
            headerName: t('wastes.updated_at'),
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
                const locale =t('locale')
                const formattedDate = new Intl.DateTimeFormat(locale, options).format(date)
                return formattedDate
            }
        },
        {
            field: 'save',
            headerName: t('wastes.save'),
            renderCell: (params: GridRenderCellParams<IWaste>) => (
                <SaveWasteAction params={params} updatedRow={updatedRow} setUpdatedRow={setUpdatedRow}/>
            )
        },
        {
            field: 'remove',
            headerName: t('wastes.remove'),
            renderCell: (params: GridRenderCellParams<IWaste>) => (
                <DeleteWasteAction params={params} deletedRow={deletedRow} setDeletedRow={setDeletedRow}/>
            )
        },
    ]




    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid rows={wastes || []}
                      columns={columns}
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
