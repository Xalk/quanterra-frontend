import {useState} from "react";
import Box from "@mui/material/Box";
import SignInForm from "@/components/screens/signing/SignInForm";
import SignUpForm from "@/components/screens/signing/SignUpForm";
import {useAuthRedirect} from "@/components/screens/signing/useAuthRedirect";


const Signing = () => {
    useAuthRedirect()

    const [formType, setFormType] = useState<"signIn" | "signUp">("signIn");


    const style = {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    return (

        <Box sx={style}>
            {formType === "signIn" && <SignInForm onOpenSignUp={() => setFormType("signUp")}/>}
            {formType === "signUp" && <SignUpForm onOpenSignIn={() => setFormType("signIn")}/>}
        </Box>

    );
};

export default Signing;