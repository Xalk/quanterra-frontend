// import "./styles.css";
import React from "react";
import {PieChart, Pie, Sector, Cell, Tooltip} from "recharts";

const data = [
    {name: "GroupAGroup", value: 6700, key: "111"},
    {name: "Group B", value: 4020, key: "111"},
    {name: "Group C", value: 3200, key: "111"},
    {name: "Group D", value: 1780, key: "111"},
    {name: "GroupEGroup", value: 910, key: "111"}
];
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
        value,
        name
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
                    {`¥${value}`}
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
                    {name}
                </text>

                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#333"}>
                    {"¥1,201,980"}
                </text>
                <text
                    x={cx}
                    y={cy + 20}
                    textAnchor="middle"
                    fontSize={11}
                    fill={"#999"}
                >
                    {"(+100)"}
                </text>
            </g>
        </>
    );
};

export default function ShipPieChart() {
    return (
        <PieChart width={600} height={400}>
            <Pie
                data={data}
                cx={250}
                cy={180}
                innerRadius={55}
                outerRadius={140}
                dataKey="value"
                label={renderCustomizedLabel}
                //labelLine={false}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                ))}
            </Pie>
            <Tooltip/>
        </PieChart>
    );
}
