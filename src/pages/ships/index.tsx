import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import {Card, CardActionArea, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import shipImgSVG from '@/assets/cargo-ship.svg'
import Image from "next/image";

import s from '@/styles/ships.module.scss'

import Link from "next/link";


const colors = ['#466D5A', '#81A593', '#7A9C8A', '#B8B2A3', '#C36D60']


const Ships = () => {

    const [ships, setShips] = useState([...Array(10)])



    const renderShips = ships.map(sh => (
        <Grid item xs={12} sm={12} md={3}>
           <Link href='ships/1'>
               <Card sx={{backgroundColor: 'rgba(31,24,164,0.38)'}}
                     className={`${s.card}`}
               >
                   <CardContent>
                       <Typography>
                           SHIP 1
                       </Typography>
                       <Typography>
                           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consectetur
                           consequatur debitis deleniti magnam necessitatibus nostrum nulla, quas reprehenderit

                       </Typography>
                   </CardContent>
                   <CardActions sx={{justifyContent: 'flex-end'}}>
                       {/*<Button size="small"*/}
                       {/*        endIcon={<EastRoundedIcon/>}*/}
                       {/*       className={s.detailsBtn}>*/}
                       {/*    Details*/}
                       {/*</Button>*/}
                       <div className={s.main}>
                           <div id={s.container}>
                               <button className={s.learnMore}>
                                <span className={s.circle} aria-hidden="true">
                                    <span className={`${s.icon} ${s.arrow}`}></span>
                                </span>
                                   <span className={s.buttonText}>Details</span>
                               </button>
                           </div>
                       </div>
                   </CardActions>
               </Card>
           </Link>
        </Grid>
    ))


    return (
        <>
            <Box className={s.top}>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias beatae doloremque expedita
                    impedit neque placeat reprehenderit sapiente sequi tempora. Alias maiores non reiciendis sint
                    voluptas?
                    Aperiam mollitia ratione reprehenderit.
                </Typography>
                <Image src={shipImgSVG} alt={'ship'}/>

            </Box>
            <Grid container spacing={3}>
                {renderShips}
            </Grid>
        </>
    )
        ;
};

export default Ships;