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
import {WasteService} from "@/services/waste/waste.service";
import {createWasteSchema} from "@/validations/waste.validation";
import {IReqWaste} from "@/types/waste.interface";
import {useTranslate} from "@/contexts/TranslateContext";


interface CreateWasteProps {
    createOpen: boolean,
    handleClose: () => void
}

const CreateWaste: React.FC<CreateWasteProps> = ({createOpen, handleClose}) => {
    const t = useTranslate();

    const queryClient = useQueryClient();
    const {error, isError, mutate} = useMutation(WasteService.create, {
        onSuccess: () => {
            queryClient.invalidateQueries(['wastes']);
            handleClose()
        },
        onError: (error: any | AxiosError) => error
    });

    const {register, handleSubmit, formState: {errors}} = useForm<IReqWaste>({
        resolver: yupResolver(createWasteSchema()),
    });


    const onSubmit: SubmitHandler<IReqWaste> = async formData => {

        let {type, description} = formData
        mutate(formData)

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
                        {t('wastes.create')}
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="type"
                            label={t('wastes.waste_type')}
                            autoComplete="type"
                            autoFocus
                            {...register("type", {required: "This field is required"})}
                            error={Boolean(errors.type)}
                            helperText={errors.type ? errors.type.message : " "}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={2}
                            id="description"
                            label={t('wastes.description')}
                            autoComplete="description"
                            autoFocus
                            {...register("description", {required: "This field is required"})}
                            error={Boolean(errors.description)}
                            helperText={errors.description ? errors.description.message : " "}
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

export default CreateWaste;
