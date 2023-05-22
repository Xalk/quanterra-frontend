import {Box, CircularProgress, Fab} from '@mui/material';
import {FC, useEffect, useState} from 'react';
import {Check, Save} from '@mui/icons-material';
import {green} from '@mui/material/colors';
import {GridRenderCellParams} from "@mui/x-data-grid";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IWaste} from "@/types/waste.interface";
import {WasteService} from "@/services/waste/waste.service";

interface CrewProps {
    params: GridRenderCellParams<IWaste>,
    updatedRow: IWaste | null,
    setUpdatedRow: (id: IWaste | null) => void
}

const SaveMemberAction: FC<CrewProps> = ({params, updatedRow, setUpdatedRow}) => {
        const [success, setSuccess] = useState(false);

        const queryClient = useQueryClient();
        const {mutate, isLoading} = useMutation(WasteService.update, {
            onSuccess: () => {
                queryClient.invalidateQueries(['wastes']);
                setSuccess(true);
                setUpdatedRow(null);
            },
            onError: (error: any | AxiosError) => error,
        });


        const handleSubmit = async () => {

            const {id, type, description } = params.row;

            mutate({id, data: {type, description}})

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
