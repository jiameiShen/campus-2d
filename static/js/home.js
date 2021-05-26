$(function () {
  // 时间展示
  moment.locale('zh-cn')
  const FORMAT = 'YYYY年M月D日 dddd HH:mm:ss'
  const timer = setInterval(() => {
    $('.js-timer').html(moment().format(FORMAT))
  }, 1000)
  $('.js-timer').html(moment().format(FORMAT))
  $('.js-tab-item').on('click', function () {
    if ($(this).hasClass('active')) {
      return
    }
    $(this).addClass('active').siblings().removeClass('active')
    // 显示图表
    $('.page-aside-left').removeClass('animate__fadeInLeft').addClass('animate__fadeInLeft')
    $('.page-aside-right').removeClass('animate__fadeInRight').addClass('animate__fadeInRight')
    let timer = setTimeout(function () {
      $('.page-aside-left').removeClass('animate__fadeInLeft')
      $('.page-aside-right').removeClass('animate__fadeInRight')
      clearTimeout(timer)
    }, 1000)

    // 插入相应页面模板
    // 创建相应页面图表
  })
})
