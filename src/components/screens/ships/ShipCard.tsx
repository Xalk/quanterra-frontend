import React from 'react';
import s from "@/components/screens/ships/ships.module.scss";
import {Box, Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IShip} from "@/types/ship.interface";
import MoreButton from "@/components/ui/MoreButton";
import {Group, PropaneTank} from "@mui/icons-material";
import tank from "@/assets/storagetank_img.svg";
import shipImg from "@/assets/ship_icon.svg";
import Image from "next/image";
import {useTranslate} from "@/contexts/TranslateContext";

interface ShipCardProps {
    ship: IShip
}


const ShipCard: React.FC<ShipCardProps> = ({ship}) => {
    const t = useTranslate();
    const {shipName, shipType, buildYear, crewMember, storageTanks} = ship

    return (
        <Card sx={{backgroundColor: '#d2d2d2'}}
              className={`${s.card}`}
        >
            <CardContent sx={{color: "#282936"}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6" sx={{fontWeight: 'bold', mb: 1}}>
                        {shipName}
                    </Typography>
                    <Image src={shipImg} alt={'ship'} width={36}/>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        <Typography variant="body1" sx={{mb: 1}}>
                            <strong>{t('ships.type')}:</strong> {shipType}
                        </Typography>
                        <Typography variant="body1" sx={{mb: 1}}>
                            <strong>{t('ships.build_year')}:</strong> {buildYear}
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
