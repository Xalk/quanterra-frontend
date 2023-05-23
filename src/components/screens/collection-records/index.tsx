import React from 'react';
import {Box, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {CollectionRecordService} from "@/services/collection-record/collection-record.service";
import CollectionRecordsTable from "@/components/screens/collection-records/CollectionRecordsTable";
import { useTranslate } from '@/contexts/TranslateContext';


const CollectionRecords: React.FC = () => {
    const t = useTranslate();

    const {data} = useQuery(
        ['collection-records'],
        () => CollectionRecordService.getAll(),
        {
            select: ({data}) => data,
        }
    )

    return (
        <Box>
            <Typography mb={2} align='center' fontSize={22}><strong>{t('navigator.collection_records')}</strong></Typography>
            <CollectionRecordsTable collectionRecords={data}/>
        </Box>
    );
};

export default CollectionRecords;
