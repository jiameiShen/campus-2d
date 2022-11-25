$(function () {
  // 模拟楼层资产数据
  const params = {
    equipmentCabinet: {
      assetName: '机柜',
      price: 23600,
      personName: '邓明'
    },
    outputSwitchgear: {
      assetName: '输出开关柜',
      price: 35800,
      personName: '万平'
    },
    verticalIntegrated: {
      assetName: '立式一体柜',
      price: 16888,
      personName: '林阳'
    },
    spiralChiller: {
      assetName: '螺旋式冷水机组',
      price: 16888,
      personName: '金秀兰'
    }
  }

  const paramsMap = new Map()
    .set(1, 'equipmentCabinet')
    .set(2, 'equipmentCabinet')
    .set(3, 'equipmentCabinet')
    .set(4, 'equipmentCabinet')
    .set(5, 'outputSwitchgear')
    .set(6, 'outputSwitchgear')
    .set(7, 'verticalIntegrated')
    .set(8, 'spiralChiller')
    .set(9, 'spiralChiller')

  // 模拟楼层学生数据
  const arr = new Array(9).fill({})
  let dataList = arr.map((item, index) => {
    const idx = index + 1
    return Object.assign({
      index: idx.toString().padStart(2, '0'),
      assetName: '机柜',
      brand: '中兴',
      code: 'XN' + idx.toString().padStart(6, '0'),
      assetTypeName: '基础设施',
      personName: '@cname',
      phone: '15822189120',
      assetOwner: '国资处',
      price: '20000元',
      status: '使用中'
    }, params[paramsMap.get(idx)],)
  })

  let assetStatisticsList = []
  dataList.forEach(item => {
    assetStatisticsList.push(
      `<li class="item" data-code="${item.code}">
        <div class="cell cell-1">
          <span class="icon icon-door"></span>
          <span class="name">${item.assetName}</span>
          <span class="detail">
            详情<span class="glyphicon glyphicon-menu-right"></span>
          </span>
        </div>
        <div class="cell cell-3">
          <span class="count">编号：${item.code}</span>
          <span class="count">联系人：${item.personName}</span>
        </div>
      </li>`
    )
  })

  assetStatisticsTemplate = `<ul class="list">${assetStatisticsList.join('')}</ul>`
  $('#assetStatisticsChart').html($(assetStatisticsTemplate))

  $('#assetStatisticsChart').on('click', '.item', function () {
    const code = $(this).data('code')
    const detail = dataList.find(item => item.code === code)
    showDetail(detail)
  })

  function showDetail(detail) {
    let template = `
      <ul class="g-dialog-details">
        <li class="item">
          <span class="subject">序号</span>
          <span class="content">${detail.index}</span>
        </li>
        <li class="item">
          <span class="subject">资产名称</span>
          <span class="content">${detail.assetName}</span>
        </li>
        <li class="item">
          <span class="subject">品牌</span>
          <span class="content">${detail.brand}</span>
        </li>
        <li class="item">
          <span class="subject">编号</span>
          <span class="content">${detail.code}</span>
        </li>
        <li class="item">
          <span class="subject">资产类型</span>
          <span class="content">${detail.assetTypeName}</span>
        </li>
        <li class="item">
          <span class="subject">责任人</span>
          <span class="content">${detail.personName}</span>
        </li>
        <li class="item">
          <span class="subject">联系方式</span>
          <span class="content">${detail.phone}</span>
        </li>
        <li class="item">
          <span class="subject">资产归属</span>
          <span class="content">${detail.assetOwner}</span>
        </li>
        <li class="item">
          <span class="subject">资产价值</span>
          <span class="content">${detail.price}</span>
        </li>
        <li class="item">
          <span class="subject">资产状态</span>
          <span class="content color-green">${detail.status}</span>
        </li>
      </ul>
    `
    $('#assetInfoModal').find('.modal-body').html($(template))
    $('#assetInfoModal').modal()
  }
})