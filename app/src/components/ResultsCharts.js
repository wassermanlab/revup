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
            label: ['RVE-Score Distribution obtained from classifying 46 regulatory variants in van der Lee et al., 2020'],
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
        backgroundColor: "#FFFFFF"
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
                  content: "RVE-Score = ".concat(finalResults["rve"]),
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
                    labelString: 'RVE-Scores'
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
            display: true,
            position: "bottom"
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
    var offset_score = 0;
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
        offset_score = (33.0/weak_lim)*parseFloat(score);
    } else if(score > weak_lim && score <= mod_lim) {
        background_color = "#FF995F"
        offset_score = (33.0/(mod_lim-weak_lim))*(parseFloat(score)-weak_lim) + 33.0;
    } else if(score > mod_lim) {
        background_color = "#FF5F6D"
        offset_score = (33.0/(max_score-mod_lim))*(parseFloat(score)-mod_lim) + 66.0;
    }
    // First set is the clinical score, secont set is the grey background
    const chartData = {
        //labels : ["Clinical Score","Blue"],
        datasets: [{
            label: "Gauge",
            //data : [parseFloat(score), max_score-parseFloat(score)],
            data : [offset_score, 99-offset_score],
            backgroundColor: [
                background_color,
                "#D1D5D5",
            ],
            borderColor: [
                background_color,
                "#D1D5D5",
            ]
        }],
    }
    return chartData
}


export function getDoughnutOptions(score, type) {
    var weak_lim = 0;
    var mod_lim = 0;
    var evidence = "";
    var titleText = "";
    //var subtitleText = "";
    //var subtitleText2 = "";

    // Determine label
    if (type === 'clinical') {
        titleText = ["Clinical Score", "Is there a causal link between genotype and phenotype?"];
        //subtitleText = "Is there a causal link between";
        //subtitleText2 = "genotype and phenotype?";
        weak_lim = CLINICAL_RANGE_MAXIMUMS["weak"]
        mod_lim = CLINICAL_RANGE_MAXIMUMS["moderate"]
    } else if (type === 'functional') {
        titleText = ["Functional Score", "Does the variant have a damaging effect on the gene?"];
        //subtitleText = "Does the variant have a damaging effect on the gene?";
        weak_lim = FUNCTIONAL_RANGE_MAXIMUMS["weak"]
        mod_lim = FUNCTIONAL_RANGE_MAXIMUMS["moderate"]
    }

    if(score <= weak_lim && score >= 0.0) {
        evidence = "Weak Evidence";
    } else if(score > weak_lim && score <= mod_lim) {
        evidence = "Moderate Evidence";
    } else if(score > mod_lim) {
        evidence = "Strong Evidence";
    }

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
            //var stringWidth = ctx.measureText(txt).width;
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
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 1.5);
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
        cutoutPercentage : 60, // percent
        elements: {
            center: {
              text: score,
            }
        },
        title: {
            display: true,
            text: titleText,
            fontSize: 15,
            fontStyle: 'normal'
        },
        layout: {
            padding: 2
        },
        scales: {
            xAxes: [
                /*{
                scaleLabel: {
                    display: true,
                    labelString: subtitleText,
                    padding: 0 
                },
                gridLines: {
                    drawBorder: false,
                },
            },{
                scaleLabel: {
                    display: true,
                    labelString: subtitleText2,
                    padding: 0
                },
                gridLines: {
                    drawBorder: false,
                },
            },*/{
                scaleLabel: {
                    display: true,
                    labelString: evidence,
                    fontSize: 15,
                    padding: 0
                },
                gridLines: {
                    drawBorder: false,
                },
            }],
            display : true,
            gridLines : {
                display : false,
                color : 'transparent'
            },
            ticks : {
                display : false
            },
        },
        maintainAspectRatio: false,
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
                    if(i === len){
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
        },
    }
    return doughnutOptions;
}