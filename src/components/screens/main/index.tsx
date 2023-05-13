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

export default function Main() {
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
                <Typography variant="h4">Total Crew</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Group sx={{height: 100, width: 100, opacity: 0.3, mr: 1}}/>
                    <Typography variant="h4">22</Typography>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{p: 3}}>
                <Typography variant="h4">Total Ships</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <DirectionsBoat sx={{height: 100, width: 100, opacity: 0.3, mr: 1}}/>
                    <Typography variant="h4">5</Typography>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{p: 2, gridColumn: 3, gridRow: '1/4'}}>
                <Box>
                    <Typography>Recently added Users</Typography>
                    <List>
                        {[{name: 'Alla'}, {name: 'Lofer'}, {name: 'Alla'}, {name: 'Lofer'}, {name: 'Alla'}, {name: 'Lofer'}].slice(0, 10).map((user, i) => (
                            <Box key={user.name}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt={user?.name}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user?.name}
                                        // secondary={`Time Created: ${moment(user?.createdAt).format(
                                        //     'YYYY-MM-DD H:mm:ss'
                                        // )}`}
                                    />
                                </ListItem>
                                <Divider variant="inset"/>
                            </Box>
                        ))}
                    </List>
                </Box>
            </Paper>
            {/*<Divider sx={{mt: 3, mb: 3, opacity: 0.7}}/>*/}
            <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3' }}>
                <AreaTreatedWaste />
            </Paper>
        </Box>
    );
}