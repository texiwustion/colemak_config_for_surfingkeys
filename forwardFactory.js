import 'forward'

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
            colemak.forward(key)
        }
    }
}

const mapLists = {
    'e': 'j',
    'u': 'k',
    'n': 'h',
    'i': 'l',
}

/// forward original keys 
forward.add('j')
forward.add('k')
forward.add('h')
forward.add('l')

/// map new keys for colemak config
api.map(colemak.use('e'), forward.use('j'))
api.map(colemak.use('u'), forward.use('k'))
api.map(colemak.use('n'), forward.use('h'))
api.map(colemak.use('i'), forward.use('l'))

/// cancel forward 
forward.cancel('j')
forward.cancel('k')
forward.cancel('h')
forward.cancel('l')
colemak.forward('e')
colemak.forward('u')
colemak.forward('n')
colemak.forward('i')

// \\ 等价于 

forwardFactory.push(mapLists)
forwardFactory.map(mapLists)
forwardFactory.pull(mapLists)