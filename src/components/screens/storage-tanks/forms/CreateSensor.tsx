import React from 'react';
import BasicModal from "@/components/ui/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Alert} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {createSensorSchema} from "@/validations/sensor.validation";
import {SensorService} from "@/services/sensor/sensor.service";
import {IReqSensor} from "@/types/sensor.interface";


interface CreateWasteProps {
    createOpen: boolean,
    handleClose: () => void
    storageTankId?: number
}

const CreateSensor: React.FC<CreateWasteProps> = ({createOpen, handleClose, storageTankId}) => {

    const queryClient = useQueryClient();
    const {error, isError, mutate} = useMutation(SensorService.create, {
        onSuccess: () => {
            queryClient.invalidateQueries(['get tank']);
            handleClose()
        },
        onError: (error: any | AxiosError) => error
    });

    const {register, handleSubmit, formState: {errors}} = useForm<IReqSensor>({
        resolver: yupResolver(createSensorSchema),
    });


    const onSubmit: SubmitHandler<IReqSensor> = async formData => {

        mutate({...formData, status: 'completely empty', storageTankId})

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
                    <Typography component="h1" variant="h5">
                        Add sensor
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="name"
                            autoComplete="name"
                            autoFocus
                            {...register("name", {required: "This field is required"})}
                            error={Boolean(errors.name)}
                            helperText={errors.name ? errors.name.message : " "}
                        />
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

export default CreateSensor;
