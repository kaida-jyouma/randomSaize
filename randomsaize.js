var version = 4; // last update: 20250627

// メニュー更新時の変更箇所

var menuIdentNum = "2025.04"; 
var menuList = ["A", "D"];
var menuIndex = [menu202504A, menu202504D]; // menuListの長さと一致させること

// メニュー変更時の変更箇所ここまで

var sel = 0;
var grandMenu;
var randlist = [];

var alcohol = false;
var userSelectedRange = false;
var minVal;
var maxVal;

var lst = localStorage;
var sst = sessionStorage;
if (lst.getItem("#sizry") === null || lst.getItem("#sizry") === "" || lst.getItem("#sizry") === undefined){
	lst.setItem("#sizry", '{"info":{"version":' + version + ',"menuIdent":' + menuIdentNum + '},"saveData":{"menu":"A","cat":6},"latest":{"1":"","2":"","3":"","4":"","5":""}}');
}else if (JSON.parse(lst.getItem("#sizry"))["info"]["version"] < version){
	var sizry_Storage = JSON.parse(lst.getItem("#sizry"));
	sizry_Storage["info"]["version"] = version;
	sizry_Storage["info"]["menuIdent"] = menuIdentNum;
	lst.setItem("#sizry", JSON.stringify(sizry_Storage));
}

// 引用: https://qiita.com/taku-0728/items/329e0bee1c49b7ce7cd1
function isNumber(val){
  var regexp = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
  return regexp.test(val);
}

// onLoad Function
function displayMenu(){
	// document.getElementById("identifySelect").innerHTML = '<select name="menuNum" id="menuNum" autocomplete="on"><option value="A" id="menuIdentA">2025.04 A</option><option value="B" id="menuIdentB">2025.04 D</option></select>';
	var text = '<select name="menuNum" id="menuNum" autocomplete="on">';
	for (i=0;i<menuList.length;i++){
		text += '<option value="' + menuList[i] + '" id="menuIdent + ' + menuList[i] + '">' + menuIdentNum + '&#32;' + menuList[i] + '</option>';
	}
	document.getElementById('identifySelect').innerHTML = text + '</select>';
}

function selectMenu(option){
	sel = menuList.indexOf(document.getElementById("menuNum").value) + 1;
	console.log("MenuNum:" + sel);
	sst.setItem("#sizsel", sel);

	if (sel == 0) sel = 1;
	grandMenu = menuIndex[sel - 1];

	if (option === 1){
		document.getElementById("main").innerHTML = '<p class="msg-info">選択範囲設定</p><p class="msg-alert">出現するメニューの範囲を選択してください</p><input type="button" class="selector" id="sel18" onclick="setPriceRange(1)" value="0-299"><br><input type="button" class="selector" id="sel19" onclick="setPriceRange(2)" value="300-599"><br><input type="button" class="selector" id="sel20" onclick="setPriceRange(3)" value="600-999"><br><input type="button" class="selector" id="sel21" onclick="setPriceRange(4)" value="1000-&#8734;"><br><input type="button" class="selector" id="sel23" onclick="setPriceRange(5)" value="任意の範囲"><div id="activeButton"><input type="button" class="selector" id="sel24" onclick="setPriceRange(6)" value="全メニュー"></div><input type="button" class="selector" id="sel22" onclick="setAlcohol()" value="アルコール:&#32;OFF"><br><input type="button" class="selector" id="sel8" onclick="returnTop()" value="はじめに戻る"><br>';
	}else{
		document.getElementById("main").innerHTML = '<p class="msg-info">選択範囲設定</p><p class="msg-alert">出現するメニューの範囲を選択してください</p><input type="button" class="selector" id="sel2" onclick="setRange(1)" value="サラダ・前菜・スープ"><br><input type="button" class="selector" id="sel3" onclick="setRange(2)" value="サイド"><br><input type="button" class="selector" id="sel4" onclick="setRange(3)" value="メイン"><br><input type="button" class="selector" id="sel5" onclick="setRange(4)" value="デザート"><br><input type="button" class="selector" id="sel6" onclick="setRange(5)" value="全メニュー ( ｱﾙｺｰﾙは除く )"><br><input type="button" class="selector" id="sel7" onclick="setRange(6)" value="全メニュー"><br><input type="button" class="selector" id="sel8" onclick="returnTop()" value="はじめに戻る"><br>';
	}
}

function setAlcohol(){
	if (alcohol){
		alcohol = false;
		document.getElementById('sel22').value = 'アルコール: OFF';
		document.getElementById('sel22').blur();
	}else{
		alcohol = true;
		document.getElementById('sel22').value = 'アルコール: ON';
		document.getElementById('sel22').blur();
	}
}

function clearSelectedRange(){
	minVal = undefined;
	maxVal = undefined;
	document.getElementById('sel23').value = '任意の範囲';
	userSelectedRange = false;
	document.getElementById('activeButton').innerHTML = '<input type="button" class="selector" id="sel24" onclick="setPriceRange(6)" value="全メニュー">';
	document.getElementById('sel24').blur();
}

function setPriceRange(num){
	if (num === 5 && !(userSelectedRange)){
		minVal = window.prompt("Enter minimumValue:");
		maxVal = window.prompt("Enter maxValue: ");
		if (isNumber(minVal) && isNumber(maxVal) && parseInt(minVal) < parseInt(maxVal)){
			userSelectedRange = true;
			document.getElementById('sel23').value = minVal + '-' + maxVal;
			console.log("selectedRange:", minVal, maxVal);
			document.getElementById('activeButton').innerHTML = '<input type="button" class="selector" id="sel24" onclick="clearSelectedRange()" value="範囲をクリア">';
		}else{
			window.alert("Enter number, or something was wrong. \nPlease try again...");
			console.log(isNumber(minVal), isNumber(maxVal), parseInt(minVal) < parseInt(maxVal));
		}
		document.getElementById('sel23').blur();
	}else{
		randlist = [];
		if (num === 1){
			var selected = "0-299";
		}else if (num === 2){
			var selected = "300-599";
		}else if (num === 3){
			var selected = "600-999";
		}else if (num === 4){
			var selected = "1000-&#8734;";
		}else if (num === 5){
			var selected = minVal + "-" + maxVal;
		}else if (num === 6){
			var selected = "Any";
		}
		var keyList = Object.keys(grandMenu);
		console.log(keyList);
		
		if (num === 5){
			for (i=0;i<keyList.length;i++){
				var menuPrice = grandMenu[keyList[i]]["price"];
				if (menuPrice >= minVal && menuPrice <= maxVal && grandMenu[keyList[i]]["name"] !== "update + area info"){
					if (grandMenu[keyList[i]]["category"] === "alcohol" || grandMenu[keyList[i]]["category"] === "alcohol (bottle)"){
						if (alcohol) randlist.push(keyList[i]);
					}else{
						randlist.push(keyList[i]);
					}
				}
			}
		}else{
			for (i=0;i<keyList.length;i++){
				var menuPrice = grandMenu[keyList[i]]["price"];
				if (menuPrice < 300){
					if (num === 1 || num === 6){
						if (grandMenu[keyList[i]]["category"] === "alcohol" || grandMenu[keyList[i]]["category"] === "alcohol (bottle)"){
							if (alcohol) randlist.push(keyList[i]);
						}else{
							randlist.push(keyList[i]);
						}
					}
				}else if (menuPrice < 600){
					if (num === 2 || num === 6){
						if (grandMenu[keyList[i]]["category"] === "alcohol" || grandMenu[keyList[i]]["category"] === "alcohol (bottle)"){
							if (alcohol) randlist.push(keyList[i]);
						}else{
							randlist.push(keyList[i]);
						}
					}
				}else if (menuPrice < 1000){
					if (num === 3 || num === 6){
						if (grandMenu[keyList[i]]["category"] === "alcohol" || grandMenu[keyList[i]]["category"] === "alcohol (bottle)"){
							if (alcohol) randlist.push(keyList[i]);
						}else{
							randlist.push(keyList[i]);
						}
					}
				}else{
					if (num === 4 || num === 6){
						if (grandMenu[keyList[i]]["name"] !== "update + area info"){
							if (grandMenu[keyList[i]]["category"] === "alcohol" || grandMenu[keyList[i]]["category"] === "alcohol (bottle)"){
								if (alcohol) randlist.push(keyList[i]);
							}else{
								randlist.push(keyList[i]);
							}
						}
					}
				}
			}
		}
		var usingMenu = menuIdentNum + "&#32;" + menuList[sel - 1];
		if (alcohol) var alcoholtxt = "あり";
		else var alcoholtxt = "なし";
		document.getElementById("main").innerHTML = '<p class="msg-info">条件確認</p><p class="msg-alert">以下の条件で抽選されます<br>よろしいですか？</p><p class="msg-info">Price: ' + selected + '</p><p class="msg-alert msg-priceMenu">使用メニュー: ' + usingMenu + '</p><p class="msg-alert">アルコール: ' + alcoholtxt + '</p><br><input type="button" class="selector" id="sel9" onclick="choiceMenu(' + num + ', 2)" value="サイコロを振る"><br><input type="button" class="selector" id="sel10" onclick="returnSelection(2)" value="戻る"><br><input type="button" class="selector" id="sel11" onclick="returnTop()" value="はじめに戻る">';
	}
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

	// 出現メニュー選定, 新規カテゴリーはここに追加
	var keyList = Object.keys(grandMenu);
	for (i=0;i<keyList.length;i++){
		var cat = grandMenu[keyList[i]]["category"];
		if (cat === "salad" || cat === "soup" || cat === "appetizer"){
			if (num === 1 || num === 5 || num === 6){
				randlist.push(keyList[i]);
			}
		}else if (cat === "bread" || cat === "side menu"){ // ライスorパン
			if (num === 2 || num === 5 || num === 6){
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
		}else if (cat === "drink bar" || cat == "kid's menu" || cat === "topping" || cat === "takeout"){
			if (num === 5 || num === 6){
				randlist.push(keyList[i]);
			}
		}else if (cat === "alcohol" || cat === "alcohol (bottle)"){
			if (num === 6){
				randlist.push(keyList[i]);
			}
		}
	}


	// メニューアップデート時はここも変更必須 -> 変更不要に修正済み
	var usingMenu = menuIdentNum + "&#32;" + menuList[sel - 1];
	// if (sel === 1){
	// 	var usingMenu = "2025.04 A";
	// }else if (sel === 2){
	// 	var usingMenu = "2025.04 D";
	// }

	
	document.getElementById("main").innerHTML = '<p class="msg-info">条件確認</p><p class="msg-alert">以下の条件で抽選されます<br>よろしいですか？</p><p class="msg-info">' + selected + '</p><p class="msg-alert">使用メニュー: ' + usingMenu + '</p><br><input type="button" class="selector" id="sel9" onclick="choiceMenu(' + num + ', 1)" value="サイコロを振る"><br><input type="button" class="selector" id="sel10" onclick="returnSelection(1)" value="戻る"><br><input type="button" class="selector" id="sel11" onclick="returnTop()" value="はじめに戻る">';
}

function returnTop(){
	sel = 0;
	grandMenu = null;
	randlist = [];
	alcohol = false;
	userSelectedRange = false;
	console.log("return-Top");
	document.getElementById("main").innerHTML = '<p class="msg-info">初期設定</p><p class="msg-alert">メニュー裏面右下に印字された識別記号を選択してください</p><div id="identifySelect"></div><input type="button" class="selector" id="sel1" onclick="selectMenu(0)" value="はじめる"><br><input type="button" class="selector" id="sel17" onclick="selectMenu(1)" value="金額別"><br><input type="button" class="selector" id="sel14" onclick="history()" value="直近5回の履歴">';
	displayMenu();
}

function returnSelection(option){
	if (option === 1){
		randlist = [];
		console.log("return-Selection");
		document.getElementById("main").innerHTML = '<p class="msg-info">選択範囲設定</p><p class="msg-alert">出現するメニューの範囲を選択してください</p><input type="button" class="selector" id="sel2" onclick="setRange(1)" value="サラダ・前菜・スープ"><br><input type="button" class="selector" id="sel3" onclick="setRange(2)" value="サイド"><br><input type="button" class="selector" id="sel4" onclick="setRange(3)" value="メイン"><br><input type="button" class="selector" id="sel5" onclick="setRange(4)" value="デザート"><br><input type="button" class="selector" id="sel6" onclick="setRange(5)" value="全メニュー ( ｱﾙｺｰﾙは除く )"><br><input type="button" class="selector" id="sel7" onclick="setRange(6)" value="全メニュー"><br><input type="button" class="selector" id="sel8" onclick="returnTop()" value="はじめに戻る"><br>';
	}else if (option === 2){
		randlist = [];
		alcohol = false;
		userSelectedRange = false;
		minVal = undefined;
		maxVal = undefined;
		console.log("return-Selection");
		document.getElementById("main").innerHTML = '<p class="msg-info">選択範囲設定</p><p class="msg-alert">出現するメニューの範囲を選択してください</p><input type="button" class="selector" id="sel18" onclick="setPriceRange(1)" value="0-299"><br><input type="button" class="selector" id="sel19" onclick="setPriceRange(2)" value="300-599"><br><input type="button" class="selector" id="sel20" onclick="setPriceRange(3)" value="600-999"><br><input type="button" class="selector" id="sel21" onclick="setPriceRange(4)" value="1000-&#8734;"><br><input type="button" class="selector" id="sel23" onclick="setPriceRange(5)" value="任意の範囲"><div id="activeButton"><input type="button" class="selector" id="sel24" onclick="setPriceRange(6)" value="全メニュー"></div><input type="button" class="selector" id="sel22" onclick="setAlcohol()" value="アルコール:&#32;OFF"><br><input type="button" class="selector" id="sel8" onclick="returnTop()" value="はじめに戻る"><br>';
	}
	
}

function choiceMenu(selNum, modeSelect){
	if (modeSelect === 2){
		var sizry_nowStorage = JSON.parse(lst.getItem("#sizry"));
		sizry_nowStorage["saveData"]["menu"] = menuList[sel - 1];

		sizry_nowStorage["saveData"]["cat"] = selNum;

		if (selNum === 1){
			var selectedCat = "0-299";
		}else if (selNum === 2){
			var selectedCat = "300-599";
		}else if (selNum === 3){
			var selectedCat = "600-999";
		}else if (selNum === 4){
			var selectedCat = "1000-&#8734;";
		}else if (selNum === 5){
			var selectedCat = minVal + "-" + maxVal;
		}else if (selNum === 6){
			var selectedCat = "Any";
		}else{
			var selectedCat = "Any";
		}

		console.log("sel");
		console.log(alcohol);
		// format = Math.floor( Math.random() * (max + 1 - min) ) + min;
		var rnum = Math.floor( Math.random() * ((randlist.length - 1) + 1 - 0) ) + 0;
		console.log(randlist);
		console.log(rnum);
		var hitMenuNum = randlist[rnum];
		console.log(hitMenuNum);
		console.log(grandMenu[hitMenuNum]);
		var hitMenuName = grandMenu[hitMenuNum]["name"];

		if (alcohol) var alcoholview = "あり";
		else var alcoholview = "なし";

		document.getElementById('main').innerHTML = '<p class="msg-info">抽選結果: <span id="range-disp"></span></p><p class="msg-alert msg-priceMenu" id="menuIdentWindow">メニュー種別: <span id="menu-ident"></span></p><p class="msg-alert">アルコール: ' + alcoholview + '</p><p class="msg-alert">抽選されたメニュー番号は以下の通りです:</p><p class="msg-info" id="num-disp" onclick="revealMenuName()"></p><p class="msg-alert" id="menu-disp" style="color: #f9d39d;"></p><br><input type="button" class="selector" id="sel12" onclick="revealMenuName()" value="メニュー名表示"><br><input type="button" class="selector" id="sel13" onclick="reChoice(' + selNum + ', 2)" value="もう一度"><br><input type="button" class="selector" id="sel14" onclick="history()" value="直近5回の履歴"><br><input type="button" class="selector" id="sel15" onclick="returnSelection(2)" value="条件変更"><br><input type="button" class="selector" id="sel16" onclick="returnTop()" value="はじめに戻る">';
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


	}else{
		var sizry_nowStorage = JSON.parse(lst.getItem("#sizry"));
		sizry_nowStorage["saveData"]["menu"] = menuList[sel - 1];

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

		document.getElementById('main').innerHTML = '<p class="msg-info">抽選結果: <span id="range-disp"></span></p><p class="msg-alert" id="menuIdentWindow">メニュー種別: <span id="menu-ident"></span></p><p class="msg-alert">抽選されたメニュー番号は以下の通りです:</p><p class="msg-info" id="num-disp" onclick="revealMenuName()"></p><p class="msg-alert" id="menu-disp" style="color: #f9d39d;"></p><br><input type="button" class="selector" id="sel12" onclick="revealMenuName()" value="メニュー名表示"><br><input type="button" class="selector" id="sel13" onclick="reChoice(' + selNum + ')" value="もう一度"><br><input type="button" class="selector" id="sel14" onclick="history()" value="直近5回の履歴"><br><input type="button" class="selector" id="sel15" onclick="returnSelection(1)" value="条件変更"><br><input type="button" class="selector" id="sel16" onclick="returnTop()" value="はじめに戻る">';
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

function reChoice(catNum, option){
	console.log("reChoice:", option);
	if (option === 2){
		setPriceRange(catNum);
	}else{
		setRange(catNum);
	}
}

function history(){
	var hist = JSON.parse(lst.getItem('#sizry'))["latest"];
	window.alert("過去5回の抽選履歴\n1. " + hist[1] + "\n2. " + hist[2] + "\n3. " + hist[3] + "\n4. " + hist[4] + "\n5. " + hist[5]);
}
