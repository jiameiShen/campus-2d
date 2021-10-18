// (function () {
//   energyRankingChart()
//   energyClassificationChart()
//   energyStatisticsChart()
// })()

// 能源消耗排行
function energyRankingChart(yAxisData) {
  let energyRanking = echarts.init(document.getElementById('ranking-content'))
  let option = {
    grid: {
      top: 5,
      left: 0,
      right: 10,
      bottom: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'line',
      },
      padding: 10,
      className: 'echarts-tooltip-dark',
      formatter: function (params) {
        return `<p class="caption">${params.name}</p>
          <p class="item">
            <span class="mark" style="background-color: #228AE1;"></span>
            <span class="value">${params.data}</span>
          </p>`
      }
    },
    yAxis: [
      {
        type: 'category',
        data: yAxisData,
        inverse: true,
        // axisTick: {
        //     alignWithLabel: true,
        // },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 12,
            color: '#7EADC0',
          },
        },
      },
    ],
    xAxis: [
      {
        type: 'value',
        show: false,
      },
    ],
    series: [
      {
        type: 'bar',
        data: [97, 518, 212, 486, 427, 284, 502].sort((a, b) => { return b - a }),
        label: {
          normal: {
            show: true,
            position: 'right',
            textStyle: {
              color: '#ffffff', //color of value
              fontSize: 12,
            },
          },
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              0,
              [
                {
                  offset: 0,
                  color: '#28BEE3', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#228AE1', // 100% 处的颜色
                },
              ],
              false
            ),

            shadowColor: 'rgba(0,0,0,0.1)',
            shadowBlur: 3,
            shadowOffsetY: 3,
          },
        }
      },
    ],
  }
  energyRanking.clear()
  energyRanking && energyRanking.setOption(option)
}

// 能源分类消耗
function energyClassificationChart(data) {
  let energyClassification = echarts.init(
    document.getElementById('classification-content')
  )
  let option = {
    tooltip: {
      trigger: 'item',
      position: ['50%', '50%'],
      className: 'echarts-tooltip-dark',
      formatter: function (params) {
        return `<p class="caption">${params.data.name}</p>
          <p class="item">
            <span class="mark" style="background-color: #228AE1;"></span>
            <span class="value">占比：${Math.round(params.percent)}%</span>
          </p>`
      }
    },
    color: ['#228AE1', '#F2679A', '#FCE569'],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['75%', '100%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center',
          },
          emphasis: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: data,
      },
    ],
  }
  energyClassification.clear()
  energyClassification && energyClassification.setOption(option)
}

//月度能耗消耗统计
function energyStatisticsChart() {
  let energyStatistics = echarts.init(
    document.getElementById('statistics-content')
  )
  let xAxisData = []
  for (let i = 1; i <= 12; i++) {
    xAxisData.push(i)
  }
  let option = {
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'line',
      },
      padding: 10,
      className: 'echarts-tooltip-dark',
      formatter: function (params) {
        return `<p class="caption">${params.name}月</p>
          <p class="item">
            <span>能耗</span>
            <span class="value">${params.data}</span>
          </p>`
      }
    },
    grid: {
      top: 31,
      left: 0,
      right: 10,
      bottom: 0,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 12,
          color: '#7EADC0',
        },
      },
      splitLine: { //网格线
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      name: '(万元)',
      nameTextStyle: {
        color: '#7EADC0',
      },
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 12,
          color: '#7EADC0',
        },
      },
      splitLine: { //网格线
        show: false,
      },
    },
    series: [
      {
        data: [200, 400, 550, 180, 800, 110, 230, 200, 400, 550, 180, 700, 540],
        type: 'bar',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
              [
                {
                  offset: 0,
                  color: '#28BEE3', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#228AE1', // 100% 处的颜色
                },
              ],
              false
            ),
            shadowColor: 'rgba(0,0,0,0.1)',
            shadowBlur: 3,
            shadowOffsetY: 3,
          },
        }
      },
    ],
  }
  energyStatistics.clear()
  energyStatistics && energyStatistics.setOption(option)
}
