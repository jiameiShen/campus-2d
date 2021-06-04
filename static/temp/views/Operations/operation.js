/**
 * @class CreatePageAssets
 * @desc 创建资产管理
 * @param
 * @returns
 */
THING.Utils.dynamicLoad(
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Operations/operation.css'
)
THING.Utils.dynamicLoad(
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Operations/operationChart.js'
)
console.log('CreatePageOperations')

class CreatePageOperations {
  pageId = 'Operations'
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
    $(`#page${this.pageId}`).html($(operationTemplate))
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
      $(this).text(_this.buildingName || $(this).data('school'))
    })

    operationDeviceStatusChart()
    operationRegionalStatisticsChart()
    operationDeviceMaintenanceChart()
  }
}

var operationTemplate = `
      <div class="page-aside page-aside-left animate__animated page-operation">
        <div class="chart-block flex-none">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>运维情况</p>
          </div>
          <div class="chart-block__bd">
            <div class="operation-maintenance-content">
              <div class="info-bk">
                <div class="title">待解决(件)</div>
                <div class="color color-red">14</div>
              </div>
              <div class="info-bk">
                <div class="title">处理中(件)</div>
                <div class="color color-yellow">24</div>
              </div>
              <div class="info-bk">
                <div class="title">已解决(件)</div>
                <div class="color color-blue">24,002</div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-block">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>事件列表</p>
          </div>
          <div class="chart-block__bd">
            <div class="event-list-content">
              <div class="tab">
                <div class="item tab-active">
                  警报 <span class="tip">2</span>
                </div>
                <div class="item">处理中<span class="tip">2</span></div>
                <div class="item">待处理<span class="tip">2</span></div>
              </div>
              <table class="table">
                <tr>
                  <td>01</td>
                  <td>德育楼201</td>
                  <td>多媒体损坏</td>
                </tr>
                <tr>
                  <td>02</td>
                  <td>德育楼202</td>
                  <td>空调无法开启</td>
                </tr>
                <tr>
                  <td>03</td>
                  <td>德育楼203</td>
                  <td>传真机损坏</td>
                </tr>
                <tr>
                  <td>04</td>
                  <td>德育楼205</td>
                  <td>椅子缺失</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="chart-block">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>今日值班运维人员</p>
          </div>
          <div class="chart-block__bd">
            <table class="duty-personnel-content">
              <tr>
                <td>
                  <img
                    style="vertical-align: middle"
                    src="../image/ring-bk.png"
                    class="pic"
                  />
                </td>
                <td>张毅</td>
                <td>18038009393</td>
              </tr>
              <tr>
                <td><img src="../image/ring-bk.png" class="pic" /></td>
                <td>黄新</td>
                <td>17890098768</td>
              </tr>
              <tr>
                <td><img src="../image/ring-bk.png" class="pic" /></td>
                <td>刘广</td>
                <td>15820099878</td>
              </tr>
              <tr>
                <td><img src="../image/ring-bk.png" class="pic" /></td>
                <td>赵柳</td>
                <td>15678877987</td>
              </tr>
            </table>
          </div>
        </div>
        </div>
        <div class="page-aside page-aside-right animate__animated page-operation">
        <div class="chart-block flex-none">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>设备状态统计</p>
          </div>
          <div class="chart-block__bd">
            <div class="device-status-content">
              <div class="device-status-ring" id="device-status-ring"></div>
              <div class="device-status-info">
                <div class="each-count square-card square-card--red">
                  <span class="caret-left caret-red-left"></span>
                  <div class="caret-circle caret-circle-red"></div>
                  <div class="line"></div>
                  <div class="info clearfix">
                    <span class="align-left">报修</span
                    ><span class="align-right">632</span>
                  </div>
                  <div class="info info-center">
                    <span>同比上周：</span
                    ><span class="percentage">↓37.5%</span>
                  </div>
                  <span class="ring-info-bk caret-right caret-red-right"></span>
                </div>
                <div class="each-count square-card square-card--yellow">
                  <span class="caret-left caret-red-left"></span>
                  <div class="caret-circle caret-circle-yellow"></div>
                  <div class="line"></div>
                  <div class="info clearfix">
                    <span class="align-left">报废</span
                    ><span class="align-right">232</span>
                  </div>
                  <div class="info info-center">
                    <span>同比上周：</span
                    ><span class="percentage">↑13.8%</span>
                  </div>
                  <span class="ring-info-bk caret-right caret-red-right"></span>
                </div>
                <div class="each-count square-card square-card--green">
                  <span class="caret-left caret-red-left"></span>
                  <div class="caret-circle caret-circle-green"></div>
                  <div class="line"></div>
                  <div class="info clearfix">
                    <span class="align-left">正常</span
                    ><span class="align-right">818</span>
                  </div>
                  <div class="info info-center">
                    <span>同比上周：</span
                    ><span class="percentage">↑48.6%</span>
                  </div>
                  <span class="ring-info-bk caret-right caret-red-right"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-block flex-none">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>维修设备分类统计</p>
          </div>
          <div class="chart-block__bd">
            <div class="device-maintenance-content">
              <div
                class="device-maintenance-chart"
                id="device-maintenance-content"
              ></div>
            </div>
          </div>
        </div>
        <div class="chart-block">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>运维情况区域统计</p>
          </div>
          <div class="chart-block__bd">
            <div class="regional-statistics-content">
              <div
                class="regional-statistics-chart"
                id="regional-statistics-content"
              ></div>
            </div>
          </div>
        </div>
      </div>
`
