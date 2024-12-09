
export const arrowLabelPlugin = {
  id: 'arrowLabelPlugin',
  afterDraw(chart: any) {
    const ctx = chart.ctx;
    const arrowLabel = (chart as any).arrowLabel; // Get the label for the arrow
    if (!arrowLabel) return; // Don't draw the arrow if no label is set

    const meta = chart.getDatasetMeta(0);
    const index = chart.data.labels.indexOf(arrowLabel);
    if (index === -1) return;

    const element = meta.data[index];
    const startAngle = element.startAngle || element._model?.startAngle || 0;
    const endAngle = element.endAngle || element._model?.endAngle || 0;
    const innerRadius = chart.innerRadius || element.innerRadius || 0;
    const outerRadius = chart.outerRadius || element.outerRadius || chart.radius || 0;

    // Calculate arrow positions
    const angle = (startAngle + endAngle) / 2;
    const radius = (innerRadius + outerRadius) / 2;
    const arrowLength = 70;
    const startX = chart.width / 2 + Math.cos(angle) * radius;
    const startY = chart.height / 2 + Math.sin(angle) * radius;
    const endX = chart.width / 2 + Math.cos(angle) * (radius + arrowLength);
    const endY = chart.height / 2 + Math.sin(angle) * (radius + arrowLength);

    // Draw the arrow
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw the arrowhead
    const arrowSize = 30;
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - arrowSize * Math.cos(angle - Math.PI / 6),
      endY - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      endX - arrowSize * Math.cos(angle + Math.PI / 6),
      endY - arrowSize * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Draw the segment label next to the arrow
    const labelX = endX - 10; // Offset the label a little to the right
    const labelY = endY;

    // Set text properties
    ctx.font = '30px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'right'; // Text aligns to the right, so it moves from right to left
    ctx.textBaseline = 'middle'; // Vertically center the text

    // Calculate the final position of the label based on how far it has moved to the left
    let moveX = labelX;
    const moveSpeed = 2; // Control the speed at which the text moves

    // Move the label left over time
    moveX -= moveSpeed;

    // Draw the label, making sure it starts from the right and moves left
    ctx.fillText(arrowLabel, moveX, labelY);

    ctx.restore();
  },
};

