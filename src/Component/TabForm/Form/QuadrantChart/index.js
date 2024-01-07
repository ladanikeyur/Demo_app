import React from "react";
import { Scatter } from "react-chartjs-2";

const QuadrantChart = ({ dataString }) => {
  console.log(dataString);
  try {
    const parsedData = JSON.parse(dataString);

    // Create datasets from competitors
    const chartData = {
      datasets: parsedData.competitors.map((competitor, index) => ({
        label: competitor.name,
        data: [{ x: competitor.coordinates[0], y: competitor.coordinates[1] }],
        backgroundColor: `rgba(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        }, 1)`,
      })),
    };

    const chartOptions = {
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: parsedData.xAxis,
            },
            ticks: {
              min: 0,
              max: 1,
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: parsedData.yAxis,
            },
            ticks: {
              min: 0,
              max: 1,
            },
          },
        ],
      },
    };

    return (
      <div>
        <h2>{parsedData?.title}</h2>
        <Scatter data={chartData} options={chartOptions} />
        <p>{`x-axis: ${parsedData?.xAxis}`}</p>
        <p>{`y-axis: ${parsedData?.yAxis}`}</p>
        {parsedData.quadrants.map((quadrant, index) => (
          <p key={index}>{`Quadrant-${index + 1}: ${quadrant}`}</p>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return <div>Error parsing JSON</div>;
  }
};

export default QuadrantChart;
