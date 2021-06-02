/**
 * @class CreateGBackNavigator
 * @desc 创建全局返回控件
 * @param
 * @returns
 */
THING.Utils.dynamicLoad([
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/global/GTabList/index.css'
])

console.log('初始化：CreateGBackNavigator')

class CreateGBackNavigator {
  constructor() { }
  onAdd() {
    let _this = this
    $('#div2d').append(`<div class="g-back-navigator"><span class="glyphicon glyphicon-menu-left"></span>返回</div>`)
    this.hide()
    $(document).on('click', '.g-back-navigator', function () {
      _this.back()
    })
  }

  show() {
    $('.g-back-navigator').show()
  }

  hide() {
    $('.g-back-navigator').hide()
  }

  back() {
    app.level.back()
  }
}
