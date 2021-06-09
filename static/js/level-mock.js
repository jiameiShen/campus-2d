$(function () {
  let floorNumber = 1
  const ROOM_TOTAL = 23
  const ROOM_BED = 4
  // 模拟楼层学生数据
  let dataList = Mock.mock({
    [`data|${ROOM_TOTAL}`]: [
      {
        totalNumber: ROOM_BED,
        inNumber: 0, // 在寝
        outNumber: 0, // 离寝
        leaveNumber: 0, // 请假
        floorNumber: floorNumber,
        roomId: '91865b3c250740829984d4f498839159',
        'roomNumber|+1': 1,
        [`bedDTOList|${ROOM_BED}`]: [
          {
            roomName: '',
            bedNum: '',
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
  let roomMap = new Map()
  let roomList = []
  let roomTemplate = []

  // 查寝统计
  let checkData = {
    inNumber: [],
    outNumber: [],
    laterReturnNumber: [],
    notReturnNumber: [],
    manyDayNotOutNumber: [],
    manyDayNotInNumber: [],
  }

  let checkDataMap = new Map()
    .set('inNumber', '当前在寝')
    .set('outNumber', '当前在外')
    .set('laterReturnNumber', '昨日晚归')
    .set('notReturnNumber', '昨日未归')
    .set('manyDayNotOutNumber', '多天未出')
    .set('manyDayNotInNumber', '多天未归')

  // 房间统计
  let roomStatisticsList = []
  let roomStatisticsTemplate = ''

  dataList.forEach(item => {
    // 房间名称
    item.roomNumber = item.roomNumber.toString().padStart(2, '0')
    item.roomName = `${item.floorNumber}${item.roomNumber}`
    item.bedDTOList.forEach((bed, bedIndex) => {
      bed.roomName = item.roomName
      bed.bedNum = bedIndex + 1 + '号床'
      if (bed.status === 1) {
        item.inNumber++
        checkData.inNumber.push(bed)
        if (checkData.laterReturnNumber.length < 10) {
          checkData.laterReturnNumber.push(bed)
        }
        if (checkData.manyDayNotOutNumber.length < 10) {
          checkData.manyDayNotOutNumber.push(bed)
        }
      } else if (bed.status === 0) {
        item.outNumber++
        checkData.outNumber.push(bed)
        if (checkData.laterReturnNumber.length < 10) {
          checkData.laterReturnNumber.push(bed)
        }
        if (checkData.notReturnNumber.length < 10) {
          checkData.notReturnNumber.push(bed)
        }
        if (checkData.manyDayNotInNumber.length < 10) {
          checkData.manyDayNotInNumber.push(bed)
        }
      }
      if (bed.isLeave) {
        item.leaveNumber++
      }
    })
    // 归寝率
    item.inRate = item.inNumber / item.totalNumber

    roomMap.set(item.roomNumber, item)
    roomList.push(
      `<li class="room-item js-room-item" data-room="${item.roomNumber}">
        <span class="room-order">${item.roomName}</span>
        <div class="bed-group bed-group-1" data-bed="01"></div>
        <div class="bed-group bed-group-2" data-bed="02"></div>
      </li>`
    )

    roomStatisticsList.push(
      `<li class="item">
        <div class="cell cell-1">
          <span class="icon icon-door"></span>
          <span class="name">${item.roomName}</span>
          <span class="rate">归寝率：${(item.inRate * 100).toFixed(2)}%</span>
        </div>
        <div class="cell cell-2">
          <div class="inner" style="width: ${parseInt(item.inRate * 100)}%"></div>
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

  // 查寝统计
  let checkDataTemplate = ''
  let checkDataIndex = 1
  for (let key in checkData) {
    checkDataTemplate += `
      <li class="item" data-key="${key}">
        <span class="icon icon-${checkDataIndex}"></span>
        <span class="k">${checkDataMap.get(key)}</span>
        <span class="v ${checkDataIndex > 2 && 'color-red'}">${checkData[key].length}</span>
        <span class="glyphicon glyphicon-menu-right"></span>
      </li>
    `
    checkDataIndex++
  }
  $('#checkStatisticsChart').html($(`<ul class="list">${checkDataTemplate}</ul>`))
  // 查寝统计弹窗
  $('#checkStatisticsChart').on('click', '.item', function () {
    // 持续天数和开始日期不要
    const KEY = $(this).data('key')
    const isMulti = ['manyDayNotOutNumber', 'manyDayNotInNumber'].includes(KEY)
    const list = checkData[KEY]
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
        ${list.map(item => {
      return `<tr>
              <td>${item.studentName}</td>
              <td>${item.roomName}</td>
              <td>${item.bedNum}</td>
              ${isMulti ? `
                <td>10</td>
                <td>2021-04-23</td>
              `: ''}
            </tr>`
    }).join('')
      }
        </tbody>
      </table>
    `
    $('#checkStatisticsModal').find('.modal-body').html($(template))
    console.log($(this).index())
    $('#checkStatisticsModal .modal-title').text($(this).find('.k').text())
    $('#checkStatisticsModal').modal()
  })

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