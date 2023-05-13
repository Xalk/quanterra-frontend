import React from 'react';
import Main from "@/components/screens/main";
import Dashboard from "@/components/layout/Dashboard";
import {Role} from "@/enums/role.enum";
import {NextPageAuth} from "@/providers/auth-pages.type";


const Home: NextPageAuth = () => {
    return (
        <Dashboard>
            <Main/>
        </Dashboard>
    );
};

Home.roles = [Role.ADMIN, Role.OPERATOR];

export default Home