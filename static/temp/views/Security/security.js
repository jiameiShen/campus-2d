/**
 * @class CreatePageAssets
 * @desc 创建资产管理
 * @param
 * @returns
 */
THING.Utils.dynamicLoad(
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Security/security.css'
)
THING.Utils.dynamicLoad(
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Security/securityChart.js'
)
console.log('CreatePageSecurity')

class CreatePageSecurity {
  pageId = 'Security'
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
    $(`#page${this.pageId}`).html($(securityTemplate))
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

    securitySchoolVisitorsChart()
    securityCameraChart()
    securityFireControl()
  }
}

var securityTemplate = `
      <div class="page-aside page-aside-left animate__animated page-security">
        <div class="chart-block flex-none">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>学校访客</p>
          </div>
          <div class="chart-block__bd">
            <div class="school-visitors-count">
              <div class="item square-card">
                <span class="caret-left"></span>
                <span class="dot"></span>今日访客<span
                  class="text js-rock-number"
                  >91</span
                >
                <span class="caret-right"></span>
              </div>
              <div class="item square-card square-card--green">
                <span class="caret-left"></span>
                <span class="dot"></span>本周访客<span
                  class="text js-rock-number"
                  >241</span
                >
                <span class="caret-right"></span>
              </div>
            </div>
            <div class="school-visitors-chart" id="school-visitors-chart"></div>
          </div>
        </div>
        <div class="chart-block">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>监控警报</p>
          </div>
          <div class="chart-block__bd">
            <div class="monitoring-alarms-content">
              <div class="tab">
                <div class="item tab-active">
                  消防 <span class="tip">2</span>
                </div>
                <div class="item">门禁<span class="tip">2</span></div>
                <div class="item">摄像头<span class="tip">2</span></div>
              </div>
              <table class="table">
                <tr>
                  <td>01</td>
                  <td>德育楼201</td>
                  <td>摄像头灭火报警</td>
                </tr>
                <tr>
                  <td>02</td>
                  <td>德育楼202</td>
                  <td>摄像头灭火报警</td>
                </tr>
                <tr>
                  <td>03</td>
                  <td>德育楼203</td>
                  <td>摄像头灭火报警</td>
                </tr>
                <tr>
                  <td>04</td>
                  <td>德育楼205</td>
                  <td>摄像头灭火报警</td>
                </tr>
                <!-- <tr>
              <td>05</td>
              <td>德育楼206</td>
              <td>椅子缺失</td>
            </tr> -->
              </table>
            </div>
          </div>
        </div>
        <div class="chart-block">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>学校区域安全管控</p>
          </div>
          <div class="chart-block__bd">
            <div class="safety-control-content">
              <ul class="tab">
                <li>生活区</li>
                <li>教学区</li>
                <li>办公区</li>
                <li>运动区</li>
                <li>实验区</li>
                <li>运动区</li>
                <li>实验区</li>
                <li>运动区</li>
                <li>实验区</li>
                <li>运动区</li>
              </ul>
              <ul class="list">
                <li>文科教学楼A</li>
                <li>文科教学楼A</li>
                <li>文科教学楼A</li>
                <li>文科教学楼A</li>
                <li>文科教学楼A</li>
                <li>文科教学楼A</li>
                <li>文科教学楼A</li>
                <li>文科教学楼A</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
        <div class="page-aside page-aside-right animate__animated page-security">
        <div class="chart-block flex-none">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>安防摄像头</p>
          </div>
          <div class="chart-block__bd">
            <div class="camera-content">
              <div class="camera-ring-main">
                <div class="camera-ring" id="camera-ring"></div>
                <div class="camera-ring-info">
                  <div class="each-count square-card square-card--red">
                    <span class="caret-left caret-red-left"></span>
                    <div class="caret-circle caret-circle-red"></div>
                    <div class="line"></div>
                    <div class="info">
                      <span class="align-left">报修</span
                      ><span class="align-right">632</span>
                    </div>
                    <div class="info info-center">
                      <span>同比上周：</span
                      ><span class="percentage">↓37.5%</span>
                    </div>
                    <span
                      class="ring-info-bk caret-right caret-red-right"
                    ></span>
                  </div>
                  <div class="each-count  square-card square-card--green"">
                    <span class="caret-left caret-green-left"></span>
                    <div class="caret-circle caret-circle-green"></div>
                    <div class="line"></div>
                    <div class="info">
                      <span class="align-left">正常</span
                      ><span class="align-right">818</span>
                    </div>
                    <div class="info info-center">
                      <span>同比上周：</span
                      ><span class="percentage">↑48.6%</span>
                    </div>
                    <span
                    class="ring-info-bk caret-right caret-green-right"
                  ></span>
                  </div>
                </div>
              </div>
              <div>
                <div class="tab">
                  <div class="item tab-active">东门</div>
                  <div class="item">西门</div>
                  <div class="item">南门</div>
                  <div class="item">北门</div>
                </div>
                <div class="capture-pictures">
                  <img src="../image/ring-bk2-blue.png" class="img1" />
                  <img src="../image/ring-bk2-blue.png" class="img2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-block flex-none">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>消防监控</p>
          </div>
          <div class="chart-block__bd">
            <div class="fire-control-content">
              <div class="fire-control" id="fire-control"></div>
              <div class="fire-control-info">
                <div class="each-count square-card square-card--red">
                  <span class="caret-left caret-red-left"></span>
                  <div class="caret-circle caret-circle-red"></div>
                  <div class="line"></div>
                  <div class="info clearfix">
                    <span class="align-left">报修</span
                    ><span class="align-right">32</span>
                  </div>
                  <div class="info info-center">
                    <span>同比上周：</span
                    ><span class="percentage">↓39.0%</span>
                  </div>
                  <span class="caret-right caret-red-right"></span>
                </div>
                <div class="each-count  square-card square-card--green"">
                  <span class="caret-left caret-green-left"></span>
                  <div class="caret-circle caret-circle-green"></div>
                  <div class="line"></div>
                  <div class="info clearfix">
                    <span class="align-left">正常</span
                    ><span class="align-right">50</span>
                  </div>
                  <div class="info info-center">
                    <span>同比上周：</span
                    ><span class="percentage">↑61.0%</span>
                  </div>
                  <span class="caret-right caret-green-right"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-block">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>值班保卫信息</p>
          </div>
          <div class="chart-block__bd">
            <table class="personnel-info-content">
              <tr>
                <td>张毅</td>
                <td>18038009393</td>
                <td>南门安保</td>
              </tr>
              <tr>
                <td>黄新</td>
                <td>17890098768</td>
                <td>南门安保</td>
              </tr>
              <tr>
                <td>刘广</td>
                <td>15820099878</td>
                <td>北门安保</td>
              </tr>
              <tr>
                <td>赵柳</td>
                <td>15678877987</td>
                <td>北门安保</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
`
