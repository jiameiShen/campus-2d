/**
 * @class GMockWarning
 * @desc 创建首页告警
 * @param
 * @returns
 */
console.log('初始化：CreateGMockWarning')

class CreateGMockWarning {
  timer = null
  dataList = []
  constructor() { }
  onAdd(app) {
    this.init()
  }

  init() {
    let parmasList = [
      {
        id: 1,
        buildingName: '图书馆',
        data: [
          {
            subject: '安全布控-黑名单',
            content: '',
            imgUrl: 'https://img.51miz.com/Element/00/88/63/61/7d962719_E886361_53733d01.png'
          }
        ]
      },
      {
        id: 2,
        buildingName: '3#教学楼',
        data: [
          {
            subject: '搁置维修单超过预警值',
            content: '89单',
            imgUrl: ''
          }
        ]
      },
      {
        id: 3,
        buildingName: '实验楼',
        data: [
          {
            subject: '今日用电超出预警值',
            content: '4.321KW/h',
            imgUrl: ''
          }
        ]
      }
    ]
    // 动态添加宿舍楼
    let object = app.query('.Campus')[0].buildings[0]
    parmasList.push({
      id: object.userData.dormitoryId,
      buildingName: object.userData.name,
      data: [
        {
          subject: '昨日晚归人数',
          content: '45人',
          imgUrl: ''
        },
        {
          subject: '昨日未归人数',
          content: '60人',
          imgUrl: ''
        }
      ]
    })
    parmasList.forEach(item => {
      this.createWarning(item)
    })
    $('.u-warning-marker').hide()
    this.start()
  }

  start() {
    this.stop()
    this.showWarning(this.dataList[0].id)
    const len = this.dataList.length
    let index = 1
    this.timer = setInterval(() => {
      if (index >= len) {
        index = 0
      }
      this.showWarning(this.dataList[index].id)
      index++
    }, 6000)
  }

  stop() {
    clearInterval(this.timer)
  }

  showWarning(id) {
    $(`#buildingWarning${id}`).show().removeClass('animate__zoomOut').addClass('animate__zoomIn')

    setTimeout(() => {
      $(`#buildingWarning${id}`).addClass('animate__zoomOut').removeClass('animate__zoomIn')
    }, 3000)
  }

  createWarning(params) {
    const template = `
        <div class="u-warning-marker animate__animated" id="buildingWarning${params.id}">
          <div class="u-warning-marker__title">告警</div>
          <div class="u-warning-marker__hd">${params.buildingName}</div>
          <div class="u-warning-marker__bd">
            ${params.data.map(item => {
      return `<div class="item">
                <span class="subject">${item.subject}</span>
                <span class="content">
                  ${item.imgUrl ? `<img src="https://img.51miz.com/Element/00/88/63/61/7d962719_E886361_53733d01.png" alt="">` : item.content}
                </span>
              </div>`
    }).join('')}
          </div>
        </div>
      `
    $('#div3d').append($(template))
    const building = app.query(`["userData/name"=${params.buildingName}]`)[0];
    if (building) {
      this.dataList.push(params)
      app.create({
        type: 'UIAnchor',
        parent: building,
        element: document.getElementById('buildingWarning' + params.id),
        localPosition: [0, 5, 0],
        pivot: [0.5, 1]
      });
    }
  }
}
