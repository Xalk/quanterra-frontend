import React from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";
import Dashboard from "@/components/layout/Dashboard";
import {useQuery} from "@tanstack/react-query";
import {CrewService} from "@/services/crew-member/crew-member.service";
import {Box, Typography} from "@mui/material";
import Image from "next/image";
import avatarImg from "@/assets/profile.svg"
import {useTranslate} from "@/contexts/TranslateContext";

interface ProfileProps {

}


const Profile: NextPage<ProfileProps> = () => {
    const t = useTranslate()
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

    const handleDate = (updatedDate: string): string => {
        const date = new Date(updatedDate);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        } as const
        const locale = t('locale')
        return new Intl.DateTimeFormat(locale, options).format(date)
    }

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
                    <Typography mb={2} align='center' fontSize={22}><strong>{t('profile.info')}</strong></Typography>
                    <Typography><strong>{t('profile.crew')} ID: </strong>{data?.id}</Typography>
                    <Typography><strong>{t('crew_members.first_name')}: </strong>{data?.user.firstName}</Typography>
                    <Typography><strong>{t('crew_members.last_name')}: </strong>{data?.user.lastName}</Typography>
                    <Typography><strong>{t('crew_members.role')}: </strong>{data?.user.role}</Typography>
                </Box>
                <Box sx={{flex: "2 1 0", padding: 2}}>
                    <Typography mb={2} align='center'
                                fontSize={22}><strong>{t('profile.assignment')}</strong></Typography>
                    {
                        data?.ship ? <>
                            <Typography><strong>{t('profile.ship')} ID: </strong>{data?.ship.id}</Typography>
                            <Typography><strong>{t('profile.ship_name')}: </strong>{data?.ship.shipName}</Typography>
                            <Typography><strong>{t('ships.type')}: </strong>{data?.ship.shipType}</Typography>
                            <Typography><strong>{t('ships.build_year')}: </strong>{data?.ship.buildYear}</Typography>
                            <Typography><strong>{t('profile.assigned_from')}: </strong>{`${handleDate(data?.updatedAt)}`.slice(0, 24)}
                            </Typography>
                        </> : <Typography>{t('profile.no_ship_assigned')}</Typography>
                    }
                </Box>
            </Box>
        </Dashboard>
    );
};

export default Profile;
