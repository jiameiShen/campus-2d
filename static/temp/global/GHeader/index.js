/**
 * @class CreateGHeader
 * @desc 创建全局顶部信息栏
 * @param
 * @returns
 */
console.log('初始化：CreateGHeader')

class CreateGHeader {
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