import {FC} from 'react';
import {DataGrid, gridClasses, GridColDef} from '@mui/x-data-grid';
import {grey} from "@mui/material/colors";
import {ICollectionRecord} from "@/types/collection-record.interface";
import {useTranslate} from "@/contexts/TranslateContext";


interface CollectionRecordsTableProps {
    collectionRecords?: ICollectionRecord[]
}

const CollectionRecordsTable: FC<CollectionRecordsTableProps> = ({collectionRecords}) => {
    const t = useTranslate();

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            width: 60,
            sortable: false,
            filterable: false,

        },
        {field: 'treatedAmount', headerName: t('collection_records.treated_amount'), width: 80},
        {field: 'unit', headerName: t('storage_tanks.unit'), width: 80},
        {field: 'type', headerName: t('collection_records.waste_type'), width: 100},
        {field: 'description', headerName: t('collection_records.description'), width: 220},
        {
            field: 'createdAt',
            headerName: t('collection_records.created_at'),
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

    const modifiedTanks = collectionRecords?.map((record) => {

        return {
            ...record,
            type: record.storageTank?.waste?.type
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

export default CollectionRecordsTable
