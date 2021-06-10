(function() {
  securitySchoolVisitorsChart()
  securityCameraChart()
  securityFireControl()
})()

// 学校访客
function securitySchoolVisitorsChart() {
  let securitySchoolVisitors = echarts.init(
    document.getElementById('school-visitors-chart')
  )
  let option = {
    backgroundColor: 'transparent',
    color: ['#2DE2E5', '#9095EC'],
    legend: {
      data: ['出', '入'],
      show: false,
    },
    grid: {
      top: 14,
      left: 0,
      right: 10,
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
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
        name: '访客人数',
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
  securitySchoolVisitors.clear()
  securitySchoolVisitors && securitySchoolVisitors.setOption(option)
}

// 安防摄像头
function securityCameraChart() {
  let camera = echarts.init(document.getElementById('camera-ring'))
  let option = {
    title: {
      text: '1,682',
      subtext: '总数',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 20,
      },
      subtextStyle: {
        color: '#7EADC0',
        fontSize: 14,
      },
      x: 'center',
      y: '35%',
    },

    color: ['#F2679A', '#2DE2E5'],
    series: [
      {
        name: '访客人数',
        type: 'pie',
        radius: ['75%', '100%'],
        center: ['50%', '50%'],
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
          { value: 632, name: '报修' },
          { value: 818, name: '正常' },
        ],
        hoverAnimation: false,
      },
    ],
  }
  camera.clear()
  camera && camera.setOption(option)
}

// 消防监控
function securityFireControl() {
  let fireControl = echarts.init(document.getElementById('fire-control'))
  let option = {
    title: {
      text: '82',
      subtext: '总数',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 20,
      },
      subtextStyle: {
        color: '#7EADC0',
        fontSize: 14,
      },
      x: 'center',//文字位置
      y: '35%'//文字位置
    },

    color: ['#F2679A', '#2DE2E5'],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['75%', '100%'],
        center: ['50%', '50%'],
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
          { value: 32, name: '报修' },
          { value: 50, name: '正常' },
        ],
        hoverAnimation: false,
      },
    ],
  }
  fireControl.clear()
  fireControl && fireControl.setOption(option)
}