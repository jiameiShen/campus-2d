/**
 * @class CreatePageEnergy
 * @desc 创建能耗管理
 * @param
 * @returns
 */
THING.Utils.dynamicLoad(
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Energy/energy.css'
)
THING.Utils.dynamicLoad('/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Energy/energyChart.js')
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
    $(`#page${this.pageId} .js-building-name`).each(function () {
      $(this).text(_this.buildingName || $(this).data('school') || '')
    })

    energyRankingChart()
    energyClassificationChart()
    energyStatisticsChart()
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
                  <div class="number count js-rock-number">24,002</div>
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
                  <div>总数(单位)</div>
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
                    警报 <span class="tip">2</span>
                  </div>
                  <div class="item" data-val="inProcess">处理中<span class="tip">12</span></div>
                  <div class="item" data-val="pending">待处理</div>
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
                    <td>德育楼德育楼…</td>
                    <td>电流过载</td>
                    <td>待处理</td>
                  </tr>
                  <tr>
                    <td>02</td>
                    <td>文史楼304</td>
                    <td>跳闸</td>
                    <td>处理中</td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>文史楼304</td>
                    <td>跳闸</td>
                    <td>处理中</td>
                  </tr>
                  <tr>
                    <td>04</td>
                    <td>文史楼304</td>
                    <td>跳闸</td>
                    <td>处理中</td>
                  </tr>
                  <tr>
                    <td>05</td>
                    <td>文史楼304</td>
                    <td>跳闸</td>
                    <td>处理中</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
`
