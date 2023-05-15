import React from 'react';
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
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ShipService} from "@/services/ship/ship.service";
import {AxiosError} from "axios";
import {Role} from "@/enums/role.enum";
import {IReqCrew} from "@/types/crew-member.interface";
import {CreateCrewSchema} from "@/validations/crew-member.validation";


const roles = [
    Role.CREW_MEMBER,
    Role.OPERATOR
];


interface CreateShipProps {
    createOpen: boolean,
    handleClose: () => void
    shipId?: string | string[]
}

const CreateCrewMember: React.FC<CreateShipProps> = ({createOpen, handleClose, shipId}) => {

    const queryClient = useQueryClient();
    const {error, isError, mutate} = useMutation(ShipService.assign, {
        onSuccess: () => {
            queryClient.invalidateQueries(['get ship']);
            handleClose()
        },
        onError: (error: any | AxiosError) => error
    });

    const {register, handleSubmit, formState: {errors}} = useForm<IReqCrew>({
        resolver: yupResolver(CreateCrewSchema),
    });


    const onSubmit: SubmitHandler<IReqCrew> = async formData => {

        mutate({id: `${shipId}`, data: formData})

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
                        Create and assign new crew member to this ship
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First name"
                            autoComplete="name"
                            autoFocus
                            {...register("firstName", {required: "This field is required"})}
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName ? errors.firstName.message : " "}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last name"
                            autoComplete="last name"
                            autoFocus
                            {...register("lastName", {required: "This field is required"})}
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName ? errors.lastName.message : " "}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            autoComplete="email"
                            autoFocus
                            {...register("email", {required: "This field is required"})}
                            error={Boolean(errors.email)}
                            helperText={errors.email ? errors.email.message : " "}
                        />
                        <TextField
                            select
                            required
                            fullWidth
                            defaultValue=''
                            id="role"
                            label="Role"
                            {...register("role", {required: "This field is required"})}
                            error={Boolean(errors.role)}
                            helperText={errors.role ? errors.role.message : " "}
                        >
                            {roles.map((role, index) => (
                                <MenuItem key={index} value={role}>{role}</MenuItem>
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

export default CreateCrewMember;