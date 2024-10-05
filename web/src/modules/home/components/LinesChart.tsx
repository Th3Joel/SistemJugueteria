import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface ILineChart {
  labels: string[];
  data: number[];
}
export const LinesChart: React.FC<ILineChart> = ({ labels, data }) => {
  const canvaRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {


    const myChart = new Chart(canvaRef.current!, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Total ventas",
            data,
            backgroundColor: "#505c6d",
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
            text: "Ventas por mes",
          },
          tooltip: {
            callbacks: {
              title: function (context) {
                const date = context[0].label;
                const partes = date.split('-'); // Dividir la fecha en año y mes
                const ano = parseInt(partes[0]); // Año en número
                const mes = parseInt(partes[1]); // Mes en número

                // Crear un objeto de fecha para obtener el nombre del mes
                const fechaObj = new Date(ano, mes -
                  1
                ); // Restamos 1 al mes ya que los meses en JavaScript se cuentan desde 0 (enero) hasta 11 (diciembre)

                // Obtener el nombre del mes
                const nombreDelMes = fechaObj.toLocaleString('es-ES', {
                  month: 'long'
                });

                const resultado = ano + ' ' + nombreDelMes;
                return resultado; // Formato personalizado del título del tooltip
              },
              label: function (context) {
                return ' C$ ' + context.parsed.y.toFixed(2); // Agrega "C$" al valor del tooltip
              }
            }
          }
        },
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 0.1,
            to: 0,
            loop: true,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);
  return <canvas ref={canvaRef} width="100%" height="400px" />;
};
