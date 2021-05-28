// 加载完成事件 
app.on('load', function (ev) {
  /* 参数:
      ev.campus	    园区,类型:Campus
      ev.buildings	园区建筑物,类型:Selector
  */
  var campus = ev.campus;
  console.log('after load ' + campus.id);
  // 切换层级到园区
  app.level.change(campus);

  THING.Utils.dynamicLoad('https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css')
  THING.Utils.dynamicLoad('https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css')
  THING.Utils.dynamicLoad('/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/static/css/common.css')
  THING.Utils.dynamicLoad('/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/static/css/page.css')

  THING.Utils.dynamicLoad([
    // 水球图形
    'https://cdn.bootcdn.net/ajax/libs/echarts/5.1.1/echarts.min.js',
    '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/lib/echarts-liquidfill.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js'
  ])

  THING.Utils.dynamicLoad([
    '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/global/levelSwitch/index.js',
    // js加载顺序比较重要
    '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Apartment/apartment.js',
    '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Energy/index.js',
    // '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Asset/index.js',
    '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Operations/index.js',
    '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/views/Security/index.js',


    '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/global/GTabList/index.js',
    '/uploads/wechat/oLX7p0y-mbNfS0Mb-hlSFOGzv_uQ/file/campus/init.js',

  ])
  app.background = '#030303';
});
