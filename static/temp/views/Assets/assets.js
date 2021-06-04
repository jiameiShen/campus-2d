/**
 * @class CreatePageAssets
 * @desc 创建资产管理
 * @param
 * @returns
 */
THING.Utils.dynamicLoad('/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Assets/assets.css')
THING.Utils.dynamicLoad('/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Assets/assetsChart.js')
console.log('CreatePageAssets')

class CreatePageAssets {
  pageId = 'Assets'
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
    $(`#page${this.pageId}`).html($(assetsTemplate));
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

    schoolAssetsChart()
    collegeAssetsChart()
    classAssetsChart()
    totalAssetsChart()
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
                  <div class="software">1,890</div>
                </div>
                <div class="info-bk">
                  <div>硬件资产(万元）</div>
                  <div class="hardware">4,933</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-block chart-2">
          <div class="chart-block__hd">
            <p>
              <span class="js-building-name"></span>各学院资产统计
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
              <span class="js-building-name" data-school="学院"></span>各类资产统计
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
                <td>物理实验室1201</td>
                <td>720万</td>
              </tr>
              <tr>
                <td>
                  <div class="number">02</div>
                </td>
                <td>物理实验室809</td>
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
                <td>生物实验室809</td>
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