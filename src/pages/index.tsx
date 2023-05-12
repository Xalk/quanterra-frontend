import React from 'react';
import Content from "@/components/Content";
import Dashboard from "@/components/layout/Dashboard";
import {Role} from "@/enums/role.enum";


const Home = () => {
    return (
        <Dashboard>
            <Content/>
        </Dashboard>
    );
};

Home.roles = [Role.ADMIN, Role.OPERATOR];

export default Home