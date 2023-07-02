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
    'le': 'd',
    'lu': 'u',
    // 最大幅度
    'E': 'P',
    'U': 'U',
    'gu': 'gg',
    'ge': 'G',
    'N': '0',
    'I': '$',
}

forwardFactory.push(mapLists)
forwardFactory.map(mapLists)
forwardFactory.pull(mapLists)

