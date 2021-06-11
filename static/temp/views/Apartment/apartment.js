/**
 * @class CreatePageApartment
 * @desc 创建公寓管理
 * @param
 * @returns
 */
THING.Utils.dynamicLoad('/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Apartment/apartment.css')
THING.Utils.dynamicLoad('/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Apartment/apartmentChart.js')
console.log('CreatePageApartment')

class CreatePageApartment {
  pageId = 'Apartment'
  buildingName = ''
  dormitoryId = ''
  floorName = ''
  notReturnChart_current = 'dormitory'
  abnormalWarningChart_current = 'dormitory'
  fetchTimer = null
  fetchInterval = 15000
  constructor(data) {
    if (data) {
      this.pageId = data.pageId || this.pageId
      this.buildingName = data.buildingName || ''
      this.floorName = data.floorName || ''
    }
  }

  onAdd(app) {
    this.init()
    /* 房间信息隐藏事件 */
    $('#div2d').on('click', '.js-tool-show-room', function () {
      if (!!$(this).data('open')) {
        $(this).data('open', 0)
        $(this).text('展示房间信息')
        $('.room-marker').hide()
      } else {
        $(this).data('open', 1)
        $(this).text('隐藏房间信息')
        $('.room-marker').show()
      }
    })

    /* 点击房间 */
    app.query('.Room').on(THING.EventType.SingleClick, function () {
      let roomNumber = this.userData.room;
      if ($(`#board${roomNumber}`).length > 0) {
        $(`#board${roomNumber}`).toggle()
      }
    });
  }

  onRemove() {
    $(`#${this.pageId}`).remove()
  }

  /**
   * 初始化面板
   */
  init() {
    let _this = this
    // 插入到 ThingJS 内置的 2D 界面 #pageContainer 中
    $(`#page${this.pageId}`).html($(apartmentTemplate));

    // 设置当前图表选项
    /* 归寝率排行 */
    $(document).on('click', '#notReturnChartButton .tab-item', function () {
      $(this).addClass('active').siblings().removeClass('active')
      _this.notReturnChart_current = $(this).data('val')
      _this.$_renderNotReturnChart(_this.notReturnChart_current)
    })

    /* 异常预警 */
    $(document).on('click', '#abnormalWarningChartButton .tab-item', function () {
      $(this).addClass('active').siblings().removeClass('active')
      _this.abnormalWarningChart_current = $(this).data('val')
      _this.$_renderAbnormalWarningChart(_this.abnormalWarningChart_current)
    })

    this.render()
  }

  reload(data) {
    if (data) {
      this.pageId = data.pageId || this.pageId
      this.buildingName = data.buildingName || ''
      this.floorName = data.floorName || ''
    }

    if (data.floorName) {
      $(`#page${this.pageId}`).html($(apartmentLevelTemplate));
      this.renderFloor()
    } else {
      $(`#page${this.pageId}`).html($(apartmentTemplate));
      this.render()
    }
  }

  render() {
    let currentObj = app.level.current
    this.dormitoryId = currentObj.userData.dormitoryId || ''
    let _this = this
    $(`#page${this.pageId} .js-building-name`).each(function () {
      $(this).text(_this.buildingName || $(this).data('school') || '')
    })
    if (this.buildingName) {
      $('#notReturnChartButton').hide()
      $('#abnormalWarningChartButton').hide()
    } else {
      this.pickNotReturnChart()
      this.pickAbnormalWarningChart()
      $('#notReturnChartButton').show()
      $('#abnormalWarningChartButton').show()
    }
    this.startFetch()
  }

  renderFloor() {
    let _this = this
    $(`#page${this.pageId} .js-floor-name`).text(this.floorName)
    // 模拟楼层学生数据
    let floorNumber = parseInt(this.floorName)
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

    roomStatisticsTemplate = `<ul class="list">${roomStatisticsList.join('')}</ul>`
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

    // 循环展示各房间信息
    let currentFloor = app.level.current
    currentFloor.rooms.forEach(function (room) {
      let roomData = roomMap.get(room.userData.room)
      if (roomData) {
        let template = `
          <div class="room-marker" id="board${roomData.roomNumber}">
            <div class="caption">${roomData.roomName}</div>
            <ul class="list">
              ${roomData.bedDTOList.map((bed, index) => {
          let color = ''
          let status = '在寝'
          if (bed.isLeave) {
            color = 'color-green'
            status = '请假'
          } else if (!bed.status) {
            color = 'color-yellow'
            status = '外出'
          }
          return `<li class="item">
                  <span class="item-info">${index + 1}号床</span>
                  <span class="item-info item-name ${color} bed-item" data-room-number="${roomData.roomNumber}" data-student-id="${bed.studentId}">${bed.studentName}</span>
                  <span class="item-info">${status}</span>
                </li>`
        }).join('')}
            </ul>
          </div>
        `
        $(`#page${_this.pageId}`).append($(template));
        app.create({
          type: 'UIAnchor',
          parent: room,
          element: document.getElementById('board' + roomData.roomNumber),
          localPosition: [0, 0, 0],
          pivot: [0.5, 1]
        });
      }
    })
    $('.room-marker').hide()

    $('#div2d').on('click', '.room-marker .bed-item', function () {
      const roomNumber = $(this).data('room-number').toString()
      const studentId = $(this).data('student-id')
      let room = roomMap.get(roomNumber)
      if (!room) {
        return
      }
      let studentInfo = room.bedDTOList.find(bed => bed.studentId === studentId)
      if (!studentInfo) return
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
  }

  pickNotReturnChart(val) {
    $(`#notReturnChartButton .tab-item[data-val="${val || this.notReturnChart_current}"]`)
      .addClass('active')
      .siblings()
      .removeClass('active')

  }

  pickAbnormalWarningChart(val) {
    $(`#abnormalWarningChartButton .tab-item[data-val="${val || this.abnormalWarningChart_current}"]`)
      .addClass('active')
      .siblings()
      .removeClass('active')
  }

  $_renderNotReturnChart(val) {
    const curType = val || this.notReturnChart_current
    $_ajaxPromise({
      type: "get",
      url: `${window.$baseUrl}/${curType === 'college' ? 'queryCollegeBedRate' : 'queryDormitoryBedRate'}`,
      data: {
        dormitoryId: this.dormitoryId
      },
      dataType: "json"
    }).then(res => {
      const { message } = res
      if (message) {
        notReturnChart = window.echarts.init(document.getElementById('notReturnChart'), null, { devicePixelRatio: 2.5 })
        renderNotReturnChart(message)
      }
    })
  }

  $_renderAbnormalWarningChart(val) {
    const curType = val || this.abnormalWarningChart_current
    $_ajaxPromise({
      type: "get",
      url: `${window.$baseUrl}/${curType === 'college' ? 'queryCollegeAbnormalInfo' : 'queryDormitoryAbnormalInfo'}`,
      data: {
        dormitoryId: this.dormitoryId
      },
      dataType: "json"
    }).then(res => {
      const { message } = res
      if (message) {
        abnormalWarningChart = window.echarts.init(document.getElementById('abnormalWarningChart'), null, { devicePixelRatio: 2.5 })
        renderAbnormalWarningChart(message)
      }
    })
  }

  fetchData() {
    let notReturnChart_current = ''
    let abnormalWarningChart_current = ''
    if (this.buildingName) {
      notReturnChart_current = 'college'
      abnormalWarningChart_current = 'college'
    }

    /* 归寝率排行 */
    this.$_renderNotReturnChart(notReturnChart_current)

    /* 异常预警 */
    this.$_renderAbnormalWarningChart(abnormalWarningChart_current)

    $_ajaxPromise({
      type: "get",
      url: `${window.$baseUrl}/queryIndexData`,
      data: {
        dormitoryId: this.dormitoryId
      },
      dataType: "json"
    }).then(res => {
      const { message } = res
      if (message) {
        const { roomtInfo, trafficInfo, warning } = message
        /* 基础信息 */
        this.changeChartBasicCaption(roomtInfo)

        /* 房间使用率 */
        $('#roomUsageChartFree').numberRock({ lastNumber: roomtInfo.bedFreeNumber })
        $('#roomUsageChartTotal').numberRock({ lastNumber: roomtInfo.bedNumber })
        roomUsageChart = window.echarts.init(document.getElementById('roomUsageChart'), null, { devicePixelRatio: 2.5 })
        renderRoomUsageChart(roomtInfo.bedUsePercentage / 100)

        /* 今日通行人数 */
        const passTimeList = trafficInfo.todayTrafficInfo.map((item) => item.time)
        const passInList = trafficInfo.todayTrafficInfo.map((item) => item.in)
        const passOutList = trafficInfo.todayTrafficInfo.map((item) => item.out)
        $('#passChartIn').text(trafficInfo.inNumber)
        $('#passChartOut').text(trafficInfo.outNumber)
        passChart = window.echarts.init(document.getElementById('passChart'), null, { devicePixelRatio: 2.5 })
        renderPassChart(passTimeList, passInList, passOutList)

        /* 今日通行拦截 */
        const interceptInfo = {
          data: [
            { name: '体温异常', value: warning.temperatureUnusualNumber },
            { name: '非活体', value: warning.todayNotLivingNumber },
            { name: '陌生人', value: warning.todayStrangerNumber },
            { name: '黑名单', value: warning.todayBlacklistNumber },
          ],
          total: warning.todayAbnormalNumber,
        }
        $('#interceptChartTotal').text(interceptInfo.total)
        interceptChart = window.echarts.init(document.getElementById('interceptChart'), null, { devicePixelRatio: 2.5 })
        renderInterceptChart(interceptInfo.data)
      }
    })
  }

  startFetch() {
    this.stopFetch()
    this.fetchData()
    this.fetchTimer = setInterval(() => {
      this.fetchData()
    }, this.fetchInterval)
  }

  stopFetch() {
    this.fetchTimer && clearInterval(this.fetchTimer)
  }

  changeChartBasicCaption(roomtInfo) {
    let template = `<ul class="list">
      ${this.buildingName ? `<li class="item item-dormitory">
        <p><span class="count js-rock-number">6</span>层</p>
        <p class="caption">楼层总数</p>
      </li>`
        : `<li class="item item-dormitory">
        <p><span class="count js-rock-number">${roomtInfo.dormitoryNumber}</span>栋</p>
        <p class="caption">楼栋总数</p>
      </li>`
      }<li class="item item-room">
        <p><span class="count js-rock-number">${roomtInfo.roomNumber}</span>间</p>
        <p class="caption">房间总数</p>
      </li>
      <li class="item item-bed">
        <p><span class="count js-rock-number">${roomtInfo.bedNumber}</span>张</p>
        <p class="caption">床位总数</p>
      </li>
      <li class="item item-people">
        <p><span class="count js-rock-number">${roomtInfo.bedStayNumber}</span>人</p>
        <p class="caption">入住总数</p>
      </li>
    </ul>`
    $('.chart-basic .chart-block__bd').html($(template))
    $(".chart-basic .js-rock-number").each(function () {
      $(this).numberRock({
        lastNumber: parseInt($(this).text())
      });
    })
  }
}

function $_ajaxPromise(params) {
  return new Promise((resovle, reject) => {
    $.ajax({
      "type": params.type || "get",
      "async": params.async || true,
      "url": params.url,
      "data": params.data || "",
      "success": res => {
        resovle(res);
      },
      "error": err => {
        reject(err);
      }
    })
  })
}

var apartmentTemplate = `
    <div class="page-aside page-aside-left animate__animated page-apartment">
          <div class="chart-block chart-basic flex-none">
            <div class="chart-block__hd">
              <p>
                <span class="js-building-name" data-school="学校"></span>概况
              </p>
            </div>
            <div class="chart-block__bd">
              <ul class="list">
                <li class="item item-dormitory">
                  <p><span class="count js-rock-number">0</span>栋</p>
                  <p class="caption">楼栋总数</p>
                </li>
                <li class="item item-room">
                  <p><span class="count js-rock-number">0</span>间</p>
                  <p class="caption">房间总数</p>
                </li>
                <li class="item item-bed">
                  <p><span class="count js-rock-number">0</span>张</p>
                  <p class="caption">床位总数</p>
                </li>
                <li class="item item-people">
                  <p><span class="count js-rock-number">0</span>人</p>
                  <p class="caption">入住总数</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="chart-block chart-not-return">
            <div class="chart-block__hd">
              <p><span class="js-building-name"></span>归寝率排行</p>
              <ul class="tab-list" id="notReturnChartButton">
                <li class="tab-item active" data-val="dormitory">楼栋</li>
                <li class="tab-item" data-val="college">院系</li>
              </ul>
            </div>
            <div class="chart-block__bd">
              <div id="notReturnChart"></div>
            </div>
          </div>
          <div class="chart-block chart-abnormal">
            <div class="chart-block__hd">
              <p><span class="js-building-name"></span>异常预警</p>
              <ul class="tab-list" id="abnormalWarningChartButton">
                <li class="tab-item active" data-val="dormitory">楼栋</li>
                <li class="tab-item" data-val="college">院系</li>
              </ul>
            </div>
            <div class="chart-block__bd">
              <div id="abnormalWarningChart"></div>
            </div>
          </div>
        </div>
        <div class="page-aside page-aside-right animate__animated page-apartment">
          <div class="chart-block chart-room-usage flex-none">
            <div class="chart-block__hd">
               <p><span class="js-building-name"></span>房间使用率</p>
            </div>
            <div class="chart-block__bd">
              <div id="roomUsageChart" class="left"></div>
              <div class="right">
                <div class="item square-card">
                  <span class="caret-left"></span>
                  <span class="dot"></span>未使用床位<span class="text" id="roomUsageChartFree">0</span>
                  <span class="caret-right"></span>
                </div>
                <div class="item square-card square-card--green">
                  <span class="caret-left"></span>
                  <span class="dot"></span>总床位<span class="text" id="roomUsageChartTotal">0</span>
                  <span class="caret-right"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="chart-block chart-pass">
            <div class="chart-block__hd">
              <p><span class="js-building-name"></span>今日通行人数</p>
              <ul class="label-list">
                <li class="label-item">出：<span id="passChartOut">0</span></li>
                <li class="label-item">入：<span id="passChartIn">0</span></li>
              </ul>
            </div>
            <div class="chart-block__bd">
              <div id="passChart"></div>
            </div>
          </div>
          <div class="chart-block chart-intercept">
            <div class="chart-block__hd">
              <p><span class="js-building-name"></span>今日通行拦截</p>
              <ul class="label-list">
                <li class="label-item">总人数：<span id="interceptChartTotal">0</span></li>
              </ul>
            </div>
            <div class="chart-block__bd">
              <div id="interceptChart"></div>
            </div>
          </div>
        </div>
`

var apartmentLevelTemplate = `
    <div class="page-apartment-toolbar">
      <div class="legend-item"><span class="icon bg-yellow"></span>在外</div>
      <div class="legend-item"><span class="icon bg-green"></span>请假</div>
      <div class="vbtn js-tool-show-room" data-open="0">展示房间信息</div>
    </div>
    <div class="page-aside page-aside-left animate__animated page-apartment page-apartment-detail">
      <div class="chart-block chart-room-count">
        <div class="chart-block__hd">
          <p class="brand js-floor-name">1F</p>
        </div>
        <div class="chart-block__bd">
          <div class="left room-count-wrapper">
            <div class="inner">
              <p class="count js-rock-number">23</p>
              <p class="desc">房间总数</p>
            </div>
          </div>
          <div class="right square-card--hasline">
            <div class="square-card">
              <span class="caret-left"></span>
              <span class="dot"></span>空房间数<span class="text">0</span>
              <span class="caret-right"></span>
            </div>
            <div class="square-card">
              <span class="caret-left"></span>
              <span class="dot"></span>床位总数<span class="text">92</span>
              <span class="caret-right"></span>
            </div>
            <div class="square-card">
              <span class="caret-left"></span>
              <span class="dot"></span>空床位数<span class="text">0</span>
              <span class="caret-right"></span>
            </div>
            <div class="square-card">
              <span class="caret-left"></span>
              <span class="dot"></span>入住人数<span class="text">92</span>
              <span class="caret-right"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="chart-block chart-check-statistics">
        <div class="chart-block__hd">查寝统计</div>
        <div class="chart-block__bd" id="checkStatisticsChart">
          <ul class="list">
            <li class="item" data-key="inNumber">
              <span class="icon icon-1"></span>
              <span class="k">当前在寝</span>
              <span class="v">20</span>
              <span class="glyphicon glyphicon-menu-right"></span>
            </li>
            <li class="item" data-key="outNumber">
              <span class="icon icon-2"></span>
              <span class="k">当前在外</span>
              <span class="v">20</span>
              <span class="glyphicon glyphicon-menu-right"></span>
            </li>
            <li class="item" data-key="laterReturnNumber">
              <span class="icon icon-3"></span>
              <span class="k">昨日晚归</span>
              <span class="v color-red">20</span>
              <span class="glyphicon glyphicon-menu-right"></span>
            </li>
            <li class="item" data-key="notReturnNumber">
              <span class="icon icon-4"></span>
              <span class="k">昨日未归</span>
              <span class="v color-red">20</span>
              <span class="glyphicon glyphicon-menu-right"></span>
            </li>
            <li class="item" data-key="manyDayNotOutNumber">
              <span class="icon icon-5"></span>
              <span class="k">多天未出</span>
              <span class="v color-red">20</span>
              <span class="glyphicon glyphicon-menu-right"></span>
            </li>
            <li class="item" data-key="manyDayNotInNumber">
              <span class="icon icon-6"></span>
              <span class="k">多天未归</span>
              <span class="v color-red">20</span>
              <span class="glyphicon glyphicon-menu-right"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="page-aside page-aside-right animate__animated page-apartment page-apartment-detail">
      <div class="chart-block">
        <div class="chart-block__hd">
          <p><span class="js-building-name"></span>归寝趋势</p>
          <ul class="label-list">
            <li class="label-item">归寝：<span id="passChartIn">7</span></li>
            <li class="label-item">外出：<span id="passChartOut">1</span></li>
          </ul>
        </div>
        <div class="chart-block__bd">
          <div id="floorPassChart"></div>
        </div>
      </div>
      <div class="chart-block chart-room-statistics">
        <div class="chart-block__hd">各房间统计</div>
        <div class="chart-block__bd" id="roomStatisticsChart">
          <ul class="list">
            <li class="item">
              <div class="cell cell-1">
                <span class="icon icon-door"></span>
                <span class="name">101</span>
                <span class="rate">归寝率：50%</span>
              </div>
              <div class="cell cell-2">
                <div class="inner"></div>
              </div>
              <div class="cell cell-3">
                <span class="count">入住：4</span>
                <span class="count">在寝：2</span>
                <span class="count">在外：1</span>
                <span class="count">请假：1</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade g-dialog" id="checkStatisticsModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <p class="modal-title">昨日晚归</p>
          </div>
          <div class="modal-body">
            <table class="g-table">
              <thead>
                <tr>
                  <th>姓名</th>
                  <th>房间</th>
                  <th>床位</th>
                  <th>持续天数</th>
                  <th>开始日期</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>赵柳</td>
                  <td>101</td>
                  <td>02</td>
                  <td>10</td>
                  <td>2021-04-23</td>
                </tr>
                <tr>
                  <td>赵柳</td>
                  <td>101</td>
                  <td>02</td>
                  <td>10</td>
                  <td>2021-04-23</td>
                </tr>
                <tr>
                  <td>赵柳</td>
                  <td>101</td>
                  <td>02</td>
                  <td>10</td>
                  <td>2021-04-23</td>
                </tr>
                <tr>
                  <td>赵柳</td>
                  <td>101</td>
                  <td>02</td>
                  <td>10</td>
                  <td>2021-04-23</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade g-dialog" id="studentInfoModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <p class="modal-title" id="studentInfoModalLabel">人员信息</p>
          </div>
          <div class="modal-body">
            <ul class="g-dialog-details">
              <li class="item">
                <span class="subject">当前状态</span>
                <span class="content color-yellow">在外</span>
              </li>
              <li class="item">
                <span class="subject">学号</span>
                <span class="content">3113004669</span>
              </li>
              <li class="item">
                <span class="subject">姓名</span>
                <span class="content">林龙涵</span>
              </li>
              <li class="item">
                <span class="subject">手机号</span>
                <span class="content">15822189120</span>
              </li>
              <li class="item">
                <span class="subject">院系班级</span>
                <span class="content">管理学院</span>
              </li>
              <li class="item">
                <span class="subject">身份证号</span>
                <span class="content">441581199408045974</span>
              </li>
              <li class="item">
                <span class="subject">一卡通号</span>
                <span class="content">324234</span>
              </li>
              <li class="item">
                <span class="subject">人员类型</span>
                <span class="content">普通人员</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
`