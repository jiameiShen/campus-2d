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

const G_TAbLIST_ARR = [
  { name: '公寓管理', id: 'Apartment', func: CreatePageApartment, pageCtrl: null },
  { name: '能耗管理', id: 'Energy', func: CreatePageApartment, pageCtrl: null },
  { name: '资产管理', id: 'Assets', func: CreatePageAssets, pageCtrl: null },
  { name: '运维管理', id: 'Operations', func: CreatePageApartment, pageCtrl: null },
  { name: '安全管理', id: 'Security', func: CreatePageApartment, pageCtrl: null },
]

class CreateGTabList {
  id = 'gTabList'
  currentIndex = 0
  currentTab = 'Apartment'
  buildingName = ''
  floorName = ''

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
    let template =
      `<ul class="g-tab-list" id="gTabList">
            ${G_TAbLIST_ARR.map(item => {
        return `<li class="tab-item js-tab-item" data-id="${item.id}">${item.name}</li>`
      }).join('')}
      </ul>`
    $('#div2d').append($(template));
  }

  showTab(id) {
    let currentObj = app.level.current
    if (currentObj.type === 'Floor') {
      this.buildingName = currentObj.parent.userData.name
      this.floorName = currentObj.name
    } else {
      this.buildingName = currentObj.userData.name
      this.floorName = ''
    }
    this.currentTab = id || this.currentTab

    let $_dom = $(".js-tab-item[data-id=" + this.currentTab + "]")
    this.currentIndex = $_dom.index()

    const isCurrentBuilding = $_dom.data('buildingName') === this.buildingName
    const isCurrentFloor = $_dom.data('floorName') === this.floorName
    if (isCurrentFloor && isCurrentBuilding && $_dom.hasClass('active')) {
      return
    }
    $_dom.data('buildingName', this.buildingName)
    $_dom.data('floorName', this.floorName)
    // 因为是动态添加的，所以要用祖先查询
    $('#div2d .page-container').hide()
    $(`#page${this.currentTab}`).show()
    $_dom.addClass('active').siblings().removeClass('active')
    this.showPage()
  }

  showPage() {
    if ($(`#page${this.currentTab}`).length === 0) {
      $('#div2d').append($(`<div class="page-container" id="page${this.currentTab}"></div>`))
      G_TAbLIST_ARR[this.currentIndex].pageCtrl = app.addControl(new G_TAbLIST_ARR[this.currentIndex].func({
        pageId: this.currentTab
      }))
    } else {
      G_TAbLIST_ARR[this.currentIndex].pageCtrl.reload({
        pageId: this.currentTab,
        buildingName: this.buildingName,
        floorName: this.floorName
      })
    }

    // 显示图表
    $('.page-aside-left').addClass('animate__fadeInLeft')
    $('.page-aside-right').addClass('animate__fadeInRight')
    let timer = setTimeout(function () {
      $('.page-aside-left').removeClass('animate__fadeInLeft')
      $('.page-aside-right').removeClass('animate__fadeInRight')
      clearTimeout(timer)
    }, 1000)
    // 数字滚动
    $(".js-rock-number").each(function () {
      $(this).numberRock({
        lastNumber: parseInt($(this).text()),
        duration: 800,
        easing: 'swing',
      });
    })
  }
}
