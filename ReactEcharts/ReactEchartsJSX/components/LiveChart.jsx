//npm install echarts echarts-for-react
//can get real data from an api that returns an array

// src/components/LiveChart.jsx

/*
Use echarts-for-react instead of directly using ECharts:
Handles React rendering lifecycle 
Supports props-based chart updates
Gives you an easy way to integrate ECharts declaratively
Works with JSX/TSX
Built-in support for chart updates, resize, events

*/
import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const LiveChart = () => {
  const [data, setData] = useState([10, 22, 33, 44, 55, 66]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), Math.floor(Math.random() * 100)];
        return newData;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const option = {
    title: {
      text: '✨ Animated Live Chart',
    },
    tooltip: {
      trigger: 'axis',
    },
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E', 'F'],
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Value',
        type: 'line',
        smooth: true,
        data: data,
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          opacity: 0.3,
        },
        symbol: 'circle',
        symbolSize: 8,
      },
    ],
  };

  return <ReactECharts option={option} />;
};

export default LiveChart;
