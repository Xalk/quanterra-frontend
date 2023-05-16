import React from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";
import Dashboard from "@/components/layout/Dashboard";
import {useQuery} from "@tanstack/react-query";
import {ShipService} from "@/services/ship/ship.service";
import {CrewService} from "@/services/crew-member/crew-member.service";
import {Box, Typography} from "@mui/material";
import Image from "next/image";
import avatarImg from "@/assets/profile.svg"

interface ProfileProps {

}


const Profile: NextPage<ProfileProps> = () => {
    const router = useRouter()
    const {id} = router.query

    const {data, isLoading} = useQuery(
        ['get profile'],
        () => CrewService.getById(`${id}`),
        {
            select: ({data}) => data,
            enabled: !!id
        }
    )

    return (
        <Dashboard>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{flex: "1 1 0"}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Image src={avatarImg} alt={'avatar img'} width={200}/>
                        <Typography fontSize={22}><strong>{data?.user.firstName}</strong></Typography>
                        <Typography>{data?.user.email}</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        borderRight: "2px solid #E0E0E0",
                        borderLeft: "2px solid #E0E0E0",
                        flex: "2 1 0",
                        padding: 2
                    }}
                >
                    <Typography mb={2} align='center' fontSize={22}><strong>Profile info</strong></Typography>
                    <Typography><strong>Crew ID: </strong>{data?.id}</Typography>
                    <Typography><strong>First name: </strong>{data?.user.firstName}</Typography>
                    <Typography><strong>Last name: </strong>{data?.user.lastName}</Typography>
                    <Typography><strong>Role: </strong>{data?.user.role}</Typography>
                </Box>
                <Box sx={{flex: "2 1 0", padding: 2}}>
                    <Typography mb={2} align='center' fontSize={22}><strong>Ship Work Assignment</strong></Typography>
                    <Typography><strong>Ship ID: </strong>{data?.ship.id}</Typography>
                    <Typography><strong>Ship name: </strong>{data?.ship.shipName}</Typography>
                    <Typography><strong>Type: </strong>{data?.ship.shipType}</Typography>
                    <Typography><strong>Build year: </strong>{data?.ship.buildYear}</Typography>
                    <Typography><strong>Assigned From: </strong>{`${new Date(`${data?.updatedAt}`)}`.slice(0, 24)}
                    </Typography>
                </Box>
            </Box>
        </Dashboard>
    );
};

export default Profile;
