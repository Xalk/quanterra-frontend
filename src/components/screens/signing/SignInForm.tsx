import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from "@/assets/logo.svg";
import {useForm, SubmitHandler} from "react-hook-form";
import {Alert} from "@mui/material";
import Image from "next/image";
import {loginSchema} from "@/validations/auth.validation";
import {yupResolver} from '@hookform/resolvers/yup';
import {IEmailPassword} from "@/types/user.interface";
import {useActions} from "@/hooks/useActions";
import {useTypedSelector} from "@/hooks/useTypedSelector";


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Xalk © '}
            <Link color="inherit" href="https://google.com/">
                Quanterra
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


interface SignInFormProps {
    onOpenSignUp: () => void
}


const SignInForm: React.FC<SignInFormProps> = ({onOpenSignUp}) => {

    const {login} = useActions()
    const {error} = useTypedSelector(state => state.auth)

    const {register, handleSubmit, formState: {errors}} = useForm<IEmailPassword>({
        resolver: yupResolver(loginSchema()),
    });


    const onSubmit: SubmitHandler<IEmailPassword> = async formData => {
       login(formData);
    };


    return (
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
                <Avatar sx={{m: 1, bgcolor: "transparent", width: "60px", height: "60px"}}>
                    <Image src={logo} alt="logo" width={50}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        {...register("email", {required: "This field is required"})}
                        error={Boolean(errors.email)}
                        helperText={errors.email ? errors.email.message : " "}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register("password", {required: "This field is required"})}
                        error={Boolean(errors.password)}
                        helperText={errors.password ? errors.password.message : " "}
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, color: 'white'}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={onOpenSignUp}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Container>
    );
}

export default SignInForm
