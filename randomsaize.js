var version = 1; // last update: 20240812
var menuIdentNum = "2024.06";
var sel = 0;
var menuList = ["A", "B", "C"];
var grandMenu;
var randlist = [];
var lst = localStorage;
if (lst.getItem("#sizry") === null || lst.getItem("#sizry") === "" || lst.getItem("#sizry") === undefined){
	lst.setItem("#sizry", '{"info":{"version":' + version + ',"menuIdent":' + menuIdentNum + '},"saveData":{"menu":"A","cat":6},"latest":{"1":"","2":"","3":"","4":"","5":""}}');
}else if (JSON.parse(lst.getItem("#sizry"))["info"]["version"] < version){
	var sizry_Storage = JSON.parse(lst.getItem("#sizry"));
	sizry_Storage["info"]["version"] = version;
	sizry_Storage["info"]["menuIdent"] = menuIdentNum;
	lst.setItem("#sizry", JSON.stringify(sizry_Storage));
}
function selectMenu(){
	sel = menuList.indexOf(document.getElementById("menuNum").value) + 1;
	console.log(sel);

	if (sel === 1){
		grandMenu = menuA;
	}else if (sel === 2){
		grandMenu = menuB;
	}else if (sel === 3){
		grandMenu = menuC;
	}else{
		grandMenu = menuA;
		sel = 1;
	}
	document.getElementById("main").innerHTML = '<p class="msg-info">選択範囲設定</p><p class="msg-alert">出現するメニューの範囲を選択してください</p><input type="button" class="selector" id="sel2" onclick="setRange(1)" value="サラダ・前菜・スープ"><br><input type="button" class="selector" id="sel3" onclick="setRange(2)" value="サイド"><br><input type="button" class="selector" id="sel4" onclick="setRange(3)" value="メイン"><br><input type="button" class="selector" id="sel5" onclick="setRange(4)" value="デザート"><br><input type="button" class="selector" id="sel6" onclick="setRange(5)" value="全メニュー ( ｱﾙｺｰﾙは除く )"><br><input type="button" class="selector" id="sel7" onclick="setRange(6)" value="全メニュー"><br><input type="button" class="selector" id="sel8" onclick="returnTop()" value="はじめに戻る"><br>';
}
function setRange(num){
	randlist = [];
	if (num === 1){
		var selected = "サラダ・前菜・スープ";
	}else if (num === 2){
		var selected = "サイド";
	}else if (num === 3){
		var selected = "メイン";
	}else if (num === 4){
		var selected = "デザート";
	}else if (num === 5){
		var selected = "全メニュー ( ｱﾙｺｰﾙは除く )";
	}else{
		var selected = "全メニュー";
	}

	var keyList = Object.keys(grandMenu);
	for (i=0;i<keyList.length;i++){
		var cat = grandMenu[keyList[i]]["category"];
		if (cat === "salad" || cat === "soup" || cat === "appetizer"){
			if (num === 1 || num === 5 || num === 6){
				randlist.push(keyList[i]);
			}
		}else if (cat === "bread" || cat === "side menu"){
			if (num === 2 || num === 5 || num === 6){
				randlist.push(keyList[i]);
			}
		}else if (cat === "drink bar" || cat == "kid's menu" || cat === "topping"){
			if (num === 5 || num === 6){
				randlist.push(keyList[i]);
			}
		}else if (cat === "alcohol" || cat === "alcohol (bottle)"){
			if (num === 6){
				randlist.push(keyList[i]);
			}
		}else if (cat === "pizza" || cat === "doria & gratin" || cat === "pasta" || cat === "hamburg" || cat === "chicken" || cat === "lamb"){
			if (num === 3 || num === 5 || num === 6){
				randlist.push(keyList[i]);
			}
		}else if (cat === "dessert"){
			if (num === 4 || num === 5 || num === 6){
				randlist.push(keyList[i]);
			}
		}
	}

	if (sel === 1){
		var usingMenu = "2024.06 A";
	}else if (sel === 2){
		var usingMenu = "2024.06 B";
	}else if (sel === 3){
		var usingMenu = "2024.06 C";
	}
	
	document.getElementById("main").innerHTML = '<p class="msg-info">条件確認</p><p class="msg-alert">以下の条件で抽選されます<br>よろしいですか？</p><p class="msg-info">' + selected + '</p><p class="msg-alert">使用メニュー: ' + usingMenu + '</p><br><input type="button" class="selector" id="sel9" onclick="choiceMenu(' + num + ')" value="サイコロを振る"><br><input type="button" class="selector" id="sel10" onclick="returnSelection()" value="戻る"><br><input type="button" class="selector" id="sel11" onclick="returnTop()" value="はじめに戻る">';
}
function returnTop(){
	sel = 0;
	menuList = ["A", "B", "C"];
	grandMenu = null;
	randlist = [];
	console.log("return-Top");
	document.getElementById("main").innerHTML = '<p class="msg-info">初期設定</p><p class="msg-alert">メニュー裏面右下に印字された識別記号を選択してください</p><select name="menuNum" id="menuNum" autocomplete="on"><option value="A">2024.06 A</option> <!--全国版--> <option value="B">2024.06 B</option> <!--北海道/東京/神奈川--> <option value="C">2024.06 C</option> <!--埼玉/東京/神奈川--> </select><br><input type="button" class="selector" id="sel1" onclick="selectMenu()" value="はじめる">';
}
function returnSelection(){
	randlist = [];
	console.log("return-Selection");
	document.getElementById("main").innerHTML = '<p class="msg-info">選択範囲設定</p><p class="msg-alert">出現するメニューの範囲を選択してください</p><input type="button" class="selector" id="sel2" onclick="setRange(1)" value="サラダ・前菜・スープ"><br><input type="button" class="selector" id="sel3" onclick="setRange(2)" value="サイド"><br><input type="button" class="selector" id="sel4" onclick="setRange(3)" value="メイン"><br><input type="button" class="selector" id="sel5" onclick="setRange(4)" value="デザート"><br><input type="button" class="selector" id="sel6" onclick="setRange(5)" value="全メニュー ( ｱﾙｺｰﾙは除く )"><br><input type="button" class="selector" id="sel7" onclick="setRange(6)" value="全メニュー"><br><input type="button" class="selector" id="sel8" onclick="returnTop()" value="はじめに戻る"><br>';
}
function choiceMenu(selNum){	
	var sizry_nowStorage = JSON.parse(lst.getItem("#sizry"));
	if (sel === 1){
		sizry_nowStorage["saveData"]["menu"] = "A";
	}else if (sel === 2){
		sizry_nowStorage["saveData"]["menu"] = "B";
	}else if (sel === 3){
		sizry_nowStorage["saveData"]["menu"] = "C";
	}else{
		sizry_nowStorage["saveData"]["menu"] = "A";
	}
	sizry_nowStorage["saveData"]["cat"] = selNum;

	if (selNum === 1){
		var selectedCat = "サラダ・前菜・スープ";
	}else if (selNum === 2){
		var selectedCat = "サイド";
	}else if (selNum === 3){
		var selectedCat = "メイン";
	}else if (selNum === 4){
		var selectedCat = "デザート";
	}else if (selNum === 5){
		var selectedCat = "全メニュー ( ｱﾙｺｰﾙは除く )";
	}else{
		var selectedCat = "全メニュー";
	}

	console.log("sel");
	// format = Math.floor( Math.random() * (max + 1 - min) ) + min;
    var rnum = Math.floor( Math.random() * (randlist.length + 1 - 0) ) + 0;
	console.log(randlist);
	console.log(rnum);
	var hitMenuNum = randlist[rnum];
	console.log(hitMenuNum);
	console.log(grandMenu[hitMenuNum]);
	var hitMenuName = grandMenu[hitMenuNum]["name"];

	document.getElementById('main').innerHTML = '<p class="msg-info">抽選結果: <span id="range-disp"></span></p><p class="msg-alert" id="menuIdentWindow">メニュー種別: <span id="menu-ident"></span></p><p class="msg-alert">抽選されたメニュー番号は以下の通りです:</p><p class="msg-info" id="num-disp" onclick="revealMenuName()"></p><p class="msg-alert" id="menu-disp" style="color: #f9d39d;"></p><br><input type="button" class="selector" id="sel12" onclick="revealMenuName()" value="メニュー名表示"><br><input type="button" class="selector" id="sel13" onclick="reChoice(' + selNum + ')" value="もう一度"><br><input type="button" class="selector" id="sel14" onclick="history()" value="直近5回の履歴"><br><input type="button" class="selector" id="sel15" onclick="returnSelection()" value="条件変更"><br><input type="button" class="selector" id="sel16" onclick="returnTop()" value="はじめに戻る">';
	document.getElementById('range-disp').innerHTML = selectedCat;
	document.getElementById('menu-ident').innerHTML = menuIdentNum + " " + sizry_nowStorage["saveData"]["menu"];
	document.getElementById('num-disp').innerHTML = hitMenuNum;
	document.getElementById('menu-disp').style.color = "#f9d39d";
	document.getElementById('menu-disp').innerHTML = hitMenuName;

	for (i=0;i<4;i++){
		sizry_nowStorage["latest"][5-i] = sizry_nowStorage["latest"][4-i];
	}
	sizry_nowStorage["latest"][1] = hitMenuNum;

	lst.setItem("#sizry", JSON.stringify(sizry_nowStorage));

}
function revealMenuName(){
	// console.log("start");
	var col = document.getElementById('menu-disp').style.color;
	// console.log(col);
	// console.log(col === 'rgb(249, 211, 157)');
	if (col === 'rgb(249, 211, 157)'){
		document.getElementById('menu-disp').style.color = "#000000";
		document.getElementById('sel12').value = "メニュー名を非表示";
	}else{
		document.getElementById('menu-disp').style.color = "#f9d39d";
		document.getElementById('sel12').value = "メニュー名を表示";
	}
}
function reChoice(catNum){
	setRange(catNum);
}
function history(){
	var hist = JSON.parse(lst.getItem('#sizry'))["latest"];
	window.alert("過去5回の抽選履歴\n1. " + hist[1] + "\n2. " + hist[2] + "\n3. " + hist[3] + "\n4. " + hist[4] + "\n5. " + hist[5]);
}
