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
    $(`#page${this.pageId}`).html($(assetsTemplate))
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
    totalAssetsChart()
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
