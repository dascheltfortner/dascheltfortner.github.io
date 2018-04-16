var isValid = function(input) {
  if(isNaN(input)) {
    displayResultMessage('Please use a valid memory address', 'var(--text2)');
    return false;
  }

  var address = parseInt(input);
  if(address < 0 || address > 63) {
    displayResultMessage('Please enter a memory address from 0-63', 'var(--text2)');
    return false;
  }

  return true;
}

var displayResultMessage = function(message, messageColor) {
  var div = document.getElementById('result-display');

  if(document.getElementById('result-message') == null) {
    var text = document.createElement('H4');
    text.appendChild(document.createTextNode(message));
    text.id = 'result-message';
    text.style.color = messageColor;
    div.appendChild(text);
  } else {
    var text = document.getElementById('result-message');
    text.innerHTML = message;
    text.style.color = messageColor;
  }
}

var getSetNum = function(state, address) {
  var index = address % 4;
  var t     = Math.floor(address / 4);
  if(state.cache[index][0].exists && state.cache[index][0].tag === t) {
    return 0;
  } else if(state.cache[index][0].exists && state.cache[index][1].tag === t) {
    return 1;
  } else {
    return -1;
  }
}

var getReplacementIndex = function(cache, address) {
  var index = address % 4;
  if(!cache[index][0].exists) {
    return 0;
  } else if(!cache[index][1].exists) {
    return 1;
  } else {
    if(cache[index][0].entryTime < cache[index][1].entryTime) {
      return 0;
    } else {
      return 1;
    }
  }
}

var generateNewState = function(oldState, address) {
  var setNum = getSetNum(state, address);

  if(setNum != -1) {
    displayResultMessage('Hit: Set number ' + address % 4 + ', Tag ' +
                          + Math.floor(address / 4), 'var(--text2)');
    var id = 'cache-' + address % 4 + '-' + setNum;
    var row = document.getElementById(id);
    row.style.fontWeight = 'bold';
    row.style.background = 'var(--bkgd)';

    var coloredRow = document.getElementById(oldState.coloredID);
    if(coloredRow != null) {
      coloredRow.style.fontWeight = 'normal';
      coloredRow.style.background = 'var(--row)';
    }

    var newState = Object.assign({}, oldState);
    newState.coloredID = id;
    newState.time = oldState.time + 1;

    if(document.getElementById('lru-radio').checked) {
      newState.cache[address % 4][setNum].entryTime = oldState.time;
    }

    return newState;
  } else {
    displayResultMessage('Miss: Retreiving from memory', 'var(--text2)');
    var newData = document.getElementById('memory-data' + address).innerHTML;
    var replacementIndex = getReplacementIndex(oldState.cache, address);
    var newTag = Math.floor(address / 4);
    var row = document.getElementById('memory-row' + address);
    row.style.fontWeight = 'bold';
    row.style.background = 'var(--bkgd)';
    var newCache = oldState.cache.slice();
    newCache[address % 4][replacementIndex].tag = newTag;
    newCache[address % 4][replacementIndex].data = newData;
    newCache[address % 4][replacementIndex].entryTime = oldState.time;
    newCache[address % 4][replacementIndex].exists = true;

    var coloredRow = document.getElementById(oldState.coloredID);
    if(coloredRow != null) {
      coloredRow.style.fontWeight = 'normal';
      coloredRow.style.background = 'var(--row)';
    }

    var newState = Object.assign({}, oldState);
    newState.coloredID = 'memory-row' + address;
    newState.cache = newCache;
    newState.time = oldState.time + 1;
    return newState;
  }
}

