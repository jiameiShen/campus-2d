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
  skyBoxParams = {}
  weatherMode = 'DEFAULT'
  weather = ''
  weatherName = ''
  weatherTimer = null
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
              <img
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
                style="width: 18px; vertical-align: -3px;"
                src="/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/static/image/cloud.png"/>
              <ul class="dropdown-menu dropdown-menu-right">
                <li class="dropdown-menu-item js-toogle-weather ${this.weatherMode === 'DEFAULT' ? 'active' : ''}" data-model="DEFAULT">跟随系统</li>
                <li class="dropdown-menu-item js-toogle-weather ${this.weatherMode === 'BlueSky' ? 'active' : ''}" data-model="BlueSky">蓝天</li>
                <li class="dropdown-menu-item js-toogle-weather ${this.weatherMode === 'Night' ? 'active' : ''}" data-model="Night">黑夜</li>
                <li class="dropdown-menu-item js-toogle-weather ${this.weatherMode === 'MilkyWay' ? 'active' : ''}" data-model="MilkyWay">银河</li>
                <li class="dropdown-menu-item js-toogle-weather ${this.weatherMode === 'Sunset' ? 'active' : ''}" data-model="Sunset">黄昏</li>
                <li class="dropdown-menu-item js-toogle-weather ${this.weatherMode === 'yu' ? 'active' : ''}" data-model="yu">下雨</li>
              </ul>
            </span>
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
    this.getSkyBoxParams()

    /* 切换天气模式 */
    $('.js-toogle-weather').on('click', function () {
      const model = $(this).data('model')
      $(this).addClass('active').siblings().removeClass('active')
      if (model !== _this.weatherMode) {
        _this.weatherMode = model
        _this.showWeather()
      }
    })

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
    this.showWeather()
    this.timer = setInterval(() => {
      this.showWeather()
      $('.js-timer').html(moment().format(this.TIME_FORMAT))
    }, 1000)
  }

  hideTime() {
    this.timer && clearInterval(this.timer)
    this.timer = null
  }

  showWeather() {
    if (window.$enterLevel) {
      this.weatherName = null
      this.resetAll()
      return;
    }
    let skyBox = this.getSkyBox()
    let weatherName = this.getWeatherName()
    let skyBoxName = this.skyBoxParams[skyBox]
    const isWeatherMode = this.weatherMode !== 'DEFAULT'
    if (isWeatherMode) {
      weatherName = this.getWeatherName(this.weatherMode)
      skyBoxName = this.skyBoxParams[this.weatherMode] || this.skyBoxParams['DarkClouds']
    }

    if (
      (typeof app.skyBox === 'string' ? app.skyBox : JSON.stringify(app.skyBox))
      !== (typeof skyBoxName === 'string' ? skyBoxName : JSON.stringify(skyBoxName))) {
      app.skyBox = skyBoxName
      console.log('设置天空盒', app.skyBox)
    }

    if (weatherName !== this.weatherName) {
      if (weatherName === '雨') {
        this.createByParticle()
      } else if (weatherName === '雪') {
        this.createSnow()
      } else {
        this.resetAll()
      }
      this.weatherName = weatherName
    }
  }

  /**
   * 通过创建粒子实现飘雪效果
   */
  createSnow() {
    this.resetAll();
    // 创建降雪效果
    // var particleSnow = app.create({
    //   type: 'ParticleSystem',
    //   id: 'No1234567',
    //   name: 'Snow',
    //   url: 'https://model.3dmomoda.com/models/18112014q3t8aunaabahzxbxcochavap/0/particles',
    //   position: [0, 50, 0]
    // });
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
      particle.destroyAll();
    }
  }

  getSkyBox() {
    let weatherName = this.getWeatherName()
    let skyBoxArr = []
    switch (weatherName) {
      case '雪':
        skyBoxArr = ['DarkClouds', 'DarkClouds', 'DarkClouds', 'Dark']
        break;
      case '雨':
        skyBoxArr = ['DarkClouds', 'BlueSky', 'ColdMorning', 'Dark']
        break;
      case '晴':
        skyBoxArr = ['ColdMorning', 'SunnyDay', 'Sunset', 'Night']
        break;
      case '阴':
        skyBoxArr = ['DarkClouds', 'DarkClouds', 'DarkClouds', 'Night']
        break;
      default:
        break;
    }
    // 判断时间段
    const currentTime = moment().format('LT').replace(':', '')
    let skyBox = ''
    if (currentTime < 600) {
      // 晚上
      skyBox = skyBoxArr[3]
    } else if (currentTime < 1000) {
      // 早上
      skyBox = skyBoxArr[0]
    } else if (currentTime < 1700) {
      // 中午
      skyBox = skyBoxArr[1]
    } else if (currentTime < 1800) {
      // 黄昏
      skyBox = skyBoxArr[2]
    } else if (currentTime < 2400) {
      // 晚上
      skyBox = skyBoxArr[3]
    }

    return skyBox
  }

  getSkyBoxParams() {
    this.skyBoxParams = {
      'BlueSky': 'BlueSky',
      'Dark': 'Dark',
      'Night': 'Night',
      'MilkyWay': 'MilkyWay'
    }
    // 引入天空盒
    $.get('/api/skybox/8217708ecf215ec4e04a4ef6', result => {
      this.skyBoxParams['DarkClouds'] = result;
    });
    $.get('/api/skybox/523a00ea6e586e664477f8a0', result => {
      this.skyBoxParams['OverCast'] = result;
    });
    $.get('/api/skybox/da8c8bae89744ab061bd5d28', result => {
      this.skyBoxParams['Afternoon'] = result;
    });
    $.get('/api/skybox/5e576569cce3a48dbcab5918', result => {
      this.skyBoxParams['ColdMorning'] = result;
    });
    $.get('/api/skybox/35bc75a821837cfbfb8a4e79', result => {
      this.skyBoxParams['SunnyDay'] = result;
    });
    $.get('/api/skybox/a43194d49ac4cb3cf83583f8', result => {
      this.skyBoxParams['Sunset'] = result;
    });
  }

  getWeatherName(wea) {
    const weather = wea || this.weather
    let weatherName = ''
    switch (weather) {
      case 'xue':
      case 'bingbao':
        weatherName = '雪'
        break;
      case 'yu':
        weatherName = '雨'
        break;
      case 'qing':
        weatherName = '晴'
        break;
      case 'lei':
      case 'shachen':
      case 'wu':
      case 'yun':
      case 'yin':
        weatherName = '阴'
        break;
      default:
        weatherName = '阴'
        break;
    }
    return weatherName
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