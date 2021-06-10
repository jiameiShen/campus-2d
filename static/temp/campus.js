
document.title = '航信天工智慧校园'

// 加载场景代码 
var app = new THING.App({
  url: '/api/scene/4217180dd42dfe715a3408e1', // 白云区
  // url: '/api/scene/0b1ffafb290a94442f475e2c', // 宿舍一
  // url: '/api/scene/8a62cf813a1387e488c4d876', // 宿舍三
  // url: '/api/scene/dee19626ad00263907fb34ce' // 完整
})

/* 接口请求地址 */
window.$baseUrl = 'https://iot.szhtxx.com/platform/separate/3DVisualization/campus'
/* 实时画面 */
window.$videoUrl = 'https://open.ys7.com/v3/openlive/E24387991_1_1.m3u8?expire=1654329247&id=322765312709029888&t=951578e960971000d5b713e310d24fe964aeaf0a780570204771986e84943967&ev=100'

THING.Utils.dynamicLoad([
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/index.js'
])
