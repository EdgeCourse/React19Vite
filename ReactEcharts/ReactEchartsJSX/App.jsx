// src/App.jsx
import React from 'react';
import LiveChart from './components/LiveChart';

const App = () => (
  <div style={{ width: '80%', margin: '50px auto', textAlign: 'center' }}>
    <h2> Live Updating ECharts Demo with Animations</h2>
    <LiveChart />
  </div>
);

export default App;

/*
//this might need debugging... look at console for errors and be sure to have a height for the component
// src/App.jsx or src/index.js
import React from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import myCustomTheme from './theme/myCustomTheme';

// Register the theme before rendering any chart
echarts.registerTheme('my-dark-theme', myCustomTheme);

const App = () => {
  const option = {
    title: { text: 'Custom Themed Chart' },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: [150, 230, 224, 218, 135],
        type: 'bar',
      },
    ],
  };

  return (
    <div style={{ width: '80%', margin: '50px auto' }}>
      <ReactECharts option={option} style={{ height: '400px', width: '100%' }} theme="my-dark-theme" />
    </div>
  );
};

export default App;

*/
