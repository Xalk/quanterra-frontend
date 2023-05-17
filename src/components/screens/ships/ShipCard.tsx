import React from 'react';
import s from "@/components/screens/ships/ships.module.scss";
import {Box, Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IShip} from "@/types/ship.interface";
import MoreButton from "@/components/ui/MoreButton";
import {Group, PropaneTank} from "@mui/icons-material";
import tank from "@/assets/storagetank_icon.svg";
import Image from "next/image";

interface ShipCardProps {
    ship: IShip
}


const ShipCard: React.FC<ShipCardProps> = ({ship}) => {
    const {shipName, shipType, buildYear, crewMember, storageTanks} = ship

    return (
        <Card sx={{backgroundColor: 'rgba(31,24,164,0.38)'}}
              className={`${s.card}`}
        >
            <CardContent sx={{color: "#282936"}}>
                <Typography variant="h6" sx={{fontWeight: 'bold', mb: 1}}>
                    {shipName}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        <Typography variant="body1" sx={{mb: 1}}>
                            <strong>Type:</strong> {shipType}
                        </Typography>
                        <Typography variant="body1" sx={{mb: 1}}>
                            <strong>Build Year:</strong> {buildYear}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="body1" sx={{mb: 1}}>
                            <Group/> {crewMember.length}
                        </Typography>
                        <Typography variant="body1" sx={{mb: 1}}>
                            <Image src={tank} alt={'tank'} width={18}/> {storageTanks.length}
                        </Typography>
                    </div>
                </Box>
            </CardContent>

            <CardActions sx={{justifyContent: 'flex-start'}}>
                <MoreButton content="Details"/>
            </CardActions>
        </Card>
    );
};

export default ShipCard;
