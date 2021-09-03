import { Card } from "antd";
import React from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const WeeklyChart = () => {
  // const  series= [
  //     {
  //       name: "Income",
  //       data: [28, 29, 33, 36, 32, 32, 33]
  //     },
  //     {
  //       name: "Expense",
  //       data: [12, 11, 14, 18, 17, 13, 13]
  //     }
  //   ]

  // const options = {
  //     chart: {
  //         height: 350,

  //         dropShadow: {
  //           enabled: true,
  //           color: '#000',
  //           top: 18,
  //           left: 7,
  //           blur: 10,
  //           opacity: 0.2
  //         },
  //         toolbar: {
  //           show: false
  //         }
  //       },
  //       colors: ['#77B6EA', '#545454'],
  //     dataLabels: {
  //       enabled: true,
  //     },
  //     stroke: {
  //       curve: 'smooth'
  //     },
  //     title: {
  //       text: 'Average High & Low Temperature',
  //       align: 'left'
  //     },
  //     grid: {
  //         borderColor: '#e7e7e7',
  //         row: {
  //           colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
  //           opacity: 0.5
  //         },
  //       },
  //       markers: {
  //         size: 1
  //       },
  //       xaxis: {
  //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  //         title: {
  //           text: 'Month'
  //         }
  //       },
  //       yaxis: {
  //         title: {
  //           text: 'Temperature'
  //         },
  //         min: 5,
  //         max: 40
  //       },
  //       legend: {
  //         position: 'top',
  //         horizontalAlign: 'right',
  //         floating: true,
  //         offsetY: -25,
  //         offsetX: -5
  //       }
  // }

  const [data, setData] = useState({
    series: [
      {
        name: "Expense",
        data: [11, 6, 13, 21, 19, 12, 18],
      },
      {
        name: "Income",
        data: [10, 15, 7, 12, 20, 18, 10],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      colors: ["rgb(255, 109, 109)", "rgb(41, 230, 82)"],

      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7],
      },
    },
  });

  return (
    <Card style={{ width: "949px", marginTop: "3rem", borderRadius: "10px" }}>
      <h4 style={{ marginLeft: "2.3rem" }}>Weekly Expense & Income</h4>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="area"
        width="900"
        height="350"
      />
    </Card>
  );
};

export default WeeklyChart;
