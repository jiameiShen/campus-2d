$(function () {
  // 模拟楼层学生数据
  let dataList = Mock.mock({
    'data|23': [
      {
        totalNumber: 4,
        inNumber: 2, // 在寝
        outNumber: 1, // 离寝
        leaveNumber: 1, // 请假
        floorNumber: 1,
        roomId: '91865b3c250740829984d4f498839159',
        'roomNumber|+1': 1,
        'bedDTOList|4': [
          {
            'isLeave|1': false, // 请假
            'status|0-1': 0, // 0外出 1在寝
            studentId: '@id',
            studentName: '@cname',
            documentId: '@natural',
            mobileNumber: '15822189120',
            classNameStr: '管理学院-信息管理-2017-信管1班',
            personIdentityCard: '441581199408045974',
            personCard: '324234',
            personTypeName: '普通人员',
          },
        ],
      },
    ],
  }).data


  // 房间分布
  let roomList = []
  let roomTemplate = []

  // 房间统计
  let roomStatisticsList = []
  let roomStatisticsTemplate = ''

  dataList.forEach(item => {
    // 房间名称
    const roomName = `${item.floorNumber}${item.roomNumber.toString().padStart(2, '0')}`

    // 归寝率
    const inRate = item.inNumber/item.totalNumber
    roomList.push(
      `<li class="room-item js-room-item" data-room="${item.roomNumber}">
        <span class="room-order">${roomName}</span>
        <div class="bed-group bed-group-1" data-bed="01"></div>
        <div class="bed-group bed-group-2" data-bed="02"></div>
      </li>`
    )

    roomStatisticsList.push(
      `<li class="item">
        <div class="cell cell-1">
          <span class="icon icon-door"></span>
          <span class="name">${roomName}</span>
          <span class="rate">归寝率：${(inRate*100).toFixed(2)}%</span>
        </div>
        <div class="cell cell-2">
          <div class="inner" style="width: ${parseInt(inRate*100)}%"></div>
        </div>
        <div class="cell cell-3">
          <span class="count">入住：${item.totalNumber}</span>
          <span class="count">在寝：${item.inNumber}</span>
          <span class="count">在外：${item.outNumber}</span>
          <span class="count">请假：${item.leaveNumber}</span>
        </div>
      </li >`
    )
  })

  roomTemplate = `<ul class="level-mock" id="levelMock">${roomList.join('')}</ul>`
  roomStatisticsTemplate = `<ul class="list">${roomStatisticsList.join('')}</ul>`

  $('#div2d').append($(roomTemplate))
  $('#roomStatisticsChart').html($(roomStatisticsTemplate))

  // 模拟3d放学生信息进去
  dataList.forEach((room) => {
    const roomNumber = room.roomNumber
    room.bedDTOList.forEach((bed, bedIndex) => {
      let bedNum = '01'
      if (bedIndex >= 2) {
        bedNum = '02'
      }
      let color = ''
      if (bed.isLeave) {
        color = 'color-green'
      } else if (!bed.status) {
        color = 'color-yellow'
      }
      $(`.js-room-item[data-room="${roomNumber}"]`)
        .find(`[data-bed="${bedNum}"]`)
        .append($(`<span class="bed-item bed-item-${bedIndex} ${color}" data-student-id="${bed.studentId}">${bedNum}${bed.studentName}</span>`))
    })
  })

  // 查寝统计弹窗
  $('#checkStatisticsChart').on('click', '.item', function () {
    // 持续天数和开始日期不要
    const isMulti = $(this).index() > 3
    let template = `
      <table class="g-table">
        <thead>
          <tr>
            <th>姓名</th>
            <th>房间</th>
            <th>床位</th>
            ${isMulti ? `
            <th>持续天数</th>
            <th>开始日期</th>
            `: ''}
          </tr>
        </thead>
        <tbody>
          ${
            (`<tr>
              <td>赵柳</td>
              <td>101</td>
              <td>02</td>
              ${isMulti ? `
                  <td>10</td>
                  <td>2021-04-23</td>
                  `: ''}
            </tr>`).repeat(4)
          }
        </tbody>
      </table>
    `
    $('#checkStatisticsModal').find('.modal-body').html($(template))
    console.log($(this).index())
    $('#checkStatisticsModal .modal-title').text($(this).find('.k').text())
    $('#checkStatisticsModal').modal()
  })

  $('#levelMock').on('click', '.bed-item', function () {
    const studentId = $(this).data('student-id')
    let studentInfo = null
    dataList.forEach((room) => {
      if (studentInfo) {
        return
      }
      studentInfo = room.bedDTOList.find(bed => bed.studentId === studentId)
    })

    if (!studentId) return

    let color = ''
    let status = '在寝'
    if (studentInfo.isLeave) {
      color = 'color-green'
      status = '请假'
    } else if (!studentInfo.status) {
      color = 'color-yellow'
      status = '外出'
    }
    let template = `
      <ul class="g-dialog-details" >
        <li class="item">
          <span class="subject">当前状态</span>
          <span class="content ${color}">${status}</span>
        </li>
        <li class="item">
          <span class="subject">学号</span>
          <span class="content">${studentInfo.documentId}</span>
        </li>
        <li class="item">
          <span class="subject">姓名</span>
          <span class="content">${studentInfo.studentName}</span>
        </li>
        <li class="item">
          <span class="subject">手机号</span>
          <span class="content">${studentInfo.mobileNumber}</span>
        </li>
        <li class="item">
          <span class="subject">院系班级</span>
          <span class="content">${studentInfo.classNameStr}</span>
        </li>
        <li class="item">
          <span class="subject">身份证号</span>
          <span class="content">${studentInfo.personIdentityCard}</span>
        </li>
        <li class="item">
          <span class="subject">一卡通号</span>
          <span class="content">${studentInfo.personCard}</span>
        </li>
        <li class="item">
          <span class="subject">人员类型</span>
          <span class="content">${studentInfo.personTypeName}</span>
        </li>
      </ul >
    `
    $('#studentInfoModal').find('.modal-body').html($(template))
    $('#studentInfoModal').modal()
  })

  let floorPassChart = null

  const LINE_CHART_COLORS = ['#2DE2E5', '#9095EC']
  const TEXTCOLOR = '#7EADC0'
  
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
  floorPassChart = window.echarts.init(document.getElementById('floorPassChart'), null, { devicePixelRatio: 2.5 })
  renderFloorPassChart(passTimeList, passInList, passOutList)

  function renderFloorPassChart(timeList, inList, outList) {
    const option = {
      backgroundColor: 'transparent',
      color: LINE_CHART_COLORS,
      legend: {
        data: ['出', '入'],
        show: false,
      },
      grid: {
        top: 20,
        left: 20,
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
              color: '#1D2538',
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
          axisLine: {
            lineStyle: {
              color: '#1D2538',
            },
          },
          minInterval: 1,
          axisLabel: {
            color: TEXTCOLOR,
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
})