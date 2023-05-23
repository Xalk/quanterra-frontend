import {Box, CircularProgress, Fab} from '@mui/material';
import {FC, useEffect, useState} from 'react';
import {Check} from '@mui/icons-material';
import {green} from '@mui/material/colors';
import {GridRenderCellParams} from "@mui/x-data-grid";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AxiosError} from "axios";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import {IWaste} from "@/types/waste.interface";
import {WasteService} from "@/services/waste/waste.service";
import {useTranslate} from "@/contexts/TranslateContext";

interface DeleteWasteActionProps {
    params: GridRenderCellParams<IWaste>,
    deletedRow: IWaste | null,
    setDeletedRow: (id: IWaste | null) => void
}

const DeleteWasteAction: FC<DeleteWasteActionProps> = ({params, deletedRow, setDeletedRow}) => {
    const t = useTranslate()
    const [success, setSuccess] = useState(false);

        const queryClient = useQueryClient();
        const {mutate, isLoading} = useMutation(WasteService.delete, {
            onSuccess: () => {
                queryClient.invalidateQueries(['wastes']);
                setSuccess(true);
                setDeletedRow(null);
            },
            onError: (error: any | AxiosError) => error,
        });


        const handleSubmit = async () => {

            confirm('Are you sure you want to delete this waste?') &&
            mutate(`${deletedRow?.id}`)


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

export default DeleteWasteAction;
