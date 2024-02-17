"use client";

import { Box, Center, Text } from "@chakra-ui/react";

import "chart.js/auto";

import { Bar } from "react-chartjs-2";


const Result = ({surveyResults}) => {
    const scoresData = {
        labels: [""],
        datasets: [
          {
            label: "واقع بین",
            data: [surveyResults.node.RScore],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderRadius: 5,
          },
          {
            label: "تحقیقی",
            data: [surveyResults.node.IScore],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderRadius: 5,
          },
          {
            label: "هنری",
            data: [surveyResults.node.AScore],
            backgroundColor: "rgba(255, 206, 86, 0.6)",
            borderRadius: 5,
          },
          {
            label: "کارآفرینی",
            data: [surveyResults.node.EScore],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderRadius: 5,
          },
          {
            label: "اجتماعی",
            data: [surveyResults.node.SScore],
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderRadius: 5,
          },
          {
            label: "مرسوم",
            data: [surveyResults.node.CScore],
            backgroundColor: "rgba(255, 159, 64, 0.6)",
            borderRadius: 5,
            
          },
        ],
      };
      let delayed;

  const chartOptions = {
    animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
      },
      responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        
      },
    },

    plugins: {
        legend: {
          labels: {
            font: {
              family: "Alibaba, sans-serif",
              size: 12,
            },
          },
        },
        tooltip: {
          title: {
            font: {
              family: "Alibaba, sans-serif",
              size: 14,
            },
          },
          body: {
            font: {
              family: "Alibaba, sans-serif",
              size: 12,
            },
          },
        },
    }
  };

  return (
    <Center>
      <Box maxW="600px" p="10" borderWidth="1px" borderRadius="md" >
        <Text fontSize="xl" fontWeight="bold" mb="4">
          نمودار نتایج تست
        </Text>
        <Bar data={scoresData} options={chartOptions} />
      </Box>
    </Center>
  );
};

export default Result;