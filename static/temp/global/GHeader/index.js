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
  'https://cdn.bootcdn.net/ajax/libs/moment.js/2.29.1/moment.min.js',
  'https://cdn.bootcdn.net/ajax/libs/moment.js/2.29.1/moment-with-locales.min.js'
])

console.log('初始化：CreateGHeader')

class CreateGHeader {
  fullscreenEnabled = document.fullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.msFullscreenEnabled
  TIME_FORMAT = 'YYYY年M月D日 dddd HH:mm:ss'
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
            <span class="full-screen js-full-screen"></span>
        </div>
    </div>`)

    // 时间展示
    moment.locale('zh-cn')
    this.showTime()

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
    this.timer = setInterval(() => {
      $('.js-timer').html(moment().format(this.TIME_FORMAT))
    }, 1000)
  }

  hideTime() {
    this.timer && clearInterval(this.timer)
    this.timer = null
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