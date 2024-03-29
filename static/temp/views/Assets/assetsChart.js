// (function () {
//   schoolAssetsChart()
//   collegeAssetsChart()
//   classAssetsChart()
//   totalAssetsChart()
// })()

// 学校资产统计
function schoolAssetsChart(data) {
  let text = Number(data[0].value) + Number(data[1].value)
  let schoolAssets = echarts.init(
    document.getElementById('school-assets-content')
  )
  let option = {
    title: {
      text: text,
      subtext: '总资产(万元)',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 20,
      },
      subtextStyle: {
        color: '#7EADC0',
        fontSize: 14,
      },
      x: 'center',
      y: '26%',
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
      bottom: 10,
      itemGap: 40,
      itemWidth: 14,
      itemHeight: 4,
      textStyle: {
        color: '#FFFFFF',
        fontSize: 12,
      },
    },
    color: ['#2DE2E5', '#FCE569'],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['53%', '70%'],
        center: ['50%', '40%'],
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
        hoverAnimation: false,
      },
    ],
  }
  schoolAssets.clear()
  schoolAssets.setOption(option)
}

// 各学院资产统计
function collegeAssetsChart(data, seriesData) {
  let AssetsRanking = echarts.init(
    document.getElementById('college-assets-content')
  )
  let option = {
    grid: {
      top: 31,
      left: 0,
      right: 10,
      bottom: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
      padding: 10,
      className: 'echarts-tooltip-dark',
      formatter: function (params) {
        return `<p class="caption">${params[0].name}</p>
          <p class="item">
            <span class="mark" style="background-color: #228AE1;"></span>
              <span class="name">总资产</span>
            <span class="value">${params[0].value}</span>
          </p>`
      },
    },
    yAxis: [
      {
        type: 'category',
        data: data,
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
        data: seriesData,
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
        },
      },
    ],
  }
  AssetsRanking.clear()
  AssetsRanking.setOption(option)
}

// 学院各类资产统计
function classAssetsChart() {
  let classAssets = echarts.init(
    document.getElementById('class-assets-content')
  )
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
      padding: 10,
      className: 'echarts-tooltip-dark',
      formatter: function (params) {
        return `<p class="caption">${params[0].name}</p>
          <p class="item">
            <span class="mark" style="background-color: #228AE1;"></span>
              <span class="name">总资产</span>
            <span class="value">${params[0].value}</span>
          </p>`
      },
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
      data: ['家具', '教学物品', '仪器设备', '多媒体类'],
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 12,
          color: '#7EADC0',
        },
      },
      splitLine: {
        //网格线
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
      splitLine: {
        //网格线
        show: false,
      },
    },
    series: [
      {
        data: [618, 512, 410, 710],
        type: 'bar',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
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
        },
      },
    ],
  }
  classAssets.clear()
  classAssets.setOption(option)
}

// 学校资产总额统计
function totalAssetsChart() {
  let classAssets = echarts.init(
    document.getElementById('total-assets-content')
  )
  let option = {
    backgroundColor: 'transparent',
    color: ['#2DE2E5', '#9095EC'],
    legend: {
      data: ['出', '入'],
      show: false,
    },
    grid: {
      top: 45,
      left: 20,
      right: 30,
      bottom: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
      padding: 10,
      className: 'echarts-tooltip-dark',
      formatter: function (params) {
        return `<p class="caption">${params[0].name}</p>
          <p class="item">
            <span class="mark" style="background-color: ${params[0].color};"></span>
            <span class="value">${params[0].value}</span>
          </p>`
      },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
        axisLine: {
          lineStyle: {
            color: '#1D2538',
          },
        },
        axisLabel: {
          color: '#7EADC0',
          interval: 0,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '(万元)',
        nameTextStyle: {
          color: '#7EADC0',
        },
        axisLine: {
          lineStyle: {
            color: '#1D2538',
          },
        },
        minInterval: 1,
        axisLabel: {
          color: '#7EADC0',
        },
        splitLine: {
          lineStyle: {
            color: ['#1D2538'],
          },
        },
      },
    ],
    series: [
      {
        name: '资产总额',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 1,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(45,226,229,0.4)',
            },
            {
              offset: 1,
              color: 'rgba(45,226,229,0.1)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: [400, 500, 700, 122, 881, 350, 154],
      },
    ],
  }
  classAssets.clear()
  classAssets.setOption(option)
}
