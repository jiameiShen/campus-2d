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
  floorName = ''
  constructor(data) {
    if (data) {
      this.pageId = data.pageId || this.pageId
      this.buildingName = data.buildingName || ''
      this.floorName = data.floorName || ''
    }
  }

  onAdd(app) {
    this.init()
  }

  onRemove() {
    $(`#${this.pageId}`).remove()
  }

  /**
   * 初始化面板
   */
  init() {
    // 插入到 ThingJS 内置的 2D 界面 #pageContainer 中
    $(`#page${this.pageId}`).html($(apartmentTemplate));
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
    $(`#page${this.pageId} .js-building-name`).text(this.buildingName)
    if (this.buildingName) {
      $(`#page${this.pageId} .js-school-name`).hide()
    } else {
      $(`#page${this.pageId} .js-school-name`).show()
    }

    /* 未归寝率排行 */
    notReturnChart = window.echarts.init(document.getElementById('notReturnChart'), null, { devicePixelRatio: 2.5 })
    renderNotReturnChart()
    /* 异常预警 */
    abnormalWarningChart = window.echarts.init(document.getElementById('abnormalWarningChart'), null, { devicePixelRatio: 2.5 })
    renderAbnormalWarningChart()

    /* 房间使用率 */
    roomUsageChart = window.echarts.init(document.getElementById('roomUsageChart'), null, { devicePixelRatio: 2.5 })
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
    passChart = window.echarts.init(document.getElementById('passChart'), null, { devicePixelRatio: 2.5 })
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
    interceptChart = window.echarts.init(document.getElementById('interceptChart'), null, { devicePixelRatio: 2.5 })
    renderInterceptChart(interceptInfo.data)
  }

  renderFloor() {
    $(`#page${this.pageId} .js-floor-name`).text(this.floorName)
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
      const inRate = item.inNumber / item.totalNumber
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
          <span class="rate">归寝率：${(inRate * 100).toFixed(2)}%</span>
        </div>
        <div class="cell cell-2">
          <div class="inner" style="width: ${parseInt(inRate * 100)}%"></div>
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

    // $('#div2d').append($(roomTemplate))
    $('#roomStatisticsChart').html($(roomStatisticsTemplate))

    // 模拟3d放学生信息进去
    // dataList.forEach((room) => {
    //   const roomNumber = room.roomNumber
    //   room.bedDTOList.forEach((bed, bedIndex) => {
    //     let bedNum = '01'
    //     if (bedIndex >= 2) {
    //       bedNum = '02'
    //     }
    //     let color = ''
    //     if (bed.isLeave) {
    //       color = 'color-green'
    //     } else if (!bed.status) {
    //       color = 'color-yellow'
    //     }
    //     $(`.js-room-item[data-room="${roomNumber}"]`)
    //       .find(`[data-bed="${bedNum}"]`)
    //       .append($(`<span class="bed-item bed-item-${bedIndex} ${color}" data-student-id="${bed.studentId}">${bedNum}${bed.studentName}</span>`))
    //   })
    // })

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
          ${(`<tr>
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
}

var apartmentTemplate = `
    <div class="page-aside page-aside-left animate__animated page-apartment">
        <div class="chart-block chart-basic flex-none">
        <div class="chart-block__hd">
            <p>
            <span class="js-building-name"></span><span class="js-school-name">学校</span>概况
            </p>
        </div>
        <div class="chart-block__bd">
            <ul class="list">
            <li class="item item-dormitory">
                <p><span class="count js-rock-number">14</span>栋</p>
                <p class="caption">楼栋总数</p>
            </li>
            <li class="item item-room">
                <p><span class="count js-rock-number">824</span>间</p>
                <p class="caption">房间总数</p>
            </li>
            <li class="item item-bed">
                <p><span class="count js-rock-number">24002</span>张</p>
                <p class="caption">床位总数</p>
            </li>
            <li class="item item-people">
                <p><span class="count js-rock-number">24002</span>人</p>
                <p class="caption">入住总数</p>
            </li>
            </ul>
        </div>
        </div>
        <div class="chart-block chart-not-return">
        <div class="chart-block__hd">
            <p><span class="js-building-name"></span>未归寝率排行</p>
            <ul class="tab-list">
            <li class="tab-item active">楼栋</li>
            <li class="tab-item">院系</li>
            </ul>
        </div>
        <div class="chart-block__bd">
            <div id="notReturnChart"></div>
        </div>
        </div>
        <div class="chart-block chart-abnormal">
        <div class="chart-block__hd">
            <p><span class="js-building-name"></span>异常预警</p>
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
                <span class="dot"></span>未使用床位<span class="text js-rock-number">752</span>
            </div>
            <div class="item square-card square-card--grren">
                <span class="dot"></span>总床位<span class="text js-rock-number">2367</span>
            </div>
            </div>
        </div>
        </div>
        <div class="chart-block chart-pass">
        <div class="chart-block__hd">
            <p><span class="js-building-name"></span>今日通行人数</p>
            <ul class="label-list">
            <li class="label-item">出：<span id="roomUsageChartOut">0</span></li>
            <li class="label-item">入：<span id="roomUsageChartIn">0</span></li>
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
            <li class="label-item">总人数：<span id="interceptChartSum">0</span></li>
            </ul>
        </div>
        <div class="chart-block__bd">
            <div id="interceptChart"></div>
        </div>
        </div>
    </div>
`

var apartmentLevelTemplate = `
    <div class="page-container">
        <div class="page-aside page-aside-left animate__animated page-apartment page-apartment-detail">
          <div class="chart-block chart-room-count">
            <div class="chart-block__hd">
              <p class="brand js-floor-name">1F</p>
            </div>
            <div class="chart-block__bd">
              <div class="left room-count-wrapper">
                <div class="inner">
                  <p class="count js-rock-number">10</p>
                  <p class="desc">房间总数</p>
                </div>
              </div>
              <div class="right">
                <div class="square-card">
                  <span class="dot"></span>空房间数<span class="text">2</span>
                </div>
                <div class="square-card">
                  <span class="dot"></span>床位总数<span class="text">60</span>
                </div>
                <div class="square-card">
                  <span class="dot"></span>空床位数<span class="text">10</span>
                </div>
                <div class="square-card">
                  <span class="dot"></span>入住人数<span class="text">10</span>
                </div>
              </div>
            </div>
          </div>
          <div class="chart-block chart-check-statistics">
            <div class="chart-block__hd">查寝统计</div>
            <div class="chart-block__bd" id="checkStatisticsChart">
              <ul class="list">
                <li class="item">
                  <span class="icon icon-1"></span>
                  <span class="k">当前在寝</span>
                  <span class="v">20</span>
                  <span class="glyphicon glyphicon-menu-right"></span>
                </li>
                <li class="item">
                  <span class="icon icon-2"></span>
                  <span class="k">当前在外</span>
                  <span class="v">20</span>
                  <span class="glyphicon glyphicon-menu-right"></span>
                </li>
                <li class="item">
                  <span class="icon icon-3"></span>
                  <span class="k">昨日晚归</span>
                  <span class="v color-red">20</span>
                  <span class="glyphicon glyphicon-menu-right"></span>
                </li>
                <li class="item">
                  <span class="icon icon-4"></span>
                  <span class="k">昨日未归</span>
                  <span class="v color-red">20</span>
                  <span class="glyphicon glyphicon-menu-right"></span>
                </li>
                <li class="item">
                  <span class="icon icon-5"></span>
                  <span class="k">多天未出</span>
                  <span class="v color-red">20</span>
                  <span class="glyphicon glyphicon-menu-right"></span>
                </li>
                <li class="item">
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
                <li class="label-item">归寝：<span id="roomUsageChartIn">7</span></li>
                <li class="label-item">外出：<span id="roomUsageChartOut">1</span></li>
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
      </div>
`