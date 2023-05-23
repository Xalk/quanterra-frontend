import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import shipImgSVG from '@/assets/cargo-ship.svg'
import Image from "next/image";
import s from '@/components/screens/ships/ships.module.scss'
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {ShipService} from "@/services/ship/ship.service";
import ShipCard from "@/components/screens/ships/ShipCard";
import Button from "@mui/material/Button";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {useRouter} from "next/router";
import CreateShip from "@/components/screens/ships/forms/CreateShip";
import {useTranslate} from "@/contexts/TranslateContext";
import Loader from "@/components/ui/Loader";


const Ships = () => {
    const t = useTranslate();
    const router = useRouter()

    const [createOpen, setCreateOpen] = useState(false);
    const handleCreateClose = () => {
        setCreateOpen(false)
    }

    const handleAddShip = () => {
        setCreateOpen(true)
    }


    const {data, isLoading} = useQuery(
        ['ships'],
        () => ShipService.getAll(),
        {
            select: ({data}) => data,
        }
    )


    const renderShips = data?.map(sh => (
        <Grid key={sh.id} item xs={12} sm={12} md={3}>
            <Link href={`ships/${sh.id}`}>
                <ShipCard ship={sh}/>
            </Link>
        </Grid>
    ))

    return (
       <>
           {
               isLoading ? <Loader/> :(
                   <Box>
                       <Box className={s.top}>
                           <Typography>
                               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias beatae doloremque expedita
                               impedit neque placeat reprehenderit sapiente sequi tempora. Alias maiores non reiciendis sint
                               voluptas?
                               Aperiam mollitia ratione reprehenderit.
                           </Typography>
                           <Box className={s.imageBlock}>
                               <Image src={shipImgSVG} alt={'ship'}/>
                           </Box>

                       </Box>
                       <Box>
                           <Button variant="contained"
                                   endIcon={<AddCircleOutlineRoundedIcon/>}
                                   onClick={handleAddShip}
                           >
                               {t('ships.add_ship_btn')}
                           </Button>
                       </Box>
                       <Grid container spacing={3} mt={1}>
                           {renderShips}
                       </Grid>
                       <CreateShip createOpen={createOpen} handleClose={handleCreateClose}/>
                   </Box>
               )
           }
       </>
    )
        ;
};

export default Ships;
