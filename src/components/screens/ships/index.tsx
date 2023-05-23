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
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import useDebounce from "@/hooks/useDebounce";


const Ships = () => {
    const t = useTranslate();
    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 600);


    const [createOpen, setCreateOpen] = useState(false);
    const handleCreateClose = () => {
        setCreateOpen(false)
    }

    const handleAddShip = () => {
        setCreateOpen(true)
    }


    const {data, isLoading} = useQuery(
        ['ships', debouncedSearchTerm],
        () => ShipService.getAll(debouncedSearchTerm),
        {
            select: ({data}) => data,
            // enabled: !!debouncedSearchTerm
        }
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }


    const renderShips = data?.map(sh => (
        <Grid key={sh.id} item xs={12} sm={12} md={3}>
            <Link href={`ships/${sh.id}`}>
                <ShipCard ship={sh}/>
            </Link>
        </Grid>
    ))

    return (
        <Box>
            <Box className={s.top}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    paddingRight: '50px',
                    maxWidth: '800px',
                    minWidth: '450px',
                }}>
                    <Typography>
                        {t('ships.header_text')}
                    </Typography>
                    <Toolbar
                        sx={{
                            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                            backgroundColor: '#fafafa',
                            borderRadius: '5px',
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <SearchIcon color="inherit" sx={{display: 'block'}}/>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    placeholder="Search by name"
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {fontSize: 'default'},
                                    }}
                                    variant="standard"
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained"
                                        endIcon={<AddCircleOutlineRoundedIcon/>}
                                        onClick={handleAddShip}
                                >
                                    {t('ships.add_ship_btn')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Box>
                <Box className={s.imageBlock}>
                    <Image src={shipImgSVG} alt={'ship'}/>
                </Box>

            </Box>
            <Box>

            </Box>
            {
                isLoading ? <Loader/> : (
                    <Grid container spacing={3} mt={1}>
                        {renderShips}
                    </Grid>
                )
            }

            <CreateShip createOpen={createOpen} handleClose={handleCreateClose}/>
        </Box>
    )
        ;
};

export default Ships;
