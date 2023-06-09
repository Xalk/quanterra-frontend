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
import {IReqShip, IShip} from "@/types/ship.interface";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ShipService} from "@/services/ship/ship.service";
import {AxiosError} from "axios";
import {createShipSchema} from "@/validations/ship.validation";
import {useTranslate} from "@/contexts/TranslateContext";


const shipTypes = [
    'Bulk Carrier',
    'Cargo',
    'Container Ship',
    'Cruise Ship',
    'Fishing Vessel',
    'LNG Carrier',
    'LPG Carrier',
    'Oil Tanker',
    'Passenger Ship',
    'Ro-Ro Ship',
    'Tugboat',
    'Yacht',
];


interface CreateShipProps {
    createOpen: boolean,
    handleClose: () => void
    ship?: IShip
}

const EditShip: React.FC<CreateShipProps> = ({createOpen, handleClose, ship}) => {
    const t = useTranslate();

    const queryClient = useQueryClient();
    const {error, isError, mutate} = useMutation(ShipService.update, {
        onSuccess: () => {
            queryClient.invalidateQueries(['get ship']);
            queryClient.invalidateQueries(['ships']);
            handleClose()
        },
        onError: (error: any | AxiosError) => error
    });

    const {register, handleSubmit, formState: {errors}} = useForm<IReqShip>({
        resolver: yupResolver(createShipSchema()),
    });


    const onSubmit: SubmitHandler<IReqShip> = async formData => {

        mutate({id: `${ship?.id}`, data: formData})

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
                        {t('ship.edit')}
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="shipName"
                            label={t('ships.name')}
                            autoComplete="name"
                            defaultValue={ship?.shipName}
                            autoFocus
                            {...register("shipName", {required: "This field is required"})}
                            error={Boolean(errors.shipName)}
                            helperText={errors.shipName ? errors.shipName.message : " "}
                        />
                        <TextField
                            select
                            required
                            fullWidth
                            defaultValue={ship?.shipType}
                            id="shipType"
                            label={t('ships.type')}
                            {...register("shipType", {required: "This field is required"})}
                            error={Boolean(errors.shipType)}
                            helperText={errors.shipType ? errors.shipType.message : " "}
                        >
                            {shipTypes.map((type, index) => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            defaultValue={ship?.buildYear}
                            id="buildYear"
                            label={t('ships.build_year')}
                            autoComplete="year"
                            autoFocus
                            {...register("buildYear", {required: "This field is required"})}
                            error={Boolean(errors.buildYear)}
                            helperText={errors.buildYear ? errors.buildYear.message : " "}
                        />
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

export default EditShip;
