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

interface CollectionRecordsTableProps {
    records?: ICollectionRecord[]
}

 const CollectionRecordsTable: FC<CollectionRecordsTableProps> = ({records}) => {
    return (
        <TableContainer component={Paper} sx={{width: '50%', marginTop: '50px'}}>
                <Typography variant="h5" sx={{textAlign: 'center', marginTop: '20px'}}>
                    Collection records (last 10)
                </Typography>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Created&nbsp;at</TableCell>
                        <TableCell align="right">Id</TableCell>
                        <TableCell align="right">Treated&nbsp;amount</TableCell>
                        <TableCell align="right">Unit&nbsp;</TableCell>
                        <TableCell align="right">Description&nbsp;</TableCell>
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
