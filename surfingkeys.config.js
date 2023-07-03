const forward = {
    add: function (key) { // 转发即将被 unmap 的键
        return api.map(`for${key}`, key)
    },
    cancel: function (key) { // 删除转发生成的键
        api.unmap(`for${key}`)
        api.unmap(key)
    },
    use: function (key) {
        return `for${key}`
    }
}

const colemak = {
    forward: function (key) { // 转发即将被 unmap 的键
        api.map(key, `col${key}`)
        api.unmap(`col${key}`)
        
    },
    use: function (key) {
        return `col${key}`
    },
    map: function (a, b) {
        api.map(colemak.use(a), forward.use(b))
    }
}

const forwardFactory = {
    push: function (mapLists) { // forward original keys
        for (let key in mapLists) {
            forward.add(mapLists[key])
        }
    },
    map: function (mapLists) {
        for (let key in mapLists) {
        colemak.map(key, mapLists[key])
    }
    },
    pull: function (mapLists) {
        for (let key in mapLists) {
            forward.cancel(mapLists[key])
        }
        for (let key in mapLists) {
            colemak.forward(key)
        }
    }
}

const mapLists = {
    /// scroll page
    // common
    'e': 'j',
    'u': 'k',
    'n': 'h',
    'i': 'l',
    // 稍大幅度
    'he': 'd',
    'hu': 'u',
    // 最大幅度
    'E': 'P',
    'U': 'U',
    'gu': 'gg',
    'ge': 'G',
    'N': '0',
    'I': '$',
    /// tabs              t
    // 垂直标签习惯
    'ty': 'yt',
    'tY': 'yT',
    'tU': 'g0',
    'tE': 'g$',
    'txU': 'gx0',
    'txu': 'gxt',
    'txE': 'gx$',
    'txe': 'gxT',
    'txx': 'gxx',
    'tu': 'E',
    'te': 'R',
    'tn': 'on',
    'tw': 'W',
    'ttn': '<<',
    'tti': '>>',
    // 缩放
    'zu': 'zi',
    'zo': 'ze',
    'zz': 'zr',
    // mouse_click 鼠标点击    f 
    'fn': 'f',
    'fi': 'cf',
    'fe': 'af',
    'fu': 'gf',
    'ff': 'q',
    'F': ';di',
    // page_browse 网页浏览   p
    'pU': 'gT',  //最早的标签
    'pE': 'gt',
    'pp': 'gp', //play tab
    'p?': 'g?', //移除网址的 ? 查询参数
    'p#': 'g#', //移除 # 后
    'pr': 'gU', //跳到网址的根路径
    'pk': ';U', //vim 编辑网址 并刷新
    'pK': ';u', //vim 编辑网址 并在新标签打开
    'pu': 'B', //回到前一个标签
    'pn': 'S', //页面后退
    'pi': 'D', //页面前进
}

forwardFactory.push(mapLists)
api.unmap('t') 
forwardFactory.map(mapLists)
// 鼠标点击
api.unmap('gi')
api.unmap('[[')
api.unmap(']]')
api.unmap(';m')
api.unmap(';fs')
api.unmap('O')
api.unmap('C')
forwardFactory.pull(mapLists)

