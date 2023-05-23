import React, {useState} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Alert, FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import Image from "next/image";
import avatarImg from "@/assets/profile.svg";
import {profileSchema} from "@/validations/auth.validation";
import {IReqProfile, IUser} from "@/types/user.interface";
import {useActions} from "@/hooks/useActions";
import {useAuth} from "@/hooks/useAuth";
import {AuthService} from "@/services/auth/auth.service";
import {useRouter} from "next/router";
import LanguageIcon from '@mui/icons-material/Language';
import {useTranslate} from "@/contexts/TranslateContext";


interface SettingsProps {

}

const Settings: React.FC<SettingsProps> = () => {
    const t = useTranslate();

    const {locale, push} = useRouter()

    const {user} = useAuth()
    const {setProfile} = useActions()

    const [isDirty, setIsDirty] = useState(false);
    const [isChangesSuccess, setIsChangesSuccess] = useState(false);
    const [selectedLang, setSelectedLang] = useState(locale);


    const updateProfile = useMutation(AuthService.updateProfile, {
        onSuccess: () => {
            setIsChangesSuccess(true)
        },
        onError: (error: any | AxiosError) => error
    });

    const {register, handleSubmit, formState: {errors}} = useForm<IReqProfile>({
        resolver: yupResolver(profileSchema()),
    });


    const onSubmit: SubmitHandler<IReqProfile> = async formData => {
        const updatedProfile = {...user, ...formData} as IUser
        setProfile(updatedProfile)
        updateProfile.mutate(updatedProfile)
        setIsDirty(false)
    };


    const handleTextFieldChange = () => {
        setIsDirty(true)
        setIsChangesSuccess(false)
    }


    const handleLangChange = (e: SelectChangeEvent<string>) => {
        setSelectedLang(e.target.value)
        push(`/settings`, undefined, {locale: e.target.value})
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box
                sx={{
                    borderRight: "2px solid #E0E0E0",
                    flex: "1 1 0",
                    padding: 2
                }}
            >
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}

                    >
                        <Typography component="h1" variant="h5">
                            {t('settings.profile')}
                        </Typography>
                        <Image src={avatarImg} alt={'avatar img'} width={200}/>
                        <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                defaultValue={user?.firstName}
                                id="firstName"
                                label="firstName"
                                autoComplete="firstName"
                                autoFocus
                                inputProps={{onChange: handleTextFieldChange}}
                                {...register("firstName", {required: "This field is required"})}
                                error={Boolean(errors.firstName)}
                                helperText={errors.firstName ? errors.firstName.message : " "}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                defaultValue={user?.lastName}
                                id="lastName"
                                label="lastName"
                                autoComplete="lastName"
                                autoFocus
                                inputProps={{onChange: handleTextFieldChange}}
                                {...register("lastName", {required: "This field is required"})}
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName ? errors.lastName.message : " "}
                            />
                            {isChangesSuccess &&
                                <Alert severity="success">Successfully</Alert>}
                            {

                            }
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2, color: 'white'}}
                                disabled={!isDirty}
                            >
                                {t('settings.save_btn')}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Box sx={{flex: "1 1 0", padding: 2}}>
                <Typography component="h1" variant="h5" align='center'>
                    {t('settings.title')}
                </Typography>
                <Box sx={{display: "flex", alignItems: 'center', gap: '20px'}}>
                    <LanguageIcon style={{fontSize: '32px'}}/>
                    <FormControl>
                        <Select
                            sx={{'& legend': {display: 'none'}, '& fieldset': {top: 0},}}
                            id="lang"
                            value={selectedLang}
                            label="lang"
                            onChange={handleLangChange}
                        >
                            <MenuItem value={'en'}>English</MenuItem>
                            <MenuItem value={'ua'}>Ukrainian</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

            </Box>
        </Box>
    );
};

export default Settings;
