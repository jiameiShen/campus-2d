let notReturnChart = null
let abnormalWarningChart = null
let roomUsageChart = null
let passChart = null
let interceptChart = null
let floorPassChart = null

const PIE_CHART_COLORS = ['#9095EC', '#228AE1', '#2DE2E5', '#F2679A']
const BAR_CHART_COLORS = ['#2DE2E5', '#228AE1', '#FCE569', '#F2679A']
const LINE_CHART_COLORS = ['#2DE2E5', '#9095EC']
const TEXTCOLOR = '#7EADC0'
const LINECOLOR = '#31384D'

//   /* 归寝率排行 */
//   notReturnChart = window.echarts.init(document.getElementById('notReturnChart'), null, {devicePixelRatio: 2.5})
//   renderNotReturnChart()
//   /* 异常预警 */
//   abnormalWarningChart = window.echarts.init(document.getElementById('abnormalWarningChart'), null, {devicePixelRatio: 2.5})
//   renderAbnormalWarningChart()


//   /* 房间使用率 */
//   roomUsageChart = window.echarts.init(document.getElementById('roomUsageChart'), null, {devicePixelRatio: 2.5})
//   const roomUsageData = {
//     idle: 32629,
//     total: 33487,
//   }
//   renderRoomUsageChart(
//     !roomUsageData.total
//       ? '0'
//       : ((roomUsageData.total - roomUsageData.idle) / roomUsageData.total).toFixed(2)
//   )

//   /* 今日通行人数 */
//   const passInfo = {
//     data: [
//       { time: "09:00", in: 0, out: 0 },
//       { time: "09:30", in: 0, out: 0 },
//       { time: "10:00", in: 0, out: 0 },
//       { time: "10:30", in: 0, out: 0 },
//       { time: "11:00", in: 0, out: 0 },
//       { time: "11:30", in: 0, out: 0 },
//       { time: "12:00", in: 0, out: 0 },
//       { time: "12:30", in: 0, out: 0 },
//       { time: "13:00", in: 0, out: 0 },
//       { time: "13:30", in: 0, out: 0 },
//       { time: "14:00", in: 8, out: 0 },
//       { time: "14:30", in: 0, out: 1 }
//     ],
//     in: 11,
//     out: 1
//   }
//   const passTimeList = passInfo.data.map((item) => item.time)
//   const passInList = passInfo.data.map((item) => item.in)
//   const passOutList = passInfo.data.map((item) => item.out)
//   passChart = window.echarts.init(document.getElementById('passChart'), null, {devicePixelRatio: 2.5})
//   renderPassChart(passTimeList, passInList, passOutList)
//   floorPassChart = window.echarts.init(document.getElementById('floorPassChart'), null, {devicePixelRatio: 2.5})
//   renderFloorPassChart(passTimeList, passInList, passOutList)
//   /* 今日通行拦截 */
//   const interceptInfo = {
//     data: [
//       { name: '体温异常', value: 5 },
//       { name: '非活体', value: 8 },
//       { name: '陌生人', value: 80 },
//       { name: '黑名单', value: 1 },
//     ],
//     total: 94,
//   }
//   interceptChart = window.echarts.init(document.getElementById('interceptChart'), null, {devicePixelRatio: 2.5})
//   renderInterceptChart(interceptInfo.data)

function renderNotReturnChart(data) {
  const arr = [
    '高三1班',
    '高三2班',
    '高三3班',
    '高二2班',
    '高二1班',
  ]
  const categoryList = data.map((item, index) => {
    if (window.$modelType === 'K12' && item.collegeName) {
      return arr[index]
    }
    return item.collegeName || item.dormitoryName
  })
  const inNumber = data.map((item) => item.inNumber)
  const outNumber = data.map((item) => item.outNumber)
  const returnPercentage = data.map((item) => item.returnPercentage)
  const option = {
    backgroundColor: 'transparent',
    color: BAR_CHART_COLORS,
    legend: {
      top: -2,
      itemWidth: 14,
      itemHeight: 4,
      itemGap: 16,
      textStyle: {
        fontSize: 12,
        lineHeight: 16,
        color: '#fff',
      },
      data: ['当前在寝', '当前未归', ''],
    },
    grid: {
      top: 26,
      left: 0,
      right: 40,
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
            ${params
            .map((item) => {
              if (item.seriesName === '归寝率') {
                return `<p class="rate">
                    ${item.seriesName}&nbsp;${(item.value * 100).toFixed(1)}%
                  </p>`
              }
              return `<p class="item ${item.name === 'rate' ? 'rate' : ''}">
                  <span class="mark" style="background-color: ${item.color};"></span>
                  <span class="name">${item.seriesName}</span>
                  <span class="value">${item.value}</span>
                </p>`
            })
            .join('')}`
      },
    },
    xAxis: {
      type: 'value',
      name: '(人)',
      nameTextStyle: {
        color: TEXTCOLOR,
      },
      axisLabel: {
        color: TEXTCOLOR,
      },
      axisLine: {
        lineStyle: {
          color: LINECOLOR,
        },
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      data: categoryList,
      axisLine: {
        lineStyle: {
          color: LINECOLOR,
        },
      },
      minInterval: 2,
      axisLabel: {
        color: TEXTCOLOR,
      },
      splitLine: {
        lineStyle: {
          color: [LINECOLOR],
        },
      },
    },
    dataZoom: [
      {
        type: 'inside',
        // type: 'slider',
        yAxisIndex: [0],
        width: 20,
        backgroundColor: '#1D2A42',
        fillerColor: '#276B86',
        minValueSpan: 1,
        maxValueSpan: 4,
      },
    ],
    series: [
      {
        name: '当前在寝',
        type: 'bar',
        stack: 'total',
        label: {
          normal: {
            show: true,
            formatter: function (parmas) {
              return parmas.data || ''
            },
          }
        },
        data: inNumber,
      },
      {
        name: '当前未归',
        type: 'bar',
        stack: 'total',
        label: {
          normal: {
            show: true,
            formatter: function (parmas) {
              return parmas.data || ''
            },
          }
        },
        data: outNumber,
      },
      {
        name: '归寝率', // 归寝率显示，生成一个总数的柱状图，将颜色设为透明，造成一个总数显示在柱状图上方的假象
        type: 'bar',
        stack: 'total',
        label: {
          normal: {
            show: true,
            position: 'insideLeft',
            textStyle: { color: '#fff' },
            formatter: function (parmas) {
              return (parmas.data * 100).toFixed(1) + '%'
            },
          },
        },
        itemStyle: {
          normal: {
            color: 'transparent', // 柱状图颜色设为透明
          },
        },
        data: returnPercentage,
      },
    ],
  }
  notReturnChart.clear()
  notReturnChart && notReturnChart.setOption(option)
}

function renderAbnormalWarningChart(data) {
  const legendList = ['昨日晚归', '昨日未归', '多天未出', '多天未归']
  const arr = [
    '高三1班',
    '高三2班',
    '高三3班',
    '高二2班',
    '高二1班',
  ]
  const categoryList = data.map((item, index) => {
    if (window.$modelType === 'K12' && item.collegeName) {
      return arr[index]
    }
    return item.collegeName || item.dormitoryName
  })
  const laterReturnNumber = data.map((item) => item.laterReturnNumber)
  const notReturnNumber = data.map((item) => item.notReturnNumber)
  const manyDayNotInNumber = data.map((item) => item.manyDayNotInNumber)
  const manyDayNotOutNumber = data.map((item) => item.manyDayNotOutNumber)
  const option = {
    backgroundColor: 'transparent',
    color: BAR_CHART_COLORS,
    barMaxWidth: 40,
    legend: {
      type: 'scroll',
      pageIconColor: '#ddd',
      pageIconInactiveColor: '#aaa',
      pageTextStyle: {
        color: '#ddd',
      },
      top: -2,
      itemWidth: 14,
      itemHeight: 4,
      itemGap: 16,
      textStyle: {
        fontSize: 12,
        lineHeight: 16,
        color: '#fff',
      },
      data: legendList,
    },
    grid: {
      top: 40,
      left: 0,
      bottom: 20,
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
            ${params
            .map((item) => {
              return `<p class="item ${item.name === 'rate' ? 'rate' : ''}">
                  <span class="mark" style="background-color: ${item.color};"></span>
                  <span class="name">${item.seriesName}</span>
                  <span class="value">${item.value}</span>
                </p>`
            })
            .join('')}`
      },
    },
    yAxis: {
      type: 'value',
      name: '(人)',
      nameTextStyle: {
        color: TEXTCOLOR,
      },
      axisLabel: {
        color: TEXTCOLOR,
      },
      axisLine: {
        lineStyle: {
          color: LINECOLOR,
        },
      },
      splitLine: {
        show: false,
      },
    },
    xAxis: {
      type: 'category',
      data: categoryList,
      axisLine: {
        lineStyle: {
          color: LINECOLOR,
        },
      },
      minInterval: 2,
      axisLabel: {
        color: TEXTCOLOR,
        interval: 0,
      },
      splitLine: {
        lineStyle: {
          color: [LINECOLOR],
        },
      },
    },
    dataZoom: [
      {
        type: 'slider',
        height: 10,
        backgroundColor: '#1D2A42',
        fillerColor: '#276B86',
        borderColor: 'transparent',
        handleSize: 0,
        moveHandleSize: 0,
        showDetail: false,
        showDataShadow: false,
        minValueSpan: 1,
        maxValueSpan: 3,
        bottom: 0,
      },
    ],
    series: [
      {
        name: '昨日晚归',
        type: 'bar',
        stack: 'total',
        data: laterReturnNumber,
      },
      {
        name: '昨日未归',
        type: 'bar',
        stack: 'total',
        data: notReturnNumber,
      },
      {
        name: '多天未出',
        type: 'bar',
        stack: 'total',
        data: manyDayNotOutNumber,
      },
      {
        name: '多天未归',
        type: 'bar',
        stack: 'total',
        data: manyDayNotInNumber,
      },
    ],
  }
  abnormalWarningChart.clear()
  abnormalWarningChart && abnormalWarningChart.setOption(option)
}

function renderRoomUsageChart(data) {
  const option = {
    backgroundColor: 'transparent',
    color: BAR_CHART_COLORS,
    series: [
      {
        type: 'liquidFill',
        data: [data],
        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#2DCCC2',
              },
              {
                offset: 0.1,
                color: '#19948C',
              },
              {
                offset: 1,
                color: '#249AE2',
              },
            ],
            global: false,
          },
        ],
        radius: '95%',
        amplitude: '8%',
        waveLength: '80%',
        outline: {
          show: true,
          borderDistance: 2,
          itemStyle: {
            borderColor: '#2DE2E5',
            borderWidth: 4,
          },
        },
        backgroundStyle: {
          color: '#020815',
        },
        label: {
          show: true,
          fontSize: 20,
          color: '#FFFFFF',
          formatter: function (param) {
            return param.value * 100 + '%';
          }
        },
        emphasis: {
          itemStyle: {
            opacity: 0.8,
          },
        },
      },
    ],
  }
  roomUsageChart.clear()
  roomUsageChart && roomUsageChart.setOption(option)
}

function renderPassChart(timeList, inList, outList) {
  const option = {
    backgroundColor: 'transparent',
    color: LINE_CHART_COLORS,
    legend: {
      data: ['出', '入'],
      show: false,
    },
    grid: {
      top: 30,
      left: 20,
      right: 0,
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
            ${params
            .map((item) => {
              return `<p class="item">
                  <span class="mark" style="background-color: ${item.color};"></span>
                  <span class="name">${item.seriesName}</span>
                  <span class="value">${item.value}</span>
                </p>`
            })
            .join('')}`
      },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: timeList,
        axisLine: {
          lineStyle: {
            color: LINECOLOR,
          },
        },
        axisLabel: {
          color: TEXTCOLOR,
          interval: 0,
          rotate: 45,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '(人)',
        nameTextStyle: {
          color: TEXTCOLOR,
        },
        axisLine: {
          lineStyle: {
            color: LINECOLOR,
          },
        },
        minInterval: 1,
        axisLabel: {
          color: TEXTCOLOR,
        },
        splitLine: {
          lineStyle: {
            color: [LINECOLOR],
          },
        },
      },
    ],
    series: [
      {
        name: '出',
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
        data: outList,
      },
      {
        name: '入',
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
              color: 'rgba(146,150,238,0.4)',
            },
            {
              offset: 1,
              color: 'rgba(146,150,238,0.1)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: inList,
      },
    ],
  }
  passChart.clear()
  passChart && passChart.setOption(option)
}

function renderInterceptChart(dataList) {
  const legendArr = dataList.map(item => {
    return item.name
  })
  const option = {
    backgroundColor: 'transparent',
    color: PIE_CHART_COLORS,
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
      data: legendArr,
    },
    series: [
      {
        name: '今日拦截通行',
        type: 'pie',
        radius: '65%',
        right: '10%',
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
        data: dataList,
      },
    ],
  }
  interceptChart.clear()
  interceptChart && interceptChart.setOption(option)
}

function renderFloorPassChart(timeList, inList, outList) {
  const option = {
    backgroundColor: 'transparent',
    color: LINE_CHART_COLORS,
    legend: {
      data: ['出', '入'],
      show: false,
    },
    grid: {
      top: 30,
      left: 20,
      right: 0,
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
            ${params
            .map((item) => {
              return `<p class="item">
                  <span class="mark" style="background-color: ${item.color};"></span>
                  <span class="name">${item.seriesName}</span>
                  <span class="value">${item.value}</span>
                </p>`
            })
            .join('')}`
      },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: timeList,
        axisLine: {
          lineStyle: {
            color: LINECOLOR,
          },
        },
        axisLabel: {
          color: TEXTCOLOR,
          interval: 0,
          rotate: 45,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '(人)',
        nameTextStyle: {
          color: TEXTCOLOR,
        },
        axisLine: {
          lineStyle: {
            color: LINECOLOR,
          },
        },
        minInterval: 1,
        axisLabel: {
          color: TEXTCOLOR,
        },
        splitLine: {
          lineStyle: {
            color: [LINECOLOR],
          },
        },
      },
    ],
    series: [
      {
        name: '出',
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
        data: outList,
      },
      {
        name: '入',
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
              color: 'rgba(146,150,238,0.4)',
            },
            {
              offset: 1,
              color: 'rgba(146,150,238,0.1)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: inList,
      },
    ],
  }
  floorPassChart.clear()
  floorPassChart && floorPassChart.setOption(option)
}