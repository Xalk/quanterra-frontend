import React from "react";
import Dashboard from "@/components/layout/Dashboard";
import {NextPage} from "next";
import CrewMembers from "@/components/screens/crew-members";

const CrewMembersPage: NextPage = () => {
    return (
        <Dashboard>
            <CrewMembers/>
        </Dashboard>
    );
};

export default CrewMembersPage;
