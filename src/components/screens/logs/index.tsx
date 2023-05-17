import React from 'react';
import {Box, Typography} from "@mui/material";
import UserLogsTable from "@/components/screens/logs/UserLogsTable";
import {useQuery} from "@tanstack/react-query";
import {UserService} from "@/services/user/user.service";


const Logs: React.FC = () => {

    const {data} = useQuery(
        ['logs'],
        () => UserService.getAllLogs(),
        {
            select: ({data}) => data,
        }
    )

    return (
        <Box>
            <Typography mb={2} align='center' fontSize={22}><strong>Users logs</strong></Typography>
            <UserLogsTable logs={data}/>
        </Box>
    );
};

export default Logs;
