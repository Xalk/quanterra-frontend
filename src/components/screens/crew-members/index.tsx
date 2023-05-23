import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import {useQuery} from "@tanstack/react-query";
import {CrewService} from "@/services/crew-member/crew-member.service";
import CrewTable from "@/components/ui/CrewTable/CrewTable";
import CreateCrewMember from "@/components/screens/ships/forms/CreateCrewMember";
import {useIntl} from "react-intl";

interface CrewMembersProps {

}


const CrewMembers: React.FC<CrewMembersProps> = () => {
    const intl = useIntl();
    const [createCrewModalOpen, setCreateCrewModalOpen] = React.useState(false);

    const crew = useQuery(
        ['all crew-members'],
        () => CrewService.getAll(),
        {
            select: ({data}) => data,
        }
    )

    const handleAddCrew = () => {
        setCreateCrewModalOpen(true)
    }


    return (
        <Box>
            <Typography mb={2}
                        align='center'
                        fontSize={22}>
                <strong>
                    {intl.formatMessage({id: 'crew_members.title'})}
                </strong>
                <IconButton onClick={handleAddCrew}>
                    <AddCircleOutlineRoundedIcon/>
                </IconButton>
            </Typography>
            <CrewTable members={crew?.data} isShipPage={false}/>
            <CreateCrewMember
                createOpen={createCrewModalOpen}
                handleClose={() => setCreateCrewModalOpen(false)}
                isShipPage={false}
            />
        </Box>
    );
};

export default CrewMembers;
