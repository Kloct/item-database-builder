foo = [
	{
		"a":1,
		"b":3,
		"d":4
	},
	{
		"a":1,
		"b":3,
		"d":6
	},
	{
		"a":2,
		"d":6
	},
	{
		"a":4,
		"b":3,
		"d":6
	}
]
function bar (data) {
	let schema = Object.keys(Object.assign({}, ...data))
	let ids = new Set(data.map(i=>i.a))
	let formattedData = []
	data.map(i=>{
		if(ids.delete(i.a)) {
			let item = []
			schema.map(p=>{
				i[p] ? item.push(i[p]) : item.push(null)
			})
			formattedData.push(item);
		} 
	})
	console.log(ids)
	console.log(formattedData)
}

bar(foo);