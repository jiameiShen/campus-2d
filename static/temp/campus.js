
// 加载场景代码 
var app = new THING.App({
  // url: '/api/scene/0b1ffafb290a94442f475e2c', // 宿舍一
  url: '/api/scene/8a62cf813a1387e488c4d876', // 宿舍三
  // url: '/api/scene/dee19626ad00263907fb34ce' // 完整
});

/* 接口请求地址 */
window.$baseUrl = 'https://xnzhsg.szhtxx.cn:9888/swPlatform/separate/3DVisualization/campus'

THING.Utils.dynamicLoad([
  '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/index.js'
])
