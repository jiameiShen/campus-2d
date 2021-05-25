$(function () {
  // 时间展示
  moment.locale('zh-cn')
  const FORMAT = 'YYYY年M月D日 dddd HH:mm:ss'
  const timer = setInterval(() => {
    $('.js-timer').html(moment().format(FORMAT))
  }, 1000)
  $('.js-timer').html(moment().format(FORMAT))
  $('.js-tab-item').on('click', function () {
    $(this).addClass('active')
    $(this).siblings().removeClass('active')

    console.log($(this).data('id'))

    // 显示图表
    $('.page-aside-left').addClass('animate__fadeInLeft')
    $('.page-aside-right').addClass('animate__fadeInRight')
    setTimeout(function () {
      $('.page-aside-left').removeClass('animate__fadeInLeft')
      $('.page-aside-right').removeClass('animate__fadeInRight')
    }, 1000)

    // 插入相应页面模板
    // 创建相应页面图表
  })
})
