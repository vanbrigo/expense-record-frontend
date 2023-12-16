import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2"

export const PieChart=({data})=>{
    ChartJS.register(ArcElement, Tooltip, Legend);
    return(<Pie data={data}/>)
}