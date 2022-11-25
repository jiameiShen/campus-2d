$(function () {
  /* 展示模式 */
  window.$modelType = localStorage.getItem('modelType') || 'DEFAULT'

  /* 添加顶部信息栏 */
  const ctrlGHeader = app.addControl(new CreateGHeader())

  /* 返回按钮 */
  const ctrlGBackNavigator = app.addControl(new CreateGBackNavigator())

  /* 切换楼层 */
  const ctrlGLevelSwitch = app.addControl(new CreateGLevelSwitch())

  /* 添加全局tab导航 */
  const ctrlGTabList = app.addControl(new CreateGTabList())
  ctrlGTabList.showTab('Apartment')

  $(document).on('click', '.js-tab-item', function () {
    const pageId = $(this).data('id')
    // 不是顶级 不允许切换tab且跳至顶级
    if (!(app.level.current instanceof THING.Campus)) {
      app.level.change(app.root.campuses[0])
    }
    ctrlGTabList.showTab(pageId)
  })

  /* 切换模式 */
  $(document).on('click', '.js-toogle-model', function () {
    const model = $(this).data('model')
    $(this).addClass('active').siblings().removeClass('active')
    if (model !== localStorage.getItem('modelType')) {
      localStorage.setItem('modelType', model)
      window.$modelType = model
      ctrlGTabList.showPage()()
    }
  })

  let ctrlGMockWarning = null
  /* 添加主页楼栋标注 */
  campus = app.query('.Campus')[0] // 获取园区对象
  createBoardHtml()
  const buildings = campus.buildings // 获取园区下的所有建筑，返回为 Selector 结构
  const dormitorys = buildings.filter(item => {
    return item.getAttribute("userData/buildingType") === 'Apartment'
  })
  $_ajaxPromise({
    type: "get",
    url: `${window.$baseUrl}/queryDormitoryList`,
    dataType: "json"
  }).then(res => {
    if (res.message) {
      const dormitoryList = res.message
      dormitorys.forEach(function (obj, index) {
        const dormitory = dormitoryList[index]
        if (dormitory) {
          obj.setAttribute("userData/name", dormitory.dormitoryName)
          obj.setAttribute("userData/dormitoryName", dormitory.dormitoryName)
          obj.setAttribute("userData/dormitoryId", dormitory.tid)
          appCreatMarker(obj)
        } else {
          obj.visible = false
        }
      })
      ctrlGMockWarning = app.addControl(new CreateGMockWarning())
    }
  })

  // 创建标注
  function appCreatMarker(obj) {
    app.create({
      type: 'UIAnchor',
      parent: obj,
      element: cloneBoardElement('buildingMarker', obj.id), // 此参数填写要添加的Dom元素
      localPosition: [0, 1, 0],
      pivot: [0.5, 1], //[0,0]即以界面左上角定位，[1,1]即以界面右下角进行定位
    })
    $('#buildingMarker' + obj.id + ' .caption').text(obj.userData.name)
  }

  // 有模型的楼
  buildings.forEach(function (obj) {
    appCreatMarker(obj)
  })

  // 辅助楼
  const buildings2 = app.query('建筑');
  buildings2.forEach(function (obj) {
    appCreatMarker(obj)
  })

  /* 修改层级背景 */
  app.on(THING.EventType.EnterLevel, function (ev) {
    app.background = '#031432';
  }, 'customLevelSetBackground');
  app.pauseEvent(THING.EventType.EnterLevel, THING.EventTag.LevelSetBackground);

  /* 修改进入层级操作 */
  let curEnterBuildingType = ''
  app.on(THING.EventType.DBLClick, function (ev) {
    const currentTab = ctrlGTabList.currentTab
    const object = ev.object
    if (object instanceof THING.Building) {
      const buildingType = object.getAttribute("userData/buildingType")
      curEnterBuildingType = currentTab === buildingType ? buildingType : ''
    }
    window.$enterLevel = !!curEnterBuildingType
    window.$background = curEnterBuildingType ? '#031432' : ''
    // 公寓管理、资产管理
    // 可以进入符合当前指定类型楼栋的层级
    if (currentTab === curEnterBuildingType) {
      if (object instanceof THING.Campus
        || object instanceof THING.Building
        || object instanceof THING.Floor
        || object instanceof THING.Room) {
        object.app.level.change(object)
      }
    } else {
      // 公寓管理--不能进入其他楼栋
      // 其他--不能进入楼栋层级
      if (currentTab === 'Apartment') {
        return
      } else if (object instanceof THING.Thing && object.name === '建筑') {
        object.app.level.change(object)
      } else if (object instanceof THING.Campus || object instanceof THING.Building) {
        object.app.level.change(object)
      }
    }
  }, 'customLevelEnterMethod');
  app.pauseEvent(THING.EventType.DBLClick, '*', THING.EventTag.LevelEnterOperation);

  /* 层级变化 */
  app.on(THING.EventType.LevelChange, function (ev) {
    const object = ev.current
    if (!(object instanceof THING.Room)) {
      ctrlGTabList.showTab()
    }
    if (object instanceof THING.Campus) {
      console.log('*Campus: ' + JSON.stringify(object))
      $('.u-building-marker').show()
      ctrlGBackNavigator.hide()
      ctrlGMockWarning.start()
    } else {
      $('.u-building-marker').hide()
      ctrlGBackNavigator.show()
      ctrlGMockWarning.stop()
    }

    if (object instanceof THING.Floor) {
      console.log('*Floor: ' + JSON.stringify(object))
      ctrlGLevelSwitch.show()
    } else {
      ctrlGLevelSwitch.hide()
    }

    if (object instanceof THING.Building) {
      console.log('*Building: ' + JSON.stringify(object))
    } else if (object instanceof THING.Thing) {
      console.log('*Thing: ' + JSON.stringify(object))
    }
  });

  /* 创建主页建筑面板marker */
  function createBoardHtml() {
    const html = `
      <div class="u-building-marker" id="buildingMarker">
        <div class="caption"></div>
      </div>
    `
    $('#div3d').append($(html))
  }

  /**
   * 创建元素
   */
  function cloneBoardElement(name = 'buildingMarker', id) {
    const srcElem = document.getElementById(name)
    const newElem = srcElem.cloneNode(true)
    newElem.style.display = 'block'
    newElem.setAttribute('id', `${name}${id}`)
    app.domElement.insertBefore(newElem, srcElem)
    return newElem
  }

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
})
