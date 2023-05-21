import {Box, CircularProgress, Fab} from '@mui/material';
import {FC, useEffect, useState} from 'react';
import {Check, Save} from '@mui/icons-material';
import {green} from '@mui/material/colors';
import {IUser} from "@/types/user.interface";
import {GridRenderCellParams, GridRowId} from "@mui/x-data-grid";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserService} from "@/services/user/user.service";
import {AxiosError} from "axios";

interface CrewProps {
    params: GridRenderCellParams<IUser>,
    updatedRow: IUser | null,
    setUpdatedRow: (id: IUser | null) => void
}

const SaveMemberAction: FC<CrewProps> = ({params, updatedRow, setUpdatedRow}) => {
        const [success, setSuccess] = useState(false);

        const queryClient = useQueryClient();
        const {mutate, isLoading} = useMutation(UserService.update, {
            onSuccess: () => {
                queryClient.invalidateQueries(['get ship']);
                queryClient.invalidateQueries(['all crew-members']);
                setSuccess(true);
                setUpdatedRow(null);
            },
            onError: (error: any | AxiosError) => error,
        });


        const handleSubmit = async () => {

            const {id} = params.row;


            const role = updatedRow?.role
            mutate({id, data: {role}})

        };

        useEffect(() => {
            if (updatedRow?.id === params.id && success) setSuccess(false);
        }, [updatedRow?.id]);

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
                        }}
                        disabled={params.id !== updatedRow?.id || isLoading}
                        onClick={handleSubmit}
                    >
                        <Save/>
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

export default SaveMemberAction;
