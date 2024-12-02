Chart.register({
  id: 'customArrowPlugin',
  afterDraw(chart) {
    if (!chart.arrowLabel) {
      console.log("No arrow label set, skipping custom drawing.");
      return;
    }

    const ctx = chart.ctx; // Contexto de desenho
    const canvas = chart.canvas; // O elemento canvas
    const centerX = canvas.width / 2; // Posição central X
    const centerY = canvas.height / 2; // Posição central Y
    const radius = chart.outerRadius || chart._metasets[0].data[0].outerRadius; // Raio do gráfico

    // Posição de onde a seta começa
    const arrowX = centerX - radius - 20;
    const arrowY = centerY;

    // Desenha a seta para a esquerda
    ctx.save(); // Salva o estado atual do contexto de desenho
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY); // Ponta da seta
    ctx.lineTo(arrowX - 40, arrowY - 20); // Topo da cabeça da seta
    ctx.lineTo(arrowX - 40, arrowY + 20); // Parte inferior da cabeça da seta
    ctx.closePath();
    ctx.fillStyle = "#FFFFFF"; // Cor da seta
    ctx.fill();

    // Alinha o texto com a seta
    ctx.font = "bold 24px Arial"; // Define o estilo da fonte
    ctx.fillStyle = "#FFFFFF"; // Cor do texto
    ctx.textAlign = "right"; // Alinha o texto à direita, de modo que ele expanda para a esquerda

    // Limite do texto à direita, com um pouco de margem para não ficar grudado na seta
    const textLimitX = arrowX - 50; // Define o limite direito do texto
    const textX = Math.max(textLimitX, arrowX - 80); // Garante que o texto não ultrapasse o limite

    // Posição vertical do texto
    const textY = arrowY;

    // Desenha o texto
    ctx.fillText(`${chart.arrowLabel}`, textX, textY); // Desenha o texto

    ctx.restore(); // Restaura o estado do contexto
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("myChart");

  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 0, 0, 0.05)',
          'rgba(0, 0, 255, 0.05)',
          'rgba(255, 255, 0, 0.05)',
          'rgba(57, 255, 20, 0.05)',
          'rgba(255, 0, 255, 0.05)',
          'rgba(255, 165, 0, 0.05)'
        ],
        borderColor: [
          '#D50000',
          '#303F9F',
          '#FBC02D',
          '#00C853',
          '#D500F9',
          '#FF6F00'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      cutout: '70%',
      rotation: 0,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#FFFFFF',
          },
        },
      }
    }
  });

  ctx.addEventListener('click', function (event) {
    const activePoint = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

    if (activePoint.length) {
      const index = activePoint[0].index; // Index of clicked segment
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

      function animateRotation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        const currentRotation = startRotation + progress * (endRotation - startRotation);

        chart.options.rotation = currentRotation;
        chart.update();

        if (progress < 1) {
          requestAnimationFrame(animateRotation);
        } else {
          console.log("Rotation complete.");
          // Set the label for the arrow and redraw
          chart.arrowLabel = chart.data.labels[index];
          chart.update();
        }
      }

      requestAnimationFrame(animateRotation);
    }
  });
});

