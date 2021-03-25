import {Chart} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import 'chartjs-plugin-datalabels';

import {
    MAX_FUNCTIONAL_SCORE,
    MAX_CLINICAL_SCORE,
    FUNCTIONAL_RANGE_MAXIMUMS,
    CLINICAL_RANGE_MAXIMUMS
} from '../constants'


export function getLineData(finalResults) {
    const lineData = {
        labels: finalResults["standard_rve"]["x"],
        datasets: [
          {
            label: 'Known Rare Disease Regulatory Variants',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: finalResults["standard_rve"]["y"]
          }
        ],
    };
    return lineData
}


export function getLineOptions(finalResults) {
    const lineOptions = {
        tooltips: {
            enabled: false
        },
        annotation: {
            annotations: [
              {
                //drawTime: "afterDatasetsDraw",
                type: "line",
                mode: "vertical",
                scaleID: "x-axis-0",
                value: finalResults["standard_rve"]["nearest_val"],
                borderWidth: 3,
                borderColor: "red",
                label: {
                  content: "RVE Score = ".concat(finalResults["rve"]),
                  enabled: true,
                  position: "top"
                }
              }
            ]
          },
        scales: {
            xAxes: [{
                ticks: {
                    callback: function(value, index, values) {
                        return parseFloat(value).toFixed(2);
                    },
                    maxTicksLimit: 12,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'RVE Scores'
                  }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Density'
                  }
            }]
        },
        layout: {
            padding: {
                top: 5,
                left: 15,
                right: 15,
                bottom: 15
            }
        },
        legend: {
            display: false
         },
        maintainAspectRatio: false,
        plugins: { 
            datalabels: { 
                display: false 
            }
        },
    };
    return lineOptions;
}


export function getDoughnutData(score, type) {
    var max_score = 0;
    var weak_lim = 0;
    var mod_lim = 0;
    var background_color = "#FFC371"
    // Determine colour
    if (type === 'clinical') {
        max_score = MAX_CLINICAL_SCORE
        weak_lim = CLINICAL_RANGE_MAXIMUMS["weak"]
        mod_lim = CLINICAL_RANGE_MAXIMUMS["moderate"]
    } else if (type === 'functional') {
        max_score = MAX_FUNCTIONAL_SCORE
        weak_lim = FUNCTIONAL_RANGE_MAXIMUMS["weak"]
        mod_lim = FUNCTIONAL_RANGE_MAXIMUMS["moderate"]
    }

    if(score <= weak_lim && score >= 0.0) {
        background_color = "#FFC371"
    } else if(score > weak_lim && score <= mod_lim) {
        background_color = "#FF995F"
    } else if(score > mod_lim) {
        background_color = "#FF5F6D"
    }
    // First set is the clinical score, secont set is the grey background
    const chartData = {
        //labels : ["Clinical Score","Blue"],
        datasets: [{
            label: "Gauge",
            data : [parseFloat(score), max_score-parseFloat(score)],
            backgroundColor: [
                background_color,
                "#D1D5D5",
            ]
        }],
    }
    return chartData
}


export function getDoughnutOptions(score) {
    Chart.pluginService.register({
        beforeDraw: function (chart) {
          if (chart.config.options.elements.center) {
            //Get ctx from string
            var ctx = chart.chart.ctx;
      
            //Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            
            var fontStyle = centerConfig.fontStyle || 'Arial';
            var txt = centerConfig.text;
            var color = centerConfig.color || '#000';
            var sidePadding = centerConfig.sidePadding || 10;
            var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
            //Start with a base font of 30px
            ctx.font = "7px " + fontStyle;
      
            //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
      
            // Find out how much the font can grow in width.
            var widthRatio = elementWidth / 3.893
            //var widthRatio = elementWidth / stringWidth;
            //console.log(stringWidth)
            var newFontSize = Math.floor(1 * widthRatio);
            var elementHeight = (chart.innerRadius * 2);
      
            // Pick a new font size so it will not be larger than the height of label.
            var fontSizeToUse = Math.min(newFontSize, elementHeight);
      
            //Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 1.3);
            ctx.font = fontSizeToUse+"px " + fontStyle;
            ctx.fillStyle = color;
      
            //Draw text in center
            ctx.fillText(txt, centerX, centerY);
          }
        }
      });


    const doughnutOptions = {
        circumference: Math.PI,
        rotation : Math.PI,
        cutoutPercentage : 60, // precent
        elements: {
            center: {
              text: score,
            }
        },
        plugins: {
            datalabels: {
                display: false,
                backgroundColor: function(context) {
                    return context.dataset.backgroundColor;
                },
                borderColor: null,
                color: '#ffffff',
                font: function(context) {
                    var w = context.chart.width;
                    return {
                        size: w < 512 ? 18 : 20
                    }
                },
                align: 'end',
                anchor: 'center',
                offset: 10,
                borderRadius: 4,
                borderWidth: 1,
                formatter: function(value, context) {
                    var i = context.dataIndex;
                    var len = context.dataset.data.length - 1;
                    if(i == len){
                        return null;
                    }
                    return value;
                }
            }   
        },
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        }
    }
    return doughnutOptions;
}