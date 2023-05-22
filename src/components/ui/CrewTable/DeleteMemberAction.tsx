import {Box, CircularProgress, Fab} from '@mui/material';
import {FC, useEffect, useState} from 'react';
import {Check} from '@mui/icons-material';
import {green} from '@mui/material/colors';
import {IUser} from "@/types/user.interface";
import {GridRenderCellParams} from "@mui/x-data-grid";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {AxiosError} from "axios";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import {CrewService} from "@/services/crew-member/crew-member.service";

interface CrewProps {
    params: GridRenderCellParams<IUser>,
    deletedRow: IUser | null,
    setDeletedRow: (id: IUser | null) => void
    isShipPage: boolean
}

const DeleteMemberAction: FC<CrewProps> = ({
                                               params,
                                               deletedRow,
                                               setDeletedRow,
                                               isShipPage
                                           }) => {
        const [success, setSuccess] = useState(false);

        const delMethod = isShipPage ? CrewService.deleteFromShip : CrewService.delete;
        const queryClient = useQueryClient();
        const {mutate, isLoading} = useMutation(delMethod, {
            onSuccess: () => {
                queryClient.invalidateQueries(['get ship']);
                queryClient.invalidateQueries(['ships']);
                queryClient.invalidateQueries(['crew-members']);
                queryClient.invalidateQueries(['all crew-members']);
                setSuccess(true);
                setDeletedRow(null);
            },
            onError: (error: any | AxiosError) => error,
        });


        const handleSubmit = async () => {
            const msg = isShipPage ? 'Are you sure you want to remove a member from this ship?' : 'Are you sure you want to remove this member?'
            confirm(msg) && mutate(`${deletedRow?.crewId}`)


        };

        useEffect(() => {
            if (deletedRow?.id === params.id && success) setSuccess(false);
        }, [deletedRow?.id]);

        return (
            <Box
                sx={{
                    m: 1,
                    position: 'relative',
                }}
            >
                {success ? (
                    <Fab
                        color="primary"
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: green[500],
                            '&:hover': {bgcolor: green[700]},
                        }}
                    >
                        <Check/>
                    </Fab>
                ) : (
                    <Fab
                        color="primary"
                        sx={{
                            width: 40,
                            height: 40,
                            backgroundColor: "#F44336"
                        }}
                        disabled={params.id !== deletedRow?.id || isLoading}
                        onClick={handleSubmit}
                    >
                        <HighlightOffRoundedIcon/>
                    </Fab>
                )}
                {isLoading && (
                    <CircularProgress
                        size={52}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                        }}
                    />
                )}
            </Box>
        );
    }
;

export default DeleteMemberAction;
