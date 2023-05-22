import React, {useEffect} from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import {IAmountByMonth} from "@/types/collection-record.interface";
import {toPng} from "html-to-image";


export interface AmountBarChartProps {
    amounts?: IAmountByMonth[],
    setBarChartUrl: (url: string) => void
}

export default function AmountBarChart({amounts, setBarChartUrl}: AmountBarChartProps) {

    useEffect(() => {
        const generateChartUrl = async () => {
            const el = document.querySelector('.bar-chart');
            if (el) {
                try {
                    const url = await toPng(el as HTMLElement);
                    setBarChartUrl(url);
                } catch (error) {
                    console.error('Error generating chart URL:', error);
                }
            }

        };

        generateChartUrl();
    }, []);


    return (
        <BarChart
            className='bar-chart'
            width={500}
            height={300}
            data={amounts}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="kg" fill="#8884d8"  isAnimationActive={false}/>
            <Bar dataKey="liters" fill="#82ca9d"  isAnimationActive={false}/>
        </BarChart>
    );
}
