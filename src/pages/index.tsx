import React from 'react';
import {NextPage} from "next";
import Content from "@/components/Content";
import Dashboard from "@/components/layout/Dashboard";


const Home = () => {
    return (
        <Dashboard>
            <Content/>
        </Dashboard>
    );
};

Home.isOnlyUser = true

export default Home