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

export default {
  name: 'barChart',
  props: {
    height: {
      type: Number
    },
    chartData: {
      type: Object
    },
    options: {
      type: Object
    },
    topLineHide: {
      type: Boolean,
      default: false
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
          display: false
        },
        title: {
          display: false
        },
        scales: {
          xAxes: [{
            barPercentage: 0.5,
            gridLines: {
              display: false
            }
          }]
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.chartData.labels && this.chartData.datasets) {
        this.makeInstance()
      }
    })
  },
  methods: {
    genID() {
      return ((Math.random() * Math.pow(36, 6) << 0).toString(36)).slice(-6)
    },
    getMergeOptions() {
      return merge(this.defaultOptions, this.options)
    },
    makeInstance() {
      const ctx = document.querySelector(`#${this.chartId}`).children.item(0).getContext('2d')
      this.instance = new Chart(ctx, {
        type: 'bar',
        data: this.chartData,
        options: this.getMergeOptions()
      })
    },
    clear() {
      if (this.instance) {
        this.instance.clear()
      }
    },
    destroy() {
      if (this.instance) {
        this.instance.destroy()
      }
    }
  },
  watch: {
    chartData: {
      handler (chartData) {
        if (this.instance) {
          this.instance.data = chartData
          this.instance.update()
        } else {
          this.makeInstance()
        }
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
