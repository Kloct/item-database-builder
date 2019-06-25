const pool = require('./database')
const fs = require('fs')
let patchversion = 7907,
  stringsDir = (page) =>`./StrSheet_Item/StrSheet_Item-${page}.json`,
  dataDir = (page) =>`./ItemData/ItemData-${page}.json`

//combine files
function populateData(dir) {
  let fileCount = fs.readdirSync( dir(0).match('(?:.*?\/){2}')[0] ).length,
    objKey = Object.keys(require(dir(0)))[0],
    mergedList = []
  for (i=0;i<fileCount;i++){
    if(Object.entries(require(dir(i))).length !== 0){
      mergedList = mergedList.concat(require(dir(i))[objKey])
    }
  }
  return mergedList
}

//parse headers for db columns
function parseHeaders(data) {
  let columns = []
  data.forEach(d => {
    columns = unique(columns, Object.keys(d))
  });
  return columns
}

function unique (a, b) {
  a = a.concat(b.filter(item => {
    return a.indexOf(item) < 0;
  }))
  return a
}
function parseData() {
  return true
}


/*//////////////
// Run Things //
//////////////*/
async function buildData(){
  console.log(`====================`)
  let mergedStrings = await populateData(stringsDir),
  mergedData = await populateData(dataDir)
  console.log('Merged files')
  console.log(`mergedStrings: ${mergedStrings.length}`)
  console.log(`mergedData: ${mergedData.length}`)

  console.log(`====================`)
  let headersStrings = await parseHeaders(mergedStrings),
  headersData = await parseHeaders(mergedData)
  console.log('Got Headers')
  console.log(`headersStrings: ${headersStrings.length}`)
  console.log(`headersData: ${headersData.length}`)

  console.log(`====================`)
  let parsedStrings = await parseData(mergedStrings),
  parsedData = await parseData(mergedData)
  console.log('Parsed Data')

  process.exit(0);
}

buildData();