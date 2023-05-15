import React from 'react';
import s from "@/components/screens/ships/ships.module.scss";
import {Box, Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IShip} from "@/types/ship.interface";
import MoreButton from "@/components/ui/MoreButton";
import {Group, PropaneTank} from "@mui/icons-material";
import {IStorageTank} from "@/types/storage-tank.interface";
import Image from "next/image";
import tankImg from "@/assets/storagetank.svg";

interface StorageTankCardProps {
    storageTank: IStorageTank
}


const StorageTankCard: React.FC<StorageTankCardProps> = ({storageTank}) => {
    const {id, unit, waste, capacity} = storageTank

    return (
        <Card sx={{backgroundColor: '#d2d2d2'}}
              className={`${s.card}`}
        >
            <CardContent sx={{color: "#282936"}}>

                <Box className={s.content}>
                    <Image src={tankImg} alt={"tank image"} width={130}/>
                    <Box sx={{marginTop: '10px'}}>
                        <Typography>
                            <strong>Storage Tank:</strong> №{id}
                        </Typography>
                        <Typography>
                            <strong>Capacity:</strong> {capacity}
                        </Typography>
                        <Typography>
                            <strong>Unit:</strong> {unit}
                        </Typography>
                        <Typography>
                            <strong>Waste type:</strong> {waste.type}
                        </Typography>
                        <Typography>
                            <strong>Description:</strong> {waste.description}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>

            <CardActions sx={{justifyContent: 'flex-start'}}>
                <MoreButton content="Details"/>
            </CardActions>
        </Card>
    );
};

export default StorageTankCard;