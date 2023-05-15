import React, {useEffect} from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import CrewTable from "@/components/ui/CrewTable/CrewTable";
import ShipBarChart from "@/components/charts/BarChart";
import { IconButton } from '@mui/material';
import dynamic from "next/dynamic";

const ShipPieChartWithoutSSR = dynamic(
    import("@/components/charts/PieChart"),
    {ssr: false}
);

import s from '@/components/screens/ships/ships.module.scss'
import Dashboard from "@/components/layout/Dashboard";
import {useQuery} from "@tanstack/react-query";
import {ShipService} from "@/services/ship/ship.service";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import ShipCard from "@/components/screens/ships/ShipCard";
import StorageTankCard from "@/components/screens/storage-tanks/StorageTankCard";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CreateCrewMember from "@/components/screens/storage-tanks/forms/CreateCrewMember";
import CreateStorageTank from "@/components/screens/storage-tanks/forms/CreateStorageTank";
import {WasteService} from "@/services/waste/waste.service";

interface ShipProps {

}


const Ship: NextPage<ShipProps> = () => {
    const router = useRouter()
    const {id} = router.query

    const [createCrewModalOpen, setCreateCrewModalOpen] = React.useState(false);
    const [createTankModalOpen, setCreateTankModalOpen] = React.useState(false);

    const {data} = useQuery(
        ['get ship', id],
        () => ShipService.getById(`${id}`),
        {
            select: ({data}) => data,
            enabled: !!id // only run the query if id exists
        }
    )

    const wasteRes = useQuery(
        ['wastes'],
        () => WasteService.getAll(),
        {
            select: ({data}) => data,
        }
    )


    const renderStorageTanks = data?.storageTanks.map(st => (
        <Grid key={st.id} item xs={12} sm={12} md={3}>
            <Link href={`storage-tank/${st.id}`}>
                <StorageTankCard storageTank={st}/>
            </Link>
        </Grid>
    ))

    const handleAddCrewMember = () => {
        setCreateCrewModalOpen(true)
    }
    const handleAddStorageTank = () => {
        setCreateTankModalOpen(true)
    }

    return (
        <Dashboard>
            <Box>
                <Box className={s.charts}>
                    <ShipBarChart/>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: "120px",
                        marginLeft: '35px'
                    }}>
                        <Typography variant="h6" sx={{textAlign: 'center'}}>
                            {data?.shipName}
                        </Typography>
                        <Typography variant="h6" sx={{textAlign: 'center'}}>
                            {data?.shipType}
                        </Typography>
                        <Typography variant="h6">
                            {data?.buildYear}
                        </Typography>
                    </Box>
                    <ShipPieChartWithoutSSR/>
                </Box>
                <Typography variant='h6' sx={{fontWeight: 'bold', marginBottom: '10px'}}>
                    Crew members
                    <IconButton onClick={handleAddCrewMember}>
                        <AddCircleOutlineRoundedIcon/>
                    </IconButton>
                </Typography>
                <CrewTable members={data?.crewMember}/>
                <Typography variant='h6' sx={{fontWeight: 'bold', marginTop: '10px'}}>
                    Storage tanks
                    <IconButton onClick={handleAddStorageTank}>
                        <AddCircleOutlineRoundedIcon/>
                    </IconButton>
                </Typography>
                <Grid container spacing={3} mt={1}>
                    {renderStorageTanks}
                </Grid>
            </Box>
            <CreateCrewMember
                createOpen={createCrewModalOpen}
                handleClose={()=>setCreateCrewModalOpen(false)}
                shipId={id}
            />
            <CreateStorageTank
                createOpen={createTankModalOpen}
                handleClose={()=> setCreateTankModalOpen(false)}
                wastes={wasteRes.data}
                shipId={id}
            />
        </Dashboard>
    );
};

export default Ship;