const path = require('path')
const fs = require('fs')
const mysql = require('mysql')

let StrSheet_Item0 = require('./StrSheet_Item/StrSheet_Item-0.json'),
	StrSheet_Item1 = require('./StrSheet_Item/StrSheet_Item-1.json'),
	//StrSheet_Item2 = require('./StrSheet_Item/StrSheet_Item-2.json'),
	StrSheet_Item3 = require('./StrSheet_Item/StrSheet_Item-3.json'),
	StrSheet_Item4 = require('./StrSheet_Item/StrSheet_Item-4.json'),
	StrSheet_Item5 = require('./StrSheet_Item/StrSheet_Item-5.json'),
	StrSheet_Item6 = require('./StrSheet_Item/StrSheet_Item-6.json'),
	StrSheet_Item7 = require('./StrSheet_Item/StrSheet_Item-7.json'),
	StrSheet_Item8 = require('./StrSheet_Item/StrSheet_Item-8.json'),
	StrSheet_Item9 = require('./StrSheet_Item/StrSheet_Item-9.json'),
	StrSheet_Item10 = require('./StrSheet_Item/StrSheet_Item-10.json'),
	StrSheet_Item11 = require('./StrSheet_Item/StrSheet_Item-11.json'),
	StrSheet_Item12 = require('./StrSheet_Item/StrSheet_Item-12.json'),
	StrSheet_Item13 = require('./StrSheet_Item/StrSheet_Item-13.json'),
	StrSheet_Item14 = require('./StrSheet_Item/StrSheet_Item-14.json'),
	StrSheet_Item15 = require('./StrSheet_Item/StrSheet_Item-15.json'),
	StrSheet_Item16 = require('./StrSheet_Item/StrSheet_Item-16.json'),
	StrSheet_Item17 = require('./StrSheet_Item/StrSheet_Item-17.json'),
	StrSheet_Item18 = require('./StrSheet_Item/StrSheet_Item-18.json'),
	StrSheet_Item19 = require('./StrSheet_Item/StrSheet_Item-19.json'),
	//StrSheet_Item20 = require('./StrSheet_Item/StrSheet_Item-20.json'),
	ItemData0 = require('./ItemData/ItemData-0.json'),
	ItemData1 = require('./ItemData/ItemData-1.json'),
	//ItemData2 = require('./ItemData/ItemData-2.json'),
	ItemData3 = require('./ItemData/ItemData-3.json'),
	ItemData4 = require('./ItemData/ItemData-4.json'),
	ItemData5 = require('./ItemData/ItemData-5.json'),
	ItemData6 = require('./ItemData/ItemData-6.json'),
	ItemData7 = require('./ItemData/ItemData-7.json'),
	ItemData8 = require('./ItemData/ItemData-8.json'),
	ItemData9 = require('./ItemData/ItemData-9.json'),
	ItemData10 = require('./ItemData/ItemData-10.json'),
	ItemData11 = require('./ItemData/ItemData-11.json'),
	ItemData12 = require('./ItemData/ItemData-12.json'),
	ItemData13 = require('./ItemData/ItemData-13.json'),
	ItemData14 = require('./ItemData/ItemData-14.json'),
	ItemData15 = require('./ItemData/ItemData-15.json'),
	ItemData16 = require('./ItemData/ItemData-16.json'),
	ItemData17 = require('./ItemData/ItemData-17.json'),
	ItemData18 = require('./ItemData/ItemData-18.json'),
	ItemData19 = require('./ItemData/ItemData-19.json'),
	StrSheet,
	StrSheetArray = [],
	ItemData,
	ItemDataArray = []
	
StrSheet = StrSheet_Item0.String.concat(StrSheet_Item1.String/*,StrSheet_Item2.String*/,StrSheet_Item3.String,StrSheet_Item4.String,StrSheet_Item5.String,StrSheet_Item6.String,StrSheet_Item7.String,StrSheet_Item8.String,StrSheet_Item9.String,StrSheet_Item10.String,StrSheet_Item11.String,StrSheet_Item12.String,StrSheet_Item13.String,StrSheet_Item14.String,StrSheet_Item15.String,StrSheet_Item16.String,StrSheet_Item17.String,StrSheet_Item18.String,StrSheet_Item19.String/*,StrSheet_Item20.String*/)
ItemData = ItemData0.Item.concat(ItemData1.Item/*,ItemData2.Item*/,ItemData3.Item,ItemData4.Item,ItemData5.Item,ItemData6.Item,ItemData7.Item,ItemData8.Item,ItemData9.Item,ItemData10.Item,ItemData11.Item,ItemData12.Item,ItemData13.Item,ItemData14.Item,ItemData15.Item,ItemData16.Item,ItemData17.Item,ItemData18.Item,ItemData19.Item)
for (i=0;i<StrSheet.length;i++){
	if(strSheetUnique(StrSheet[i].id)){
		StrSheetArray.push([StrSheet[i].id,StrSheet[i].toolTip,StrSheet[i].string])
	}
	if (i % 1000==0)(printProgress(i, "k items from StrSheet processed"))
}
for (i=0;i<ItemData.length;i++){
	if(itemDataUnique(ItemData[i].id)){
		ItemDataArray.push([
			ItemData[i].id,
			ItemData[i].category,
			ItemData[i].coolTime,
			ItemData[i].level,
			ItemData[i].name,
			ItemData[i].icon,
			ItemData[i].rank,
			ItemData[i].maxStack,
			ItemData[i].rareGrade,
			ItemData[i].requiredEquipmentType,
			ItemData[i].combatItemType,
			ItemData[i].requiredLevel,
			ItemData[i].equipSound,
			ItemData[i].artisanable,
			ItemData[i].boundType,
			ItemData[i].buyPrice,
			ItemData[i].changeColorEnable,
			ItemData[i].changeLook,
			ItemData[i].coolTimeGroup,
			ItemData[i].CTcategory,
			ItemData[i].destroyable,
			ItemData[i].dismantlable,
			ItemData[i].dropSilhouette,
			ItemData[i].dropSound,
			ItemData[i].dropType,
			ItemData[i].enchantEnable,
			ItemData[i].extractLook,
			ItemData[i].guildWarehouseStorable,
			ItemData[i].linkCrestId,
			ItemData[i].linkCustomizingId,
			ItemData[i].linkEquipmentId,
			ItemData[i].linkLookInfoId,
			ItemData[i].masterpieceRate,
			ItemData[i].obtainable,
			ItemData[i].requiredGender,
			ItemData[i].requiredRace,
			ItemData[i].searchable,
			ItemData[i].sellPrice,
			ItemData[i].slotLimit,
			ItemData[i].sortingNumber,
			ItemData[i].storeSellable,
			ItemData[i].tradable,
			ItemData[i].unidentifiedItemGrade,
			ItemData[i].useOnlyTerritory,
			ItemData[i].warehouseStorable
		]);
	}
	if (i % 1000==0)(printProgress(i, "k items from ItemData processed"))
}
function itemDataUnique(id){
	let unique = true;
	for (k=0;k<ItemDataArray.length;k++){
		if (id==ItemDataArray[k][0]){
			unique = false;
			break;
		}
	}
	return unique;
}
function strSheetUnique(id){
	let unique = true;
	for (k=0;k<StrSheetArray.length;k++){
		if (id==StrSheetArray[k][0]){
			unique = false;
			break;
		}
	}
	return unique;
}
function printProgress(progress, string){
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(progress/1000 + string);
}
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '[M*sm4j.}|J>${M',
	database: 'trade_broker'
});
pool.getConnection(function(err, connection) {
	if (err)throw err
	console.log('\nConnected to database! Exporting...');
	var sql = "INSERT INTO eu_StrSheet(`id`,`toolTip`,`string`) VALUES ?";
	connection.query(sql, [StrSheetArray], function(err, result){
		if (err) throw err;
		console.log("StrSheet_Item Items Added: " + result.affectedRows + "!");
	});
	sql = "INSERT INTO eu_ItemData(`id`,`category`,`coolTime`,`level`,`name`,`icon`,`rank`,`maxStack`,`rareGrade`,`requiredEquipmentType`,`combatItemType`,`requiredLevel`,`equipSound`,`artisanable`,`boundType`,`buyPrice`,`changeColorEnable`,`changeLook`,`coolTimeGroup`,`CTcategory`,`destroyable`,`dismantlable`,`dropSilhouette`,`dropSound`,`dropType`,`enchantEnable`,`extractLook`,`guildWarehouseStorable`,`linkCrestId`,`linkCustomizingId`,`linkEquipmentId`,`linkLookInfoId`,`masterpieceRate`,`obtainable`,`requiredGender`,`requiredRace`,`searchable`,`sellPrice`,`slotLimit`,`sortingNumber`,`storeSellable`,`tradeable`,`unidentifiedItemGrade`,`useOnlyTerritory`,`warehouseStorable`) VALUES ?";
	connection.query(sql, [ItemDataArray], function(err, result){
		if (err) throw err;
		console.log("Itemdata Items Added: " + result.affectedRows + "!");
	});
	connection.release();
});