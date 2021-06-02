/**
 * @class CreateGLevelSwitch
 * @desc 创建楼层切换控件
 * @param
 * @returns
 */
THING.Utils.dynamicLoad([
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/global/GLevelSwitch/index.css'
])

console.log('初始化：CreateGLevelSwitch')

class CreateGLevelSwitch {
  constructor() { }
  onAdd() {
    let _this = this
    $('#div2d').append(`<div id="gLevelSwitch" class="g-level-switch"></div>`)
    $(document).on('click', '.js-level-switch', function () {
      $(this).addClass('active').siblings().removeClass('active')
      _this.changeLevel($(this).data('id'))
    })
  }

  show() {
    let currentBuilding = app.level.previous
    let currentFloor = app.level.current
    let tempArr = []
    currentBuilding.floors.forEach(function (floor) {
      tempArr.unshift(`<li class="item js-level-switch ${currentFloor.id === floor.id ? 'active' : ''}" data-id="${floor.id}">${floor.name}</li>`)
    })
    $('#gLevelSwitch').html(`<ul class="list">${tempArr.join('')}</ul>`)
    $('#gLevelSwitch').show()
  }

  hide() {
    $('#gLevelSwitch').hide()
  }

  changeLevel(id) {
    let obj = app.query(`#${id}`)[0]
    if (obj) {
      app.level.change(obj)
    }
  }
}
