"use client";

import { Property } from "@/types/property";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

export const PieChart = ({ 
    property,
} : { 
    property: Property, 
}) => {

    Chart.register(ArcElement, Tooltip, Legend);

    return (
        <div className="w-96 h-96">
            <Pie data={property.value}/>
        </div>
  );
};