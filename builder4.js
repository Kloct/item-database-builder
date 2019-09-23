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
  // concat all arrays from each file into one
  for (i=0;i<fileCount;i++){
    if(Object.entries(require(dir(i))).length !== 0){
      mergedList = mergedList.concat(require(dir(i))[objKey])
    }
  }
  return mergedList
}

//parse headers for db columns

function parseColumnName(data){
  //Combine all properties into one unique array
  let headersUnformatted = Object.entries(Object.assign({}, ...data)),
    headersFormatted = []

  // Format array for database
  for(i=0;i<headersUnformatted.length;i++){
    typeof headersUnformatted[i][1]==="number" ? headersUnformatted[i][1]="int(11)"
    : typeof headersUnformatted[i][1]==="string" ? headersUnformatted[i][1]="varchar(50)"
    : typeof headersUnformatted[i][1]==="boolean" ? headersUnformatted[i][1]="bit"
    : console.error(`Unhandled column type: ${typeof headersUnformatted[i][1]} in ${headersUnformatted[i][0]}`)
    headersFormatted.push(`${headersUnformatted[i][0]} ${headersUnformatted[i][1]}`)
  }
return headersFormatted
}
function formatData(data){
  let formattedData = [],
    schema = Object.keys(Object.assign({}, ...data))
  
  data.map(i=>{
    schema.map(p=>{
      i[p] ? formattedData.push(i[p]) : formattedData.push("NULL")
    })
  })
  return formattedData
}

let checkfinished = 0
function finishedInserts(type, result){
  console.log(`Finished Inserting data into ${type}!`)
  console.log(`Affected Rows: ${result}`)
  checkedfinished++
  if (checkfinished==2){
    console.log(`====================\n
    Finished Imports of all data\n
    Newly created data located itemStrings${patchversion} and itemData${patchversion}`)
    process.exit(0)
  }
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
  let itemStringsSchema = parseColumnName(mergedStrings),
  itemDataSchema = parseColumnName(mergedData)
  console.log('Got Headers')
  console.log(`headersStrings: ${itemStringsSchema.length}`)
  console.log(`headersData: ${itemDataSchema.length}`)

  console.log(`====================`)
  let itemStrings = formatData(mergedStrings),
  itemData = formatData(mergedData)
  console.log(`Formatted itemStrings. Size: ${itemStrings.length}`)
  console.log(`Formatted itemData. Size: ${itemData.length}`)

  console.log(`====================`)
  console.log(`Done for now`)
  process.exit(0)
  console.log(`Initializing Schema...`)
  /*pool.query(`CREATE TABLE itemStrings${patchversion} (${itemStringsSchema})`, (err)=>{
    if(err) throw err;
    console.log(`Created itemStrings${patchversion}!`)
    console.log(`Inserting Item Strings...`)

    pool.query(`INSERT INTO itemStrings${patchversion} (${itemStringsSchema}) VALUES(${itemStrings})`, (err, res)=>{
      //if (err) throw err;
      //finishedInserts(`itemData${patchversion}`, res.affectedRows)
    })

  })
  /*pool.query(`CREATE TABLE itemData${patchversion} (${itemDataSchema})`, (err)=>{
    if(err) throw err;
    //console.log(`Created itemData${patchversion}!`)
    //console.log(`Inserting Item Data...`)

    pool.query(`INSERT INTO itemData${patchversion} (${itemDataSchema}) VALUES (${itemData})`, (err, res)=>{
      //if (err) throw err;
      //finishedInserts(`itemData${patchversion}`, res.affectedRows)
    })
  })*/
}

buildData();


// Thinking