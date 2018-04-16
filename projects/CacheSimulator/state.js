var getDefaultCacheFrame = function() {
  return {
    tag: 0,
    data: 0,
    exists: false,
    entryTime: 0
  };
}

var getDefaultState = function() {
  return {
    hit: false,
    coloredID: '',
    time: 0,
    cache: [[ getDefaultCacheFrame(), getDefaultCacheFrame() ],
            [ getDefaultCacheFrame(), getDefaultCacheFrame() ],
            [ getDefaultCacheFrame(), getDefaultCacheFrame() ],
            [ getDefaultCacheFrame(), getDefaultCacheFrame() ]]
  };
}
