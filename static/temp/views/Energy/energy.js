/**
 * @class CreatePageEnergy
 * @desc 创建能耗管理
 * @param
 * @returns
 */
THING.Utils.dynamicLoad(
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Energy/energy.css'
)
THING.Utils.dynamicLoad(
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Energy/energyChart.js'
)
console.log('CreatePageEnergy')

class CreatePageEnergy {
  pageId = 'Energy'
  buildingName = ''
  constructor(data) {
    if (data) {
      this.pageId = data.pageId || this.pageId
      this.buildingName = data.buildingName || ''
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
    $(`#page${this.pageId}`).html($(energyTemplate))
    $(document).on('click', '.call-police-list .tab .item', function () {
      $(this).addClass('tab-active').siblings().removeClass('tab-active')
      _this.changePowerList($(this).index())
    })
    this.render()
  }

  reload(data) {
    if (data) {
      this.pageId = data.pageId || this.pageId
      this.buildingName = data.buildingName || ''
    }

    this.render()
  }

  render() {
    let _this = this
    let classificationData = [
      { value: 0, name: '照明用电' },
      { value: 0, name: '空调用电' },
      { value: 0, name: '多媒体用电' },
    ]
    let rankingYAxis = []
    $(`#page${this.pageId} .js-building-name`).each(function () {
      const schoolOrClassName = window.$modelType === 'K12' ? $(this).data('class') : $(this).data('school')
      $(this).text(_this.buildingName || schoolOrClassName || '')
    })
    $('.call-police-list .tab .item').eq(0).trigger('click')
    this.changeData(classificationData, rankingYAxis)
    this.changePowerList(0)
    energyRankingChart(rankingYAxis)
    energyClassificationChart(classificationData)
    energyStatisticsChart()
  }

  changePowerList(type) {
    const arr = this.buildingName ? [
      { name: '201', desc: '电流过载', status: type },
      { name: '202', desc: '电流过载', status: type },
      { name: '203', desc: '超负荷', status: type },
      { name: '204', desc: '跳闸', status: type },
      { name: '205', desc: '短路', status: type },
    ] : [
      { name: '#教学楼201', desc: '电流过载', status: type },
      { name: '#教学楼202', desc: '电流过载', status: type },
      { name: '图书馆203', desc: '超负荷', status: type },
      { name: '图书馆204', desc: '跳闸', status: type },
      { name: '图书馆205', desc: '短路', status: type },
    ]
    const templater = `<tr>
        <td>序号</td>
        <td>地址</td>
        <td>原因</td>
        <td>状态</td>
      </tr>
      ${arr.map((item, index) => {
      return `<tr>
        <td>${(index + 1).toString().padStart(2, 0)}</td>
        <td>${item.name}</td>
        <td>${item.desc}</td>
        <td>${item.status === 1 ? '处理中' : '待处理'}</td>
      </tr>`
    }).join('')}`
    $(this).addClass('tab-active').siblings().removeClass('tab-active')
    $('.table').empty().append(templater)
  }
  changeData(classificationData, rankingYAxis) {
    if (this.buildingName) {
      let arr = [1710, 1321, 1779]
      let yAxis = ['1F', '2F', '3F', '4F', '5F', '6F', '7F']
      for (let key in classificationData) {
        classificationData[key].value = arr[key]
      }
      for (let key in yAxis) {
        rankingYAxis.push(yAxis[key])
      }
      $('.situation-content .count').numberRock({ lastNumber: 4810 })
    } else {
      let yAxis = window.$modelType === 'K12' ? [
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
      for (let key in classificationData) {
        classificationData[key].value = 727
      }
      for (let key in yAxis) {
        rankingYAxis.push(yAxis[key])
      }
      $('.situation-content .count').numberRock({ lastNumber: 6823 })
    }
    $('.classification-content .info-main .text').each(function (index, value) {
      $(this).text(classificationData[index].value)
    })
  }
}

var energyTemplate = `
  <div class="page-aside page-aside-left animate__animated page-energy">
    <div class="chart-block flex-none">
      <div class="chart-block__hd">
        <p><span class="js-building-name"></span>能源消耗情况</p>
      </div>
      <div class="chart-block__bd">
        <div class="situation-content">
          <div class="bk">
            <div class="number-main">
              <div class="number count">6823</div>
              <div class="unit">(Kw·H)</div>
            </div>
          </div>
          <div class="time">统计截止：2021-04-30 00:00</div>
        </div>
      </div>
    </div>
    <div class="chart-block">
      <div class="chart-block__hd">
        <p><span class="js-building-name"></span>能源消耗排行</p>
      </div>
      <div class="chart-block__bd">
        <div id="ranking-content" class="ranking-chart"></div>
      </div>
    </div>
    <div class="chart-block">
      <div class="chart-block__hd">
        <p><span class="js-building-name"></span>能源分类消耗</p>
      </div>
      <div class="chart-block__bd">
        <div class="classification-content chart-main">
          <div
            id="classification-content"
            class="classification-chart"
          ></div>
          <div class="info-main">
            <div class="square-card">
              <span class="caret-left"></span>
              <span class="dot"></span>照明用电<span class="text">727 <span class="info-unit"> (Kw·H)</span></span>
              <span class="caret-right"></span>
            </div>
            <div class="square-card square-card--red">
              <span class="caret-left"></span>
              <span class="dot"></span>空调用电<span class="text">727 <span class="info-unit"> (Kw·H)</span></span>
              <span class="caret-right"></span>
            </div>
            <div class="square-card square-card--yellow">
              <span class="caret-left"></span>
              <span class="dot"></span>多媒体用电<span class="text">727 <span class="info-unit"> (Kw·H)</span></span>
              <span class="caret-right"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="page-aside page-aside-right animate__animated page-energy">
    <div class="chart-block">
      <div class="chart-block__hd">
        <p><span class="js-building-name"></span>月度能耗消耗统计</p>
      </div>
      <div class="chart-block__bd">
        <div class="statistics-chart" id="statistics-content"></div>
      </div>
    </div>
    <div class="chart-block">
      <div class="chart-block__hd">
        <p><span class="js-building-name"></span>电力报警</p>
      </div>
      <div class="chart-block__bd">
        <div class="call-police-content">
          <div class="call-police-count">
            <div class="count">
              <div class="js-rock-number">109</div>
              <div>总数</div>
            </div>
            <div class="each-count-main">
                <div class="each-count">
                    <span class="ring-info-bk caret-left caret-red-left"></span>
                    <div class="caret-circle caret-circle-red"></div>
                    <div class="line"></div>
                    <div class="info clearfix">
                    <span class="align-left">警报</span
                    ><span class="align-right">32</span>
                    </div>
                    <div class="info">
                    <span>同比上周：</span
                    ><span class="percentage">↓10%</span>
                    </div>
                    <span
                    class="ring-info-bk caret-right caret-red-right"
                    ></span>
                </div>
                <div class="each-count">
                    <span class="ring-info-bk caret-left caret-blue-left"></span>
                    <div class="caret-circle caret-circle-blue"></div>
                    <div class="line"></div>
                    <div class="info clearfix">
                    <span class="align-left">处理中</span
                    ><span class="align-right">77</span>
                    </div>
                    <div class="info">
                    <span>同比上周：</span
                    ><span class="percentage">↑10%</span>
                    </div>
                    <span
                    class="ring-info-bk caret-right caret-blue-right"
                ></span>
                </div>
            </div>
          </div>
          <div class="call-police-list">
            <div class="tab">
             <div class="item tab-active" data-val="alert">
                警报 <span class="tip">5</span>
              </div>
              <div class="item" data-val="inProcess">处理中<span class="tip">5</span></div>
              <div class="item" data-val="pending">待处理<span class="tip">5</span></div>
            </div>
            <table class="table">
              <tr>
                <td>序号</td>
                <td>地址</td>
                <td>原因</td>
                <td>状态</td>
              </tr>
              <tr>
                <td>01</td>
                <td>1#教学楼201</td>
                <td>电流过载</td>
                <td>待处理</td>
              </tr>
              <tr>
                <td>02</td>
                <td>1#教学楼202</td>
                <td>超负荷</td>
                <td>待处理</td>
              </tr>
              <tr>
                <td>03</td>
                <td>图书馆203</td>
                <td>跳闸</td>
                <td>待处理</td>
              </tr>
              <tr>
                <td>04</td>
                <td>图书馆204</td>
                <td>跳闸</td>
                <td>待处理</td>
              </tr>
              <tr>
                <td>05</td>
                <td>图书馆205</td>
                <td>短路</td>
                <td>待处理</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
`
