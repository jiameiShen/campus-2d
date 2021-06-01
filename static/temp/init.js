// ctrlGTabList  全局导航实例   
// buildings     全局buildings 

$(function () {
  // 添加顶部信息栏
  class CreatHeader {
    constructor() { }
    onAdd(app) {
      let iframe = document.createElement('iframe')
      iframe.src =
        '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Header/index.html'
      iframe.width = '100%'
      iframe.height = '66px'
      iframe.frameborder = '0'
      iframe.scrolling = 'no'
      $('#div2d').append(iframe)
    }
  }
  var ctrlHeader = app.addControl(new CreatHeader())

  /* 返回按钮 */
  class CreateBackNavigator {
    constructor() { }
    onAdd() {
      $('#div2d').append(`<div class="g-back-navigator"><span class="glyphicon glyphicon-menu-left"></span>返回</div>`)
      this.hide()
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
  var ctrlBackNavigator = app.addControl(new CreateBackNavigator())
  $(document).on('click', '.g-back-navigator', function () {
    ctrlBackNavigator.back()
  })

  // 添加全局tab导航
  var ctrlGTabList = app.addControl(new CreateGTabList())
  ctrlGTabList.showTab('Apartment')

  $(document).on('click', '.js-tab-item', function () {
    const pageId = $(this).data('id')
    // 不是顶级 不允许切换tab且跳至顶级
    if (!(app.level.current instanceof THING.Campus)) {
      app.level.change(app.root.campuses[0])
    }
    ctrlGTabList.showTab(pageId)
  })

  // 添加主页楼栋标注
  campus = app.query('.Campus')[0] // 获取园区对象
  createBoardHtml()
  var buildings = campus.buildings // 获取园区下的所有建筑，返回为 Selector 结构
  buildings.forEach(function (item) {
    // 创建标注
    let ui = app.create({
      type: 'UIAnchor',
      parent: item,
      element: cloneBoardElement('buildingMarker', item.id), // 此参数填写要添加的Dom元素
      localPosition: [0, 1, 0],
      pivot: [0.5, 1], //[0,0]即以界面左上角定位，[1,1]即以界面右下角进行定位
    })
    $('#buildingMarker' + item.id + ' .text').text(item.userData.name)
  })

  var buildings2 = app.query('建筑');
  buildings2.forEach(function (item) {
    // 创建标注
    let ui = app.create({
      type: 'UIAnchor',
      parent: item,
      element: cloneBoardElement('buildingMarker', item.id), // 此参数填写要添加的Dom元素
      localPosition: [0, 1, 0],
      pivot: [0.5, 1], //[0,0]即以界面左上角定位，[1,1]即以界面右下角进行定位
    })
    $('#buildingMarker' + item.id + ' .text').text(item.userData.name)
  })

  //  层级变化
  app.on(THING.EventType.LevelChange, function (ev) {
    let object = ev.current
    if (object instanceof THING.Campus) {
      console.log('Campus: ' + object)
      $('.buildingMarker').show()
      ctrlBackNavigator.hide()
      ctrlGTabList.showTab(null, {
        buildingName: ''
      })
    } else {
      $('.buildingMarker').hide()
      ctrlBackNavigator.show()
    }
    if (object instanceof THING.Building) {
      ctrlGTabList.showTab(null, {
        buildingName: object.userData.name
      })
      console.log('Building: ' + object)
    } else if (object instanceof THING.Floor) {
      const previousObj = ev.previous
      console.log(object.name)
      ctrlGTabList.showTab(null, {
        buildingName: previousObj.userData.name,
        floorName: object.name
      })
      console.log('Floor: ' + object)
    } else if (object instanceof THING.Thing) {
      console.log('Thing: ' + object)
    }
  })

  // 房间信息隐藏事件
  $('#div2d').on('click', '.js-tool-show-room', function () {
    if (!!$(this).data('open')) {
      $(this).data('open', 0)
      $(this).text('展示房间信息')
      $('.room-marker').hide()
    } else {
      $(this).data('open', 1)
      $(this).text('隐藏房间信息')
      $('.room-marker').show()
    }
  })

  // 点击房间
  app.query(".Room").on(THING.EventType.SingleClick, function () {
    let roomNumber = this.userData.room;
    if ($(`#board${roomNumber}`).length > 0) {
      $(`#board${roomNumber}`).toggle()
      return
    }
  });

  // 创建主页建筑面板marker
  function createBoardHtml() {
    let html = `
        <div id="buildingMarker" class="buildingMarker" style="position: absolute;">
            <div class="text" style="color: #FF0000;font-size: 12px;text-shadow: white  0px 2px, white  2px 0px, white  -2px 0px, white  0px -2px, white  -1.4px -1.4px, white  1.4px 1.4px, white  1.4px -1.4px, white  -1.4px 1.4px;margin-bottom: 5px;">
            </div>
            <div class="picture" style="height: 30px;width: 30px;margin: auto;">
                <img src="/guide/examples/images/navigation/pointer.png" style="height: 100%;width: 100%;">
            </div>
        </div>`
    $('#div3d').append($(html))
  }

  /**
   * 创建元素
   */
  function cloneBoardElement(name = 'buildingMarker', id) {
    let srcElem = document.getElementById(name)
    let newElem = srcElem.cloneNode(true)
    newElem.style.display = 'block'
    newElem.setAttribute('id', `${name}${id}`)
    app.domElement.insertBefore(newElem, srcElem)
    return newElem
  }
})
