import React from "react";
import {PieChart, Pie, Sector, Cell, Tooltip} from "recharts";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "Red"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props: any) => {
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        percent,
        count,
        type
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 10;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <>
            <g>
                <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={fill}
                    fill="none"
                />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    textAnchor={textAnchor}
                    fill="#333"
                    dominantBaseline="central"
                >
                    {`${count}`}
                </text>
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    textAnchor={textAnchor}
                    fontSize={10}
                    dy={18}
                    fill="#999"
                >
                    {`(${(percent * 100).toFixed(1)}%)`}
                </text>

                <text
                    x={x}
                    y={y}
                    fontSize={12}
                    fill="white"
                    textAnchor={"middle"}
                    dominantBaseline="central"
                >
                    {type}
                </text>

                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#333"}>
                    {type === " " ? "No types" : "Waste types"}
                </text>
            </g>
        </>
    );
};

interface ShipPieChartProps {
    types:  {type: string, count: number}[]
}

export default function ShipPieChart({types}: ShipPieChartProps) {
    if(!types.length) types = [{type: " ", count: 1}];

    return (
        <PieChart width={600} height={400} id={'pie-chart'}>
            <Pie
                data={types}
                cx={250}
                cy={180}
                innerRadius={55}
                outerRadius={140}
                dataKey="count"
                label={renderCustomizedLabel}
                labelLine
            >
                {types.map((entry, index) => (
                    <Cell key={`cell-${entry.type}`} fill={COLORS[index % COLORS.length]}/>
                ))}
            </Pie>
            <Tooltip/>
        </PieChart>
    );
}
