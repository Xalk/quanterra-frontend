import React from 'react';
import BasicModal from "@/components/ui/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Alert, MenuItem} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IReqStorageTank} from "@/types/storage-tank.interface";
import {IWaste} from "@/types/waste.interface";
import {CreateStorageTankSchema} from "@/validations/storage-tank.validation";
import {StorageTankService} from "@/services/storage-tank/storage-tank.service";
import {useTranslate} from "@/contexts/TranslateContext";


const units = [
    'kg',
    'l',
];


interface CreateStorageTankProps {
    createOpen: boolean,
    handleClose: () => void
    shipId?: string | string[],
    wastes?: IWaste[]
}

const CreateStorageTank: React.FC<CreateStorageTankProps> = ({
                                                                 createOpen,
                                                                 handleClose,
                                                                 shipId,
                                                                 wastes
                                                             }) => {
    const t = useTranslate();

    const queryClient = useQueryClient();
    const {error, isError, mutate} = useMutation(StorageTankService.create, {
        onSuccess: () => {
            queryClient.invalidateQueries(['get ship']);
            handleClose()
        },
        onError: (error: any | AxiosError) => error
    });

    const {register, handleSubmit, formState: {errors}} = useForm<IReqStorageTank>({
        resolver: yupResolver(CreateStorageTankSchema()),
    });


    const onSubmit: SubmitHandler<IReqStorageTank> = async formData => {

        const tank: IReqStorageTank = {
            ...formData,
            wasteId: Number(formData.wasteId),
            occupancyPercentage: 0,
            shipId: Number(shipId),
        }
        mutate(tank)

    };

    return (
        <BasicModal createOpen={createOpen} handleClose={handleClose}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}

                >
                    <Typography component="h1" variant="h6">
                        {t('storage_tanks.create')}
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            select
                            required
                            fullWidth
                            defaultValue=''
                            id="unit"
                            label={t('storage_tanks.unit')}
                            {...register("unit", {required: "This field is required"})}
                            error={Boolean(errors.unit)}
                            helperText={errors.unit ? errors.unit.message : " "}
                        >
                            {units.map((unit, index) => (
                                <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            InputProps={{
                                inputProps: {
                                    min: 1800
                                }
                            }}
                            id="capacity"
                            label={t('storage_tanks.capacity')}
                            autoComplete="capacity"
                            autoFocus
                            {...register("capacity", {required: "This field is required"})}
                            error={Boolean(errors.capacity)}
                            helperText={errors.capacity ? errors.capacity.message : " "}
                        />

                        <TextField
                            select
                            required
                            fullWidth
                            defaultValue=''
                            id="wasteId"
                            label={t('storage_tanks.waste_type')}
                            {...register("wasteId", {required: "This field is required"})}
                            error={Boolean(errors.wasteId)}
                            helperText={errors.wasteId ? errors.wasteId.message : " "}
                        >
                            {wastes?.map(waste => (
                                <MenuItem key={waste.id} value={waste.id}>{waste.type}</MenuItem>
                            ))}
                        </TextField>

                        {error && <Alert severity="error">{error.response?.data.message}</Alert>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2, color: 'white'}}
                        >
                            {t('submit_btn')}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </BasicModal>

    )
        ;
};

export default CreateStorageTank;
