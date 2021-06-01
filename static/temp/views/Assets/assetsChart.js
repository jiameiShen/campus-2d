(function () {
  schoolAssetsChart()
  collegeAssetsChart()
  classAssetsChart()
  totalAssetsChart()
})()

// 学校资产统计
function schoolAssetsChart() {
  let schoolAssets = echarts.init(
    document.getElementById('school-assets-content')
  )
  let option = {
    title: {
      text: '6,823',
      subtext: '总资产(万元)',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 20
      },
      subtextStyle: {
        color: '#7EADC0',
        fontSize: 14
      },
      x: 'center',
      y: '26%'
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
        fontSize: 12
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
        data: [
          { value: 4933, name: '软件资产' },
          { value: 1890, name: '硬件资产' },

        ],
        hoverAnimation: false
      },
    ],
  }
  schoolAssets.setOption(option)
}

// 各学院资产统计
function collegeAssetsChart() {
  let AssetsRanking = echarts.init(document.getElementById('college-assets-content'))
  let option = {
    backgroundColor: 'black',
    grid: {
      top: 31,
      left: '3%',
      right: '11%',
      bottom: 0,
      containLabel: true,
    },
    yAxis: [
      {
        type: 'category',
        data: [
          '管理学院',
          '计算机学院',
          '经济管理学院',
          '机电工程学院',
          '自动化学院',
          '轻工化工学院',
          '外国语学院',
        ],
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
        barWidth: 26,
        data: [97, 518, 212, 486, 427, 284, 502],
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
        barWidth: 12, //柱子宽度
      },
    ],
  }
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
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: 31,
      left: '3%',
      right: '11%',
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
      splitLine: { //网格线
        show: false,
      },
    },
    yAxis: {
      type: 'value',
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
        data: [618, 512, 410, 710],
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
        },
        barWidth: 18, //柱子宽度
      },
    ],
  }
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
        name: "(万元)",
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
  classAssets.setOption(option)
}
