"use client";

import { Property } from "@/types/property";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export const DoughnutChart = ({ 
    property,
} : { 
    property: Property, 
}) => {

    Chart.register(ArcElement, Tooltip, Legend);

    return (
        <div className="w-96 h-96">
            <Doughnut data={property.value["data"]} options={property.value["options"]}/>
        </div>
  );
};