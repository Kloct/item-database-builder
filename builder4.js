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
  //Combine all properties into one array
  let headersUnformatted = Object.entries(Object.assign({}, ...data)),
    headersFormatted = []

  // Format array for database
  for(i=0;i<headersUnformatted.length;i++){
    if (typeof headersUnformatted[i][1]==="number") headersUnformatted[i][1]="int(11)"
    else if (typeof headersUnformatted[i][1]==="string") headersUnformatted[i][1]="varchar(50)"
    else if (typeof headersUnformatted[i][1]==="boolean") headersUnformatted[i][1]="bit"
    else console.error(`Unhandled column type: ${typeof headersUnformatted[i][1]} in ${headersUnformatted[i][0]}`)
    headersFormatted.push(`${headersUnformatted[i][0]} ${headersUnformatted[i][1]}`)
  }
return headersFormatted
}

function createTableStatements(data){

}

/*//////////////
// Run Things //
//////////////*/
async function buildData(){
  console.log(`====================`)
  let mergedStrings = populateData(stringsDir),
  mergedData = populateData(dataDir)
  console.log('Merged files')
  console.log(`mergedStrings: ${mergedStrings.length}`)
  console.log(`mergedData: ${mergedData.length}`)

  console.log(`====================`)
  let headersStrings = parseColumnName(mergedStrings),
  headersData = parseColumnName(mergedData)
  console.log('Got Headers')
  console.log(`headersStrings: ${headersStrings.length}`)
  console.log(`headersData: ${headersData.length}`)

  console.log(`====================`)
  console.log(`Would start to initialize database schema here`)

  console.log(`====================`)
  console.log(`Would populate newly created tables here`)

  process.exit(0);
}

buildData();


// Thinking