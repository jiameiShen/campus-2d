$(function () {
  // 添加顶部信息栏
  class CreatHeader {
    constructor() { }
    onAdd(app) {
      var iframe = document.createElement('iframe')
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

  // 添加全局tab导航
  var ctrlGTabList = app.addControl(new CreateGTabList())
  ctrlGTabList.showTab('Apartment')

  // 添加主页楼栋标注
  campus = app.query('.Campus')[0] // 获取园区对象
  createBoardHtml()
  var buildings = campus.buildings // 获取园区下的所有建筑，返回为 Selector 结构
  buildings.forEach(function (item) {
    // 创建标注
    var ui = app.create({
      type: 'UIAnchor',
      parent: item,
      element: cloneBoardElement('buildingMarker', item.id), // 此参数填写要添加的Dom元素
      localPosition: [0, 1, 0],
      pivot: [0.5, 1], //[0,0]即以界面左上角定位，[1,1]即以界面右下角进行定位
    })
    $('#buildingMarker' + item.id + ' .text').text(item.userData.name)
  })

  var buildings2 = app.query('.Thing');
  buildings2.forEach(function (item) {
    if (item.name === '建筑') {
      // 创建标注
      var ui = app.create({
        type: 'UIAnchor',
        parent: item,
        element: cloneBoardElement('buildingMarker', item.id), // 此参数填写要添加的Dom元素
        localPosition: [0, 1, 0],
        pivot: [0.5, 1], //[0,0]即以界面左上角定位，[1,1]即以界面右下角进行定位
      })
      $('#buildingMarker' + item.id + ' .text').text(item.userData.name)
    }
  })

  //  层级变化
  // {String} ev.level 当前层级标识枚举值 可通过 THING.LevelType 获取枚举值，如建筑层级标识为 THING.LevelType.Building
  // {THING.BaseObject} ev.object 当前层级对象（将要进入的层级对象）
  // {THING.BaseObject} ev.current 当前层级对象（将要进入的层级对象）
  // {THING.BaseObject} ev.previous 上一层级对象（离开的层级对象）

  app.on(THING.EventType.LevelChange, function (ev) {
    var object = ev.current
    console.log('ev.level', ev.level)
    if (object instanceof THING.Campus) {
      console.log('Campus: ' + object)
      $('.buildingMarker').show()
      ctrlGTabList.showTab(null, {
        buildingName: ''
      })
    } else {
      $('.buildingMarker').hide()
    }
    if (object instanceof THING.Building) {
      ctrlGTabList.showTab(null, {
        buildingName: object.userData.name
      })
      console.log('Building: ' + object)
    } else if (object instanceof THING.Floor) {
      console.log('Floor: ' + object)
    } else if (object instanceof THING.Thing) {
      console.log('Thing: ' + object)
    }
  })


  // 创建主页建筑面板marker
  function createBoardHtml() {
    var html = `
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
    var srcElem = document.getElementById(name)
    var newElem = srcElem.cloneNode(true)
    newElem.style.display = 'block'
    newElem.setAttribute('id', `${name}${id}`)
    app.domElement.insertBefore(newElem, srcElem)
    return newElem
  }
})
