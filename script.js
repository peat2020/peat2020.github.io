$(function(){
  
  //var gOto;
  //
  //グローバル変数宣言
  // 
  //銀河の音  idx_oto = kin % 13  
   var gOtoList =
   [	'宇宙', '磁気',	'月',	'電気',	'自己存在',	'倍音',	'律動',	'共振',	
   '銀河',	'太陽',	'惑星',	'スペクトル',	'水晶'];
  //前の太陽の紋章 idx_mae = kin % 20 
  var gMaeList =
  [	'黄色い太陽' ,'赤い竜',	'白い風',	'青い夜',	'黄色い種',	'赤い蛇',	
  '白い世界の橋渡し',	'青い手',	'黄色い星',	'赤い月',	'白い犬',	
  '青い猿',	'黄色い人',	'赤い空歩く人',	'白い魔法使い',	'青い鷲',	
  '黄色い戦士',	'赤い地球',	'白い鏡',	'青い嵐'];
  //後ろの太陽の紋章 idx_ushiro = kin/ 13(切り下げ)
  var gUshiroList = 
  ['赤い竜',	'白い魔法使い',	'青い手',	'黄色い太陽',	'赤い空歩く人',	
  '白い世界の橋渡し',	'青い嵐',	'黄色い人',	'赤い蛇',	'白い鏡',	
  '青い猿',	'黄色い種',	'赤い地球',	'白い犬',	'青い夜',
  '黄色い戦士',	'赤い月',	'白い風',	'青い鷲','黄色い星'];
  //後ろの太陽の紋章の順番
  var gUshiroIDList = [1,	14,	7,	20,	13,	6,	19,	12,	5,	18,	11,	4,	17,	10,	3,	16,	9,	2,	15,	8  ];
  //城のメッセージ
  var gShiroList = 
  ['第1の城　創始・始まり',	'第2の城　洗練・初心にかえる',	'第3の城　変容・変化・展開',	'第4の城　熟成・答えが見えてくる',	'第5の城　母体・まとめ'];
  //城の色
  var gShiroColorList =
  ['green','red','black','blue','yellow'];

  //サイクルのメッセージ
  var gCycleList = 
  ['起「始まり（創始）」',	'承「初心にかえる（洗練）」',	'転「変化・展開（変容）」',	'結「答えが見えてくる（熟成）」'];
  //サイクルの色
  var gCycleColorList =
  ['red','black','blue','yellow'];


  function proc() {
    elem = document.getElementById("output");
    elem.innerText = "JavaScriptが実行されました。proc()";
  }
  /*
  関数名: onLoad()
  説明　:画面ロード時に実行される関数
         ・今日のKINを計算して表示する
  */
  window.onload = onLoad;
  function onLoad() {

    var today = new Date()  ;
    //Microsoft Edgeの場合 +18時間 today.setTime(today.getTime() + 1000*60*60*18);// JSTに変換 +18時間
 
    console.log("today>" +today);
    var today0 = document.getElementById("today0");
    today0.innerHTML = today.toLocaleString();
    today0.style.textDecorationLine = "underline";

    var yyyy = today.getFullYear();
    //var mm = ("00" + (today.getMonth()+1)).slice(-2);
    //var dd = ("00" + today.getDate()).slice(-2);
    var mm = today.getMonth() +1;
    var dd = today.getDate();
    //console.log(today.getMonth()+1);
    //console.log(today);
    //KIN計算
    var kin =  kinCalc(yyyy,mm,dd);
    //console.log("kin" + kin);
    
    //HTMLに値を設定
    //今日のメッセージ
    var todaysKIN = document.getElementById("todaysKIN");
    todaysKIN.innerHTML = kinMsg(kin);
    todaysKIN.style.textDecorationLine = "underline";
    todaysKIN.style.fontWeight = "bold";
    var kinMaeNo = kinMae(kin);//前の太陽の紋章
    var kinUshiroNo = kinUshiro(kin);//後ろの太陽の紋章


    var colorNo = kinUshiroNo % 4 ;
    todaysKIN.style.color = gCycleColorList[colorNo ];

    //音
    var otoNo = kinOto(kin);//音
    var dOto1 = document.getElementById("dOto1");
    dOto1.innerHTML = otoNo;
    dOto1.style.textDecorationLine = "underline";
    dOto1.style.fontWeight = "bold";
   
    var dOto2 = document.getElementById("dOto2");
    dOto2.innerHTML = otoNo;
    dOto2.style.textDecorationLine = "underline";
    dOto2.style.fontWeight = "bold";
    //イメージ前の太陽の紋章
    var imgMae= document.getElementById("imgMae");
    
    var imgMaeURL = "./img/monsho/" + kinMaeNo + gMaeList[kinMaeNo] + ".jpg";
    console.log(imgMaeURL);
    imgMae.src = imgMaeURL;
    imgMae.title = imgMaeURL;
    //imgMae.style.width ="300px";
    //イメージ後ろの太陽の紋章
    var imgUshiro = document.getElementById("imgUshiro");
    // 
    var imgUshiroURL = "./img/monsho/" + gUshiroIDList[kinUshiroNo]  + gUshiroList[kinUshiroNo] + ".jpg";
    console.log(imgUshiroURL);
    imgUshiro.src = imgUshiroURL;
    imgUshiro.title = imgUshiroURL;
    //imgUshiro.style.width ="300px";

    var imgOto = document.getElementById("imgOto");
    imgOto.title = "音" + otoNo + ":" + gOtoList[otoNo%13];
    imgOto.src = "./img/oto/oto" + otoNo + ".jpg";
    //imgOto.style.width ="500px";
 
    //城

    var shiroNo = Math.floor(kin / 52) +1;
    var dShiro1 = document.getElementById("dShiro1");
    dShiro1.innerHTML = shiroNo;
    dShiro1.style.textDecorationLine = "underline";
    dShiro1.style.fontWeight = "bold";


    var dShiroMsg = document.getElementById("dShiroMsg");
    dShiroMsg.innerHTML = gShiroList[shiroNo-1];
    dShiroMsg.style.color = gShiroColorList[shiroNo % 5 ];
    dShiroMsg.style.textDecorationLine = "underline";
    dShiroMsg.style.fontWeight = "bold";
    //サイクル
    var dCycle  = document.getElementById("dCycle");
    dCycle.innerHTML = gCycleList[colorNo];
    dCycle.style.color = gCycleColorList[colorNo ];
    dCycle.style.textDecorationLine = "underline";
    dCycle.style.fontWeight = "bold";


    //console.log("gOto"+ gOto );
    var otoNo = kinOto(kin);
    //console.log("function kinOto(kin)= 「" + ( otoNo % 13) +"(" + gOtoList[otoNo % 13] + ")") ;
  }
  /*
  関数名: document.getElementById("yourkin-button").onclick
  説明　: 「KIN計算」ボタンクリック時に起動。
          誕生日をselectboxから指定してもらい
    あなたのKINを計算します。
    ・誕生日に応じてKINを算出する
  */
document.getElementById("yourkin-button").onclick = function() {
  //誕生日情報を取得
  var yyyy = document.getElementById("_yy").value;
  var mm = document.getElementById("_mm").value;
  var dd = document.getElementById("_dd").value;

  //日付として成立しないときエラーメッセージを表示する
  //KIN計算
  var kin =  kinCalc(yyyy,mm,dd);
  console.log("kin" + kin);
  
  //HTMLに値を設定
  //誕生日のメッセージ
  var yourKIN = document.getElementById("yourKIN");
  yourKIN.innerHTML =  kinMsg(kin);
  //色  
  var kinUshiroNo = kinUshiro(kin);
  var colorNo = kinUshiroNo % 4 ;
  yourKIN.style.color = gCycleColorList[colorNo ];

};
  /*
    KIN計算：計算日ー基準日の260の剰余がKIN
    ・基準日はKIN260の日
    ・日数からうるう年分の日数は除く
    ・うるう年の3/1以降は＋１（ふなぶくの日を足す）
  */
  function kinCalc(yyyy,mm,dd) {
    //console.log ("入力された日付"+yyyy+mm+dd);

    //基準日：KIN 1の日の前日
    var baseDate = new Date(1909, 10-1, 31); //"1909/10/31";

    //console.log("baseDate" + baseDate);

    //KINを計算する日
    var birthday = new Date(yyyy ,mm-1,dd);

    console.log("birthday>"+ birthday);

    //基準日から計算日までの日数
    var dateCount = (birthday - baseDate) / 86400000;
    console.log("dateCount" + dateCount);
    console.log("Math.floor((yyyy - yyyy/4)"+ Math.floor((yyyy - yyyy/4) ));
    console.log(yyyy / 4);
    //うるう年分の日数を引いて 260で割ったときの剰余がKIN
    var a1 = (dateCount  -Math.floor((yyyy - 1909)/4) ) % 260 ;
     
    //ただし、うるう年で02/29以降の場合はフナブク分を+1する。
    //現在のグレゴリオ暦では、うるう年の決め方は以下の規則によっています。
    //1.西暦年数が4で割り切れる年は原則として「うるう年」にする。
    //2.上記の例外として、西暦年数が100で割り切れる年は「平年」とする。
    //3.さらに例外として、西暦年数が400で割り切れる年は「うるう年」にする。
    //この規則によりますと、2000年は400で割り切れますから「うるう年」になります。 一方1900年、2100年、2200年などは平年になります。
    console.log(Number( mm)*100 + Number(dd) ); 
    if(yyyy % 4 == 0 && (Number( mm)*100 + Number(dd)) >= 229) return a1;
     
     return a1+1;
  }
  //KINの音 を返す 
  function kinOto(kin) {
    var idx_oto = kin % 13;
    var otoNo = idx_oto;
    if (otoNo === 0 ) {
      otoNo = 13 ;
    }
    return otoNo;
  }
  //KINの前の太陽の紋章インデックスを返す
  function kinMae(kin) { return kin % 20;}

  //KINの後ろの太陽の紋章インデックスを返す
  function kinUshiro(kin) { 
    //console.log("kinUshiro" + Math.floor(kin / 13));
    return Math.floor((kin-1) / 13);
  }


  //KINに応じたメッセージ、色を計算する
  function kinMsg(kin) {
 

    var otoNo = kinOto(kin);
    var idx_mae =kinMae(kin)  ;

    var idx_ushiro = kinUshiro(kin);
    //console.log("idx_ushiro:" + idx_ushiro);

    //メッセージ出力内容 
    //KIN xxxx 「銀河の音(銀河の音名称)前の太陽の紋章 - 後ろの太陽の紋章」
   var msg = 
      "KIN " + kin + 
      " 「" + otoNo +"(" + gOtoList[otoNo%13] + ")" +
      gMaeList[idx_mae] + " - " + gUshiroList[idx_ushiro] + "」";
      //console.log(msg);
      //gOto = otoNo;
      return msg ;
   
  }
  
    
  


   // SNSボタン
  $('.social-icon').hover(
    function(){
      $(this).children('span').animate({
        'font-size':'30px'
      }, 300);
    },
    function(){
      $(this).children('span').animate({
        'font-size':'24px'
      }, 300);
    }
  );
  
  // トップへ戻るボタン
  $('#top-btn').click(function(){
    $('html,body').animate({ 
      'scrollTop': 0 
    }, 'slow');
  });
  
  // ヘッダー内の<a>タグをクリックしたときのclickイベントを作成してください。
  $('header a').click(function(){
    var id = $(this).attr('href');

    var position = $(id).offset().top;
    $('html,body').animate({
      'scrollTop':position
    },500);
  });
 
 



});