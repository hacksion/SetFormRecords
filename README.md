# 非同期データをフォームへセットするライブラリー

## 編集時などに非同期で登録したデータを取得して既存のフォームへデータをセットする
取得したデータのフォーマットはjson形式にしてキー名は「type名」値はデータ

*以下データはサンプル用
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

## ターゲットにするフォーム名（name）をインスタンスするオプションにセット

let setFormRecords = new SetFormRecords("myForm");

## setDataメソッド　オプションはjsonになったデータをセットするとターゲットform内の入力項目へデータがセットされる
setFormRecords.setData(post_data);