
export const arrowLabelPlugin = {
  id: 'arrowLabelPlugin',
  afterDraw(chart: any) {
    const ctx = chart.ctx;
    const arrowLabel = (chart as any).arrowLabel;
    if (!arrowLabel) return;

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
    const arrowLength = 70; // Length of the line
    const segmentEndRadius = outerRadius;
    const startX = chart.width / 2 + Math.cos(angle) * radius - 30;
    const startY = chart.height / 2 + Math.sin(angle) * radius;
    const endX = chart.width / 2 + Math.cos(angle) * (radius + arrowLength);
    const endY = chart.height / 2 + Math.sin(angle) * (radius + arrowLength);

    // Draw the arrow line
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Draw the arrowhead
    const arrowSize = 30; // Size of the arrowhead
    const arrowAngle = Math.PI / 6; // Angle of the arrowhead sides

    const arrowHeadOffset = -25; // Adjust this value to control how much the arrowhead moves inward

    // Adjusted arrowhead starting point (new endX and endY)
    const arrowHeadX = chart.width / 2 + Math.cos(angle) * (radius + arrowLength - arrowHeadOffset);
    const arrowHeadY = chart.height / 2 + Math.sin(angle) * (radius + arrowLength - arrowHeadOffset);

    // Draw the arrowhead
    ctx.beginPath();
    ctx.moveTo(arrowHeadX, arrowHeadY); // Base point of the arrowhead
    ctx.lineTo(
      arrowHeadX - arrowSize * Math.cos(angle - arrowAngle),
      arrowHeadY - arrowSize * Math.sin(angle - arrowAngle)
    );
    ctx.lineTo(
      arrowHeadX - arrowSize * Math.cos(angle + arrowAngle),
      arrowHeadY - arrowSize * Math.sin(angle + arrowAngle)
    );
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Position for the segment name after the arrowhead
    const label = chart.data.labels[index];
    const labelOffset = 0; // Offset after the arrowhead to avoid overlap
    const labelDistance = -10; // Distance to move the label further from the arrowhead

    // Calculate the position for the label after the arrowhead
    const labelX = arrowHeadX + Math.cos(angle) * (arrowSize + labelDistance);
    const labelY = arrowHeadY + Math.sin(angle) * (arrowSize + labelDistance);

    // Set up the font style for the label
    ctx.font = '30px Arial'; // Adjust the font size and style as needed
    ctx.fillStyle = '#FFFFFF'; // Set the label color
    ctx.textAlign = 'right';

    // Draw the label next to the arrowhead
    ctx.fillText(label, labelX, labelY);

    ctx.restore();
  },
};

