$(function () {
  /* 添加顶部信息栏 */
  var ctrlGHeader = app.addControl(new CreateGHeader())

  /* 返回按钮 */
  var ctrlGBackNavigator = app.addControl(new CreateGBackNavigator())

  /* 切换楼层 */
  var ctrlGLevelSwitch = app.addControl(new CreateGLevelSwitch())

  /* 添加全局tab导航 */
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

  /* 添加主页楼栋标注 */
  campus = app.query('.Campus')[0] // 获取园区对象
  createBoardHtml()
  var buildings = campus.buildings // 获取园区下的所有建筑，返回为 Selector 结构
  buildings.forEach(function (item) {
    // 创建标注
    let ui = app.create({
      type: 'UIAnchor',
      parent: item,
      element: cloneBoardElement('buildingMarker', item.id), // 此参数填写要添加的Dom元素
      localPosition: [0, 0, 0],
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

  /* 修改层级背景 */
  app.on(THING.EventType.EnterLevel, function (ev) {
    app.background = '#030303';
  }, 'customLevelSetBackground');
  app.pauseEvent(THING.EventType.EnterLevel, THING.EventTag.LevelSetBackground);

  /* 修改进入层级操作 */
  app.on(THING.EventType.DBLClick, function (ev) {
    let currentTab = ctrlGTabList.currentTab
    let object = ev.object
    // 公寓管理--不能进入其他楼栋
    // 其他--不能进入宿舍楼栋层级
    if (currentTab === 'Apartment') {
      if (!(object instanceof THING.Thing)) {
        object.app.level.change(object)
      }
    } else {
      if (!(object instanceof THING.Floor)) {
        object.app.level.change(object)
      }
    }
  }, 'customLevelEnterMethod');
  app.pauseEvent(THING.EventType.DBLClick, '*', THING.EventTag.LevelEnterOperation);

  /* 层级变化 */
  app.on(THING.EventType.LevelChange, function (ev) {
    let object = ev.current
    ctrlGTabList.showTab()
    if (object instanceof THING.Campus) {
      console.log('Campus: ' + object)
      $('.buildingMarker').show()
      ctrlGBackNavigator.hide()
    } else {
      $('.buildingMarker').hide()
      ctrlGBackNavigator.show()
    }

    if (object instanceof THING.Floor) {
      console.log('Floor: ' + object)
      ctrlGLevelSwitch.show()
    } else {
      ctrlGLevelSwitch.hide()
    }

    if (object instanceof THING.Building) {
      console.log('Building: ' + object)
    } else if (object instanceof THING.Thing) {
      console.log('Thing: ' + object)
      //   if (object.name === '建筑') {
      //   }
    }
  });

  /* 创建主页建筑面板marker */
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
