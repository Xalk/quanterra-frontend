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
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import Link from "next/link";
import s from '../styles/nav.module.scss'
import {useRouter} from "next/router";


let categories = [
    {
        id: 'Build',
        children: [
            {
                id: 'Home',
                icon: <PeopleIcon/>,
                targetUrl: '/',
                active: true
                ,
            },
            {id: 'Ships', icon: <DnsRoundedIcon/>, targetUrl: '/ships'},
            {id: 'Tanks', icon: <PermMediaOutlinedIcon/>, targetUrl: '/tanks'},
            {id: 'Personal', icon: <PublicIcon/>, targetUrl: '/personal'},
            {id: 'Logs', icon: <PublicIcon/>, targetUrl: '/logs'},
        ],
    },
    {
        id: 'Quality',
        children: [
            { id: 'Analytics', icon: <SettingsIcon /> , targetUrl: '/personal'},
            { id: 'Performance', icon: <TimerIcon /> , targetUrl: '/personal'},
            { id: 'Test Lab', icon: <PhonelinkSetupIcon />, targetUrl: '/personal' },
        ],
    },
];

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
    const {...other} = props;


    return (
        <Drawer variant="permanent" {...other} className={s.root}>
            <List disablePadding>
                <ListItem sx={{...item, ...itemCategory, fontSize: 22, color: '#fff'}}>
                    Quanterra
                </ListItem>
                {categories.map(({id, children}) => (
                    <Box key={id} sx={{bgcolor: '#080B16'}}>
                        <ListItem sx={{py: 2, px: 3}} className={s.MuiListItem}>
                            <ListItemText sx={{color: '#fff'}}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({id: childId, icon, targetUrl}) => (
                            <Link href={targetUrl}>
                                <ListItem disablePadding key={childId}>
                                    <ListItemButton sx={item} className={s.MuiListItemButton} selected={isActive(targetUrl)}>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText>{childId}</ListItemText>
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