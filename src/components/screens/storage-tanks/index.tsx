import React from 'react';
import {Box, Typography} from "@mui/material";
import StorageTanksTable from "@/components/screens/storage-tanks/StorageTanksTable";
import {useQuery} from "@tanstack/react-query";
import {StorageTankService} from "@/services/storage-tank/storage-tank.service";

interface StorageTankProps {

}


const StorageTank: React.FC<StorageTankProps> = () => {

    const {data} = useQuery(
        ['storage-tanks'],
        () => StorageTankService.getAll(),
        {
            select: ({data}) => data,
        }
    )

    return (
        <Box>
            <Typography mb={2} align='center' fontSize={22}><strong>Storage tanks</strong></Typography>
            <StorageTanksTable storageTanks={data}/>
        </Box>
    );
};

export default StorageTank;
