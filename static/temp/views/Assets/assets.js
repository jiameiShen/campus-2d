/**
 * @class CreatePageAssets
 * @desc 创建资产管理
 * @param
 * @returns
 */
THING.Utils.dynamicLoad(
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Assets/assets.css'
)
THING.Utils.dynamicLoad(
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Assets/assetsChart.js'
)
console.log('CreatePageAssets')

class CreatePageAssets {
  pageId = 'Assets'
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
    let _this = this
    // 插入到 ThingJS 内置的 2D 界面 #pageContainer 中
    $(`#page${this.pageId}`).html($(assetsTemplate))
    this.render()
  }

  reload(data) {
    if (data) {
      this.pageId = data.pageId || this.pageId
      this.buildingName = data.buildingName || ''
      this.floorName = data.floorName || ''
    }

    if (data.floorName) {
      $(`#page${this.pageId}`).html($(assetsLevelTemplate));
      this.renderFloor()
    } else {
      $(`#page${this.pageId}`).html($(assetsTemplate));
      this.render()
    }
  }

  render() {
    let _this = this
    let collegeAssetsData = []
    let collegeAssetsSeriesData = []
    let schoolAssetsData = [
      { value: 4933, name: '软件资产' },
      { value: 1890, name: '硬件资产' },
    ]

    $(`#page${this.pageId} .js-building-name`).each(function () {
      const schoolOrClassName = window.$modelType === 'K12' ? $(this).data('class') : $(this).data('school')
      $(this).text(_this.buildingName || schoolOrClassName || '')
    })

    this.changeRegionaStatistics(
      collegeAssetsData,
      collegeAssetsSeriesData,
      schoolAssetsData
    )
    schoolAssetsChart(schoolAssetsData)
    collegeAssetsChart(collegeAssetsData, collegeAssetsSeriesData)
    classAssetsChart()
    this.changeRankingAssets()
    totalAssetsChart()
  }

  renderFloor() {
    $(`#page${this.pageId} .js-floor-name`).text(this.floorName)
    // 模拟楼层资产数据
    const params = {
      equipmentCabinet: {
        assetName: '机柜',
        price: 23600,
        personName: '邓明'
      },
      outputSwitchgear: {
        assetName: '输出开关柜',
        price: 35800,
        personName: '万平'
      },
      verticalIntegrated: {
        assetName: '立式一体柜',
        price: 16888,
        personName: '林阳'
      },
      spiralChiller: {
        assetName: '螺旋式冷水机组',
        price: 16888,
        personName: '金秀兰'
      }
    }

    const paramsMap = new Map()
      .set(1, 'equipmentCabinet')
      .set(2, 'equipmentCabinet')
      .set(3, 'equipmentCabinet')
      .set(4, 'equipmentCabinet')
      .set(5, 'outputSwitchgear')
      .set(6, 'outputSwitchgear')
      .set(7, 'verticalIntegrated')
      .set(8, 'spiralChiller')
      .set(9, 'spiralChiller')

    // 模拟楼层学生数据
    const arr = new Array(9).fill({})
    let dataList = arr.map((item, index) => {
      const idx = index + 1
      return Object.assign({
        index: idx.toString().padStart(2, '0'),
        assetName: '机柜',
        brand: '中兴',
        code: 'XN' + idx.toString().padStart(6, '0'),
        assetTypeName: '基础设施',
        personName: '@cname',
        phone: '15822189120',
        assetOwner: '国资处',
        price: '20000元',
        status: '使用中'
      }, params[paramsMap.get(idx)],)
    })

    let assetStatisticsList = []
    dataList.forEach(item => {
      assetStatisticsList.push(
        `<li class="item" data-code="${item.code}">
        <div class="cell cell-1">
          <span class="icon icon-door"></span>
          <span class="name">${item.assetName}</span>
          <span class="detail">
            详情<span class="glyphicon glyphicon-menu-right"></span>
          </span>
        </div>
        <div class="cell cell-3">
          <span class="count">编号：${item.code}</span>
          <span class="count">联系人：${item.personName}</span>
        </div>
      </li>`
      )
    })

    let assetStatisticsTemplate = `<ul class="list">${assetStatisticsList.join('')}</ul>`
    $('#assetStatisticsChart').html($(assetStatisticsTemplate))

    $('#assetStatisticsChart').on('click', '.item', function () {
      const code = $(this).data('code')
      const detail = dataList.find(item => item.code === code)
      showDetail(detail)
    })

    function showDetail(detail) {
      let template = `
        <ul class="g-dialog-details">
          <li class="item">
            <span class="subject">序号</span>
            <span class="content">${detail.index}</span>
          </li>
          <li class="item">
            <span class="subject">资产名称</span>
            <span class="content">${detail.assetName}</span>
          </li>
          <li class="item">
            <span class="subject">品牌</span>
            <span class="content">${detail.brand}</span>
          </li>
          <li class="item">
            <span class="subject">编号</span>
            <span class="content">${detail.code}</span>
          </li>
          <li class="item">
            <span class="subject">资产类型</span>
            <span class="content">${detail.assetTypeName}</span>
          </li>
          <li class="item">
            <span class="subject">责任人</span>
            <span class="content">${detail.personName}</span>
          </li>
          <li class="item">
            <span class="subject">联系方式</span>
            <span class="content">${detail.phone}</span>
          </li>
          <li class="item">
            <span class="subject">资产归属</span>
            <span class="content">${detail.assetOwner}</span>
          </li>
          <li class="item">
            <span class="subject">资产价值</span>
            <span class="content">${detail.price}</span>
          </li>
          <li class="item">
            <span class="subject">资产状态</span>
            <span class="content color-green">${detail.status}</span>
          </li>
        </ul>
      `
      $('#assetInfoModal').find('.modal-body').html($(template))
      $('#assetInfoModal').modal()
    }

    /* 点击物体 */
    app.query('.Thing').on(THING.EventType.SingleClick, function () {
      // 复制楼层出现XN000003(4)
      const code = this.id.replace(/\([^\)]*\)/g, "")
      const detail = dataList.find(item => item.code === code)
      showDetail(detail)
    });
  }

  changeRankingAssets() {
    const arr = this.buildingName ? [
      { name: '201', desc: '88万' },
      { name: '209', desc: '63万' },
      { name: '302', desc: '48万' },
      { name: '408', desc: '36万' },
      { name: '509', desc: '20万' },
    ] : [
      { name: '物理实验室201', desc: '720万' },
      { name: '物理实验室209', desc: '630万' },
      { name: '化学实验室302', desc: '488万' },
      { name: '化学实验室408', desc: '336万' },
      { name: '生物实验室509', desc: '140万' },
    ]
    const templater = `
      ${arr.map((item, index) => {
      return `<tr>
        <td>
          <div class="number">${(index + 1).toString().padStart(2, 0)}</div>
        </td>
        <td>${item.name}</td>
        <td>${item.desc}</td>
      </tr>`
    }).join('')}`
    $('.ranking-assets-content').empty().append(templater)
  }

  changeRegionaStatistics(
    collegeAssetsData,
    collegeAssetsSeriesData,
    schoolAssetsData
  ) {
    if (this.buildingName) {
      let arr = ['1F', '2F', '3F', '4F', '5F', '6F', '7F']
      let arr2 = [23, 33, 22, 11, 13, 14, 16]
      let schoolAssetsArr = ['523', '300']
      for (let key in arr) {
        collegeAssetsData.push(arr[key])
      }
      for (let key in arr2) {
        collegeAssetsSeriesData.push(arr2[key])
      }
      for (let key in schoolAssetsData) {
        schoolAssetsData[key].value = schoolAssetsArr[key]
      }
    } else {
      let schoolAssetsArr = ['1890', '4933']
      let arr2 = [97, 518, 212, 486, 427, 284, 502]
      let arr = window.$modelType === 'K12' ? [
        '高三1班',
        '高三2班',
        '高三3班',
        '高二2班',
        '高一1班',
        '高一2班',
        '高一3班',
      ] : [
        '管理学院',
        '计算机学院',
        '经济管理学院',
        '机电工程学院',
        '自动化学院',
        '轻工化工学院',
        '外国语学院',
      ]
      for (let key in arr) {
        collegeAssetsData.push(arr[key])
      }
      for (let key in arr2) {
        collegeAssetsSeriesData.push(arr2[key])
      }
      for (let key in schoolAssetsData) {
        schoolAssetsData[key].value = schoolAssetsArr[key]
      }
    }
    $('.school-assets-content .ring-info .software').text(
      schoolAssetsData[0].value
    )
    $('.school-assets-content .ring-info .hardware').text(
      schoolAssetsData[1].value
    )
  }
}

var assetsTemplate = `
    <div class="page-aside page-aside-left animate__animated page-assets">
      <div class="chart-block chart-1 flex-none">
        <div class="chart-block__hd">
          <p>
            <span class="js-building-name" data-school="学校"></span>资产统计
          </p>
        </div>
        <div class="chart-block__bd">
          <div class="school-assets-content">
            <div class="ring" id="school-assets-content"></div>
            <div class="ring-info">
              <div class="info-bk">
                <div>软件资产(万元）</div>
                <div class="software">523</div>
              </div>
              <div class="info-bk">
                <div>硬件资产(万元）</div>
                <div class="hardware">300</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chart-block chart-2">
        <div class="chart-block__hd">
          <p>
            <span class="js-building-name" data-school="各学院" data-class="各班级"></span>资产统计
          </p>
        </div>
        <div class="chart-block__bd">
          <div class="college-assets-content"  id="college-assets-content"></div>
        </div>
      </div>
    </div>
    <div class="page-aside page-aside-right animate__animated page-assets">
      <div class="chart-block chart-3">
        <div class="chart-block__hd">
          <p>
            <span class="js-building-name" data-school="学院" data-class="班级"></span>各类资产统计
          </p>
        </div>
        <div class="chart-block__bd">
          <div class="class-assets-content" id="class-assets-content"></div>
        </div>
      </div>
      <div class="chart-block chart-4">
        <div class="chart-block__hd">
          <p>
            <span class="js-building-name" data-school="实验室"></span>资产排行榜
          </p>
        </div>
        <div class="chart-block__bd">
          <table class="ranking-assets-content">
            <tr>
              <td>
                <div class="number">01</div>
              </td>
              <td>物理实验室201</td>
              <td>720万</td>
            </tr>
            <tr>
              <td>
                <div class="number">02</div>
              </td>
              <td>物理实验室209</td>
              <td>630万</td>
            </tr>
            <tr>
              <td>
                <div class="number">03</div>
              </td>
              <td>化学实验室302</td>
              <td>488万</td>
            </tr>
            <tr>
              <td>
                <div class="number">04</div>
              </td>
              <td>化学实验室408</td>
              <td>336万</td>
            </tr>
            <tr>
              <td>
                <div class="number">05</div>
              </td>
              <td>生物实验室509</td>
              <td>140万</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="chart-block chart-5">
        <div class="chart-block__hd">
          <p>
            <span class="js-building-name" data-school="学校"></span>资产总额统计
          </p>
        </div>
        <div class="chart-block__bd">
           <div class="total-assets-content" id="total-assets-content">折线图</div>
        </div>
      </div>
    </div>
`
var assetsLevelTemplate = `
  <div class="page-aside page-aside-right animate__animated page-assets page-assets-detail">
    <div class="chart-block chart-assets-statistics">
      <div class="chart-block__hd">
        <div>
          <span class="js-floor-name">1F</span>
          资产明细
        </div>
      </div>
      <div class="chart-block__bd" id="assetStatisticsChart">
        <ul class="list">
          <li class="item" data-code="XN000001">
            <div class="cell cell-1">
              <span class="icon icon-door"></span>
              <span class="name">机柜</span>
              <span class="detail">
                详情<span class="glyphicon glyphicon-menu-right"></span>
              </span>
            </div>
            <div class="cell cell-3">
              <span class="count">编号：XN000001</span>
              <span class="count">联系人：张三
          </li>
          <li class="item" data-code="XN000002">
            <div class="cell cell-1">
              <span class="icon icon-door"></span>
              <span class="name">机柜</span>
              <span class="detail">
                详情<span class="glyphicon glyphicon-menu-right"></span>
              </span>
            </div>
            <div class="cell cell-3">
              <span class="count">编号：XN000002</span>
              <span class="count">联系人：李四
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade g-dialog" id="assetInfoModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <p class="modal-title" id="assetInfoModalLabel">资产信息</p>
        </div>
        <img  class="qrcode" style="position: absolute; right: 40px; top: 80px; width: 160px; height: 160px;" src="../../static/image/qrcode.png" alt="">
        <div class="modal-body">
          <ul class="g-dialog-details">
            <li class="item">
              <span class="subject">序号</span>
              <span class="content">01</span>
            </li>
            <li class="item">
              <span class="subject">资产名称</span>
              <span class="content">机柜</span>
            </li>
            <li class="item">
              <span class="subject">品牌</span>
              <span class="content">中兴</span>
            </li>
            <li class="item">
              <span class="subject">编号</span>
              <span class="content">XN000001</span>
            </li>
            <li class="item">
              <span class="subject">资产类型</span>
              <span class="content">基础设施</span>
            </li>
            <li class="item">
              <span class="subject">责任人</span>
              <span class="content">赵毅</span>
            </li>
            <li class="item">
              <span class="subject">联系方式</span>
              <span class="content">17878787878</span>
            </li>
            <li class="item">
              <span class="subject">资产归属</span>
              <span class="content">国资处</span>
            </li>
            <li class="item">
              <span class="subject">资产价值</span>
              <span class="content">20000元</span>
            </li>
            <li class="item">
              <span class="subject">资产状态</span>
              <span class="content color-green">使用中</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
`
