import React from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { fetchRatingInChapter } from "../data/useLevel";
import { fetchProgressInLevel } from "../data/useLevel";
import { useEffect } from "react";
import { useState } from "react";
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    CategoryScale,
    Legend,
} from 'chart.js';

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    CategoryScale,
    Legend
);

export const ChartBar = ({ setError, setIsLoading }) => {
    const [progresses, setProgresses] = useState([]);

    useEffect(() => {
        const getRating = async () => {
            try {
                const data = await fetchRatingInChapter();
                setProgresses(data.progresses || []);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        getRating();
    }, []);

    const data = {
        labels: progresses.map(p => `Rozdział ${p.chapterId}`),
        datasets: [
            {
                label: 'Progres',
                data: progresses.map(p => p.rating),
                backgroundColor: ['#985F99', '#9684A1', '#AAACB0', '#B6C9BB', '#BFEDC1'],
                borderRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                    font: {
                        size: 16,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const item = progresses[context.dataIndex];
                        return `Rozdział ${item.chapterId}: ${item.rating} punktów`;
                    },
                },
                backgroundColor: '#2e2e2e',
                titleColor: '#fff',
                bodyColor: '#fff',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white',
                },
            },
            y: {
                min: 0,
                max: 100,
                title: {
                    display: true,
                    text: 'Progres',
                    color: 'white',
                    font: {
                        size: 18,
                    },
                },
                ticks: {
                    color: 'white',
                },
            },
        },
    };

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '700px',
                margin: '0 auto',
            }}
        >
            {progresses.length > 0 && <Bar data={data} options={options} />}
        </div>
    );

}


export const ChartLine = ({ setError, setIsLoading }) => {

    const [progressData, setProgressData] = useState([]);

    useEffect(() => {
        const getProgress = async () => {
            try {
                const data = await fetchProgressInLevel();
                setProgressData(data.progressInLevel || []);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        getProgress();
    }, []);

    const chartData = {
        labels: progressData.map((d) => `${d.levelId}`),
        datasets: [
            {
                label: 'Postęp',
                data: progressData.map((d) => d.progress),
                borderColor: '#9684A1',
                backgroundColor: '#985F99',
                tension: 0.3,
                pointRadius: 6,
                pointHoverRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                    font: {
                        size: 16,
                    }
                },
            },
            tooltip: {
                backgroundColor: '#2e2e2e',
                titleColor: '#fff',
                bodyColor: '#fff',
                callbacks: {
                    label: function (context) {
                        const item = progressData[context.dataIndex];
                        return [
                            `Data: ${new Date(item.date).toLocaleDateString()}`,
                            `Postęp: ${item.progress}`,
                            `Poziomu: ${item.levelId}`,
                        ];
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Poziom',
                    color: 'white',
                    font: {
                        size: 16,
                    }
                },
                ticks: {
                    color: 'white',
                },
            },
            y: {
                min: 0,
                max: 100,
                title: {
                    display: true,
                    text: 'Postęp',
                    color: 'white',
                    font: {
                        size: 16,
                    }
                },
                ticks: {
                    color: 'white',
                },
            },
        },
    };

    return (
        <div style={{
            height: '350px',
            width: '100%',
            maxWidth: '700px',
            margin: '0 auto',
        }}>
            {progressData.length > 0 && <Line data={chartData} options={options} />}
        </div>

    )
}