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

const mapLists = {
    'e': 'j',
    'u': 'k',
    'n': 'h',
    'i': 'l',
}

function mapAll(mapLists) {
    for (let key in mapLists) {
        colemak.map(key, mapLists[key])
    }
}