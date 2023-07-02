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


