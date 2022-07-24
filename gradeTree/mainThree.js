'use strict';

const words = [
  'wine','arrow','branch','taxi','grape','snake','statue','brush','palace','London',
  'zoo','entrance','gym','tower','Europe','host','dad','elephant','soup','tie','fox',
  'jeans','jam','suit','ticket','Canada','fence','England','Asia','hall','forest','mom',
  'engineer','policeman','toy','umbrella','frog','bottle','ink','sofa','bomb','China',
  'desert','Australia','beach','theater','tent','restaurant','stranger','driver','enemy',
  'husband','scientist','bathroom','runner','artist','visitor','cousin','sunset','trade',
  'match','death','habit','joy','blood','luck','fishing','president','merchant','barber',
  'army','painter','reporter','God','century','goal','training','disease','tour','exam',
  'flight','film','mind','pain','crowd','guide','queen','pal','captain','neighbor','prince',
  'midnight','play','tear','concert','action','festival','pop','thought','promise','accident'
  ,'custom','waste','use','reply','race','stay','valley','silver','heaven','ocean','soil',
  'billion','couple','area','calendar','signal','discussion','sign','volleyball','answer',
  'stop','courage','iron','universe','silk','wave','root','smoke','course','shade','prize',
  'list','page','report','step','secret','quiz','care','rush','plant','gas','climate','jewel',
  'rainbow','weather','model','point','railway','mark','bowl','lip','net','melon','poem',
  'menu','gram','cent','address','damage','sort','reason','kilometer','middle','shock',
  'centimeter','zone','toast','curtain','juice','honey','goods','sense','type','symbol',
  'energy','position','gray','bit','matter','power','sentence','yen','grade','plate','cheese',
  'can','treasure','hole','price','problem','fact','beauty','pair','percent','case','spelling',
  'meaning','square','youth','order','wonder','smell','kiss','cross','select','awake','fill',
  'print','succeed','receive','date','raise','raise','exercise','return','destroy','belong',
  'realize','realize','sound','invent','solve','hurt','knock','touch','touch','miss','miss',
  'reach','hand','choose','share','copy','boil','train','cover','break','please','explain',
  'bake','discuss','lie','shake','save','save','hit','mix','blow','shoot','fight','introduce',
  'introduce','row','drop','marry','interested','ashamed','blind','gentle','pleased','monthly',
  'open','flat','musical','noisy','holy','lonely','merry','living','personal','necessary','wild',
  'outside','fresh','healthy','lovely','dumb','modern','peaceful','raw','international','back',
  'natural','lost','quick','first','second','third','forth','fifth','sixth','seventh','eighth',
  'ninth','tenth','eleventh','twelfth','thirteenth','fourteenth','fifteenth','sixteenth',
  'seventeenth','eighteenth','nineteenth','twentieth','thirtieth','unhappy','lazy','brave','pale',
  'simple','daily','exciting','senior','safe','national','Chinese','excited','fat','funny','cute',
  'sleepy','delicious','calm','tiny','final','central','wet','common','crazy','fond','friendly',
  'silent','close','real','certain','wrong','while','but','when','during','if','although','though',
  'or','between','because','and','however','besides','after','tonight','ever','once','finally',
  'straight','everywhere','down','pretty','maybe','surely','certainly','easily','neither','alone',
  'hard','forever','suddenly','especially','quickly','long','away','abroad','ahead','all','almost',
  'indeed','else','anyway','either','gently','probably','happily','then','then','twice','still',
  'recently','off','across','across','round','just','quite','perhaps','even','quietly','fine',
  'carefully','never','really','weekly','snowy','whole','another','than'
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

