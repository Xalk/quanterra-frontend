import React from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import PersonalTable from "@/components/screens/ships/PersonalTable";
import ShipBarChart from "@/components/charts/BarChart";

import dynamic from "next/dynamic";

const ShipPieChartWithoutSSR = dynamic(
    import("@/components/charts/PieChart"),
    {ssr: false}
);

import s from '@/components/screens/ships/ships.module.scss'
import Dashboard from "@/components/layout/Dashboard";

interface ShipProps {

}


const Ship: NextPage<ShipProps> = () => {
    const router = useRouter()


    return (
        <Dashboard>
            <Box>
                ShID: {router.query.id}
                <Box className={s.charts}>
                    <ShipBarChart/>

                    <ShipPieChartWithoutSSR/>
                </Box>
                <PersonalTable/>
            </Box>
        </Dashboard>
    );
};

export default Ship;