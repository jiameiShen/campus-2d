;(function () {
  operationDeviceStatusChart()
  operationRegionalStatisticsChart()
  operationDeviceMaintenanceChart()
})()

// 设备状态统计
function operationDeviceStatusChart() {
  let deviceStatus = echarts.init(document.getElementById('device-status-ring'))
  let option = {
    title: {
      text: '1,682',
      subtext: '总数(单位)',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 20,
      },
      subtextStyle: {
        color: '#7EADC0',
        fontSize: 14,
      },
      x: 'center',
      y: '38%',
    },

    color: ['#F2679A', '#FCE569', '#228AE1'],
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
          { value: 632, name: '报修' },
          { value: 232, name: '报废' },
          { value: 818, name: '正常' },
        ],
        hoverAnimation: false,
      },
    ],
  }
  deviceStatus.clear()
  deviceStatus.setOption(option)
}

// 维修设备分类统计
function operationDeviceMaintenanceChart() {
  let regionalStatistics = echarts.init(
    document.getElementById('device-maintenance-content')
  )
  let option = {
    backgroundColor: 'transparent',
    color: ['#2DE2E5', '#228AE1', '#F2679A', '#9095EC',],
    legend: {
      orient: 'vertical',
      right: 0,
      bottom: 0,
      itemWidth: 14,
      itemHeight: 4,
      itemGap: 16,
      textStyle: {
        fontSize: 12,
        lineHeight: 16,
        color: '#fff',
      },
      data: ['摄像机', '办公桌椅', '智能穿戴', '监控设备'],
    },
    series: [
      {
        name: '维修设备分类统计',
        type: 'pie',
        radius: '60%',
        center: ['38%', '50%'],
        label: {
          formatter: '{font|{b}}\n{font|{c}}',
          rich: {
            font: {
              color: '#fff',
              fontSize: 12,
              lineHeight: 20,
            },
          },
        },
        data: [
          { value: '336', name: '摄像机' },
          { value: '400', name: '办公桌椅' },
          { value: '480', name: '智能穿戴' },
          { value: '880', name: '监控设备' },
        ],
      },
    ],
  }
  regionalStatistics.clear()
  regionalStatistics.setOption(option)
}

// 运维情况区域统计
function operationRegionalStatisticsChart() {
  let regionalStatistics = echarts.init(
    document.getElementById('regional-statistics-content')
  )
  let option = {
    grid: {
      top: 18,
      left: '3%',
      right: '11%',
      bottom: 0,
      containLabel: true,
    },
    dataZoom: [
      {
        start: 0,//默认为0
        end: 100 - 1500 / 31,//默认为100
        type: 'slider',
        show: true,
        yAxisIndex: [0],
        handleSize: 0,//滑动条的 左右2个滑动条的大小 
        borderColor: "#000",
        fillerColor: '#276B86',
        width: 12,
        borderRadius: 5,
        backgroundColor: '#1D2A42',//两边未选中的滑动条区域的颜色
        showDataShadow: false,//是否显示数据阴影 默认auto
        showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
        realtime: true, //是否实时更新
        filterMode: 'filter',
      },
    ],
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
      },
    ],
  }
  regionalStatistics.clear()
  regionalStatistics.setOption(option)
}


