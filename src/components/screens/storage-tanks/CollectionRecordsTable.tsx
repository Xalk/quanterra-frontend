import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Typography} from "@mui/material";
import {FC} from "react";
import {ICollectionRecord} from "@/types/collection-record.interface";
import {useTranslate} from "@/contexts/TranslateContext";

interface CollectionRecordsTableProps {
    records?: ICollectionRecord[]
}

 const CollectionRecordsTable: FC<CollectionRecordsTableProps> = ({records}) => {
     const t = useTranslate();

    return (
        <TableContainer component={Paper} sx={{width: '50%', marginTop: '50px'}}>
                <Typography variant="h5" sx={{textAlign: 'center', marginTop: '20px'}}>
                    {t('storage_tank.collection_records')}
                </Typography>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('collection_records.created_at')}</TableCell>
                        <TableCell align="right">Id</TableCell>
                        <TableCell align="right">{t('collection_records.treated_amount')}</TableCell>
                        <TableCell align="right">{t('storage_tanks.unit')}</TableCell>
                        <TableCell align="right">{t('collection_records.description')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records?.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {`${new Date(row.createdAt)}`.slice(0, 24)}
                            </TableCell>
                            <TableCell align="right">{row.id}</TableCell>
                            <TableCell align="right">{row.treatedAmount}</TableCell>
                            <TableCell align="right">{row.unit}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CollectionRecordsTable
