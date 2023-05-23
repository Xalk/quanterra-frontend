import React from 'react';
import {Box, Typography} from "@mui/material";
import StorageTanksTable from "@/components/screens/storage-tanks/StorageTanksTable";
import {useQuery} from "@tanstack/react-query";
import {StorageTankService} from "@/services/storage-tank/storage-tank.service";
import {useTranslate} from "@/contexts/TranslateContext";
import Loader from "@/components/ui/Loader";

interface StorageTankProps {

}


const StorageTank: React.FC<StorageTankProps> = () => {
    const t = useTranslate();

    const {data, isLoading} = useQuery(
        ['storage-tanks'],
        () => StorageTankService.getAll(),
        {
            select: ({data}) => data,
        }
    )

    return (
       <>
           {
               isLoading ? <Loader/> :(
                   <Box>
                       <Typography mb={2} align='center' fontSize={22}><strong>{t('navigator.storage_tanks')}</strong></Typography>
                       <StorageTanksTable storageTanks={data}/>
                   </Box>
               )
           }
       </>
    );
};

export default StorageTank;
