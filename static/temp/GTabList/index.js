/**
 * @class CreateGTabList
 * @desc 创建全局tab切换控件
 * @param
 * @returns
 */
THING.Utils.dynamicLoad([
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/global/GTabList/index.css'
])

console.log('初始化：CreateGTabList')

class CreateGTabList {
  id = 'gTabList'
  currentTab = ''
  buildingName = ''

  constructor() { }

  onAdd(app) {
    this.init()
  }
  onRemove() {
    $(`#${this.id}`).remove()
  }

  /**
   * 初始化面板
   */
  init() {
    let _this = this;
    let tabList = [
      { name: '公寓管理', id: 'Apartment', func: CreatePageApartment, pageCtrl: null },
      { name: '能耗管理', id: 'Energy', func: CreatePageApartment, pageCtrl: null },
      { name: '资产管理', id: 'Asset', func: CreatePageApartment, pageCtrl: null },
      { name: '运维管理', id: 'Operations', func: CreatePageApartment, pageCtrl: null },
      { name: '安全管理', id: 'Security', func: CreatePageApartment, pageCtrl: null },
    ]

    let template =
      `<ul class="g-tab-list" id="gTabList">
            ${tabList.map(item => {
        return `<li class="tab-item js-tab-item" data-id="${item.id}">${item.name}</li>`
      }).join('')}
        </ul>`

    $('#div2d').append($(template));

    $(".js-tab-item").on('click', function () {
      const index = $(this).index()
      _this.currentTab = $(this).data('id')

      console.log('app.level.current', app.level.current)

      // // 不是顶级 不允许切换tab且跳至顶级
      if (!(app.level.current instanceof THING.Campus)) {
        console.log('园区级事件')
        // 不允许切换tab
        if (!$(this).hasClass('active')) {
          app.level.change(app.root.campuses[0])
          _this.buildingName = ''
        }
      }

      const isCurrentBuilding = $(this).data('buildingName') === _this.buildingName
      if (isCurrentBuilding && $(this).hasClass('active')) {
        return
      }

      console.log('currentTab===', _this.currentTab)
      console.log('buildingName===', _this.buildingName)

      $(this).data('buildingName', _this.buildingName)

      if ($(`#page${_this.currentTab}`).length === 0) {
        $('#div2d').append($(`<div class="page-container" id="page${_this.currentTab}"></div>`))
        tabList[index].pageCtrl = app.addControl(new tabList[index].func({
          pageId: _this.currentTab
        }))
      } else {
        tabList[index].pageCtrl.reload({
          pageId: _this.currentTab,
          buildingName: _this.buildingName
        })
      }

      $(`#page${_this.currentTab}`).show().siblings('.page-container').hide()
      $(this).addClass('active').siblings().removeClass('active')
      // 显示图表
      $('.page-aside-left').addClass('animate__fadeInLeft')
      $('.page-aside-right').addClass('animate__fadeInRight')
      let timer = setTimeout(function () {
        $('.page-aside-left').removeClass('animate__fadeInLeft')
        $('.page-aside-right').removeClass('animate__fadeInRight')
        clearTimeout(timer)
      }, 1000)
    })
  }

  showTab(id, data) {
    if (data) {
      this.buildingName = data.buildingName
    }
    console.log(this.buildingName)
    let $dom = $(".js-tab-item[data-id=" + (id || this.currentTab) + "]")
    $dom.trigger("click")
  }
}