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

function parseColumnName(data){
  let columns = []
  for (i=0;i<data.length;i++){
    columns = unique(columns, Object.keys(data[i]))
  }
  return columns
}

function parseColumnType(mergedData, columnNames){
  let data = []
  //go though all columns
  for(h=0;h>columnNames.length;h++){
    //go though all items
    for(i=0;i<mergedData.length;i++){
      let found = false
      //go though all properties
      for(j=0;j<Object.keys(mergedData[i]).length;j++){
        if (Object.keys(mergedData[i])[j]=item){
          data = data.push(typeof mergedData[i][item])
          found = true
          //break when found item
          break;
        }
      }
      if (found){
        break;
      }
      //need break when found item
    }
  }
  return data
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
  let headersStrings = await parseColumnName(mergedStrings),
  headersData = await parseColumnName(mergedData)
  console.log('Got Headers')
  console.log(`headersStrings: ${headersStrings}`)
  console.log(`headersData: ${headersData}`)

  console.log(`====================`)
  let headersStringsType = await parseColumnType(mergedStrings, headersStrings),
  headersDataType = await parseColumnType(mergedData, headersData)
  console.log('Got Headers')
  console.log(`headersStringsType: ${headersStringsType}`)
  console.log(`headersDataType: ${headersDataType}`)

  console.log(`====================`)
  let parsedStrings = await parseData(mergedStrings),
  parsedData = await parseData(mergedData)
  console.log('Parsed Data')

  process.exit(0);
}

buildData();


// Thinking