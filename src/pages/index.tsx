import React from 'react';
import {NextPage} from "next";
import Content from "@/components/Content";
import Dashboard from "@/components/layout/Dashboard";


const Home: NextPage = () => {
    return (
        <Dashboard>
            <Content/>
        </Dashboard>
    );
};

export default Home