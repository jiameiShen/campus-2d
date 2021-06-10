/**
 * @class CreatePageOperations
 * @desc 创建运维管理
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
    $(document).on('click', '.event-list-content .tab .item', function () {
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
    let regionaStatisticsData = []
    $(`#page${this.pageId} .js-building-name`).each(function () {
      $(this).text(_this.buildingName || $(this).data('school') || '')
    })
    this.changeRegionaStatistics(regionaStatisticsData)
    operationDeviceStatusChart()
    operationRegionalStatisticsChart(regionaStatisticsData)
    operationDeviceMaintenanceChart()
  }

  changeRegionaStatistics(regionaStatisticsData) {
    if (this.buildingName) {
      let arr = ['1L', '2L', '3L', '4L', '5L', '6L']
      for (let key in arr) {
        regionaStatisticsData.push(arr[key])
      }
    } else {
      let arr = [
        '管理学院',
        '计算机学院',
        '经济管理学院',
        '机电工程学院',
        '自动化学院',
        '轻工化工学院',
        '外国语学院',
      ]
      for (let key in arr) {
        regionaStatisticsData.push(arr[key])
      }
    }
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
                <div class="color color-red js-rock-number">14</div>
              </div>
              <div class="info-bk">
                <div class="title">处理中(件)</div>
                <div class="color color-yellow js-rock-number">24</div>
              </div>
              <div class="info-bk">
                <div class="title">已解决(件)</div>
                <div class="color color-blue js-rock-number">24002</div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-block chart-block-2">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>事件列表</p>
          </div>
          <div class="chart-block__bd">
            <div class="event-list-content">
              <div class="tab">
                <div class="item tab-active">
                  待处理 <span class="tip">5</span>
                </div>
                <div class="item">处理中<span class="tip">5</span></div>
                <div class="item">已解决<span class="tip">5</span></div>
              </div>
              <div class="vtable-wrapper">
                <table class="vtable">
                  <tr>
                    <td>01</td>
                    <td>图书馆201</td>
                    <td>多媒体损坏</td>
                  </tr>
                  <tr>
                    <td>02</td>
                    <td>图书馆202</td>
                    <td>空调无法开启</td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>图书馆203</td>
                    <td>传真机损坏</td>
                  </tr>
                  <tr>
                    <td>04</td>
                    <td>图书馆205</td>
                    <td>椅子缺失</td>
                  </tr>
                  <tr>
                    <td>05</td>
                    <td>图书馆206</td>
                    <td>椅子缺失</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-block chart-block-3">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>今日值班运维人员</p>
          </div>
          <div class="chart-block__bd">
            <div class="vtable-wrapper">
              <table class="duty-personnel-content">
                <tr>
                  <td><img src="https://img.zcool.cn/community/01a3865ab91314a8012062e3c38ff6.png@1280w_1l_2o_100sh.png" class="pic" /></td>
                  <td>张毅</td>
                  <td>18038009393</td>
                </tr>
                <tr>
                  <td><img src="https://img.zcool.cn/community/01a3865ab91314a8012062e3c38ff6.png@1280w_1l_2o_100sh.png" class="pic" /></td>
                  <td>黄新</td>
                  <td>17890098768</td>
                </tr>
                <tr>
                  <td><img src="https://img.zcool.cn/community/01a3865ab91314a8012062e3c38ff6.png@1280w_1l_2o_100sh.png" class="pic" /></td>
                  <td>刘广</td>
                  <td>15820099878</td>
                </tr>
                <tr>
                  <td><img src="https://img.zcool.cn/community/01a3865ab91314a8012062e3c38ff6.png@1280w_1l_2o_100sh.png" class="pic" /></td>
                  <td>赵柳</td>
                  <td>15678877987</td>
                </tr>
              </table>
            </div>
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
              <div class="device-status-info square-card--hasline">
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
        <div class="chart-block">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>维修设备分类统计</p>
          </div>
          <div class="chart-block__bd">
            <div
              class="device-maintenance-chart"
              id="device-maintenance-content"
            ></div>
          </div>
        </div>
        <div class="chart-block">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>运维情况区域统计</p>
          </div>
          <div class="chart-block__bd">
            <div
              class="regional-statistics-chart"
              id="regional-statistics-content"
            ></div>
          </div>
        </div>
      </div>
`
