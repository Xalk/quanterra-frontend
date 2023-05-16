import React from "react";
import Dashboard from "@/components/layout/Dashboard";
import Wastes from "@/components/screens/wastes";
import {NextPage} from "next";

const WastesPage : NextPage = () => {
    return (
        <Dashboard>
            <Wastes/>
        </Dashboard>
    );
};

export default WastesPage;
