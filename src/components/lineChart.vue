<template>
  <div :class="topLineHide ? '' : 'chartWrapBorder'">
    <div :id="chartId" :style="{position: 'relative', width: '100%', height: height+'px'}">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import merge from 'lodash/merge'

if (!Array.prototype.first) {
  Array.prototype.first = function () {
    return this[0]
  }
}

if (!Number.prototype.commaOn) {
  Number.prototype.commaOn = function() {
    const numStr = this.toString().split(',')
    numStr[0] = numStr.first().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    return numStr.join('.')
  }
}

export default {
  name: 'lineChart',
  props: {
    height: {
      type: Number
    },
    chartData: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object
    },
    autoSkipPadding: {
      type: Number,
      default: 50
    },
    topLineHide: {
      type: Boolean,
      default: false
    },
    propLineOptions: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      instance: null,
      chartId: `chart_${this.genID()}`,
      defaultOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: false
        },
        elements: {
          line: {
            tension: 0
          }
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              // return `${data.datasets.eq(tooltipItem.datasetIndex).label}: ${Number(tooltipItem.value).commaOn()}`
              return ` ${Number(tooltipItem.value).commaOn()}`
            }
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              autoSkipPadding: 50
            }
          }],
          yAxes: [{
            ticks: {
              // stepSize: 2.5
              // maxTicksLimit: 10
              precision: 1,
              stepSize: 1,
              maxTicksLimit: 11
            }
          }]
        }
      },
      lineOptions: {
        borderWidth: 2, // line 두께
        fill: false,
        lineTension: 0, // 0은 직선 0.4는 곡선
        pointRadius: 2, // 포인트 안보이게 1로.
        pointHoverBorderColor: '#fff', // 포인터 테두리 색상
        pointHoverBorderWidth: 2, // 포인터 테두리 두께
        pointHoverRadius: 5 // 마우스 오버시 포인터 크게
      }
    }
  },
  computed: {
    mergeLineOptions() {
      return merge(this.lineOptions, this.propLineOptions)
    }
  },
  mounted() {
    if (this.chartData.labels && this.chartData.datasets) {
      this.makeInstance()
    }
  },
  methods: {
    genID() {
      return ((Math.random() * Math.pow(36, 6) << 0).toString(36)).slice(-6)
    },
    getMergeOptions() {
      return merge(this.defaultOptions, this.options)
    },
    changeAutoSkipPadding(autoSkipPadding) {
      this.options = merge(this.options, {
        scales: {
          xAxes: [{
            ticks: {
              autoSkipPadding: autoSkipPadding
            }
          }]
        }
      })
    },
    makeInstance(options) {
      const ctx = document.querySelector(`#${this.chartId}`).children.item(0).getContext('2d')
      this.instance = new Chart(ctx, {
        type: 'line',
        data: this.addDatasetsLineOption(this.chartData),
        options: this.getMergeOptions()
      })
    },
    addDatasetsLineOption(data) {
      const colors = ['#009687', '#8bc6cd', '#0f58a3', '#97a6cf', '#55c0ce', '#99d6cb', '#2575a7']
      data.datasets = data.datasets.map((dataset, idx) => {
        const color = colors[idx]
        return {
          ...dataset,
          ...this.mergeLineOptions,
          backgroundColor: color,
          borderColor: color
        }
      })
      return data
    }
  },
  watch: {
    options(option, oldOption) {
      const chart = this.instance
      if (chart) {
        chart.options = this.getMergeOptions()
      }
    },
    chartData(data) {
      const chart = this.instance
      if (chart) {
        chart.data = this.addDatasetsLineOption(data)
        chart.update()
      } else {
        this.makeInstance()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chartWrapBorder {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #424752;
}
</style>
