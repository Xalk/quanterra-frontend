import React, {useEffect} from 'react';
import BasicModal from "@/components/ui/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Alert, FormHelperText, MenuItem} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IReqStorageTank, IStorageTank} from "@/types/storage-tank.interface";
import {CreateStorageTankSchema} from "@/validations/storage-tank.validation";
import {StorageTankService} from "@/services/storage-tank/storage-tank.service";
import {WasteService} from "@/services/waste/waste.service";


const units = [
    'kg',
    'l',
];


interface CreateStorageTankProps {
    createOpen: boolean,
    handleClose: () => void
    storageTank?: IStorageTank
}

const EditStorageTank: React.FC<CreateStorageTankProps> = ({
                                                                 createOpen,
                                                                 handleClose,
                                                                 storageTank
                                                             }) => {

    const queryClient = useQueryClient();
    const {error, isError, mutate} = useMutation(StorageTankService.update, {
        onSuccess: () => {
            queryClient.invalidateQueries(['get tank']);
            handleClose()
        },
        onError: (error: any | AxiosError) => error
    });

    const wasteRes = useQuery(
        ['wastes'],
        () => WasteService.getAll(),
        {
            select: ({data}) => data,
        }
    )

    const {reset,setValue, register, handleSubmit, formState: {errors}} = useForm<IReqStorageTank>({
        resolver: yupResolver(CreateStorageTankSchema),
    });



    const onSubmit: SubmitHandler<IReqStorageTank> = async formData => {

        const tank: IReqStorageTank = {
            ...formData,
            wasteId: Number(formData.wasteId),
            occupancyPercentage: 0,
            shipId: Number(storageTank?.ship.id),
        }
        mutate({id: `${storageTank?.id}`, data: tank})

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
                        Edit storage tank
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            select
                            required
                            fullWidth
                            defaultValue={storageTank?.unit}
                            id="unit"
                            label="Unit"
                            {...register("unit", {required: "This field is required"})}
                            error={Boolean(errors.unit)}
                            helperText={errors.unit ? errors.unit.message : " "}
                        >
                            {units.map((unit, index) => (
                                <MenuItem key={index} value={unit}>{unit}</MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            defaultValue={storageTank?.capacity}
                            InputProps={{
                                inputProps: {
                                    min: 1800
                                }
                            }}
                            id="capacity"
                            label="Capacity"
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
                            defaultValue={storageTank?.waste.id}
                            id="wasteId"
                            label="Waste"
                            {...register("wasteId", {required: "This field is required"})}
                            error={Boolean(errors.wasteId)}
                            helperText={errors.wasteId ? errors.wasteId.message : " "}
                        >
                            {wasteRes.data?.map(waste => (
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
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </BasicModal>

    )
        ;
};

export default EditStorageTank;
