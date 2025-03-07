import React from "react";
import ReactECharts from "echarts-for-react";

const PieChart = (datas) => {
  const options = {
    title: {
      text: "D'après les données collectées...",
      subtext: "Détails",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 735, name: "Temperature" },
          { value: 580, name: "Lumière" },
          { value: 484, name: "Pollution" },
          { value: 300, name: "Humidité" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px", width: "100%" }} />;
};

export default PieChart;
