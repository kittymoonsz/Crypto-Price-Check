import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import './styles/App.css';
import { centerTextPlugin } from './plugins/centerTextPlugin'; // Correct import from centerTextPlugin.ts
import { arrowLabelPlugin } from './plugins/arrowLabelPlugin'; // Correct import from arrowLabelPlugin.ts
import Header from './components/Header';
import Footer from './components/Footer';
import BoxContainer from './components/BoxContainer';

Chart.register(centerTextPlugin, arrowLabelPlugin);
const App: React.FC = () => {
  const [dadosMoeda, setDadosMoeda] = useState({
    variation: "+2.5%",
    token: "Bitcoin",
    price: "$45,000",
    volume: "$2B",
    marketcap: "$900B",
  });

  useEffect(() => {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    const assets = [
      { name: 'Bitcoin', value: 40 },
      { name: 'Ethereum', value: 30 },
      { name: 'Cardano', value: 15 },
      { name: 'Solana', value: 10 },
      { name: 'Polygon', value: 5 },
    ];

    let chart: Chart | null = null;
    if (ctx) {
      chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: assets.map(asset => asset.name),
          datasets: [{
            data: assets.map(asset => asset.value),
            backgroundColor: assets.map(() => `hsl(${Math.random() * 360}, 70%, 60%)`),
            borderColor: 'black',
            borderWidth: 3,
          }],
        },
        options: {
          responsive: true,
          cutout: '90%',
          rotation: 0,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#FFFFFF',
                font: {
                  size: 18,
                },
              },
            },
            tooltip: {
              enabled: false,
            },
          },
        },
      });
    }

const handleChartClick = (event: MouseEvent) => {
  if (chart) {
    const activePoint = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

    if (activePoint.length) {
      const index = activePoint[0].index;

      const meta = chart.getDatasetMeta(0);
      const startAngle = meta.data[index].startAngle * (180 / Math.PI);
      const endAngle = meta.data[index].endAngle * (180 / Math.PI);
      const segmentMiddleAngle = startAngle + (endAngle - startAngle) / 2;

      const targetAngle = 180; // Align selected segment to top
      const rotationDifference = targetAngle - segmentMiddleAngle;

      const startRotation = chart.options.rotation || 0;
      const endRotation = startRotation + rotationDifference;
      const animationDuration = 1000;

      const startTime = performance.now();

      const animateRotation = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        const currentRotation = startRotation + progress * (endRotation - startRotation);

        chart.options.rotation = currentRotation;
        chart.update();

        if (progress < 1) {
          requestAnimationFrame(animateRotation);
        } else {
          (chart as any).arrowLabel = chart.data.labels[index]; // Define arrowLabel
          chart.update(); // Trigger plugin execution
        }
      };

      requestAnimationFrame(animateRotation);
    }
  }
};




    if (ctx) {
      ctx.addEventListener('click', handleChartClick);
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
      if (ctx) {
        ctx.removeEventListener('click', handleChartClick);
      }
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="chart-container">
        <canvas id="myChart" />
        <hr className="separator" />
        <BoxContainer data={dadosMoeda} />
      </div>
      <Footer />
    </div>
  );
};

export default App;


