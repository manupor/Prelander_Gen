import { BrandConfig } from '../../lib/types'

export function renderTemplate(brand: BrandConfig): { html: string; css: string } {
  const headline = brand.copy?.headline || "PIRATE'S TREASURES"
  const cta = brand.copy?.cta || 'SPIN'
  const ctaUrl = (brand as any).ctaUrl || 'https://example.com'
  const popupTitle = (brand as any).popupTitle || 'TREASURE FOUND!'
  const popupMessage = (brand as any).popupMessage || "You've discovered a legendary prize!"
  const popupPrize = (brand as any).popupPrize || '$5,000 + 100 FREE SPINS'
  const gameBalance = (brand as any).gameBalance || 150000

  const css = `*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Arial Black',Arial,sans-serif;overflow:hidden;width:100vw;height:100vh;position:relative}.pirate-bg{position:fixed;top:0;left:0;width:100%;height:100%;background:linear-gradient(180deg,#87CEEB 0%,#87CEEB 40%,#4FC3F7 60%,#0277BD 100%);z-index:1}.ocean{position:absolute;bottom:0;left:0;width:100%;height:30%;background:linear-gradient(180deg,#2196F3 0%,#1565C0 100%)}.wave{position:absolute;bottom:28%;width:100%;height:50px;opacity:.7;animation:wave 8s linear infinite}@keyframes wave{0%{background-position:0 0}100%{background-position:1200px 0}}.cloud{position:absolute;background:#fff;border-radius:50%;opacity:.8;animation:float-cloud 30s linear infinite}.cloud-1{width:120px;height:40px;top:10%;left:-120px;animation-duration:25s}.cloud-2{width:150px;height:50px;top:20%;left:-150px;animation-duration:35s;animation-delay:5s}.cloud-3{width:100px;height:35px;top:15%;left:-100px;animation-duration:40s;animation-delay:10s}@keyframes float-cloud{0%{left:-200px}100%{left:calc(100% + 200px)}}.palm{position:absolute;bottom:25%;width:120px;height:180px;z-index:2}.palm-left{left:5%;transform:rotate(-5deg)}.palm-right{right:5%;transform:rotate(5deg)}.palm-trunk{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:20px;height:120px;background:linear-gradient(90deg,#6D4C41 0%,#8D6E63 50%,#6D4C41 100%);border-radius:10px}.palm-leaves{position:absolute;top:0;left:50%;transform:translateX(-50%);font-size:60px;color:#2E7D32;filter:drop-shadow(0 4px 8px rgba(0,0,0,.3))}.game-container{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:95%;max-width:1100px;z-index:10}.top-bar{display:flex;justify-content:space-between;align-items:center;padding:15px 30px;background:linear-gradient(135deg,#8D6E63 0%,#5D4037 100%);border-radius:20px 20px 0 0;box-shadow:0 -5px 20px rgba(0,0,0,.3);border:4px solid #FFAB00}.coin-display{display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#FFA000 0%,#FF6F00 100%);padding:10px 20px;border-radius:25px;box-shadow:inset 0 2px 5px rgba(0,0,0,.3);font-size:20px;font-weight:700;color:#fff;text-shadow:2px 2px 4px rgba(0,0,0,.5)}.coin-icon{width:30px;height:30px;background:radial-gradient(circle,#FFD700 0%,#FFA000 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 3px 8px rgba(0,0,0,.4)}.game-title{font-size:36px;font-weight:900;color:#FF6F00;text-shadow:3px 3px 0 #8D6E63,-1px -1px 0 #FFEB3B,1px -1px 0 #FFEB3B,-1px 1px 0 #FFEB3B,1px 1px 0 #FFEB3B;letter-spacing:2px;transform:rotate(-2deg)}.buy-coins-btn{background:linear-gradient(135deg,#FFD700 0%,#FFA000 100%);color:#3E2723;padding:12px 25px;border:none;border-radius:25px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 10px rgba(0,0,0,.3);transition:all .2s;text-transform:uppercase}.buy-coins-btn:hover{transform:translateY(-2px);box-shadow:0 6px 15px rgba(0,0,0,.4)}.slot-frame{background:linear-gradient(135deg,#6D4C41 0%,#4E342E 50%,#6D4C41 100%);border:6px solid #FFAB00;border-radius:15px;padding:30px;box-shadow:0 15px 40px rgba(0,0,0,.5),inset 0 0 30px rgba(0,0,0,.3);position:relative}.corner-decoration{position:absolute;width:60px;height:60px;border-radius:50%;background:radial-gradient(circle,#8D6E63 0%,#5D4037 100%);border:3px solid #FFAB00;box-shadow:0 4px 10px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;font-size:24px;color:#FFD700;font-weight:700}.corner-tl{top:-20px;left:-20px}.corner-tr{top:-20px;right:-20px}.corner-bl{bottom:110px;left:-20px}.corner-br{bottom:110px;right:-20px}.row-numbers{position:absolute;display:flex;flex-direction:column;gap:28px;top:50%;transform:translateY(-50%);z-index:5}.row-numbers-left{left:-50px}.row-numbers-right{right:-50px}.row-number{width:35px;height:35px;background:radial-gradient(circle,#FFD700 0%,#FFA000 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#3E2723;box-shadow:0 3px 8px rgba(0,0,0,.4);border:2px solid #FFEB3B}.reels-container{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;background:rgba(0,0,0,.2);padding:15px;border-radius:10px;position:relative}.reel{display:flex;flex-direction:column;gap:8px}.slot-cell{aspect-ratio:1;background:linear-gradient(135deg,#8D6E63 0%,#6D4C41 100%);border:3px solid #4E342E;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:50px;position:relative;overflow:hidden;box-shadow:inset 0 0 15px rgba(0,0,0,.5);transition:all .3s}.slot-cell.spinning{animation:spin-blur .1s linear infinite;filter:blur(3px)}.slot-cell.winning{animation:win-glow 1s ease-in-out infinite;border-color:#FFD700;box-shadow:0 0 20px #FFD700,0 0 40px #FFA000,inset 0 0 20px rgba(255,215,0,.3)}@keyframes spin-blur{0%{transform:translateY(0)}100%{transform:translateY(-10px)}}@keyframes win-glow{0%,100%{box-shadow:0 0 20px #FFD700,0 0 40px #FFA000}50%{box-shadow:0 0 40px #FFD700,0 0 60px #FFA000}}.control-panel{display:flex;justify-content:space-between;align-items:center;padding:25px 40px;background:linear-gradient(135deg,#6D4C41 0%,#4E342E 100%);border-radius:0 0 20px 20px;box-shadow:0 10px 30px rgba(0,0,0,.4);border:4px solid #FFAB00;border-top:none;gap:20px}.control-btn{background:linear-gradient(135deg,#8D6E63 0%,#5D4037 100%);color:#FFD700;border:3px solid #FFAB00;padding:15px 30px;border-radius:15px;font-size:18px;font-weight:700;cursor:pointer;box-shadow:0 5px 15px rgba(0,0,0,.3);transition:all .2s;text-transform:uppercase;letter-spacing:1px;min-width:120px}.control-btn:hover:not(:disabled){transform:translateY(-3px);box-shadow:0 7px 20px rgba(0,0,0,.4)}.control-btn:disabled{opacity:.5;cursor:not-allowed}.spin-btn{width:140px;height:140px;border-radius:50%;background:radial-gradient(circle,#FFD700 0%,#FFA000 50%,#FF6F00 100%);font-size:24px;color:#3E2723;border:6px solid #FFEB3B;box-shadow:0 8px 25px rgba(0,0,0,.5),inset 0 0 20px rgba(255,255,255,.3);position:relative;overflow:hidden}.spin-btn::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent 30%,rgba(255,255,255,.3) 50%,transparent 70%);transform:rotate(45deg);animation:shine 3s linear infinite}@keyframes shine{0%{transform:rotate(45deg) translateX(-100%)}100%{transform:rotate(45deg) translateX(100%)}}.bet-display,.balance-display{text-align:center}.bet-label,.balance-label{font-size:14px;color:#FFAB00;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px}.bet-amount,.balance-amount{font-size:24px;font-weight:700;color:#FFD700;text-shadow:2px 2px 4px rgba(0,0,0,.5)}.win-modal{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.8);display:none;align-items:center;justify-content:center;z-index:1000;animation:fadeIn .3s}.win-modal.show{display:flex}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.win-content{background:linear-gradient(135deg,#8D6E63 0%,#5D4037 100%);border:6px solid #FFD700;border-radius:25px;padding:50px;text-align:center;max-width:600px;box-shadow:0 20px 60px rgba(0,0,0,.5);animation:bounceIn .5s;position:relative;overflow:hidden}@keyframes bounceIn{0%{transform:scale(.3);opacity:0}50%{transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1);opacity:1}}.win-icon-large{font-size:100px;margin-bottom:20px;animation:rotate-treasure 2s ease-in-out infinite}@keyframes rotate-treasure{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(10deg)}}.win-title{font-size:48px;font-weight:900;color:#FFD700;text-shadow:3px 3px 6px rgba(0,0,0,.5);margin-bottom:15px;text-transform:uppercase}.win-message{font-size:20px;color:#FFEB3B;margin-bottom:25px;text-shadow:2px 2px 4px rgba(0,0,0,.5)}.win-prize{font-size:36px;font-weight:700;color:#4CAF50;background:rgba(255,255,255,.1);padding:20px 40px;border-radius:15px;margin-bottom:30px;border:3px solid #FFD700;text-shadow:2px 2px 4px rgba(0,0,0,.5)}.claim-btn{background:linear-gradient(135deg,#4CAF50 0%,#2E7D32 100%);color:#fff;border:none;padding:20px 60px;border-radius:50px;font-size:24px;font-weight:700;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.3);transition:all .3s;text-transform:uppercase}.claim-btn:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(0,0,0,.4)}@keyframes float-coin{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(-100px) rotate(360deg);opacity:0}}.floating-coin{position:absolute;font-size:30px;animation:float-coin 2s ease-out forwards;pointer-events:none}@media (max-width:768px){.game-container{width:100%;padding:10px}.game-title{font-size:24px}.slot-cell{font-size:35px}.control-panel{flex-wrap:wrap;padding:15px}.spin-btn{width:100px;height:100px;font-size:18px}.palm{display:none}}`

  const jsCode = `const ICONS=['💣','📜','🧭','💀','⚓','🏴\u200d☠️','🔭','🪝','🛢️','👑','💎','🗝️','⚔️','🏆','🪙'];let balance=${gameBalance},bet=85150,isSpinning=false,autoSpin=false,spinCount=0,reelElements=[];function initGame(){const t=document.getElementById("reels");for(let e=0;e<5;e++){const n=document.createElement("div");n.className="reel";const o=[];for(let t=0;t<3;t++){const l=document.createElement("div");l.className="slot-cell",l.dataset.col=e,l.dataset.row=t,l.innerHTML=getRandomIcon(),n.appendChild(l),o.push(l)}reelElements.push(o),t.appendChild(n)}updateDisplay()}function getRandomIcon(){return ICONS[Math.floor(Math.random()*ICONS.length)]}function updateDisplay(){document.getElementById("balance").textContent=balance.toLocaleString(),document.getElementById("coinBalance").textContent=balance.toLocaleString()}async function spin(){if(isSpinning)return;if(balance<bet)return void alert("Insufficient balance!");isSpinning=true,balance-=bet,updateDisplay();const t=document.getElementById("spinBtn");t.disabled=true,document.querySelectorAll(".slot-cell.winning").forEach((t=>t.classList.remove("winning")));const e=reelElements.map(((t,e)=>new Promise((n=>{t.forEach((t=>t.classList.add("spinning"))),setTimeout((()=>{t.forEach((t=>{t.classList.remove("spinning"),t.innerHTML=getRandomIcon()})),n()}),2e3+200*e)}))));await Promise.all(e),setTimeout((()=>{checkWins(),isSpinning=false,t.disabled=false,autoSpin&&(spinCount++,setTimeout((()=>spin()),1e3))}),500)}function checkWins(){const t=[];for(let e=0;e<3;e++){const n=[];for(let t=0;t<5;t++){const l=reelElements[t][e];n.push({icon:l.innerHTML,cell:l})}t.push(n)}let e=false;t.forEach(((t,n)=>{let o=1,l=t[0].icon,s=[t[0].cell];for(let n=1;n<t.length;n++)if(t[n].icon===l)o++,s.push(t[n].cell);else{if(o>=3){e=true,s.forEach((t=>t.classList.add("winning")));const t=bet*o;balance+=t,s.forEach(((t,e)=>{setTimeout((()=>createFloatingCoin(t)),100*e)}))}o=1,l=t[n].icon,s=[t[n].cell]}if(o>=3){e=true,s.forEach((t=>t.classList.add("winning")));const t=bet*o;balance+=t,s.forEach(((t,e)=>{setTimeout((()=>createFloatingCoin(t)),100*e)}))}})),updateDisplay(),spinCount++,spinCount>=3&&e&&setTimeout((()=>{document.getElementById("winModal").classList.add("show")}),1500)}function createFloatingCoin(t){const e=document.createElement("div");e.className="floating-coin",e.textContent="🪙";const n=t.getBoundingClientRect();e.style.left=n.left+n.width/2+"px",e.style.top=n.top+n.height/2+"px",document.body.appendChild(e),setTimeout((()=>e.remove()),2e3)}document.getElementById("spinBtn").addEventListener("click",spin),document.getElementById("autoSpinBtn").addEventListener("click",(()=>{autoSpin=!autoSpin;const t=document.getElementById("autoSpinBtn");t.textContent=autoSpin?"STOP":"AUTO SPIN",autoSpin&&!isSpinning&&spin()})),document.getElementById("claimBtn").addEventListener("click",(()=>{document.getElementById("winModal").classList.remove("show"),window.location.href="${ctaUrl}"})),document.getElementById("menuBtn").addEventListener("click",(()=>{alert("Menu: Settings and Pay Table would go here")})),window.addEventListener("message",(function(t){"showPopup"===t.data&&document.getElementById("winModal").classList.add("show")})),initGame();`

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headline}</title>
  <style>${css}</style>
</head>
<body>
  <div class="pirate-bg">
    <div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>
    <div class="cloud cloud-3"></div>
    <div class="ocean"></div>
    <div class="wave"></div>
    <div class="palm palm-left"><div class="palm-trunk"></div><div class="palm-leaves">🌴</div></div>
    <div class="palm palm-right"><div class="palm-trunk"></div><div class="palm-leaves">🌴</div></div>
  </div>
  <div class="game-container">
    <div class="top-bar">
      <div class="coin-display"><div class="coin-icon">🪙</div><span id="coinBalance">${gameBalance.toLocaleString()}</span></div>
      <h1 class="game-title">${headline}</h1>
      <button class="buy-coins-btn">BUY COINS</button>
    </div>
    <div class="slot-frame">
      <div class="corner-decoration corner-tl">⚓</div>
      <div class="corner-decoration corner-tr">⚓</div>
      <div class="corner-decoration corner-bl">⚓</div>
      <div class="corner-decoration corner-br">⚓</div>
      <div class="row-numbers row-numbers-left">
        <div class="row-number">1</div>
        <div class="row-number">2</div>
        <div class="row-number">3</div>
      </div>
      <div class="row-numbers row-numbers-right">
        <div class="row-number">1</div>
        <div class="row-number">2</div>
        <div class="row-number">3</div>
      </div>
      <div class="reels-container" id="reels"></div>
    </div>
    <div class="control-panel">
      <button class="control-btn" id="menuBtn">MENU</button>
      <div class="bet-display"><div class="bet-label">Total Bet</div><div class="bet-amount" id="totalBet">85,150</div></div>
      <button class="control-btn spin-btn" id="spinBtn">${cta}</button>
      <div class="balance-display"><div class="balance-label">Balance</div><div class="balance-amount" id="balance">${gameBalance.toLocaleString()}</div></div>
      <button class="control-btn" id="autoSpinBtn">AUTO SPIN</button>
    </div>
  </div>
  <div class="win-modal" id="winModal">
    <div class="win-content">
      <div class="win-icon-large">🏴‍☠️💰</div>
      <h2 class="win-title">${popupTitle}</h2>
      <p class="win-message">${popupMessage}</p>
      <div class="win-prize">${popupPrize}</div>
      <button class="claim-btn" id="claimBtn" data-cta-url="${ctaUrl}">${cta}</button>
    </div>
  </div>
  <script>${jsCode}</script>
</body>
</html>`

  return { html, css }
}
