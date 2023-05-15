import React from "react";
import Dashboard from "@/components/layout/Dashboard";
import {useRouter} from "next/router";
import {NextPage} from "next";

const StorageTank: NextPage = () => {
    const router = useRouter()
    return (
        <Dashboard>
            <>
                Storage Tank: {router.query.id}
            </>
        </Dashboard>
    );
};

export default StorageTank;