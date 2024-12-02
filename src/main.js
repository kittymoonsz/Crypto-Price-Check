document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("myChart");

  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      }
    }
  });

  ctx.addEventListener('click', function (event) {
    const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    if (activePoints.length > 0) {
      const clickedIndex = activePoints[0].index;

      const segmentMeta = chart.getDatasetMeta(0).data[clickedIndex];
      const startAngle = segmentMeta.startAngle;
      const endAngle = segmentMeta.endAngle;

      console.log(`Clicked Segment Index: ${clickedIndex}`);
      console.log(`Start Angle: ${startAngle}, End Angle: ${endAngle}`);

      const middleAngle = (startAngle + endAngle) / 2;
      console.log(`Middle Angle: ${middleAngle}`);
    } else {
      console.log("No segment clicked.");
    }
  });
});

