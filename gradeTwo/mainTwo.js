'use strict';

const words = [
  'abroad','accident','add','advertise','advice','advise','afraid','again','against','ago','agree',
  'airport','album','alien','almost','alone','also','always','America','American','angry','animal',
  'another','answer','anyone','anything','anywhere','arm','art','as','Asia','ask','baby','bad','ball',
  'ballpark','band','bath','beach','bear','became','because','become','beef','beer','began',
  'begin','believe','belt','bench','best wishes','better','bicycle','birthday','black','blue','body',
  'book','boring','borrow','bought','boy','break','bridge','bright','bring','broke','brought','brown','build',
  'building','business','butter','call','camp','candle','candy','capital','card','care','carpet','carry',
  'catch','caught','center','chain','chalk','change','character','chicken','child','children','choose',
  'Christmas','church','circle','clean','clever','climb','clock','close','cloth','clothes','cloud',
  'cloudy','club','coat','coffee','coin','college','color','comic','communication','compare','complain',
  'computer','contest','cool','corner','could','cried','cry','culture','cut','cute','dark','date','dear','decide',
  'deep','dictionary','die','different','difficult','disagree','discover','dish','dislike','dollar','down','draw',
  'dream','dress','drink','drive','duck','dump','during','each','ear','earth','eat','echo','elevator',
  'else','email','end','English','enough','enter','e-pal','eraser','everything','example','exchange',
  'exciting','excuse','eye','face','factory','fail','fall','famous','fan','far','farm','farmer','favor','feel','feeling','fell','festival','few',
  'fiction','fill','find','fine','finger','finish','fire','fish','flew','fly','food','fool','foolish','foot','football','foreign','forever','forget','fork',
  'found','free','front','full','fun','future','game','garbage','gave','gentleman','gift','girl','give','glove','god','gold','grade',
  'grandfather','grandmother','grass','great','green','ground','group','grow','guest','guitar','gun','habit','hair','happen',
  'happiness','hat','hate','head','headache','health','hear','hear from','heard','heart','hill','history','hit','hobby','hold','hole',
  'holiday','home','homeroom','homestay','hope','horse','host','hour','housework','human','hundred','hunt','hurry','ice',
  'idea','if','imagine','important','industrial','inside','interested','interesting','Internet','into','invite','island','job','join',
  'jump','keep','key','key chain','kill','kind','king','knife','lady','lake','land','language','last','later','laugh','law','leaf',
  'learn','left','leg','lend','lesson','letter','library','lie','life','light','lion','listen','little','locker','lose','loud','love','low',
  'lucky','machine','made','magazine','magic','main','make','market','math','may','mean','meat','medal','medicine',
  'member','message','met','meter','mile','million','mind','mirror','mistake','money','monkey','monster','moon','more',
  'most','motto','mountain','mouse','mouth','movie','moving','museum','must','name','nature','near','neck','need','nest',
  'news','newspaper','next','noise','nose','notice','nuclear','of course','oil','once','opinion','organ','other','overcoat','own',
  'paint','pants','paper','parent','part','party','pass','passport','past','pay','peace','peanut','pencil','penguin','people',
  'perfect','person','pet','phone','photo','pick','picnic','pie','piece','pig','place','plane','planet','pocket','poem','point','police',
  'pond','poor','popular','pork','port','post','post office','potato','practice','present','pretty','problem','program','purpose',
  'push','question','quiet','rabbit','radio','rain','rainy','rat','read','ready','record','remember','rest','return','rice','right',
  'ring','rise','river','road','rock','roof','room','sad','said','sail','sailor','sale','salt','same','sang','say','sea','seat','see',
  'seem','send','sent','set','shall','shine','ship','shirt','shoe','shop','shopping','should','shoulder','shout','show','sick',
  'side','sightseeing','simple','sing','singer','sit','skate','ski','skirt','sky','sleep','smile','snow','soccer','softball','someone',
  'something','song','sound','space','spaceship','special','speech','spend','sport','stand','star','start','station','stay','still',
  'stone','store','storm','story','strange','street','strike','strong','success','such','sugar','sun','sure','surf','surprised',
  'sweater','table','take','take care','talk','taught','tea','teach','team','tell','test','test paper','textbook','than','thank','thing',
  'think','thirsty','thought','thousand','threw','through','throw','tired','together','told','tomorrow','ton','took','tooth','top',
  'town','traffic light','train','travel','trip','truck','try','T-shirt','turn','TV','uh-huh','understand','United States','usual',
  'usual','vacation','vegetable','video','video game','village','visit','voice','wake','war','warm','was','wash','waste',
  'watch','water','way','weak','wear','weekend','weigh','welcome','well','were','west','white','why','wide','wife','will',
  'win','wind','wish','without','wonderful','wood','word','work','world','worry','wrong','yellow','young','zoo'
];
let word;
let loc;
let score;
let miss;
const timeLimit = 60 * 1000; // 1分
let startTime; // ゲームスタート時刻を保持するための変数
let isPlaying = false;

const target = document.getElementById('target'); // 表示エリアを取得
const hajime = document.getElementById('hajime'); // 表示エリアを取得
const scoreLebel = document.getElementById('score'); // スコア要素取得
const missLabel = document.getElementById('miss'); // ミス数要素取得
const timerLabel = document.getElementById('timer'); // タイマー要素取得

function updateTarget() { // 正解した文字を＿に変換させる
  let placeholder = ''; // '_'を格納するための空の変数
  for (let i = 0; i < loc; i++) {
    placeholder += '_'; // 呼び出された数だけ'_'を連結する
  }
  target.textContent = placeholder + word.substring(loc); // loc番目までは'_'、loc番目以降はそのまま表示
};

function updateTimer() {
  const timeLeft = startTime + timeLimit - Date.now(); // 残り時間を計算
  timerLabel.textContent = (timeLeft / 1000).toFixed(2); // タイマーラベルに秒で表示 小数点以下第二位まで

  const timeoutId = setTimeout(() => { // updateTimerを読んだ10m秒後に
    updateTimer(); // updateTimerを呼び出す = updateTimerを繰り返す
  }, 10);

  if (timeLeft < 0) { // 残り時間が0以下になったら
    isPlaying = false; // ゲームが終了したので isPlaying を false へ

    clearTimeout(timeoutId); // timeoutIdを解除する
    timerLabel.textContent = '0.00'; // 0.00を表示
    setTimeout(() => { // 100m秒後にアラートを表示させる
      showResult();
    }, 100);

    target.textContent = 'click to replay'; // リプレイを促すメッセージを表示
  }
}

function showResult() {
  const accuracy = score + miss === 0 ? 0 : score / (score +miss) * 100; // 正解率計算
  alert(` 入力文字数  ${score}, ミス入力数  ${miss} , 正解率  ${accuracy.toFixed(2)}% !`) // 正解率表示
}

window.addEventListener('click',() => {
  if (isPlaying === true) { // isPlaying が true なら
    return; // 以下の処理をせずに return
  }
  isPlaying = true; // isPlaying を true へ

  // 以下、各項目の初期化
  loc = 0;
  score = 0;
  miss = 0;
  scoreLebel.textContent = score;
  missLabel.textContent = miss;
  word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word; // 打った文字をセット
    startTime = Date.now(); // 現在時刻を代入
    updateTimer(); // 残り時間表示関数
});

window.addEventListener('keydown', e => {
  if (isPlaying !== true) { // タイプ時に isplaying が true じゃなかったら return する
    return;
  }

  if (e.key === word[loc]) { // 打ったキー(e)がwordのloc番目の文字と同じなら
    loc++; // 次の文字へ
    if (loc === word.length) { // locが問題の文字列数と一致したら
      word = words[Math.floor(Math.random() * words.length)]; // 別の問題を選択する
      loc = 0; // locを0に初期化
    }
    updateTarget();
    score++; // 正解数プラス１
    scoreLebel.textContent = score; // 正解数表示
  } else { 
    miss++; // ミス数プラス１
    missLabel.textContent = miss; // ミス数表示
  }
});

