const pool = require('./database')
const fs = require('fs')
let patchversion = "",
	batchSize = 1000
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

	//Format array for database
	for(i=0;i<headersUnformatted.length;i++){
		headersUnformatted[i][0]==="id" ? headersUnformatted[i][1]="int(11) NOT NULL PRIMARY KEY"
		: typeof headersUnformatted[i][1]==="number" ? headersUnformatted[i][1]="int(11)"
		: headersUnformatted[i][0]==="toolTip" ? headersUnformatted[i][1]="varchar(2000)"
		: typeof headersUnformatted[i][1]==="string" ? headersUnformatted[i][1]="varchar(200)"
		: typeof headersUnformatted[i][1]==="boolean" ? headersUnformatted[i][1]="bit"
		: console.error(`Unhandled column type: ${typeof headersUnformatted[i][1]} in ${headersUnformatted[i][0]}`)
		headersFormatted.push(`${headersUnformatted[i][0]} ${headersUnformatted[i][1]}`)
	}
	return headersFormatted
}
function formatData(data){
	let formattedData = [],
		schema = Object.keys(Object.assign({}, ...data)),
		ids = new Set(data.map(i=>i.id))

	//for every item, check if property exists: if it does push value if not push null
	// edit to be an array of arrays
	data.map(i=>{
		if(ids.delete(i.id)) {
			let item = []
			schema.map(p=>{
				i[p] ? item.push(i[p]) : item.push(null)
			})
			formattedData.push(item)
		}
	})
	//split data into chunks
	let batchedData = []
	for (b=0;b<formattedData.length;b+=batchSize){
		chunk=formattedData.slice(b, b+batchSize);
		batchedData.push(chunk)
	}
	return batchedData
	//return formattedData
}

function batchInsert(tableName, schema, data){
	// insert chunks one at a time into database
	/*pool.query(`INSERT INTO ${tableName} (${schema}) VALUES ?`,[data[0]], (err, res)=>{
		if (err) throw err;
	})*/
	console.log(`Inserting Data into ${tableName}.`)
	let rowProgress = 0
	for (let c=0;c<data.length;c++){
		pool.query(`INSERT INTO ${tableName} (${schema}) VALUES ?`, [data[c]], (err, res)=>{
			if (err) throw(err)
			rowProgress++
			printProgress(`${rowProgress} of ${data.length} batches inserted into ${tableName}`)
			if(rowProgress==data.length) console.log(`\nDone Inserting ${tableName}!`)
		})
	}
}

function printProgress(string){
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(string);
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

	/*console.log(`====================`)
	//console.log(`Done for now`)
	//process.exit(0)

	//need to add support for batching inserts
	console.log(`Initializing Schema...`)
	pool.query(`CREATE TABLE itemStrings${patchversion} (${itemStringsSchema})`, (err)=>{
		if(err) throw err;
		console.log(`Created itemStrings${patchversion}!`)
		batchInsert(`itemStrings${patchversion}`, Object.keys(Object.assign({}, ...mergedStrings)), itemStrings)
	})
	pool.query(`CREATE TABLE itemData${patchversion} (${itemDataSchema})`, (err)=>{
		if(err) throw err;
		console.log(`Created itemData${patchversion}!`)
		batchInsert(`itemData${patchversion}`, Object.keys(Object.assign({}, ...mergedData)), itemData)
	})*/
}

buildData();


// Thinking