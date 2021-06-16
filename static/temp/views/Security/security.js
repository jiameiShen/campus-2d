/**
 * @class CreatePageSecurity
 * @desc 创建安全管理
 * @param
 * @returns
 */
 THING.Utils.dynamicLoad(
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Security/security.css'
)
THING.Utils.dynamicLoad(
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Security/securityCharts.js'
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
    $(document).on('click', '.monitoring-alarms-content .tab .item', function () {
      $(this).addClass('tab-active').siblings().removeClass('tab-active')
      _this.changeMonitorList($(this).index())
    })
    $(document).on('click', '.safety-control-content .tab li', function () {
      $(this).addClass('safety-tab-active').siblings().removeClass('safety-tab-active')
      _this.changeSafetyControl($(this).index())
    })
    // 安防摄像头
    $(document).on('click', '.js-capture-trigger .item', function () {
      const KEY = $(this).data('key')
      $(this).addClass('tab-active').siblings().removeClass('tab-active')
      $('.capture-pictures .img-front').html(`<img src="/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/static/image/temp/front-${KEY}.png" />`)
      $('.capture-pictures .img-back').html(`<img src="/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/static/image/temp/back-${KEY}.png" />`)
    })
    let gVideoPlayer = null
    const videoUrl = window.$videoUrl
    $(document).on('click', '.js-show-video', function () {
      $('#gVideoModal .modal-title').text($('.js-capture-trigger .tab-active')[0].innerHTML)
      $('#gVideoModal').modal()
      gVideoPlayer && gVideoPlayer.stop()
      $('#gVideoPlayer').attr("src", videoUrl);
      gVideoPlayer = new EZUIKit.EZUIPlayer('gVideoPlayer');
    });
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
    let securityCameraText = !this.buildingName ? '1682' : '1450'
    $(`#page${this.pageId} .js-building-name`).each(function () {
      $(this).text(_this.buildingName || $(this).data('school') || '')
    })
    $('.monitoring-alarms-content .tab .item').eq(0).trigger('click') 
    $('.safety-control-content .tab li').eq(0).trigger('click') 
    $('.camera-content .tab .item').eq(0).trigger('click') 
    securitySchoolVisitorsChart()
    securityCameraChart(securityCameraText)
    securityFireControl()
    this.changeMonitorList(0)
    this.changeSafetyControl(0)
    this.changeCameraTab()
  }

  changeMonitorList(type) {
    let templater = ''
    if (!this.buildingName) {
      if (type == 0) {
        templater = `
          <tr>
            <td>01</td>
            <td>图书馆201</td>
            <td>消防报警</td>
          </tr>
          <tr>
            <td>02</td>
            <td>图书馆202</td>
            <td>消防报警</td>
          </tr>
          <tr>
            <td>03</td>
            <td>图书馆203</td>
            <td>消防报警</td>
          </tr>
          <tr>
            <td>04</td>
            <td>图书馆205</td>
            <td>消防报警</td>
          </tr>
          <tr>
            <td>05</td>
            <td>图书馆206</td>
            <td>消防报警</td>
          </tr>
        `
      } else if(type == 1) {
        templater = `
          <tr>
            <td>01</td>
            <td>图书馆201</td>
            <td>摄像头报警</td>
          </tr>
          <tr>
            <td>02</td>
            <td>图书馆202</td>
            <td>摄像头报警</td>
          </tr>
          <tr>
            <td>03</td>
            <td>图书馆203</td>
            <td>摄像头报警</td>
          </tr>
          <tr>
            <td>04</td>
            <td>图书馆205</td>
            <td>摄像头报警</td>
          </tr>
          <tr>
            <td>05</td>
            <td>图书馆206</td>
            <td>摄像头报警</td>
          </tr>
       `
      }else if(type == 2) {
        templater = `
          <tr>
            <td>01</td>
            <td>图书馆201</td>
            <td>门禁报警</td>
          </tr>
          <tr>
            <td>02</td>
            <td>图书馆202</td>
            <td>门禁报警</td>
          </tr>
          <tr>
            <td>03</td>
            <td>图书馆203</td>
            <td>门禁报警</td>
          </tr>
          <tr>
            <td>04</td>
            <td>图书馆205</td>
            <td>门禁报警</td>
          </tr>
          <tr>
            <td>05</td>
            <td>图书馆206</td>
            <td>门禁报警</td>
          </tr>
       `
      }
    } else {
      if (type == 0) {
        templater = `
          <tr>
            <td>01</td>
            <td>201</td>
            <td>消防报警</td>
          </tr>
          <tr>
            <td>02</td>
            <td>202</td>
            <td>消防报警</td>
          </tr>
          <tr>
            <td>03</td>
            <td>203</td>
            <td>消防报警</td>
          </tr>
          <tr>
            <td>04</td>
            <td>204</td>
            <td>消防报警</td>
          </tr>
          <tr>
            <td>05</td>
            <td>205</td>
            <td>消防报警</td>
          </tr>
        `
      } else if(type == 1) {
        templater = `
          <tr>
            <td>01</td>
            <td>201</td>
            <td>摄像头报警</td>
          </tr>
          <tr>
            <td>02</td>
            <td>202</td>
            <td>摄像头报警</td>
          </tr>
          <tr>
            <td>03</td>
            <td>203</td>
            <td>摄像头报警</td>
          </tr>
          <tr>
            <td>04</td>
            <td>204</td>
            <td>摄像头报警</td>
          </tr>
          <tr>
            <td>05</td>
            <td>205</td>
            <td>摄像头报警</td>
          </tr>
       `
      }else if(type == 2) {
        templater = `
          <tr>
            <td>01</td>
            <td>201</td>
            <td>门禁报警</td>
          </tr>
          <tr>
            <td>02</td>
            <td>202</td>
            <td>门禁报警</td>
          </tr>
          <tr>
            <td>03</td>
            <td>203</td>
            <td>门禁报警</td>
          </tr>
          <tr>
            <td>04</td>
            <td>204</td>
            <td>门禁报警</td>
          </tr>
          <tr>
            <td>05</td>
            <td>205</td>
            <td>门禁报警</td>
          </tr>
       `
      }
    }
    $(this).addClass('tab-active').siblings().removeClass('tab-active')
    $('.vtable').empty()
    $('.vtable').append(templater)
  }

  changeSafetyControl(type) {
    let templater = ''
    if (!this.buildingName) {
      let arr = ['生活区','教学区','办公区','运动区','实验区']
       $(".safety-control-content .tab li").html(function(i){
           return arr[i]; 
         })
      for (let i =0;i<arr.length;i++) {
        if (type === i) {
          templater = `
            <li>1#${arr[i]}</li>
            <li>2#${arr[i]}</li>
            <li>3#${arr[i]}</li>
            <li>4#${arr[i]}</li>
            <li>5#${arr[i]}</li>
          `
        }
      }
    } else {
      let arr = ['1楼','2楼','3楼','4楼','5楼']
      $(".safety-control-content .tab li").html(function(i){
        return arr[i]; 
      })
      templater = `
      <li>东边走廊</li>
      <li>西边走廊</li>
      <li>北边走廊</li>
      <li>南边走廊</li>
    `
    }
    $(this).addClass('safety-tab-active').siblings().removeClass('safety-tab-active')
    $('.list').empty()
    $('.list').append(templater)
  }

  changeCameraTab() {
    let tabArr = []
    if (!this.buildingName) {
      let arr = ['东门','西门','南门','北门']
      for (let key in arr) {
        tabArr.push(arr[key])
      }
    } else {
      let arr =['入口1','入口2','入口3','入口4']
      for (let key in arr) {
        tabArr.push(arr[key])
      }
    }
    $(".camera-content .tab .item").html(function(i){
      return tabArr[i]; 
    })
  }
}

var securityTemplate = `
<div class="page-aside page-aside-left animate__animated page-security">
        <div class="chart-block chart-block-1">
          <div class="chart-block__hd">
            <p><span class="js-building-name" data-school="学校"></span>访客</p>
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
        <div class="chart-block chart-block-2">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>监控警报</p>
          </div>
          <div class="chart-block__bd">
            <div class="monitoring-alarms-content">
              <div class="tab">
                <div class="item tab-active">
                  消防 <span class="tip">5</span>
                </div>
                <div class="item">门禁<span class="tip">5</span></div>
                <div class="item">摄像头<span class="tip">5</span></div>
              </div>
              <div class="vtable-wrapper">
                <table class="vtable">
                  <tr>
                    <td>01</td>
                    <td>图书馆201</td>
                    <td>消防报警</td>
                  </tr>
                  <tr>
                    <td>02</td>
                    <td>图书馆202</td>
                    <td>消防报警</td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>图书馆203</td>
                    <td>消防报警</td>
                  </tr>
                  <tr>
                    <td>04</td>
                    <td>图书馆204</td>
                    <td>消防报警</td>
                  </tr>
                  <tr>
                    <td>05</td>
                    <td>图书馆205</td>
                    <td>消防报警</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-block chart-block-3">
          <div class="chart-block__hd">
            <p><span class="js-building-name" data-school="学校"></span>区域安全管控</p>
          </div>
          <div class="chart-block__bd">
            <div class="safety-control-content">
              <ul class="tab">
                <li class="safety-tab-active">生活区</li>
                <li>教学区</li>
                <li>办公区</li>
                <li>运动区</li>
                <li>实验区</li>
              </ul>
              <ul class="list">
                <li>1#教学楼</li>
                <li>2#教学楼</li>
                <li>3#教学楼</li>
                <li>4#教学楼</li>
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
                <div class="tab js-capture-trigger">
                  <div class="item tab-active" data-key="01">东门</div>
                  <div class="item" data-key="02">西门</div>
                  <div class="item" data-key="03">南门</div>
                  <div class="item" data-key="04">北门</div>
                </div>
                <div class="capture-pictures">
                  <div class="img-wrapper img-front js-show-video">
                    <!-- <img src="../../static/image/temp/front-01.png" /> -->
                    <img src="/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/static/image/temp/front-01.png" />
                  </div>
                  <div class="img-wrapper img-back js-show-video">
                    <!-- <img src="../../static/image/temp/front-01.png" /> -->
                    <img src="/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/static/image/temp/back-01.png" />
                  </div>
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
        <div class="chart-block chart-block-6">
          <div class="chart-block__hd">
            <p><span class="js-building-name"></span>值班保卫信息</p>
          </div>
          <div class="chart-block__bd">
            <div class="vtable-wrapper">
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
      </div>
      <!-- Modal -->
      <div class="modal fade g-dialog" id="gVideoModal" data-opend="0">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <p class="modal-title">东门</p>
            </div>
            <div class="modal-body">
              <video
                id="gVideoPlayer"
                autoplay
                src=""
                playsInline
                webkit-playsinline
              >
              </video>
            </div>
          </div>
        </div>
      </div>
`
