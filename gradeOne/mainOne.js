'use strict';

const words = [
  'picture','able','afternoon','again','age','ago','all','already','also','always','America','and','angry','animal','apple','April','arrive','at','August','aunt','Australia','autumn',
  'door','bad','ball','embankment','bat','beautiful','bed','best','big','bike','bird','birthday','black',
  'T-shirt','blue','boat','book','both','box','boy','bread','breakfast','brother','bus','busy','but','buy','by','cake','camera','can','Canada','cap','careful','cat',
  'desk','catch','chance','church','citizen','city','calss','clean','clerk','cold','collect','color','come','computer','cook','cool','country','cow','cup','dance','danger','dark',
  'computer','date','daughter','day','December','desk','diary','did','dinner','do','doctor','does','dog','doll','door','dream','drink','early','east','easy','eat','egg',
  'chair','eight','eighteen','eighty','eleven','enjoy','evening','every','everyone','everything','fall','family','famous','far','fast','father','favorite','February','field','fifteen','fifty','fifteen',
  'tea','fine','first','fish','five','floor','flower','forty','four','fourteen','free','Friday','friend','friendly','from','fruite','full','fun','funny','garden','gate','get',
  'cake','girl','glad','glass','go','good','green','guiter','hair','half','hand','happy','have','he','help','her','here','hers','herself','high','him','himself',
  'book','his','home','homework','honest','hospital','hot','hotel','hour','house','how','hungry','ill','in','interesting','it','its','itself','January','Japan','July','junior',
  'English','kind','kitchen','know','large','later','learn','leave','left','lemon','letter','library','light','like','line','little','live','long','look','lot','low','lunch',
  'Japanese','mail','make','man','many','map','March','math','Many','me','meal','meet','meter','milk','mine','minute','mitt','Monday','month','morning','most','mother',
  'music','move','much','music','my','myself','name','need','new','next','nice','night','nine','nineteen','ninety','no','nobody','noisy','none','north','not','nothing',
  'pen','November','now','number','nurse','October','of','office','often','old','on','open','or','orange','our','ours','ourselves','parent','park','pen','people','piano',
  'pencil','picture','pilot','place','plane','play','player','poor','popular','pot','present','put','question','quiet','racket','rain','read','red','rich','ride','right','room',
  'eraser','room','rose','run','sad','Saturday','school','science','season','second','sell','send','September','seven','seventeen','seventy','she','sheep','short','shy','sick','sing',
  'notebook','textbook','dog','bike','basketball','apple','orange','pizza','bag','milk','juice','ball','singer','six','sixteen','sixty','slow','slowly','small','smart','snow','so','soccer','some','someone','sometimes','something','son',
  'soon','sorry','south','speak','sport','spring','stamp','stand','station','stay','stop','store','strong','student','study','subject','summer','Sunday','supper','swim','table','tall','tape','teacher','ten','tennis','that','the','their','them','themselves','there',
  'these','they','thing','third','thirteen','thirty','this','those','three','Thursday','time','to','today','together','tomorrow','too','town','train','tree','try','Tuesday','TV','twenty','two','uncle','under','up','us','use','usually','very',
  'village','visit','wait','walk','wall','want','warm','wash','watch','way','we','weather','Wednesday','week','well','west','what','where','which','white','who','whose','why','window','winter','with','woman','work','write','yard','year','yes',
  'yesterday','yet','you','young','your','yourself','true'
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

