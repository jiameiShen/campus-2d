/**
 * @class CreateGHeader
 * @desc 创建全局顶部信息栏
 * @param
 * @returns
 */
THING.Utils.dynamicLoad([
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/global/GHeader/index.css'
])
THING.Utils.dynamicLoad([
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/lib/moment@2.24.0.min.js',
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/lib/moment-with-locales@2.24.0.min.js'
])

console.log('初始化：CreateGHeader')

class CreateGHeader {
  fullscreenEnabled = document.fullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.msFullscreenEnabled
  TIME_FORMAT = 'YYYY年M月D日 dddd HH:mm:ss'
  skyBox = ''
  background = ''
  weather = ''
  weatherTimer = ''
  constructor() { }
  onAdd() {
    let _this = this
    $('#div2d').append(`<div class="g-header">
        <div class="left">
            <img class="logo" src="/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/static/image/logo.png"/>
            <span class="name">智慧校园</span>
        </div>
        <div class="right">
            <span class="time js-timer"></span>
            <span class="dropdown">
              <span class="glyphicon glyphicon-cog dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"></span>
              <ul class="dropdown-menu dropdown-menu-right">
                <li class="dropdown-menu-item js-toogle-model ${window.$modelType === 'DEFAULT' ? 'active' : ''}" data-model="DEFAULT">普通模式</li>
                <li class="dropdown-menu-item js-toogle-model ${window.$modelType === 'K12' ? 'active' : ''}" data-model="K12">K12模式</li>
              </ul>
            </span>
            <span class="full-screen js-full-screen"></span>
        </div>
    </div>`)

    // 时间展示
    moment.locale('zh-cn')
    this.showTime()

    this.weatherTimer = setInterval(() => {
      $_ajaxPromise({
        type: "get",
        url: `${window.$tianqiapi}`,
        dataType: "json"
      }).then(res => {
        if (res) {
          this.weather = res.wea_img
        }
      })
    }, 3 * 60 * 60 * 1000)

    // 获取天气
    $_ajaxPromise({
      type: "get",
      url: `${window.$tianqiapi}`,
      dataType: "json"
    }).then(res => {
      if (res) {
        this.weather = res.wea_img
      }
    })
    function $_ajaxPromise(params) {
      return new Promise((resovle, reject) => {
        $.ajax({
          "type": params.type || "get",
          "async": params.async || true,
          "url": params.url,
          "data": params.data || "",
          "success": res => {
            resovle(res);
          },
          "error": err => {
            reject(err);
          }
        })
      })
    }

    // 全屏展示
    $('.full-screen').on('click', function () {
      if (_this.fullscreenEnabled) {
        _this.toggleFullScreen()
      } else {
        window.parent.postMessage({ message: 'toggleFullScreen' }, '*')
        $('.js-full-screen').toggleClass('full')
      }
    })

    if (!this.fullscreenEnabled) {
      window.addEventListener('message', e => {
        if (e.data && e.data.message === 'toggleFullScreen') {
          if (e.data.fullScreen) {
            $('.js-full-screen').addClass('full')
          } else {
            $('.js-full-screen').removeClass('full')
          }
        }
      }, false)
    }

    document.addEventListener("fullscreenchange", function (event) {
      if (document.fullscreenElement) {
        $('.js-full-screen').addClass('full');
      } else {
        $('.js-full-screen').removeClass('full');
      }
    });
  }

  showTime() {
    $('.js-timer').html(moment().format(this.TIME_FORMAT))
    this.getWeather()
    this.timer = setInterval(() => {
      this.getWeather()
      $('.js-timer').html(moment().format(this.TIME_FORMAT))
    }, 1000)
  }

  hideTime() {
    this.timer && clearInterval(this.timer)
    this.timer = null
  }

  getWeather() {
    // 判断时间段
    const timeStr = moment().format('LLL').substring(11, 13)
    switch (timeStr) {
      case '早上':
        this.skyBox = 'BlueSky'
        break;
      case '中午':
        this.skyBox = 'BlueSky'
        break;
      case '下午':
        this.skyBox = 'BlueSky'
        break;
      case '凌晨':
      case '晚上':
        this.skyBox = 'Night'
        break;
      default:
        break;
    }

    switch (this.weather) {
      case 'xue':
      case 'bingbao':
        // 雪
        this.background = 'snow'
        break;
      case 'lei':
      case 'shachen':
      case 'wu':
      case 'yun':
      case 'yin':
        // 普通
        this.background = 'rain'
        break;
      case 'yu':
        // 雨
        this.background = 'rain'
        break;
      case 'qing':
        // 晴朗
        this.background = 'Light'
        break;
      default:
        break;
    }

    this.showWeather()
  }

  showWeather() {
    if (app.skyBox === window.$skyBox && app.background === window.$background) {
      return
    }
    // 如果进入楼层就固定背景设置
    window.$skyBox = this.skyBox
    if (window.$enterLevel) {
      this.resetAll()
      this.background = window.$background
      // 设置背景色
      app.background = this.background
    } else {
      if (this.background === 'rain') {
        app.skyBox = this.skyBox
        this.createByParticle()
      } else if (this.background === 'snow') {
        app.skyBox = this.skyBox
        this.createSnow()
      } else {
        this.resetAll()
        // 设置背景图片
        app.skyBox = this.skyBox
      }
      window.$background = this.background
    }

    console.log('opoop', app.background, app.skyBox)
  }

  /**
   * 通过创建粒子实现飘雪效果
   */
  createSnow() {
    this.resetAll();
    // 创建降雪效果
    var particleSnow = app.create({
      type: 'ParticleSystem',
      id: 'No1234567',
      name: 'Snow',
      url: 'https://model.3dmomoda.com/models/18112014q3t8aunaabahzxbxcochavap/0/particles',
      position: [0, 50, 0]
    });
  }

  /**
   * 通过创建粒子实现降雨效果
   */
  createByParticle() {
    this.resetAll();
    // 创建粒子
    var particle = app.create({
      type: 'ParticleSystem',
      name: 'Rain',
      url: 'https://model.3dmomoda.com/models/18112113d4jcj4xcoyxecxehf3zodmvp/0/particles',
      position: [0, 300, 0],
      complete: function (ev) {
        ev.object.scale = [10, 10, 10];
      }
    });
    // 设置粒子最大密度
    particle.setGroupAttribute('maxParticleCount', 1000);
    // 设置粒子最小密度
    particle.setParticleAttribute('particleCount', 500);
  }

  /**
   * 清除降雨效果
   */
  resetAll() {
    var particle = app.query('.ParticleSystem');
    if (particle) {
      particle.destroy();
    }
  }

  toggleFullScreen() {
    if (document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement
    ) {
      exitFullscreen(document)
    } else {
      launchFullscreen(document.documentElement)
    }

    function launchFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      }
    }
    function exitFullscreen(element) {
      if (element.exitFullscreen) {
        element.exitFullscreen();
      } else if (element.msExitFullscreen) {
        element.msExitFullscreen();
      } else if (element.mozCancelFullScreen) {
        element.mozCancelFullScreen();
      } else if (element.webkitExitFullscreen) {
        element.webkitExitFullscreen();
      }
    }
  }
}