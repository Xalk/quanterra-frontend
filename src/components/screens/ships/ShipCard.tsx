import React from 'react';
import s from "@/components/screens/ships/ships.module.scss";
import {Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IShip} from "@/types/ship.interface";
import MoreButton from "@/components/ui/MoreButton";

interface ShipCardProps {
    ship: IShip
}


const ShipCard: React.FC<ShipCardProps> = ({ship}) => {
    const {shipName} = ship

    return (
        <Card sx={{backgroundColor: 'rgba(31,24,164,0.38)'}}
              className={`${s.card}`}
        >
            <CardContent>
                <Typography>
                    {shipName}
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consectetur
                    consequatur debitis deleniti magnam necessitatibus nostrum nulla, quas reprehenderit

                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'flex-end'}}>
                <MoreButton content="Details"/>
            </CardActions>
        </Card>
    );
};

export default ShipCard;