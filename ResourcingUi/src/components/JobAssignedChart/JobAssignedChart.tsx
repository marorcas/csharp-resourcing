import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; // Import the Bar chart from Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { JobResponse } from "../../services/job-services";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
}

interface JobAssignedChartProps {
    jobData: JobResponse[];
}

const JobAssignedChart: React.FC<JobAssignedChartProps> = ({ jobData }) => {
    const [chartData, setChartData] = useState<ChartData>({
        labels: ['Assigned', 'Unassigned'],
        datasets: [
            {
                label: 'Job Count',
                data: [0, 0], // Initial data, will be updated with job data
                backgroundColor: ['#4caf50', '#f44336'], // Green for assigned, Red for unassigned
                borderColor: ['#388e3c', '#d32f2f'],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        if (jobData) {
            const assignedCount = jobData.filter(job => job.assigned).length;
            const unassignedCount = jobData.length - assignedCount;

            // Update chart data dynamically
            setChartData({
                labels: ['Assigned', 'Unassigned'],
                datasets: [
                    {
                        label: 'Job Count',
                        data: [assignedCount, unassignedCount],
                        backgroundColor: ['#4caf50', '#f44336'],
                        borderColor: ['#388e3c', '#d32f2f'],
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [jobData]);

    return (
        <div>
            <h3>Job Assignment Chart</h3>
            <Bar data={chartData} />
        </div>
    );
};

export default JobAssignedChart;