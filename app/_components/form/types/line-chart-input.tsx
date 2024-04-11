"use client";

import { Property } from "@/types/property";
import { ArcElement, BarElement, CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";

export const LineChart = ({ 
    property,
} : { 
    property: Property, 
}) => {

    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    return (
        <div className="w-96 h-96">
            <Line data={property.value}/>
        </div>
  );
};