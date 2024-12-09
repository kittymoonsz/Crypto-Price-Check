export const centerTextPlugin = {
  id: 'centerTextPlugin',
  beforeDraw(chart: any) {
    const ctx = chart.ctx;
    const centerX = chart.width / 2;
    const centerY = chart.height / 2;

    ctx.save();
    ctx.font = 'bold 45px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';

    ctx.fillText('$1000', centerX, centerY - 10);
    ctx.font = 'bold 20px Arial';
    ctx.fillText('5 assets', centerX, centerY + 30);
    ctx.restore();
  },
};


