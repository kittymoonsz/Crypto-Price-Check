import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import ChartAnnotation from 'chartjs-plugin-annotation';
import './App.css';

Chart.register(ChartAnnotation);

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
            annotation: {
              annotations: [
                {
                  type: 'label',
                  xValue: '50%',
                  yValue: '50%',
                  backgroundColor: 'transparent',
                  content: ['$1000', '5 assets'],
                  font: {
                    size: 45,
                    weight: 'bold',
                  },
                  color: '#FFFFFF'
                },
              ],
            },
          },
          layout: {
            padding: {
              bottom: 0,
              top: 0,
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

          const targetAngle = 180;
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
              console.log("Rotation complete.");
              chart.arrowLabel = chart.data.labels[index];
              chart.update();
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

const Header: React.FC = () => (
  <div className="header">
    <div className="header-left">
      <a href="#" className="logo">Logo</a>
      <div id="balance">Balance: $100</div>
    </div>
    <div className="header-center">
      <a href="#">Charts</a>
      <a href="#">Portfolio</a>
    </div>
    <div className="header-right">
      <a href="#">Account</a>
      <a href="#">Settings</a>
    </div>
  </div>
);

interface BoxContainerProps {
  data: {
    variation: string;
    token: string;
    price: string;
    volume: string;
    marketcap: string;
  };
}

const BoxContainer: React.FC<BoxContainerProps> = ({ data }) => (
  <div className="box-container">
    <Box title="Token" value={data.token} />
    <Box title="Variation" value={data.variation} />
    <Box title="Price" value={data.price} />
    <Box title="Volume" value={data.volume} />
    <Box title="Market Cap" value={data.marketcap} />
  </div>
);

interface BoxProps {
  title: string;
  value: string;
}

const Box: React.FC<BoxProps> = ({ title, value }) => (
  <div className="box">
    <h3>{title}</h3>
    <div className="value-box">{value}</div>
  </div>
);

const Footer: React.FC = () => (
  <footer className="footer">
    <p>© 2024 Krypto. All rights reserved.</p>
  </footer>
);

export default App;

