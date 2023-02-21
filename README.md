# SetFormRecords

*サンプルデータ

let post_data = {
	img_type : 'url.jpg',
	id : 1,
	first_name : "Taro",
	last_name : "Yamada",
	pref : "京都",
	multi_type : "1,2",
	turn : 1,
	way : "電車,バス",
	tags : "PHP,JavaScript",
	memo : "テスト内容\nテスト内容"
}

let setFormRecords = new SetFormRecords("myForm");
setFormRecords.setData(post_data);