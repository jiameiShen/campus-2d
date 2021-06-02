(function () {
  energyRankingChart()
  energyClassificationChart()
  energyStatisticsChart()
})()

// 能源消耗排行
function energyRankingChart() {
  let energyRanking = echarts.init(document.getElementById('ranking-content'))
  let option = {
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
  energyRanking.setOption(option)
}

// 能源分类消耗
function energyClassificationChart() {
  let energyClassification = echarts.init(
    document.getElementById('classification-content')
  )
  let option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    color: ['#228AE1', '#F2679A', '#FCE569'],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['60%', '80%'],
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
          { value: 727, name: '照明用电' },
          { value: 727, name: '空调用电' },
          { value: 727, name: '多媒体用电' },
        ],
      },
    ],
  }
  energyClassification.setOption(option)
}

//月度能耗消耗统计
function energyStatisticsChart() {
  let energyStatistics = echarts.init(
    document.getElementById('statistics-content')
  )
  let xAxisData = []
  for (let i = 0; i <= 12; i++) {
    xAxisData.push(i)
  }
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
      bottom: 14,
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
      splitLine:{ //网格线
        show:false,
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
      splitLine:{ //网格线
        show:false,
      },
    },
    series: [
      {
        data: [200, 400, 550, 180, 800, 110, 230, 200, 400, 550, 180, 700, 540],
        type: 'bar',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient( 0,0,0,1,
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
  energyStatistics.setOption(option)
}
