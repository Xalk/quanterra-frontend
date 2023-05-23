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
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ShipService} from "@/services/ship/ship.service";
import {AxiosError} from "axios";
import {Role} from "@/enums/role.enum";
import {IReqCrew} from "@/types/crew-member.interface";
import {CreateCrewSchema} from "@/validations/crew-member.validation";
import SelectExistingCrew from "@/components/ui/SelectExistingCrew";
import {CrewService} from "@/services/crew-member/crew-member.service";
import {useTranslate} from "@/contexts/TranslateContext";


const roles = [
    Role.CREW_MEMBER,
    Role.OPERATOR
];


interface CreateShipProps {
    createOpen: boolean,
    handleClose: () => void
    shipId?: string | string[]
    isShipPage?: boolean
}

const CreateCrewMember: React.FC<CreateShipProps> = ({
                                                         createOpen,
                                                         handleClose,
                                                         shipId,
                                                         isShipPage = true
                                                     }) => {
    const t = useTranslate();

    const [isCreateForm, setIsCreateForm] = React.useState(true)
    const [selectedCrewMemberId, setSelectedCrewMemberId] = React.useState<string | number>('')

    const queryClient = useQueryClient();
    const crewAssign = useMutation(ShipService.assign, {
        onSuccess: () => {
            queryClient.invalidateQueries(['get ship']);
            queryClient.invalidateQueries(['all crew-members']);
            handleClose()
            setIsCreateForm(true)
        },
        onError: (error: any | AxiosError) => error

    });

    const resCrewMembers = useQuery(
        ['crew-members'],
        () => CrewService.getAll(),
        {
            select: ({data}) => data,
        }
    )

    const crewUpdate = useMutation(CrewService.update, {
        onSuccess: () => {
            queryClient.invalidateQueries(['get ship']);
            queryClient.invalidateQueries(['crew-members']);
            handleClose()
            setIsCreateForm(true)
            setSelectedCrewMemberId('')
        },
        onError: (error: any | AxiosError) => error

    });


    const handleToggleForm = () => {
        setIsCreateForm(prev => !prev)
    }


    const {register, handleSubmit, formState: {errors}} = useForm<IReqCrew>({
        resolver: yupResolver(CreateCrewSchema()),
    });

    const onSubmit: SubmitHandler<IReqCrew> = async formData => {
        const ship = isShipPage ? `${shipId}` : `${-1}`
        crewAssign.mutate({id: ship, data: formData})
    }

    const handleSelectSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (selectedCrewMemberId) {
            crewUpdate.mutate({id: selectedCrewMemberId, data: {shipId: Number(shipId)}})
        }
    }

    const getFormTitle = () => {
        const createTitle = isShipPage ? t('crew_members.create_assign') : t('crew_members.create')
        const selectTitle = t('crew_members.select')
        return isCreateForm ? createTitle : selectTitle
    }

    return (
        <BasicModal createOpen={createOpen} handleClose={handleClose}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                    }}

                >
                    <Typography component="h1" variant="h5" mb={2}>
                        {getFormTitle()}
                    </Typography>
                    {
                        isCreateForm ? (
                            <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label={t('crew_members.first_name')}
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
                                    label={t('crew_members.last_name')}
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
                                    label={t('crew_members.email')}
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
                                    label={t('crew_members.role')}
                                    {...register("role", {required: "This field is required"})}
                                    error={Boolean(errors.role)}
                                    helperText={errors.role ? errors.role.message : " "}
                                >
                                    {roles.map((role, index) => (
                                        <MenuItem key={role} value={role}>{role}</MenuItem>
                                    ))}
                                </TextField>
                                {crewAssign.error &&
                                    <Alert severity="error">{crewAssign.error.response?.data.message}</Alert>}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2, color: 'white'}}
                                >
                                    {t('submit_btn')}
                                </Button>
                            </Box>
                        ) : (
                            <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSelectSubmit}>
                                <SelectExistingCrew crewMembers={resCrewMembers.data?.filter(c => c.ship === null)}
                                                    selectedCrewMemberId={selectedCrewMemberId}
                                                    setSelectedCrewMemberId={setSelectedCrewMemberId}/>
                                {crewUpdate.error &&
                                    <Alert severity="error">{crewUpdate.error.response?.data.message}</Alert>}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2, color: 'white'}}
                                >
                                    {t('submit_btn')}
                                </Button>
                            </Box>
                        )
                    }

                </Box>


                {isShipPage && <Typography
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: isCreateForm ? '10px' : 'auto',
                        left: isCreateForm ? 'auto' : '10px',
                        textDecoration: 'underline',
                        color: 'blue',
                        cursor: 'pointer'
                    }}
                >
                    <small
                        onClick={handleToggleForm}>{isCreateForm ? t('crew_members.select_link') : t('crew_members.create_link')}</small>
                </Typography>
                }
            </Container>
        </BasicModal>

    )
        ;
};

export default CreateCrewMember;
