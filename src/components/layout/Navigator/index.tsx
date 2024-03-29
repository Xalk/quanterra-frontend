import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, {DrawerProps} from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from "next/link";
import s from './navigator.module.scss'
import {useRouter} from "next/router";
import Image from "next/image";
import logo from '@/assets/logo.svg'
import Typography from "@mui/material/Typography";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import tank from "@/assets/storagetank_icon.svg";
import waste from "@/assets/waste.svg";
import logs from "@/assets/logs.svg";
import ListAltIcon from '@mui/icons-material/ListAlt';
import {useTranslate} from "@/contexts/TranslateContext";
import {useAuth} from "@/hooks/useAuth";
import {Role} from "@/enums/role.enum";
import LockIcon from '@mui/icons-material/Lock';


const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
        bgcolor: '#17233D',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};


const isActive = (route: string) => {
    return route === useRouter().pathname
}

function Navigator(props: DrawerProps) {
    const t = useTranslate();

    const {user} = useAuth()

    let categories = [
        {
            id: 'Main',
            children: [
                {
                    id: t('navigator.home'),
                    icon: <HomeRoundedIcon/>,
                    targetUrl: '/',
                    active: true
                    ,
                },
                {
                    id: t('navigator.crew_members'),
                    icon: <PeopleIcon/>,
                    targetUrl: '/crew-members'
                },
                {id: t('navigator.ships'), icon: <DirectionsBoatIcon/>, targetUrl: '/ships'},
                {
                    id: t('navigator.storage_tanks'),
                    icon: <Image src={tank} alt={'tank'} width={18}/>,
                    targetUrl: '/tanks'
                },
                {
                    id: t('navigator.collection_records'),
                    icon: <ListAltIcon/>,
                    targetUrl: '/collection-records'
                },
                {
                    id: t('navigator.wastes'),
                    icon: <Image src={waste} alt={'waste'} width={18}/>,
                    targetUrl: '/wastes'
                },
                {
                    id: t('navigator.logs'),
                    icon: <Image src={logs} alt={'waste'} width={18}/>,
                    targetUrl: '/logs'
                },
            ],
        },
        {
            id: 'Additional',
            children: [
                {id: t('navigator.settings'), icon: <SettingsIcon/>, targetUrl: '/settings'},
            ],
        },
    ];

    const {...other} = props;

    return (
        <Drawer variant="permanent" {...other} className={s.root}>
            <List disablePadding>
                <ListItem sx={{...item, ...itemCategory, fontSize: 22, color: '#fff', px: '20px'}}>
                    <Box sx={{
                        display: 'flex',
                        width: "100%",
                        justifyContent: 'start',
                        alignItems: 'end',
                        py: '10px'
                    }}>
                        <Image src={logo} alt={'logo'} width={48}/>
                        <Typography sx={{fontSize: '26px', fontWeight: '400'}}>
                            uanterra
                        </Typography>
                    </Box>
                </ListItem>
                {categories.map(({id, children}) => (
                    <Box key={id} sx={{bgcolor: '#080B16'}}>
                        <ListItem sx={{py: 2, px: 3}} className={s.MuiListItem}>
                            <ListItemText sx={{color: '#fff'}}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({id: childId, icon, targetUrl}) => (
                            <Link key={childId} href={targetUrl}>
                                <ListItem disablePadding key={childId}>
                                    <ListItemButton sx={item} className={s.MuiListItemButton}
                                                    selected={isActive(targetUrl)}>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText>{childId}</ListItemText>
                                        {
                                            (user?.role === Role.OPERATOR && targetUrl === '/logs') && <LockIcon/>
                                        }
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                        <Divider sx={{mt: 2, backgroundColor: 'rgb(255,255,255,0.15)'}}/>
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}

export default Navigator;
