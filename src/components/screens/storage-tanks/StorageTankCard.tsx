import React from 'react';
import s from "@/components/screens/ships/ships.module.scss";
import {Box, Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import MoreButton from "@/components/ui/MoreButton";
import {IStorageTank} from "@/types/storage-tank.interface";
import Image from "next/image";
import tankImg from "@/assets/storagetank_img.svg";

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
                    <Image src={tankImg} alt={"tank image"} width={130} className={s.tankImg}/>
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
                        <Typography className={s.desc}>
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
