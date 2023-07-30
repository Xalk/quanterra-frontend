import React from "react";
import Dashboard from "@/components/layout/Dashboard";
import Logs from "@/components/screens/logs";
import {NextPageAuth} from "@/providers/auth-pages.type";
import {Role} from "@/enums/role.enum";

const LogsPage: NextPageAuth = () => {
    return (
        <Dashboard>
            <Logs/>
        </Dashboard>
    );
};

LogsPage.roles = [Role.ADMIN];

export default LogsPage;
