const mysql = require('mysql')
var stuff = [[1,2,3],[4,5,6]];
var pool = mysql.createPool({
	host: '192.168.1.16',
	user: 'CJTV',
	password: 'sxNNlstDm9U2w58U',
	database: 'trade_broker'
});
var sql = "SELECT * FROM strsheet_item WHERE string='Golden Plate' OR string='Silver Plate'";
pool.query(sql, function(err, result){
	if (err) throw err;
	console.log(result);
	process.exit()
})