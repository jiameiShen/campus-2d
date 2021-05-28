(function ($) {
  $.fn.numberRock = function (options) {
    var defaults = {
      lastNumber: 0,
      duration: 2000,
      easing: 'swing'  //swing(默认 : 缓冲 : 慢快慢)  linear(匀速的)
    };
    var opts = $.extend({}, defaults, options);
    $(this).animate({
      num: "numberRock",
    }, {
      duration: opts.duration,
      easing: opts.easing,
      complete: function () {},
      step: function (a, b) {  //可以检测我们定时器的每一次变化
        $(this).html(toThousands(parseInt(b.pos * opts.lastNumber)));
      }
    });
  }

  function toThousands(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
  }
})(jQuery);
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

  // 数字滚动
  $(".js-rock-number").each(function () {
    $(this).numberRock({
      lastNumber: parseInt($(this).text()),
      duration: 800,
      easing: 'swing',
    });
  })
})
