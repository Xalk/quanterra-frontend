import { useEffect, useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    CartesianGrid
} from 'recharts';


const data = [
    {
        month: 'March',
        totalCollectionRecords: 21,
    },
    {
        month: 'April',
        totalCollectionRecords: 12,
    },
    {
        month: 'May',
        totalCollectionRecords: 8,
    },
    {
        month: 'June',
        totalCollectionRecords: 45,
    },
    {
        month: 'July',
        totalCollectionRecords: 34,
    },
    {
        month: 'August',
        totalCollectionRecords: 29,
    },
];

export default function AreaTreatedWaste() {




    return (
        <div style={{ width: '100%', height: 300, minWidth: 250 }}>
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
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="totalCollectionRecords" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}