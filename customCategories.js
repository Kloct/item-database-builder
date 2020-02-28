const pool=require('./database')
const substring = ["%Azart%", "%Dark Light%", "%Annihilation%"]
const ignore = ['Robes of Annihilation', 'Card Fragment - Azart Watcher', 'Card Fragment - Azart Shaman', 'Card Fragment - Azart Marauder']

function getItems(){
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT string FROM history_item_view WHERE string LIKE (?) OR string LIKE (?) OR string LIKE (?) GROUP BY string`, [substring[0], substring[1], substring[2]], (err, res)=>{
            if(err) throw err
            else {
                let items = res.map(row=>Object.values(row)[0])
                items = items.filter(item=> !ignore.includes(item))
                let custom = []
                items = items.forEach(item => {
                    item.includes('Azart')? custom.push([item, 'Rare Azart Gear']):
                    item.includes('Annihilation')? custom.push([item, 'Legendary Azart Gear']):
                    item.includes('Dark Light')? custom.push([item, 'Legendary Azart Gear']):
                    console.log('ya done fucked up')
                });
                resolve(custom)
            }
        })
    })
}
function insert(items){
    pool.query(`INSERT INTO item_categories (string, category) VALUES ?`, [items], (err, res)=>{
        if (err) throw err
        else {
            console.log(`Inserted ${res.affectedRows} items`)
            console.log("Done")
            process.exit(0)
        }
    })
}

async function build(){
    let items = await getItems()
    insert(items)
}
build()