const xAxisLabelInput = document.getElementById('xAxisLabel');
const yAxisLabelInput = document.getElementById('yAxisLabel');
const xValuesInput = document.getElementById('xValues');
const yValuesInput = document.getElementById('yValues');
const chartTypeSelect = document.getElementById('chartType');
const chartColorInput = document.getElementById('chartColor');
const generateChartButton = document.getElementById('generateChart');
const myChartCanvas = document.getElementById('myChart');
const downloadChartButton = document.getElementById('downloadChart');
let myChart;

generateChartButton.addEventListener('click', () => {
  const xAxisLabel = xAxisLabelInput.value;
  const yAxisLabel = yAxisLabelInput.value;
  const xValues = xValuesInput.value.split(',').map((v) => v.trim());
  const yValues = yValuesInput.value
    .split(',')
    .map((v) => parseFloat(v.trim()));
  const chartType = chartTypeSelect.value;
  const chartColor = chartColorInput.value;

  if (myChart) {
    myChart.destroy();
  }

  myChart = createChart(
    myChartCanvas,
    chartType,
    xAxisLabel,
    yAxisLabel,
    xValues,
    yValues,
    chartColor
  );
  downloadChartButton.style.display = 'block';
});

downloadChartButton.addEventListener('click', () => {
  downloadChart(myChartCanvas, myChart);
});

function createChart(
  canvas,
  type,
  xAxisLabel,
  yAxisLabel,
  xValues,
  yValues,
  chartColor
) {
  const chartData = {
    labels: xValues,
    datasets: [
      {
        label: yAxisLabel,
        data: yValues,
        backgroundColor: chartColor,
        borderColor: chartColor,
        borderWidth: 1,
      },
    ],
  };

  const chart = new Chart(canvas, {
    type: type,
    data: chartData,
    options: {
      plugins: {
        backgroundColor: 'white',
      },
      scales: {
        x: {
          title: {
            display: true,
            text: xAxisLabel,
          },
        },
        y: {
          title: {
            display: true,
            text: yAxisLabel,
          },
          beginAtZero: true,
        },
      },
    },
  });

  return chart;
}

function downloadChart(canvas, chart) {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.fillStyle = 'white';
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
  tempCtx.drawImage(canvas, 0, 0);

  const link = document.createElement('a');
  link.href = tempCanvas.toDataURL('image/png');
  link.download = 'chart.png';
  link.click();
}
