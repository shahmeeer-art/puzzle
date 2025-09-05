/* Quiz Rewards — main script
   - 50 questions included
   - unlimited rewarded ad rewards (placeholder)
   - splash -> menu -> game flow
   - To add real ads: replace showRewardedAd() placeholder with your ad network's API calls.
*/

// ---------- Questions (50) ----------
const QR_QUESTIONS = [
  {q:"What is the capital of Pakistan?", a:["Lahore","Karachi","Islamabad","Quetta"], c:2},
  {q:"2 + 2 × 2 = ?", a:["6","8","4","10"], c:0},
  {q:"Fastest land animal?", a:["Cheetah","Horse","Lion","Tiger"], c:0},
  {q:"Largest ocean?", a:["Atlantic","Pacific","Indian","Arctic"], c:1},
  {q:"Who invented the light bulb?", a:["Newton","Edison","Tesla","Faraday"], c:1},
  {q:"Which planet is called the Red Planet?", a:["Earth","Venus","Mars","Jupiter"], c:2},
  {q:"H2O is the chemical formula for?", a:["Oxygen","Hydrogen","Water","Carbon"], c:2},
  {q:"National sport of Pakistan?", a:["Hockey","Cricket","Football","Polo"], c:0},
  {q:"Fastest bird (dive)?", a:["Sparrow","Falcon","Eagle","Crow"], c:1},
  {q:"Smallest continent by land area?", a:["Asia","Europe","Australia","Africa"], c:2},
  {q:"Which gas do we breathe in?", a:["Oxygen","Carbon Dioxide","Nitrogen","Hydrogen"], c:0},
  {q:"First Prime Minister of Pakistan?", a:["Liaquat Ali Khan","Jinnah","Bhutto","Ayub"], c:0},
  {q:"5 × 5 = ?", a:["20","25","30","35"], c:1},
  {q:"World's longest river (commonly listed)?", a:["Amazon","Nile","Indus","Yangtze"], c:1},
  {q:"Who discovered gravity?", a:["Einstein","Newton","Edison","Galileo"], c:1},
  {q:"Sun rises from which direction?", a:["North","South","East","West"], c:2},
  {q:"Largest country by area?", a:["USA","China","Russia","Canada"], c:2},
  {q:"Currency of Japan is?", a:["Won","Yen","Dollar","Rupee"], c:1},
  {q:"Which animal gives us wool?", a:["Goat","Sheep","Cow","Camel"], c:1},
  {q:"Which organ pumps blood?", a:["Liver","Brain","Heart","Lungs"], c:2},
  {q:"Largest hot desert in the world?", a:["Sahara","Gobi","Kalahari","Thar"], c:0},
  {q:"Year Pakistan gained independence?", a:["1945","1946","1947","1948"], c:2},
  {q:"Approx speed of light in vacuum?", a:["3×10^8 m/s","1×10^6 m/s","5×10^7 m/s","1×10^9 m/s"], c:0},
  {q:"Who is called father of the computer?", a:["Bill Gates","Charles Babbage","Alan Turing","Edison"], c:1},
  {q:"Which planet has prominent rings?", a:["Mars","Jupiter","Saturn","Venus"], c:2},
  {q:"Which vitamin is produced after sun exposure?", a:["A","B","C","D"], c:3},
  {q:"Which part of computer is the 'brain'?", a:["RAM","CPU","HDD","GPU"], c:1},
  {q:"First President of Pakistan (official)?", a:["Jinnah","Ayub","Iskander Mirza","Bhutto"], c:2},
  {q:"7 × 8 = ?", a:["54","56","64","58"], c:1},
  {q:"World's highest mountain?", a:["K2","Everest","Nanga Parbat","Makalu"], c:1},
  {q:"Which gas is commonly used in party balloons?", a:["Oxygen","Hydrogen","Helium","Nitrogen"], c:2},
  {q:"National flower of Pakistan?", a:["Rose","Tulip","Jasmine","Lily"], c:2},
  {q:"Who invented the computer mouse?", a:["Douglas Engelbart","Jobs","Gates","Babbage"], c:0},
  {q:"Smallest planet in classical list?", a:["Mercury","Venus","Mars","Pluto"], c:0},
  {q:"Human blood color?", a:["Blue","Red","Green","Yellow"], c:1},
  {q:"Which ocean borders Pakistan?", a:["Atlantic","Indian","Pacific","Arctic"], c:1},
  {q:"Symbolic bird of peace?", a:["Crow","Dove","Eagle","Sparrow"], c:1},
  {q:"First female Prime Minister of Pakistan?", a:["Fatima Jinnah","Benazir Bhutto","Malala","Asma"], c:1},
  {q:"Who wrote Pakistan national anthem?", a:["Iqbal","Hafeez Jalandhari","Jinnah","Faiz"], c:1},
  {q:"Largest island in the world?", a:["Greenland","Australia","Iceland","UK"], c:0},
  {q:"Which vitamin is abundant in citrus fruits?", a:["A","C","D","E"], c:1},
  {q:"How many continents are there (commonly)?", a:["5","6","7","8"], c:2},
  {q:"Planet closest to the Sun?", a:["Venus","Mercury","Mars","Earth"], c:1},
  {q:"100 ÷ 10 = ?", a:["5","10","20","15"], c:1},
  {q:"Largest mammal on Earth?", a:["Elephant","Blue Whale","Shark","Giraffe"], c:1},
  {q:"National poet of Pakistan?", a:["Iqbal","Faiz","Hafeez","Jalib"], c:0},
  {q:"Which is a type of super-fast computer?", a:["Laptop","Supercomputer","Server","PC"], c:1},
  {q:"Atomic number of Oxygen is?", a:["6","7","8","9"], c:2},
  {q:"First man to walk on the Moon?", a:["Neil Armstrong","Gagarin","Collins","Buzz Aldrin"], c:0},
  {q:"CNG stands for?", a:["Compressed Natural Gas","Cool New Gas","Central Natural Gas","Cheap Natural Gas"], c:0}
];

// ---------- Elements ----------
const splash = document.getElementById('splash');
const btnEnter = document.getElementById('btnEnter');
const mainMenu = document.getElementById('mainMenu');
const startGameBtn = document.getElementById('startGameBtn');
const gameModal = document.getElementById('gameModal');
const btnCloseGame = document.getElementById('btnCloseGame');

const elCoins = document.getElementById('coins');
const elScore = document.getElementById('score');
const elLives = document.getElementById('lives');
const elQIndex = document.getElementById('qIndex');
const elQTotal = document.getElementById('qTotal');
const elQuestion = document.getElementById('questionText');
const elAnswers = document.getElementById('answers');
const btnSkip = document.getElementById('btnSkip');
const btnRewardCoins = document.getElementById('btnRewardCoins');
const btnRewardLife = document.getElementById('btnRewardLife');

const homeCoins = document.getElementById('homeCoins');
const homeHigh = document.getElementById('homeHigh');

// ---------- State ----------
let round = [];
let index = 0;
let lives = 3;
let score = 0;
let coins = Number(localStorage.getItem('qr_coins') || 0);
let highscore = Number(localStorage.getItem('qr_highscore') || 0);

// ---------- Helpers ----------
function shuffle(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function saveState(){ localStorage.setItem('qr_coins', coins); localStorage.setItem('qr_highscore', highscore); }
function updateHUD(){
  elCoins.textContent = coins;
  elScore.textContent = score;
  elLives.textContent = lives;
  elQIndex.textContent = Math.min(index+1, round.length || 50);
  elQTotal.textContent = round.length || 50;
  if(homeCoins) homeCoins.textContent = coins;
  if(homeHigh) homeHigh.textContent = highscore;
}

// ---------- Flow: splash -> menu ----------
btnEnter.addEventListener('click', () => {
  splash.classList.add('hidden');
  mainMenu.classList.remove('hidden');
  updateHUD();
});

// Auto-hide splash after 2s if user doesn't click
setTimeout(()=>{ if(!mainMenu || mainMenu.classList.contains('hidden')){ splash.classList.add('hidden'); mainMenu.classList.remove('hidden'); updateHUD(); } }, 2200);

// ---------- Start Round ----------
startGameBtn.addEventListener('click', () => openGame());
function openGame(){
  // prepare round of 50 (duplicate if pool smaller)
  const pool = [...QR_QUESTIONS];
  while(pool.length < 50) pool.push(...QR_QUESTIONS);
  round = shuffle(pool).slice(0,50);
  index = 0; lives = 3; score = 0;
  gameModal.classList.remove('hidden');
  mainMenu.classList.add('hidden');
  btnSkip.disabled = false;
  btnRewardCoins.disabled = false;
  btnRewardLife.disabled = false;
  renderQuestion();
  updateHUD();
}

// ---------- Render / Answer ----------
function renderQuestion(){
  const item = round[index];
  if(!item) return endRound();
  elQuestion.textContent = item.q;
  elAnswers.innerHTML = '';
  item.a.forEach((opt,i)=>{
    const b = document.createElement('button');
    b.className = 'answer-btn';
    b.textContent = opt;
    b.addEventListener('click', ()=> pickAnswer(i===item.c, b));
    elAnswers.appendChild(b);
  });
  updateHUD();
}

function pickAnswer(correct, btn){
  Array.from(document.querySelectorAll('.answer-btn')).forEach(x=>x.disabled=true);
  if(correct){
    btn.classList.add('correct');
    score += 10; coins += 10;
  } else {
    btn.classList.add('wrong');
    lives -= 1; score = Math.max(0, score-2);
  }
  saveState();
  setTimeout(()=>{
    index++;
    if(lives <= 0) return endRound();
    if(index >= round.length) return endRound();
    renderQuestion();
    updateHUD();
  }, 650);
}

// ---------- End / Skip ----------
function endRound(){
  btnSkip.disabled = true;
  btnRewardCoins.disabled = false;
  btnRewardLife.disabled = false;
  elQuestion.textContent = `Round Over — Score: ${score}`;
  elAnswers.innerHTML = `<div class="row center"><button id="playAgain" class="btn btn-primary">Play Again</button> <button id="mainMenuBtn" class="btn">Main Menu</button></div>`;
  document.getElementById('playAgain').addEventListener('click', openGame);
  document.getElementById('mainMenuBtn').addEventListener('click', ()=> { gameModal.classList.add('hidden'); mainMenu.classList.remove('hidden'); });
  // persist highscore
  if(score > highscore){ highscore = score; saveState(); }
}

// Skip button
btnSkip.addEventListener('click', ()=>{
  if(coins < 5){ alert('Not enough coins to skip.'); return; }
  coins -= 5; index++; saveState(); updateHUD();
  if(index >= round.length) endRound(); else renderQuestion();
});

// ---------- Rewarded Ads (UNLIMITED) ----------
/* IMPORTANT:
   This is a placeholder simulation that grants reward every time user completes the demo ad.
   Replace the body of showRewardedAd() with your real ad network integration,
   but keep the returned object shape {ok: true, watchedSec: N} or {ok:false}.
*/

// Demo placeholder (simulated overlay + 3s timer)
function showRewardedAdPlaceholder() {
  return new Promise(resolve=>{
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.85);z-index:9999';
    overlay.innerHTML = `
      <div style="background:#071827;color:var(--text);padding:18px;border-radius:12px;max-width:420px;text-align:center;border:1px solid rgba(255,255,255,.03)">
        <h3 style="margin:0 0 8px">Rewarded Ad (Demo)</h3>
        <p class="muted" style="margin:0 0 12px">This is a demo placeholder. Replace with your ad SDK. Wait 3s to earn reward.</p>
        <p id="adTimer" style="font-size:26px;margin:8px 0">3</p>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:12px">
          <button id="closeAd" class="btn btn-ghost">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    let t = 3;
    const timer = setInterval(()=> {
      t--; const el = overlay.querySelector('#adTimer'); if(el) el.textContent = t;
      if(t <= 0){ clearInterval(timer); cleanup(true, 3); }
    }, 1000);
    overlay.querySelector('#closeAd').onclick = ()=> { clearInterval(timer); cleanup(false, Math.max(0,3 - (Number(overlay.querySelector('#adTimer').textContent)||0))); };
    function cleanup(completed, watched){ document.body.removeChild(overlay); resolve({ok: completed, watchedSec: watched}); }
  });
}

// Public function used by buttons
async function showRewardedAd(type){
  // If you integrate a real ad SDK, call it here and await the result
  // Example: await AdSDK.showRewarded().then(result => { if (result.rewarded) resolve({ok:true, watchedSec:...}) })
  const res = await showRewardedAdPlaceholder();
  return res; // unlimited: we don't block or limit
}

// Buttons to call rewards
btnRewardCoins.addEventListener('click', async ()=>{
  const res = await showRewardedAd('coins_50');
  if(res.ok){
    coins += 50; saveState(); updateHUD();
    alert('✅ +50 coins added!');
  } else {
    alert('Ad not completed — no reward.');
  }
});

btnRewardLife.addEventListener('click', async ()=>{
  const res = await showRewardedAd('life_1');
  if(res.ok){
    lives += 1; updateHUD();
    alert('✅ +1 life added!');
  } else {
    alert('Ad not completed — no reward.');
  }
});

// Close / exit
btnCloseGame.addEventListener('click', ()=>{ gameModal.classList.add('hidden'); mainMenu.classList.remove('hidden'); saveState(); });

// ---------- Init HUD ----------
(function init(){
  elCoins.textContent = coins;
  elLives.textContent = lives;
  elScore.textContent = score;
  elQTotal.textContent = 50;
  if(homeCoins) homeCoins.textContent = coins;
  if(homeHigh) homeHigh.textContent = highscore;
  document.getElementById('year')?.textContent = new Date().getFullYear();
})();