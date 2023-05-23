import * as React from 'react';
import {Group, DirectionsBoat} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import AreaTreatedWaste from "@/components/screens/main/AreaTreatedWaste";
import {useQuery} from "@tanstack/react-query";
import {ShipService} from "@/services/ship/ship.service";
import {useIntl} from "react-intl";

export default function Main() {
    const intl = useIntl();

    const {data} = useQuery(
        ['main'],
        () => ShipService.main(),
        {
            select: ({data}) => data,
        }
    )

    return (
        <Box
            sx={{
                display: {xs: 'flex', md: 'grid'},
                gridTemplateColumns: 'repeat(3,1fr)',
                gridAutoRows: 'minmax(100px, auto)',
                gap: 3,
                textAlign: 'center',
                flexDirection: 'column',
            }}
        >
            <Paper elevation={3} sx={{p: 3}}>
                <Typography variant="h4">{intl.formatMessage({id: 'home.total_crew'})}</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Group sx={{height: 100, width: 100, opacity: 0.3, mr: 1}}/>
                    <Typography variant="h4">{data?.crewCount}</Typography>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{p: 3}}>
                <Typography variant="h4">{intl.formatMessage({id: 'home.total_ships'})}</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <DirectionsBoat sx={{height: 100, width: 100, opacity: 0.3, mr: 1}}/>
                    <Typography variant="h4">{data?.shipsCount}</Typography>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{p: 2, gridColumn: 3, gridRow: '1/4'}}>
                <Box>
                    <Typography>{intl.formatMessage({id: 'home.recently_added_crew_members'})}</Typography>
                    <List>
                        {
                            data?.last10Members.map((crew, i) => (
                                <Box key={crew?.id}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt={crew?.user.firstName}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`${crew?.user.firstName} ${crew?.user.lastName}`}
                                            secondary={`Time Created: ${new Date(crew?.createdAt).toString().slice(0, 24)}`}
                                        />
                                    </ListItem>
                                    <Divider variant="inset"/>
                                </Box>
                            ))
                        }
                    </List>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{p: 2, gridColumn: '1/3', height: '500px'}}>
                <AreaTreatedWaste data={data?.totalTreatedAmount}/>
            </Paper>
        </Box>
    );
}
