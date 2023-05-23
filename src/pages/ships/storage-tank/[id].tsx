import React from "react";
import Dashboard from "@/components/layout/Dashboard";
import {useRouter} from "next/router";
import {NextPage} from "next";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {StorageTankService} from "@/services/storage-tank/storage-tank.service";
import {Box, IconButton, Typography} from "@mui/material";
import tankImg from "@/assets/storagetank_img.svg";
import sensorImg from "@/assets/sensor-img.svg";
import Image from "next/image";
import s from "@/components/screens/storage-tanks/storage-tank.module.scss"
import CollectionRecordsTable from "@/components/screens/storage-tanks/CollectionRecordsTable";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Button from "@mui/material/Button";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditStorageTank from "@/components/screens/storage-tanks/forms/EditStorageTank";
import {AxiosError} from "axios";
import CreateSensor from "@/components/screens/storage-tanks/forms/CreateSensor";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditSensor from "@/components/screens/storage-tanks/forms/EditSensor";
import {useTranslate} from "@/contexts/TranslateContext";

const StorageTank: NextPage = () => {
    const t = useTranslate();
    const router = useRouter()
    const {id} = router.query

    const [editStorageTankModalOpen, setEditStorageTankModalOpen] = React.useState(false);
    const [createSensorModalOpen, setCreateSensorModalOpen] = React.useState(false);
    const [editSensorModalOpen, setEditSensorModalOpen] = React.useState(false);

    const {data, isLoading} = useQuery(
        ['get tank', id],
        () => StorageTankService.getById(`${id}`),
        {
            select: ({data}) => data,
            enabled: !!id
        }
    )
    const queryClient = useQueryClient();
    const deleteTank = useMutation(StorageTankService.delete, {
        onSuccess: () => {
            queryClient.invalidateQueries(['get ship']);
        },
        onError: (error: any | AxiosError) => error
    });

    const handleStorageTankEdit = () => {
        setEditStorageTankModalOpen(true)
    }

    const handleDelete = () => {
        confirm('Are you sure you want to delete this tank?') &&
        deleteTank.mutate(`${id}`)
        router.replace(`/ships/${data?.ship.id}`)
    }
    const handleSensorCreate = () => {
        setCreateSensorModalOpen(true)
    }
    const handleSensorEdit = () => {
        setEditSensorModalOpen(true)
    }

    return (
        <Dashboard>
            <Box sx={{
                display: 'flex',
                gap: '80px',
                flexDirection: 'row',
                alignItems: 'stretch',
                justifyContent: 'space-between',
                position: 'relative',
            }}>
                <Box sx={{marginTop: '20px'}}>
                    <Typography variant="h5" sx={{textAlign: 'center'}}>
                        {t('storage_tank.title')}
                        <IconButton onClick={handleStorageTankEdit}>
                            <EditRoundedIcon/>
                        </IconButton>
                    </Typography>
                    <Box sx={{display: 'flex', gap: '20px', flexDirection: 'row'}}>
                        <Image src={tankImg} alt={"tank image"} width={220}/>
                        <Box className={s.tableBox}>
                            <table>
                                <tbody>
                                <tr>
                                    <th>{t('storage_tank.title')} ID</th>
                                    <td>{data?.id}</td>
                                </tr>
                                <tr>
                                    <th>{t('storage_tanks.unit')}</th>
                                    <td>{data?.unit}</td>
                                </tr>
                                <tr>
                                    <th>{t('storage_tanks.capacity')}</th>
                                    <td>{data?.capacity}</td>
                                </tr>
                                <tr>
                                    <th>{t('storage_tanks.waste_type')}</th>
                                    <td>{data?.waste.type}</td>
                                </tr>
                                <tr>
                                    <th>{t('storage_tanks.description')}</th>
                                    <td>{data?.waste.description}</td>
                                </tr>
                                </tbody>
                            </table>

                        </Box>
                    </Box>
                    <Typography variant="h5" sx={{textAlign: 'center'}}>
                        {t('sensor.title')}
                        {
                            data?.sensor ? (
                                <IconButton onClick={handleSensorEdit}>
                                    <EditRoundedIcon/>
                                </IconButton>
                            ) : (
                                <IconButton onClick={handleSensorCreate}>
                                    <AddCircleOutlineRoundedIcon/>
                                </IconButton>
                            )
                        }
                    </Typography>
                    <Box sx={{display: 'flex', gap: '20px', flexDirection: 'row'}}>
                        <Image src={sensorImg} alt={"tank image"} width={220}/>
                        {
                            data?.sensor
                                ? <Box className={s.tableBox}>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <th>{t('sensor.title')} ID</th>
                                            <td>{data?.sensor.id}</td>
                                        </tr>
                                        <tr>
                                            <th>{t('sensor.name')}</th>
                                            <td>{data?.sensor.name}</td>
                                        </tr>
                                        <tr>
                                            <th>{t('sensor.connection_key')}</th>
                                            <td>{data?.sensor.connectionKey}</td>
                                        </tr>
                                        <tr>
                                            <th>{t('sensor.status')}</th>
                                            <td>{data?.sensor.status}</td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </Box>
                                : <Typography
                                    sx={{display: 'flex', alignItems: 'center'}}>
                                    <CloseRoundedIcon style={{color: '#F44336', fontSize: '32px'}}/>
                                    {t('sensor.not_created')}
                                </Typography>
                        }
                    </Box>
                </Box>

                <CollectionRecordsTable records={data?.collectionRecords.slice(-10)}/>
                <Button variant="contained"
                        endIcon={<DeleteForeverRoundedIcon/>}
                        sx={{position: 'absolute', top: -10, right: 0}}
                        style={{
                            backgroundColor: "#F44336",
                        }}
                        onClick={handleDelete}
                >
                    {t('ship.delete')}
                </Button>
            </Box>
            <EditStorageTank createOpen={editStorageTankModalOpen}
                             handleClose={() => setEditStorageTankModalOpen(false)}
                             storageTank={data}
            />
            <CreateSensor
                createOpen={createSensorModalOpen}
                handleClose={() => setCreateSensorModalOpen(false)}
                storageTankId={data?.id}
            />
            <EditSensor
                createOpen={editSensorModalOpen}
                handleClose={() => setEditSensorModalOpen(false)}
                sensor={data?.sensor}
            />
        </Dashboard>
    );
};

export default StorageTank;
