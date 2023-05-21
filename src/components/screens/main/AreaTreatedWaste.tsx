import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    CartesianGrid
} from 'recharts';
import {Typography} from "@mui/material";
import * as React from "react";
import {ITotalTreatedAmount} from "@/types/ship.interface";


interface AreaTreatedWasteProps {
    data?: ITotalTreatedAmount[]
}

export default function AreaTreatedWaste({data}: AreaTreatedWasteProps) {


    return (
        <div style={{width: '100%', height: 400, minWidth: 250}}>
            <Typography variant="h4" mb={2}>Total amount of treated waste</Typography>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type="monotone" dataKey="totalTreatedAmount" stroke="#8884d8" fill="#8884d8"/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
