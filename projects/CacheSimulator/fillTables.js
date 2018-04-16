var dataSet = [ '92', '70', '8C', 'FD', 'B9', 'E2', '40', 'C2', '0D', '9A',
                'D1', 'F8', '43', '7E', 'B7', '75', 'FB', '44', 'DD', 'F6',
                'A6', '43', '11', '17', '98', '88', '08', '6A', '6D', 'B8',
                'BC', '12', '0A', 'F1', '4C', '45', '63', '2C', '40', '98',
                '91', '65', '0E', '76', 'EE', '5D', '18', '29', '85', '13',
                '60', 'C5', '56', 'F2', '89', '9E', '06', 'E2', '0B', 'A2',
                'B2', '41', 'B1', '7B' ];

var initCache = function() {
  setCache(getDefaultState());
}

var setCache = function(state) {
  var cache = state.cache;
  var setNumTable = document.getElementById('cache-table-setNum');
  var firstSet    = document.getElementById('cache-table-set0');
  var secondSet   = document.getElementById('cache-table-set1');
  if(firstSet.getElementsByTagName('tr').length > 1) {
    console.log('Clearing...');
    for(var i = 1; i < 5; i++) {
      setNumTable.deleteRow(-1);
      firstSet.deleteRow(-1);
      secondSet.deleteRow(-1);
    }
  }

  for(var i = 0; i < 4; i++) {
    var setRow = setNumTable.insertRow(-1);
    setRow.className = 'table-row';
    var setCell = setRow.insertCell(0);
    setCell.innerHTML = i.toString();
    
    var firstSetData = firstSet.insertRow(-1);
    firstSetData.className = 'table-row';
    firstSetData.id        = 'cache-' + i + '-0';
    var firstTag  = firstSetData.insertCell(0);
    var firstData = firstSetData.insertCell(1);
    if(!cache[i][0].exists) {
      firstTag.innerHTML  = '-';
      firstData.innerHTML = '-';
    } else {
      firstTag.innerHTML  = cache[i][0].tag.toString(2).padStart(4, '0');
      firstData.innerHTML = cache[i][0].data;
    }

    if(state.coloredID === firstSetData.id) {
      firstSetData.style.fontWeight = 'bold';
      firstSetData.style.background = 'var(--bkgd)';
    }
     
    var secondSetData = secondSet.insertRow(-1);
    secondSetData.className = 'table-row';
    secondSetData.id        = 'cache-' + i + '-1';

    var secondTag  = secondSetData.insertCell(0);
    var secondData = secondSetData.insertCell(1);
    if(!cache[i][1].exists) {
      secondTag.innerHTML  = '-';
      secondData.innerHTML = '-';
    } else {
      secondTag.innerHTML  = cache[i][1].tag.toString(2).padStart(4, '0');
      secondData.innerHTML = cache[i][1].data;
    }

    if(state.coloredID === secondSetData.id) {
      secondSetData.style.fontWeight = 'bold';
      secondSetData.style.background = 'var(--bkgd)';
    }
  } 
}

var initMemory = function() {
  for(var i = 0; i < 4; i++) {
    var table = document.getElementById('memory-table' + i);
    for(var j = 0; j < 16; j++) {
      var memIndex  = (i * 16) + j;
      var row       = table.insertRow(-1);
      row.className = 'table-row';
      row.id        = 'memory-row' + memIndex;

      var address = row.insertCell(0);
      var data    = row.insertCell(1);
      data.id = 'memory-data' + memIndex;

      address.innerHTML = memIndex.toString().padStart(2, '0') + ' : ' +
                          memIndex.toString(2).padStart(6, '0');
      data.innerHTML    = dataSet[memIndex];
    }
  }
}

