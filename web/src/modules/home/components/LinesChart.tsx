import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const LinesChart = () => {
  const canvaRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 40 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];

    const myChart = new Chart(canvaRef.current!, {
      type: "line",
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Total ventas",
            data: data.map((row) => row.count),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              // Número máximo de ticks en el eje Y
              callback: function (value) {
                const num = value as number;
                return num.toFixed(2) + " C$"; // Personaliza el formato de los ticks
              },
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Ventas por periodo",
          },
        },
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 0.2,
            to: 0,
            loop: true,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);
  return (
    <div className="border rounded-lg border-[#28A745] p-2">
      <canvas ref={canvaRef} width="100%" height="400px"></canvas>
    </div>
  );
};
