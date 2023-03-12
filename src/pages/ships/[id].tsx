import React from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import PersonalTable from "@/components/PersonalTable";
import ShipBarChart from "@/components/BarChart";

import dynamic from "next/dynamic";

const ShipPieChartWithoutSSR = dynamic(
    import("@/components/PieChart"),
    {ssr: false}
);

import s from '@/styles/ships.module.scss'

interface ShipProps {

}


const Ship: NextPage<ShipProps> = () => {
    const router = useRouter()


    return (
        <Box>
            ShID: {router.query.id}

            <Box className={s.charts}>
                <ShipBarChart/>

                <ShipPieChartWithoutSSR/>
            </Box>

            <PersonalTable/>


        </Box>
    );
};

export default Ship;