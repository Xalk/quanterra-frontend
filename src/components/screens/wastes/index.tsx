import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import WastesTable from "@/components/screens/wastes/WastesTable";
import {useQuery} from "@tanstack/react-query";
import {WasteService} from "@/services/waste/waste.service";
import CreateWaste from "@/components/screens/wastes/forms/CreateWaste";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

interface WastesProps {

}


const Wastes: React.FC<WastesProps> = () => {

    const [createWasteModalOpen, setCreateWasteModalOpen] = React.useState(false);



    const wasteRes = useQuery(
        ['wastes'],
        () => WasteService.getAll(),
        {
            select: ({data}) => data,
        }
    )

    const handleAddWaste = () => {
        setCreateWasteModalOpen(true)
    }

    return (
        <Box>
            <Typography mb={2} align='center' fontSize={22}><strong>Wastes</strong>
                <IconButton onClick={handleAddWaste}>
                    <AddCircleOutlineRoundedIcon/>
                </IconButton>
            </Typography>
            <WastesTable wastes={wasteRes?.data}/>
            <CreateWaste createOpen={createWasteModalOpen} handleClose={()=>setCreateWasteModalOpen(false)}/>
        </Box>
    );
};

export default Wastes;