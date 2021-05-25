$(function () {
  let notReturnChart = null
  let abnormalWarningChart = null
  let roomUsageChart = null
  let passChart = null
  let interceptChart = null

  const PIE_CHART_COLORS = ['#9095EC', '#228AE1', '#2DE2E5', '#F2679A']
  const BAR_CHART_COLORS = ['#2DE2E5', '#228AE1', '#FCE569', '#F2679A']
  const LINE_CHART_COLORS = ['#2DE2E5', '#9095EC']
  const TEXTCOLOR = '#7EADC0'

  /* 未归寝率排行 */
  notReturnChart = echarts.init(document.getElementById('notReturnChart'), null, {devicePixelRatio: 2.5})
  renderNotReturnChart()
  /* 异常预警 */
  abnormalWarningChart = echarts.init(document.getElementById('abnormalWarningChart'), null, {devicePixelRatio: 2.5})
  renderAbnormalWarningChart()
  

  /* 房间使用率 */
  roomUsageChart = echarts.init(document.getElementById('roomUsageChart'), null, {devicePixelRatio: 2.5})
  const roomUsageData = {
    idle: 32629,
    total: 33487,
  }
  renderRoomUsageChart(
    !roomUsageData.total
      ? '0'
      : ((roomUsageData.total - roomUsageData.idle) / roomUsageData.total).toFixed(2)
  )

  /* 今日通行人数 */
  const passInfo = {
    data: [
      { time: "09:00", in: 0, out: 0 },
      { time: "09:30", in: 0, out: 0 },
      { time: "10:00", in: 0, out: 0 },
      { time: "10:30", in: 0, out: 0 },
      { time: "11:00", in: 0, out: 0 },
      { time: "11:30", in: 0, out: 0 },
      { time: "12:00", in: 0, out: 0 },
      { time: "12:30", in: 0, out: 0 },
      { time: "13:00", in: 0, out: 0 },
      { time: "13:30", in: 0, out: 0 },
      { time: "14:00", in: 8, out: 0 },
      { time: "14:30", in: 0, out: 1 }
    ],
    in: 11,
    out: 1
  }
  const passTimeList = passInfo.data.map((item) => item.time)
  const passInList = passInfo.data.map((item) => item.in)
  const passOutList = passInfo.data.map((item) => item.out)
  passChart = echarts.init(document.getElementById('passChart'), null, {devicePixelRatio: 2.5})
  renderPassChart(passTimeList, passInList, passOutList)
  /* 今日通行拦截 */
  const interceptInfo = {
    data: [
      { name: '体温异常', value: 5 },
      { name: '非活体', value: 8 },
      { name: '陌生人', value: 80 },
      { name: '黑名单', value: 1 },
    ],
    total: 94,
  }
  interceptChart = echarts.init(document.getElementById('interceptChart'), null, {devicePixelRatio: 2.5})
  renderInterceptChart(interceptInfo.data)

  function renderNotReturnChart() {
    const inData = [320, 302, 301, 334, 390, 330, 320]
    const outData = [120, 132, 101, 134, 90, 230, 210]
    let rateData = []
    inData.forEach((item, index) => {
      rateData.push(item / (item + outData[index]))
    })
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
        bottom: 0,
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
        backgroundColor: '#0B1931',
        borderColor: '#263752',
        textStyle: {
          color: '#fff',
        },
        padding: 10,
        className: 'echarts-tooltip echarts-tooltip-dark',
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
        axisLabel: {
          color: '#7EADC0',
        },
        axisLine: {
          lineStyle: {
            color: '#3C415B',
          },
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'category',
        data: ['管理学院', '计算机学院', '经济管理学院', '机电工程学院', '外语学院'],
        axisLine: {
          lineStyle: {
            color: '#3C415B',
          },
        },
        minInterval: 2,
        axisLabel: {
          color: '#7EADC0',
        },
        splitLine: {
          lineStyle: {
            color: ['#3C415B'],
          },
        },
      },
      series: [
        {
          name: '当前在寝',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          data: inData,
        },
        {
          name: '当前未归',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          data: outData,
        },
        {
          name: '归寝率', // 归寝率显示，生成一个总数的柱状图，将颜色设为透明，造成一个总数显示在柱状图上方的假象
          type: 'bar',
          stack: 'total',
          label: {
            normal: {
              show: true,
              position: 'right',
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
          data: rateData,
        },
      ],
    }
    notReturnChart && notReturnChart.setOption(option)
  }

  function renderAbnormalWarningChart() {
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      color: BAR_CHART_COLORS,
      legend: {
        data: ['当前在寝', '当前未归'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['管理学院', '计算机学院', '经济管理学院', '机电工程学院', '外语学院'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '当前在寝',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [320, 302, 301, 334, 390, 330, 320],
        },
        {
          name: '当前未归',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series',
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
      ],
    }
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
          },
          emphasis: {
            itemStyle: {
              opacity: 0.8,
            },
          },
        },
      ],
    }
    roomUsageChart && roomUsageChart.setOption(option)
  }

  function renderPassChart(timeList, inList, outList) {
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          label: {
            backgroundColor: '#31384D',
          },
        },
        formatter(vals) {
          return `<ul class="chart-pass-tooltip"><li>${vals[0].axisValueLabel}</li><li><span style="background:${vals[0].color}"></span>${vals[0].seriesName}: ${vals[0].value}人</li><li><span style="background:${vals[1].color}"></span>${vals[1].seriesName}: ${vals[1].value}人</li></ul>`
        },
      },
      color: LINE_CHART_COLORS,
      legend: {
        data: ['出', '入'],
        show: false,
      },
      grid: {
        left: 60,
        right: 24,
        bottom: 34,
        top: 12,
        tooltip: {
          axisPointer: {
            label: {
              show: false,
            },
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#19948C',
                  },
                  {
                    offset: 1,
                    color: '#FCE56A',
                  },
                ],
                global: false,
              },
            },
          },
        },
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: timeList,
          axisLine: {
            lineStyle: {
              color: '#1D2538',
            },
          },
          axisLabel: {
            color: '#7EADC0',
            interval: 0,
            rotate: 45,
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
          name: '出',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 1,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
    passChart && passChart.setOption(option)
  }

  function renderInterceptChart(dataList) {
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
      },
      color: PIE_CHART_COLORS,
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '50%',
          data: dataList,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    interceptChart && interceptChart.setOption(option)
  }
})