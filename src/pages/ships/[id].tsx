import React, {useState} from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import CrewTable from "@/components/ui/CrewTable/CrewTable";
import {IconButton} from '@mui/material';
import dynamic from "next/dynamic";
import SummarizeIcon from '@mui/icons-material/Summarize';
import s from '@/components/screens/ships/ships.module.scss'
import Dashboard from "@/components/layout/Dashboard";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ShipService} from "@/services/ship/ship.service";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import StorageTankCard from "@/components/screens/storage-tanks/StorageTankCard";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CreateCrewMember from "@/components/screens/ships/forms/CreateCrewMember";
import CreateStorageTank from "@/components/screens/storage-tanks/forms/CreateStorageTank";
import {WasteService} from "@/services/waste/waste.service";
import {wasteTypeCount} from "@/utils/wasteTypeCount";
import {CollectionRecordService} from "@/services/collection-record/collection-record.service";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Button from "@mui/material/Button";
import {AxiosError} from "axios";
import Report from "@/components/ui/Report";
import {BlobProvider} from '@react-pdf/renderer';
import EditShip from "@/components/screens/ships/forms/EditShip";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {useTranslate} from "@/contexts/TranslateContext";

const ShipPieChartWithoutSSR = dynamic(
    import("@/components/charts/PieChart"),
    {ssr: false}
);
const ShipBarChartWithoutSSR = dynamic(
    import("@/components/charts/BarChart"),
    {ssr: false}
);


const Ship: NextPage = () => {
    const t = useTranslate();
    const router = useRouter()
    const {id} = router.query

    const [createCrewModalOpen, setCreateCrewModalOpen] = React.useState(false);
    const [createTankModalOpen, setCreateTankModalOpen] = React.useState(false);
    const [editShipModalOpen, setEditShipModalOpen] = React.useState(false);
    const [pieChartUrl, setPieChartUrl] = useState<string | null>(null);
    const [barChartUrl, setBarChartUrl] = useState<string | null>(null);


    const {data, isLoading} = useQuery(
        ['get ship', id],
        () => ShipService.getById(`${id}`),
        {
            select: ({data}) => data,
            enabled: !!id // only run the query if id exists
        }
    )

    const queryClient = useQueryClient();
    const deleteShip = useMutation(ShipService.delete, {
        onSuccess: () => {
            queryClient.invalidateQueries(['ships']);
        },
        onError: (error: any | AxiosError) => error
    });

    const wasteRes = useQuery(
        ['wastes'],
        () => WasteService.getAll(),
        {
            select: ({data}) => data,
        }
    )

    const avgAmountRes = useQuery(
        ['avg amounts'],
        () => CollectionRecordService.avgAmountsByMonth(`${id}`),
        {
            select: ({data}) => data,
            enabled: !!id
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

    if (isLoading) return <div>Loading...</div>


    const typesCount = wasteTypeCount(data?.storageTanks)


    const handleDelete = () => {
        const res = confirm('Are you sure you want to delete this ship?')
        if (res) {
            deleteShip.mutate(`${id}`)
            router.replace(`/ships`)
        }
    }

    const handleReport = (downloadURL: string) => {
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = `Report_Ship_Id_${id}_${new Date().toString().slice(0, 24)}.pdf`;
        link.click();
    }

    const handleShipEdit = () => {
        setEditShipModalOpen(true)
    }

    return (
        <Dashboard>
            <Box sx={{position: 'relative'}}>
                <Box className={s.charts}>
                    <ShipBarChartWithoutSSR amounts={avgAmountRes?.data} setBarChartUrl={setBarChartUrl}/>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: "120px",
                        marginLeft: '35px'
                    }}>
                        <Box sx={{display: 'flex', alignItems: 'center', pl: '30px'}}>
                            <Typography variant="h6" sx={{textAlign: 'center'}}>
                                {data?.shipName}
                            </Typography>
                            <IconButton onClick={handleShipEdit}>
                                <EditRoundedIcon/>
                            </IconButton>
                        </Box>
                        <Typography variant="h6" sx={{textAlign: 'center'}}>
                            {data?.shipType}
                        </Typography>
                        <Typography variant="h6">
                            {data?.buildYear}
                        </Typography>
                    </Box>
                    <ShipPieChartWithoutSSR types={typesCount} setPieChartUrl={setPieChartUrl}/>
                </Box>
                <Typography variant='h6' sx={{fontWeight: 'bold', marginBottom: '10px'}}>
                    {t('navigator.crew_members')}
                    <IconButton onClick={handleAddCrewMember}>
                        <AddCircleOutlineRoundedIcon/>
                    </IconButton>
                </Typography>
                <CrewTable members={data?.crewMember} isShipPage={true}/>
                <Typography variant='h6' sx={{fontWeight: 'bold', marginTop: '10px'}}>
                    {t('navigator.storage_tanks')}
                    <IconButton onClick={handleAddStorageTank}>
                        <AddCircleOutlineRoundedIcon/>
                    </IconButton>
                </Typography>
                <Grid container spacing={3} mt={1}>
                    {renderStorageTanks}
                </Grid>
                {
                    (pieChartUrl && barChartUrl) &&
                    <BlobProvider document={<Report pieChartUrl={pieChartUrl}
                                                    barChartUrl={barChartUrl}
                                                    ship={data}
                    />}>
                        {({blob, url}) => {
                            const downloadURL = URL.createObjectURL(
                                new Blob([blob || ""], {type: "text/plain"}),
                            );
                            return (
                                <Button variant="contained"
                                        endIcon={<SummarizeIcon/>}
                                        sx={{position: 'absolute', top: -20, left: 0}}
                                        style={{
                                            backgroundColor: "#080B16",
                                        }}
                                        onClick={() => handleReport(downloadURL)}
                                >
                                    {t('ship.report')}
                                </Button>
                            )

                        }}</BlobProvider>
                }

                <Button variant="contained"
                        endIcon={<DeleteForeverRoundedIcon/>}
                        sx={{position: 'absolute', top: -20, right: 0}}
                        style={{
                            backgroundColor: "#F44336",
                        }}
                        onClick={handleDelete}
                >
                    {t('ship.delete')}
                </Button>
            </Box>
            <CreateCrewMember
                createOpen={createCrewModalOpen}
                handleClose={() => setCreateCrewModalOpen(false)}
                shipId={id}
            />
            <CreateStorageTank
                createOpen={createTankModalOpen}
                handleClose={() => setCreateTankModalOpen(false)}
                wastes={wasteRes.data}
                shipId={id}
            />
            <EditShip
                createOpen={editShipModalOpen}
                handleClose={() => setEditShipModalOpen(false)}
                ship={data}
            />

        </Dashboard>

    );
};

export default Ship;
