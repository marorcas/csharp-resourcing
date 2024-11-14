import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; // Import the Line chart from Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { JobResponse } from "../../services/job-services"; // Adjust the import based on your actual JobResponse interface

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        borderColor: string;
        tension: number;
    }[];
}

interface JobWeeklyChartProps {
    jobData: JobResponse[]; // Assuming jobData is an array of job objects
}

const JobWeeklyChart: React.FC<JobWeeklyChartProps> = ({ jobData }) => {
    const [chartData, setChartData] = useState<ChartData>({
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            {
                label: 'Average Jobs per Day of the Week',
                data: [0, 0, 0, 0, 0, 0, 0], // Initial data (7 values for each day of the week)
                fill: false, // Do not fill the area under the line
                borderColor: 'rgba(75, 192, 192, 1)', // Line color
                tension: 0.4, // Smooth curve
            },
        ],
    });

    useEffect(() => {
        if (jobData) {
            // Initialize an array to count the jobs for each day of the week
            const jobsPerDay = Array(7).fill(0); // [Sunday, Monday, Tuesday, ... Saturday]
            const jobsPerWeek = Array(7).fill(0); // Array to track how many weeks have jobs on each day

            // Loop through the jobs and count them by day of the week
            jobData.forEach(job => {
                if (job.startDate) {
                    const jobStartDate = new Date(job.startDate); // Ensure `startDate` is a valid Date object
                    const dayOfWeek = jobStartDate.getDay(); // Get day of the week (0 = Sunday, 1 = Monday, etc.)
                    jobsPerDay[dayOfWeek]++;
                    jobsPerWeek[dayOfWeek] = 1; // Mark that we have seen jobs on this day of the week
                }
            });

            // Calculate the average number of jobs per day of the week
            const avgJobsPerDay = jobsPerDay.map((totalJobs, idx) => {
                return jobsPerWeek[idx] > 0 ? totalJobs / jobData.length : 0; // Avoid division by 0 if no jobs on a particular day
            });

            // Update the chart data dynamically
            setChartData({
                labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                datasets: [
                    {
                        label: 'Average Jobs per Day of the Week',
                        data: avgJobsPerDay, // Average jobs per day
                        fill: false,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.4,
                    },
                ],
            });
        }
    }, [jobData]);

    return (
        <div>
            <h3>Average Jobs per Day of the Week</h3>
            <Line data={chartData} />
        </div>
    );
};

export default JobWeeklyChart;
