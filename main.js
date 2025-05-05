// ========== 角色技能描述和祝福视频 ==========
const roleSkills = {
  assassin: "选择一个角色 (而非玩家) 并将其干掉。被暗杀的角色不可以出声。被干掉的角色因此而少了一个回合。",
  thief: "选择并洗劫一个角色 (而非玩家)。当读出角色名字时，这名玩家要将自己所有金币交给盗贼。注意： 盗贼不能打劫刺客或者被刺客暗杀的角色。",
  magician: "魔法师在自己回合任何时间都可以执行以下其中一项行动：1.与另一名玩家交换所有手牌(不包括桌子上已打出的地区卡)。如果魔法师手上没有牌，则当作是拿走任何一个玩家的手牌。或者2.选择弃掉手上一定数量的地区卡，然后从牌迭顶方抽回同等数量的地区卡。被弃掉的地区卡要放在牌堆最底处。",
  king: "做国王的玩家首先拿取皇冠，在下一个回合国王是起始玩家。国王计算自己已经建设了的贵族地区 (金色)，每有一个贵族地区可得一枚金币。如果下一个回合没有人选择做国王，这个回合的国王可以在下一个回合继续持有皇冠。",
  bishop: "做主教的玩家计算自己已经建设了的宗教地区 (蓝色)，每有一个宗教地区可得一枚金币。此外，军阀不可以攻打主教。",
  merchant: "在回合开始时，除了选择拿2枚金币或者抽地区卡之外，商人还可以额外获得1枚金币。然后，商人计算自己已经建设了的商业地区 (绿色)，每有一个商业地区可得一枚金币。",
  architect: "在回合开始时，建筑师除了选择拿2枚金币或者抽地区卡之外，还可以额外再抽2张地区卡。此外，建筑师可以在自己回合建设最多3个地区。",
  warlord: "选择做军阀的玩家数自己已经建设了的军事地区(红色)，每有一个军事地区可得一枚金币。在回合结束时，军阀能够选择攻打并破坏任何一个地区。破坏价值1元的地区是免费的，破坏其它建筑费用较昂贵的地区则需要支付『建筑费用-1』的金币。例：军阀破坏一个价值2枚金币的地区要支付1枚金币；军阀破坏一个价值5枚金币的地区要支付4枚金币，如此类推。不过，正式规则中，如果有玩家已经建立了8个地区(将要完结游戏)，军阀就不能攻打该名玩家。",
  queen: "如果皇后坐在国王旁边，就可以获得3枚金币，即使国王被暗杀了，你仍然可以使用这项能力。",
  alchemist: "炼金术士可以拿回在这个回合中，建筑地区所需要的所有金币 (不包括其它开 支，例如不能拿回给税务员的1枚金币)。例：如果只得4枚金币，不可以先付4元，取回4元，再给4元去建设8元的地区，炼金术士最多只能建4元的地区，然后拿回4元。",
  navigator: "当执行完『抽牌/拿金币』这个行动之后，航海家可以拿取4枚金币或者抽4张地区卡。航海家不能建设任何地区。",
  artist: "美术师可以美化自己一个或两个地区，方法是自己将金币放在地区之上。每个地区之上最多只能有一枚金币。",
  wizard: "巫师可以观看另一个玩家的手牌，然后拿走一张。巫师可以将这张地区卡放在手上， 或支付建筑费用实时建设。如果立即建造，这不算做巫师的建筑动作，巫师还可以正常建造一个地区。此外，巫师可以建造相同的地区。",
  diplomat: "选择做外交官的玩家计算自己已经建设了的军事地区(红色)，每有一个军事地区可得一枚金币。外交官还可以支付差额，与另外一个玩家交换一个地区。"
};

const roleVideos = {
  thief: "assets/videos/thief.mp4",
  magician: "assets/videos/magician.mp4",
  bishop: "assets/videos/bishop.mp4",
  architect: "assets/videos/architect.mp4",
  warlord: "assets/videos/warlord.mp4",
  alchemist: "assets/videos/alchemist.mp4",
  navigator: "assets/videos/navigator.mp4",
  artist: "assets/videos/artist.mp4",
  wizard: "assets/videos/wizard.mp4",
  diplomat: "assets/videos/diplomat.mp4"
};

// 角色中文名辅助
function roleNameZh(role) {
  const map = {
    assassin: "刺客", thief: "盗贼", magician: "魔法师", king: "国王", bishop: "主教", merchant: "商人",
    architect: "建筑师", warlord: "军阀", queen: "皇后", alchemist: "炼金术士", navigator: "航海家",
    artist: "美术家", wizard: "巫师", diplomat: "外交官"
  };
  return map[role] || role;
}

// 玩家信息面板渲染
function renderPlayerPanel(currentIdx = 0) {
  const panel = document.getElementById('player-panel');
  panel.innerHTML = '';
  [players[0], players[1]].forEach((p, idx) => {
    const block = document.createElement('div');
    block.className = 'player-block' + (idx === currentIdx ? ' current' : '');
    // 头部：角色卡牌+名字+角色+技能按钮
    const header = document.createElement('div');
    header.className = 'player-header';
    header.innerHTML = `
      <img class="player-role-img" src="assets/roles/${p.roleKey}.jpg" alt="${p.role}">
      <span class="player-name">${p.name}（${p.role}）</span>
`    ;
    // 技能按钮
    if (roleSkills[p.roleKey]) {
      const skillBtn = document.createElement('button');
      skillBtn.className = 'skill-btn';
      skillBtn.title = '查看技能';
      skillBtn.innerHTML = '？';
      skillBtn.onclick = (e) => {
        e.stopPropagation();
        showSkillPopup(p.roleKey);
      };
      header.appendChild(skillBtn);
    }
    block.appendChild(header);
    // 金币
    const coins = document.createElement('div');
    coins.className = 'player-coins';
    coins.innerHTML = `<img src="assets/others/coin.jpg" alt="金币"><span style="margin-left:2px;">×${p.coins}</span>`;
    block.appendChild(coins);
    // 手牌
    const hand = document.createElement('div');
    hand.className = 'player-hand';
    hand.innerHTML = `<img class="hand-img" src="assets/others/card_back.jpg" alt="手牌"><span class="hand-count">×${p.hand.length}</span>`;
    hand.title = "点击查看手牌详情";
    hand.onclick = () => showHandPopup(p);
    block.appendChild(hand);
    // 已建造
    const built = document.createElement('div');
    built.className = 'player-built';
    if (p.built && p.built.length > 0) {
      p.built.forEach(card => {
        const img = document.createElement('img');
        img.className = 'built-img';
        img.src = card.img;
        img.title = districtNameMap[card.name] || card.name;
        built.appendChild(img);
      });
    } else {
      built.innerHTML = '<span style="color:#aaa;font-size:0.95rem;">（暂无已建造地区）</span>';
    }
    block.appendChild(built);
    panel.appendChild(block);
  });
}

// 技能描述弹窗
function showSkillPopup(role) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '5000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:18px 16px 12px 16px;border-radius:12px;max-width:320px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="font-weight:bold;font-size:1.1rem;color:#ffe6b3;margin-bottom:8px;">${roleNameZh(role)} 技能说明</div>
      <div style="color:#ffe6b3;font-size:1rem;line-height:1.7;margin-bottom:12px;">${roleSkills[role]}</div>
      <button class="main-btn" style="margin:0 auto;" onclick="this.parentNode.parentNode.remove()">关闭</button>
    </div>
  `;
  document.body.appendChild(popup);
  popup.onclick = (e) => { if (e.target === popup) popup.remove(); };
}

// 手牌弹窗
function showHandPopup(player) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '2000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  let html = `<div style="background:#2d1c13;padding:18px 16px 12px 16px;border-radius:12px;max-width:340px;box-shadow:0 2px 16px #000a;text-align:center;">
    <div style="font-weight:bold;font-size:1.1rem;color:#ffe6b3;margin-bottom:8px;">${player.name} 的手牌</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:12px;">`;
  if (player.hand.length === 0) {
    html += `<span style="color:#aaa;">（暂无手牌）</span>`;
  } else {
    player.hand.forEach(card => {
      html += `<div style="display:flex;flex-direction:column;align-items:center;">
        <img src="${card.img}" style="width:60px;height:90px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
        <span style="color:#ffe6b3;font-size:0.95rem;">${districtNameMap[card.name] || card.name}</span>
      </div>`;
    });
  }
  html += `</div>
    <button class="main-btn" style="margin:0 auto;" onclick="this.parentNode.parentNode.remove()">关闭</button>
  </div>`;
  popup.innerHTML = html;
  document.body.appendChild(popup);
  popup.onclick = (e) => { if (e.target === popup) popup.remove(); };
}

// 在主游戏区流程每次切换玩家时调用
// 例如：renderPlayerPanel(currentPlayerIdx);
// 你可以在enterGameMain、showDealIntro、showDealAnimation、showCoinAnimation等流程合适位置调用


// ========== 资源数据 ==========
const rulesText = `欢迎来到富饶之城！<br><br>
你和你的伴侣与其他12位玩家将作为本局游戏的主角，体验一场充满策略与惊喜的桌游之旅。<br><br>
<b>游戏流程如下：</b><br>
1. 游戏开始时，玩家将从三张神秘的角色卡中各自抽取一张，开启属于自己的角色身份。<br>
2. 本局游戏共有14种不同角色，根据角色卡左上角的数字，角色的行动顺序依次为：1刺客、2盗贼、3魔法师、4国王、5主教、6商人、7建筑师、8军阀、9皇后、10炼金术士、11航海家、12美术师、13巫师、14外交官。<br>
3. 回合开始前，每位玩家会获得4张随机地区卡和4枚金币。<br>
4. 游戏将依次模拟每个角色的行动，玩家可通过抽卡、拿金币、建造地区等方式发展自己的城市。<br>
5. 第一回合结束后，根据已建造地区和剩余金币计算分数，公布最终排名。<br><br>
祝你们在富饶之城中收获幸福与美好回忆！<br><br>
<b>地区卡说明：</b><br>
1. 每张地区卡左上角金币的数量，表示建造该地区所需的金币数，同时也是该地区的分数。<br>
2. 地区卡分为五种颜色：蓝色（宗教）、红色（军事）、黄色（贵族）、绿色（商业）、紫色（特殊）。<br>
3. 紫色地区卡拥有特殊技能，建造后可带来额外能力。<br>
4. 游戏结束时，玩家已建造地区的金币总数加上剩余金币即为最终得分。`;

const sounds = {
  cover: 'assets/sounds/cover.wav',
  click: 'assets/sounds/click.wav',
  shuffle: 'assets/sounds/shuffle.wav',
  coin: 'assets/sounds/coin.wav',
  construct: 'assets/sounds/construct.wav',
  magic: 'assets/sounds/magic.wav',
  notification: 'assets/sounds/notification.wav',
  success: 'assets/sounds/success.wav',
};

// ========== 工具函数 ==========
function playSound(name) {
  if (!sounds[name]) return;
  const audio = new Audio(sounds[name]);
  audio.volume = 0.7;
  audio.play();
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// ========== 封面区 ==========
const coverSection = document.getElementById('cover-section');
const startBtn = document.getElementById('start-btn');
const coverAudio = document.getElementById('cover-audio');

window.addEventListener('DOMContentLoaded', () => {
  showSection('cover-section');
  setTimeout(() => {
    coverAudio.volume = 0.7;
    coverAudio.play().catch(() => {});
  }, 400);
});

startBtn.addEventListener('click', () => {
  playSound('click');
  showSection('rules-section');
  document.getElementById('rules-content').innerHTML = rulesText;
  renderBackToCoverBtn();
});

// ========== 规则简介区 ==========
const toRoleBtn = document.getElementById('to-role-btn');
function renderBackToCoverBtn() {
  if (document.getElementById('back-to-cover-btn')) return;
  const btn = document.createElement('button');
  btn.id = 'back-to-cover-btn';
  btn.className = 'main-btn';
  btn.textContent = '返回首页聆听绝美音效';
  btn.onclick = () => {
    playSound('click');
    showSection('cover-section');
    setTimeout(() => {
      coverAudio.currentTime = 0;
      coverAudio.play().catch(() => {});
    }, 200);
  };
  toRoleBtn.parentNode.insertBefore(btn, toRoleBtn.nextSibling);
}

toRoleBtn.addEventListener('click', () => {
  playSound('click');
  showSection('role-section');
  currentDraw = 0;
  renderRoleDraw();
});

// ========== 抽取角色区 ==========
const roleDrawArea = document.getElementById('role-draw-area');
const roleResult = document.getElementById('role-result');
const roleResultText = document.getElementById('role-result-text');
const toGameBtn = document.getElementById('to-game-btn');
const roleSection = document.getElementById('role-section');

const roleDrawOrder = [
  { player: '彭青', role: '国王', img: 'assets/roles/king.jpg' },
  { player: '吴璨', role: '皇后', img: 'assets/roles/queen.jpg' },
];
let currentDraw = 0;
let drawTip = null;

function renderRoleDraw() {
  roleDrawArea.innerHTML = '';
  roleResult.classList.add('hidden');
  if (!drawTip) {
    drawTip = document.createElement('div');
    drawTip.className = 'draw-tip';
    roleSection.insertBefore(drawTip, roleDrawArea);
  }
  drawTip.textContent = `请玩家 ${roleDrawOrder[currentDraw].player} 抽取角色`;
  drawTip.style.display = '';
  for (let i = 0; i < 3; i++) {
    const card = document.createElement('div');
    card.className = 'role-card-back';
    card.addEventListener('click', () => handleRoleCardClick(card));
    roleDrawArea.appendChild(card);
  }
}

function handleRoleCardClick(card) {
  playSound('shuffle');
  card.classList.add('flipped');
  setTimeout(() => {
    card.className = 'role-card-front';
    card.innerHTML = `<img src="${roleDrawOrder[currentDraw].img}" alt="${roleDrawOrder[currentDraw].role}" style="width:92%;height:92%;border-radius:12px;">`;
    Array.from(roleDrawArea.children).forEach((c, idx) => {
      if (c !== card) c.style.display = 'none';
    });
    if (drawTip) drawTip.style.display = 'none';
    setTimeout(() => {
      roleResultText.innerHTML = `${roleDrawOrder[currentDraw].player} 抽到的角色是 <span style="font-weight:bold;font-size:2.1rem;color:#ffe6b3;">${roleDrawOrder[currentDraw].role}</span>！`;
      roleResult.classList.remove('hidden');
      playSound('notification');
      card.style.width = '56vw';
      card.style.height = '76vw';
      card.style.maxWidth = '340px';
      card.style.maxHeight = '440px';
      card.style.minWidth = '180px';
      card.style.minHeight = '220px';
      roleResultText.style.fontSize = '1.25rem';
      roleResultText.style.fontWeight = 'normal';
      roleResultText.style.whiteSpace = 'nowrap';
      roleResultText.style.overflow = 'hidden';
      roleResultText.style.textOverflow = 'ellipsis';
      currentDraw++;
      if (currentDraw < roleDrawOrder.length) {
        toGameBtn.textContent = `请玩家 ${roleDrawOrder[currentDraw].player} 抽取角色`;
      } else {
        toGameBtn.textContent = '进入游戏';
      }
    }, 700);
  }, 500);
}

toGameBtn.addEventListener('click', () => {
  playSound('click');
  if (currentDraw < roleDrawOrder.length) {
    renderRoleDraw();
  } else {
    showSection('game-section');
    enterGameMain();
  }
});

// ========== 主游戏区：发牌引导 ==========

const districtNameMap = {
  palace: "宫殿", castle: "城堡", manor: "庄园", fortress: "要塞", battlefield: "战场", prison: "监狱", watchtower: "瞭望塔",
  cathedral: "大教堂", monastery: "修道院", church: "教堂", temple: "神庙", townhall: "市政厅", harbor: "港口",
  docks: "船坞", tradingpost: "商栈", market: "集市", tavern: "酒馆", dragongate: "龙门", university: "大学",
  greatwall: "长城", library: "图书馆", school: "魔法学校", graveyard: "墓地", laboratory: "实验室", observatory: "天文台",
  smithy: "铁匠铺", keep: "堡垒", hauntedciry: "鬼城"
};

const players = [
  { name: "彭青",   role: "国王",     roleKey: "king",      coins: 4, hand: [], built: [] },
  { name: "吴璨",   role: "皇后",     roleKey: "queen",     coins: 4, hand: [], built: [] },
  { name: "牛斐",   role: "盗贼",     roleKey: "thief",     coins: 4, hand: [], built: [] },
  { name: "ChatGPT",role: "刺客",     roleKey: "assassin",  coins: 4, hand: [], built: [] },
  { name: "施佳颖", role: "魔法师",   roleKey: "magician",  coins: 4, hand: [], built: [] },
  { name: "宋卓宣", role: "主教",     roleKey: "bishop",    coins: 4, hand: [], built: [] },
  { name: "CursorAI",role:"商人",     roleKey: "merchant",  coins: 4, hand: [], built: [] },
  { name: "李琪",   role: "建筑师",   roleKey: "architect", coins: 4, hand: [], built: [] },
  { name: "焦傲然", role: "军阀",     roleKey: "warlord",   coins: 4, hand: [], built: [] },
  { name: "刘泽仁", role: "炼金术士", roleKey: "alchemist", coins: 4, hand: [], built: [] },
  { name: "洪漪妮", role: "航海家",   roleKey: "navigator", coins: 4, hand: [], built: [] },
  { name: "余鹏文", role: "美术家",   roleKey: "artist",    coins: 4, hand: [], built: [], beautified: [] },
  { name: "李青政", role: "巫师",     roleKey: "wizard",    coins: 4, hand: [], built: [] },
  { name: "赵方强", role: "外交官",   roleKey: "diplomat",  coins: 4, hand: [], built: [] }
];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const districtCards = [
  // 黄色（贵族）
  { name: "palace", score: 5, color: "yellow", img: "assets/cards/palace.jpg", count: 3 },
  { name: "castle", score: 4, color: "yellow", img: "assets/cards/castle.jpg", count: 4 },
  { name: "manor", score: 3, color: "yellow", img: "assets/cards/manor.jpg", count: 5 },
  // 红色（军事）
  { name: "fortress", score: 5, color: "red", img: "assets/cards/fortress.jpg", count: 2 },
  { name: "battlefield", score: 3, color: "red", img: "assets/cards/battlefield.jpg", count: 3 },
  { name: "prison", score: 2, color: "red", img: "assets/cards/prison.jpg", count: 3 },
  { name: "watchtower", score: 1, color: "red", img: "assets/cards/watchtower.jpg", count: 3 },
  // 蓝色（宗教）
  { name: "cathedral", score: 5, color: "blue", img: "assets/cards/cathedral.jpg", count: 2 },
  { name: "monastery", score: 3, color: "blue", img: "assets/cards/monastery.jpg", count: 3 },
  { name: "church", score: 2, color: "blue", img: "assets/cards/church.jpg", count: 3 },
  { name: "temple", score: 1, color: "blue", img: "assets/cards/temple.jpg", count: 3 },
  // 绿色（商业）
  { name: "townhall", score: 5, color: "green", img: "assets/cards/townhall.jpg", count: 2 },
  { name: "harbor", score: 4, color: "green", img: "assets/cards/harbor.jpg", count: 3 },
  { name: "docks", score: 3, color: "green", img: "assets/cards/docks.jpg", count: 3 },
  { name: "tradingpost", score: 2, color: "green", img: "assets/cards/tradingpost.jpg", count: 3 },
  { name: "market", score: 2, color: "green", img: "assets/cards/market.jpg", count: 4 },
  { name: "tavern", score: 1, color: "green", img: "assets/cards/tavern.jpg", count: 5 },
  // 紫色（特殊）
  { name: "dragongate", score: 8, color: "purple", img: "assets/cards/dragongate.jpg", count: 1 },
  { name: "university", score: 8, color: "purple", img: "assets/cards/university.jpg", count: 1 },
  { name: "greatwall", score: 6, color: "purple", img: "assets/cards/greatwall.jpg", count: 1 },
  { name: "library", score: 6, color: "purple", img: "assets/cards/library.jpg", count: 1 },
  { name: "school", score: 6, color: "purple", img: "assets/cards/school.jpg", count: 1 },
  { name: "graveyard", score: 5, color: "purple", img: "assets/cards/graveyard.jpg", count: 1 },
  { name: "laboratory", score: 5, color: "purple", img: "assets/cards/laboratory.jpg", count: 1 },
  { name: "observatory", score: 5, color: "purple", img: "assets/cards/observatory.jpg", count: 1 },
  { name: "smithy", score: 5, color: "purple", img: "assets/cards/smithy.jpg", count: 1 },
  { name: "keep", score: 3, color: "purple", img: "assets/cards/keep.jpg", count: 2 },
  { name: "hauntedciry", score: 2, color: "purple", img: "assets/cards/hauntedciry.jpg", count: 1 }
];

function generateDistrictDeck() {
  let deck = [];
  districtCards.forEach(card => {
    for (let i = 0; i < card.count; i++) {
      deck.push({
        name: card.name,
        score: card.score,
        color: card.color,
        img: card.img
      });
    }
  });
  return shuffle(deck);
}

function dealInitialCards() {
  const deck = generateDistrictDeck();
  for (let i = 0; i < players.length; i++) {
    players[i].hand = []; // 先不发牌
    players[i].coins = 0; // 先不发金币
    players[i].built = [];
  }
  // 你可以把deck存起来，后面发牌时用
  window._districtDeck = deck;
}

const playerInfo = document.getElementById('player-info');
const coinInfo = document.getElementById('coin-info');
const cardArea = document.getElementById('card-area');
const actionArea = document.getElementById('action-area');

let currentPlayerIdx = 0;

function enterGameMain() {
  dealInitialCards();
  currentPlayerIdx = 0;
  coinInfo.style.display = 'none';
  playerInfo.style.display = 'none';
  showDealIntro();
  renderPlayerPanel(currentPlayerIdx); // <--- 新增
}

function showDealIntro() {
  cardArea.innerHTML = '';
  actionArea.innerHTML = '';
  playerInfo.textContent = '';
  coinInfo.style.display = 'none';
  playerInfo.style.display = 'none';

  // 只在第一个玩家时显示引导词和按钮
  if (currentPlayerIdx === 0) {
    const intro = document.createElement('div');
    intro.className = 'rules-content';
    intro.innerHTML = `回合开始前，每位玩家会获得4张随机地区卡和4枚金币。`;
    cardArea.appendChild(intro);

    const dealBtn = document.createElement('button');
    dealBtn.className = 'main-btn';
    dealBtn.style.marginTop = '18px';
    dealBtn.textContent = `看看 ${players[currentPlayerIdx].name} 的运气如何`;
    dealBtn.onclick = () => {
      playSound('shuffle');
      showDealAnimation();
    };
    actionArea.appendChild(dealBtn);
  } else {
    // 直接进入抽卡动画
    showDealAnimation();
  }
  renderPlayerPanel(currentPlayerIdx); // <--- 新增
}

function showDealAnimation() {
  cardArea.innerHTML = '';
  actionArea.innerHTML = '';
  playerInfo.textContent = `当前玩家：${players[currentPlayerIdx].name}（${players[currentPlayerIdx].role}）`;
  coinInfo.style.display = 'none';
  playerInfo.style.display = 'none';

  const hand = [];
  for (let j = 0; j < 4; j++) {
    hand.push(window._districtDeck.pop());
  }
  players[currentPlayerIdx].hand = hand;

  const cardGrid = document.createElement('div');
  cardGrid.style.display = 'grid';
  cardGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
  cardGrid.style.gridGap = '18px';
  cardGrid.style.justifyItems = 'center';
  cardGrid.style.margin = '24px 0 12px 0';
  cardGrid.style.width = '100%';

  for (let i = 0; i < 4; i++) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'district-card';
    cardDiv.style.background = `url('assets/others/card_back.jpg') center/cover no-repeat`;
    // 适配手机和PC，使用vw单位
    cardDiv.style.width = '35vw';
    cardDiv.style.height = '50vw';
    cardDiv.style.maxWidth = '200px';
    cardDiv.style.maxHeight = '280px';
    cardDiv.style.minWidth = '120px';
    cardDiv.style.minHeight = '160px';
    cardDiv.style.position = 'relative';
    cardGrid.appendChild(cardDiv);
  }
  cardArea.appendChild(cardGrid);

  setTimeout(() => flipCard(0), 400);

  function flipCard(idx) {
    if (idx >= 4) {
      setTimeout(showCardNames, 400);
      return;
    }
    const cardDiv = cardGrid.children[idx];
    cardDiv.style.transition = 'transform 0.4s';
    cardDiv.style.transform = 'rotateY(90deg)';
    setTimeout(() => {
      cardDiv.style.background = '';
      cardDiv.innerHTML = `
        <img src="${hand[idx].img}" alt="${districtNameMap[hand[idx].name] || hand[idx].name}" 
          style="width:100%;height:70%;object-fit:contain;border-radius:8px 8px 0 0;">
        <div class="district-info">
          ${districtNameMap[hand[idx].name] || hand[idx].name}
        </div>
      `;
      cardDiv.style.transform = 'rotateY(0deg)';
      playSound('shuffle');
      setTimeout(() => flipCard(idx + 1), 350);
    }, 200);
  }

  function showCardNames() {
    actionArea.innerHTML = '';
    const nextBtn = document.createElement('button');
    nextBtn.className = 'main-btn';
    // 优化按钮文案
    if (currentPlayerIdx === 0) {
      nextBtn.textContent = '彭青（国王）将获得4枚金币';
    } else {
      nextBtn.textContent = '吴璨（皇后）将获得4枚金币';
    }
    nextBtn.onclick = () => {
      playSound('click');
      showCoinAnimation();
    };
    actionArea.appendChild(nextBtn);
  }
  renderPlayerPanel(currentPlayerIdx); // <--- 新增
}

function showCoinAnimation() {
  cardArea.innerHTML = '';
  actionArea.innerHTML = '';
  playerInfo.textContent = `当前玩家：${players[currentPlayerIdx].name}（${players[currentPlayerIdx].role}）`;
  coinInfo.style.display = 'none';
  playerInfo.style.display = 'none';

  const coinArea = document.createElement('div');
  coinArea.style.display = 'flex';
  coinArea.style.justifyContent = 'center';
  coinArea.style.alignItems = 'center';
  coinArea.style.margin = '40px 0 24px 0';
  coinArea.style.height = '100px';
  cardArea.appendChild(coinArea);

  let coinsShown = 0;
  function showNextCoin() {
    if (coinsShown < 4) {
      const coinImg = document.createElement('img');
      coinImg.src = 'assets/others/coin.jpg';
      coinImg.style.width = '48px';
      coinImg.style.margin = '0 8px';
      coinImg.style.opacity = '0';
      coinArea.appendChild(coinImg);
      setTimeout(() => {
        coinImg.style.transition = 'opacity 0.3s';
        coinImg.style.opacity = '1';
        playSound('coin');
      }, 50);
      coinsShown++;
      setTimeout(showNextCoin, 350);
    } else {
      setTimeout(mergeCoins, 600);
    }
  }
  showNextCoin();

  function mergeCoins() {
    coinArea.innerHTML = '';
    const coinImg = document.createElement('img');
    coinImg.src = 'assets/others/coin.jpg';
    coinImg.style.width = '48px';
    coinImg.style.marginRight = '8px';
    coinArea.appendChild(coinImg);

    const x4 = document.createElement('span');
    x4.textContent = '×4';
    x4.style.fontSize = '2rem';
    x4.style.color = '#ffe6b3';
    x4.style.fontWeight = 'bold';
    coinArea.appendChild(x4);

    playSound('coin');
    players[currentPlayerIdx].coins = 4;
    document.getElementById('coin-count').textContent = players[currentPlayerIdx].coins;

    actionArea.innerHTML = '';
    const nextBtn = document.createElement('button');
    nextBtn.className = 'main-btn';
    if (currentPlayerIdx === 0) {
      nextBtn.textContent = '看看 吴璨 的运气如何';
    } else {
      nextBtn.textContent = '进入主游戏操作区';
    }
    nextBtn.onclick = () => {
      playSound('click');
      if (currentPlayerIdx === 0) {
        currentPlayerIdx = 1;
        showDealAnimation();
        renderPlayerPanel(currentPlayerIdx);
      } else {
        coinInfo.style.display = '';
        playerInfo.style.display = '';
        renderPlayerPanel(currentPlayerIdx);
        startFirstRound(); // <--- 新增，进入第一回合
      }
    };
    actionArea.appendChild(nextBtn);
  }
}

function showFirstRoundRules(onClose) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '3000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:380px;box-shadow:0 2px 16px #000a;text-align:left;">
      <div style="font-weight:bold;font-size:1.2rem;color:#ffe6b3;margin-bottom:10px;">第一回合规则与胜利条件</div>
      <div style="color:#ffe6b3;font-size:1.05rem;line-height:1.7;">
        <b>在一个回合当中，玩家可以作出以下事情：</b><br>
        <ul style="margin:8px 0 8px 18px;padding:0;">
          <li>执行一次行动：首先，玩家必须在桌子上的金币堆中拿取4枚金币，或者从牌堆中抽取2张新的地区卡，选择一张放入手上，然后将另外一张弃掉。</li>
          <li>建设：接着，玩家可以将一张或两张地区卡放在自己前面，并且要支付所需的建筑费用（将支付的金币交回银行）。玩家也可以选择不建设。除特殊角色/技能外，玩家的城市里不能有两个相同的地区。</li>
          <li>角色技能：玩家可以在自己行动的回合内任意时候使用一次角色技能，也可以不使用。</li>
        </ul>
        <b>胜利条件：</b><br>
        一局定胜负。一个回合后，游戏结束，每个玩家按自己已经建立了的地区和手中剩余的金币相加计算总得分，每个地区的分数等于它的建筑费用，拿到最多分数的玩家就是胜利者。第一名将获得国王的王冠（没有实际作用，但好歹是个荣誉）。
      </div>
      <button class="main-btn" style="margin:18px auto 0 auto;display:block;" onclick="this.parentNode.parentNode.remove();window._onFirstRoundRulesClose && window._onFirstRoundRulesClose();">我已知晓，开始第一回合</button>
    </div>
  `;
  document.body.appendChild(popup);
  window._onFirstRoundRulesClose = onClose;
  playSound('cover'); // 规则音效
}

function startFirstRound() {
  showFirstRoundRules(() => {
    startAssassinTurn();
  });
}

function startAssassinTurn() {
  // 1. 弹窗显示刺客信息面板
  showAssassinPanel();
}


function showAssassinPanel() {
  cardArea.innerHTML = '';
  playerInfo.textContent = '';
  playerInfo.style.display = 'none';
  coinInfo.style.display = 'none';
  // 假设刺客是虚拟玩家
  const assassin = players.find(p => p.roleKey === 'assassin');
  if (assassin.hand.length === 0) assassin.hand = generateDistrictDeck().slice(0, 4);
  if (assassin.coins === 0) assassin.coins = 4;

  // 刺客信息弹窗
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';

  // 刺客面板内容
  let html = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:380px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:8px;">
        <img class="player-role-img" src="assets/roles/assassin.jpg" alt="刺客" style="height:60px;width:60px;">
        <span style="font-weight:bold;font-size:1.2rem;color:#ffe6b3;">${assassin.name}（刺客）</span>
        <button class="skill-btn" title="查看技能" style="margin-left:6px;width:28px;height:28px;font-size:1.2rem;border-radius:50%;background:#ffe6b3;color:#3b2c23;border:none;cursor:pointer;" onclick="showSkillPopup('assassin')">？</button>
      </div>
      <div style="margin-bottom:6px;">
        <img src="assets/others/coin.jpg" style="width:22px;vertical-align:middle;"> <span style="color:#ffe6b3;">x${assassin.coins}</span>
      </div>
      <div style="margin-bottom:6px;cursor:pointer;" title="点击查看手牌" id="assassin-hand-area">
        <img src="assets/others/card_back.jpg" style="width:28px;height:40px;vertical-align:middle;border-radius:4px;box-shadow:0 1px 4px #0006;">
        <span style="color:#ffe6b3;">×${assassin.hand.length}</span>
      </div>
      <div style="margin-bottom:10px;">
        <span style="color:#aaa;font-size:0.95rem;">（暂无已建造地区）</span>
      </div>
      <button class="main-btn" id="assassin-skill-btn" style="margin-top:10px;">刺客选择发动技能</button>
    </div>
  `;
  popup.innerHTML = html;
  document.body.appendChild(popup);

  setTimeout(() => {
  const handArea = document.getElementById('assassin-hand-area');
  if (handArea) {
    handArea.onclick = () => {
      // 弹出不能查看他人卡牌的提示
      const tip = document.createElement('div');
      tip.style.position = 'fixed';
      tip.style.left = '0'; tip.style.top = '0'; tip.style.right = '0'; tip.style.bottom = '0';
      tip.style.background = 'rgba(0,0,0,0.85)';
      tip.style.zIndex = '6000';
      tip.style.display = 'flex';
      tip.style.alignItems = 'center';
      tip.style.justifyContent = 'center';
      tip.innerHTML = `
        <div style="background:#2d1c13;padding:18px 16px 12px 16px;border-radius:12px;max-width:320px;box-shadow:0 2px 16px #000a;text-align:center;">
          <div style="color:#ffe6b3;font-size:1.1rem;margin-bottom:12px;">没有特殊技能的您不能查看他人卡牌哦~</div>
          <button class="main-btn" onclick="this.parentNode.parentNode.remove()">关闭</button>
        </div>
      `;
      document.body.appendChild(tip);
      playSound('notification');
    };
  }
}, 0);

  // 刺客技能按钮
  document.getElementById('assassin-skill-btn').onclick = () => {
    playSound('magic');
    // 全屏渐变黑色+刺客卡渐显
    popup.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
        <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">刺客发动技能</div>
        <img src="assets/roles/assassin.jpg" style="width:120px;height:180px;border-radius:14px;box-shadow:0 2px 16px #000a;margin-bottom:18px;">
        <button class="main-btn" id="assassin-kill-btn">刺客选择刺杀商人</button>
      </div>
    `;
    document.getElementById('assassin-kill-btn').onclick = () => {
      playSound('magic');
      popup.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
          <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">刺客技能使用完毕</div>
          <button class="main-btn" id="assassin-get-coin-btn">刺客选择拿取4枚金币</button>
        </div>
      `;
      document.getElementById('assassin-get-coin-btn').onclick = () => {
        playSound('coin');
        // 金币动画（可简化为数字+音效）
        assassin.coins += 4;
        popup.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
            <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">刺客获得4枚金币，现在有${assassin.coins}枚金币</div>
            <button class="main-btn" id="assassin-build-btn">刺客开始建造地区</button>
          </div>
        `;
        document.getElementById('assassin-build-btn').onclick = () => {
          // 随机建造1~2个地区，总花费≤刺客当前金币
          let total = 0, built = [];
          for (let i = 0; i < assassin.hand.length; i++) {
            if (built.length < 2 && total + assassin.hand[i].score <= assassin.coins) {
              built.push(assassin.hand[i]);
              total += assassin.hand[i].score;
            }
          }
          assassin.built = built;
          assassin.coins -= total; // 建造后扣除金币
          popup.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
              <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">
                刺客建造了${built.length}个地区，总花费${total}金币，剩余${assassin.coins}金币
              </div>
              <div style="display:flex;gap:10px;margin-bottom:12px;">
                ${built.map(card => `<div style="display:flex;flex-direction:column;align-items:center;">
                  <img src="${card.img}" style="width:60px;height:90px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
                  <span style="color:#ffe6b3;font-size:0.95rem;">${districtNameMap[card.name] || card.name}</span>
                </div>`).join('')}
              </div>
              <button class="main-btn" id="assassin-end-btn">刺客行动结束</button>
            </div>
          `;
          playSound('construct');
          document.getElementById('assassin-end-btn').onclick = () => {
            popup.remove();
            // 这里可以进入下一个角色流程
            startThiefTurn();// 让流程进入盗贼
          };
        };
      };
    };
  };
}

function startThiefTurn() {
  showThiefPanel();
}

function showThiefPanel() {
  playSound('magic');
  cardArea.innerHTML = '';
  playerInfo.textContent = '';
  playerInfo.style.display = 'none';
  coinInfo.style.display = 'none';
  // 盗贼玩家对象
  const thief = players.find(p => p.roleKey === 'thief');
  if (thief.hand.length === 0) thief.hand = generateDistrictDeck().slice(0, 4);
  if (thief.coins === 0) thief.coins = 4;

  // 盗贼面板内容
  let html = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:380px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:8px;">
        <img class="player-role-img" src="assets/roles/thief.jpg" alt="盗贼" style="height:60px;width:60px;">
        <span style="font-weight:bold;font-size:1.2rem;color:#ffe6b3;">牛斐（盗贼）</span>
        <button class="skill-btn" title="查看技能" style="margin-left:6px;width:28px;height:28px;font-size:1.2rem;border-radius:50%;background:#ffe6b3;color:#3b2c23;border:none;cursor:pointer;" onclick="showSkillPopup('thief')">？</button>
      </div>
      <div style="margin-bottom:6px;">
        <img src="assets/others/coin.jpg" style="width:22px;vertical-align:middle;"> <span style="margin-left:2px;">×${thief.coins}</span>
      </div>
      <div style="margin-bottom:6px;cursor:pointer;" title="点击查看手牌" id="thief-hand-area">
        <img src="assets/others/card_back.jpg" style="width:28px;height:40px;vertical-align:middle;border-radius:4px;box-shadow:0 1px 4px #0006;">
        <span style="color:#ffe6b3;">×${thief.hand.length}</span>
      </div>
      <div style="margin-bottom:10px;">
        <span style="color:#aaa;font-size:0.95rem;">（暂无已建造地区）</span>
      </div>
      <button class="main-btn" id="thief-skill-btn" style="margin-top:10px;">盗贼选择发动技能</button>
    </div>
  `;

  // 弹窗
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = html;
  document.body.appendChild(popup);

  // 禁止查看盗贼手牌
  setTimeout(() => {
    const handArea = document.getElementById('thief-hand-area');
    if (handArea) {
      handArea.onclick = () => {
        const tip = document.createElement('div');
        tip.style.position = 'fixed';
        tip.style.left = '0'; tip.style.top = '0'; tip.style.right = '0'; tip.style.bottom = '0';
        tip.style.background = 'rgba(0,0,0,0.85)';
        tip.style.zIndex = '6000';
        tip.style.display = 'flex';
        tip.style.alignItems = 'center';
        tip.style.justifyContent = 'center';
        tip.innerHTML = `
          <div style="background:#2d1c13;padding:18px 16px 12px 16px;border-radius:12px;max-width:320px;box-shadow:0 2px 16px #000a;text-align:center;">
            <div style="color:#ffe6b3;font-size:1.1rem;margin-bottom:12px;">没有特殊技能的您不能查看他人卡牌哦~</div>
            <button class="main-btn" onclick="this.parentNode.parentNode.remove()">关闭</button>
          </div>
        `;
        document.body.appendChild(tip);
        playSound('notification');
      };
    }
  }, 0);

  // 技能按钮
  document.getElementById('thief-skill-btn').onclick = () => {
    playSound('magic');
    // 技能发动界面
    popup.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
        <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">盗贼选择盗取国王的所有金币</div>
        <img src="assets/roles/thief.jpg" style="width:120px;height:180px;border-radius:14px;box-shadow:0 2px 16px #000a;margin-bottom:18px;">
        <button class="main-btn" id="thief-steal-btn">确定盗取</button>
      </div>
    `;
    document.getElementById('thief-steal-btn').onclick = () => {
      playSound('magic');
      // 动画：国王金币高亮+金币飞向盗贼
      highlightAndTransferCoinsFromKingToThief(thief, () => {
        // 技能发动完毕
        popup.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
            <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">盗贼已成功盗取国王的金币</div>
            <button class="main-btn" id="thief-bless-btn">盗贼：“来都来了！”</button>
          </div>
        `;
        document.getElementById('thief-bless-btn').onclick = () => {
          showThiefBlessingVideo(() => {
            // 祝福视频关闭后，进入拿金币
            popup.innerHTML = `
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
                <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">盗贼在本回合选择拿取金币</div>
                <button class="main-btn" id="thief-get-coin-btn">盗贼拿取4枚金币</button>
              </div>
            `;
            document.getElementById('thief-get-coin-btn').onclick = () => {
              playSound('coin');
              thief.coins += 4;
              popup.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
                  <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">盗贼获得4枚金币，现在有${thief.coins}枚金币</div>
                  <button class="main-btn" id="thief-build-btn">盗贼开始建造地区</button>
                </div>
              `;
              document.getElementById('thief-build-btn').onclick = () => {
                // 自动建造1~2个地区，总花费不超过盗贼当前金币
                let total = 0, built = [];
                for (let i = 0; i < thief.hand.length; i++) {
                  if (built.length < 2 && total + thief.hand[i].score <= thief.coins) {
                    built.push(thief.hand[i]);
                    total += thief.hand[i].score;
                  }
                }
                thief.built = built;
                thief.coins -= total;
                // 建造动画
                popup.innerHTML = `
                  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
                    <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">盗贼建造了${built.length}个地区，总花费${total}金币，剩余${thief.coins}金币
                    </div>
                    <div style="display:flex;gap:10px;margin-bottom:12px;">
                      ${built.map(card => `<div style="display:flex;flex-direction:column;align-items:center;animation:fadeInCard 0.7s;">
                        <img src="${card.img}" style="width:60px;height:90px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
                        <span style="color:#ffe6b3;font-size:0.95rem;">${districtNameMap[card.name] || card.name}</span>
                      </div>`).join('')}
                    </div>
                    <div style="color:#ffe6b3;font-size:1.1rem;margin-bottom:10px;">剩余金币：${thief.coins}</div>
                    <button class="main-btn" id="thief-end-btn">盗贼行动结束</button>
                  </div>
                `;
                playSound('construct');
                document.getElementById('thief-end-btn').onclick = () => {
                  popup.remove();
                  // 进入下一个角色流程
                  startMagicianTurn();
                };
              };
            };
          });
        };
      });
    };
  };
}

function showThiefBlessingVideo(onClose) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.95)';
  popup.style.zIndex = '5000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:10px 10px 10px 10px;border-radius:14px;max-width:98vw;max-height:98vh;box-shadow:0 2px 16px #000a;text-align:center;display:flex;flex-direction:column;align-items:center;">
      <video id="thief-bless-video" src="assets/videos/thief.mp4" style="width:100vw;max-width:420px;height:70vh;border-radius:10px;background:#000;" controls poster="" preload="auto"></video>
      <div style="margin-top:10px;display:flex;gap:16px;justify-content:center;">
        <button id="thief-bless-play" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">▶</button>
        <button id="thief-bless-close" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  playSound('notification');
  const video = document.getElementById('thief-bless-video');
  document.getElementById('thief-bless-play').onclick = () => {
    video.currentTime = 0;
    video.play();
  };
  document.getElementById('thief-bless-close').onclick = () => {
    popup.remove();
    if (onClose) onClose();
  };
  video.onended = () => {
    // 播放完毕后出现“再次播放”和“关闭”按钮
    popup.querySelector('div[style*="margin-top:10px"]').innerHTML = `
      <button id="thief-bless-replay" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">⟳ 再次播放</button>
      <button id="thief-bless-close2" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖ 关闭</button>
    `;
    document.getElementById('thief-bless-replay').onclick = () => {
      video.currentTime = 0;
      video.play();
    };
    document.getElementById('thief-bless-close2').onclick = () => {
      popup.remove();
      if (onClose) onClose();
    };
  };
}

function highlightAndTransferCoinsFromKingToThief(thief, callback) {
  // 假设国王是 players[0]
  const king = players[0];
  const kingCoins = king.coins;
  if (kingCoins === 0) {
    if (callback) setTimeout(callback, 800);
    return;
  }
  // 高亮国王金币
  const kingPanel = document.querySelectorAll('.player-block')[0];
  const kingCoinDiv = kingPanel ? kingPanel.querySelector('.player-coins') : null;
  if (kingCoinDiv) {
    kingCoinDiv.style.transition = 'box-shadow 0.3s, border 0.3s';
    kingCoinDiv.style.boxShadow = '0 0 12px 4px #ffe6b3';
    kingCoinDiv.style.border = '2px solid #ffe6b3';
  }
  // 动画金币飞向盗贼（这里只做简单延时模拟）
  setTimeout(() => {
    if (kingCoinDiv) {
      kingCoinDiv.style.boxShadow = '';
      kingCoinDiv.style.border = '';
    }
    // 更新金币数
    king.coins = 0;
    thief.coins += kingCoins;
    renderPlayerPanel(currentPlayerIdx); // 刷新面板
    if (callback) setTimeout(callback, 600);
  }, 1200);
}

function startMagicianTurn() {
  showMagicianPanel();
}

function showMagicianPanel() {
  playSound('magic');
  cardArea.innerHTML = '';
  playerInfo.textContent = '';
  playerInfo.style.display = 'none';
  coinInfo.style.display = 'none';
  // 魔法师虚拟玩家对象
  const magician = players.find(p => p.roleKey === 'magician');
  if (magician.hand.length === 0) magician.hand = generateDistrictDeck().slice(0, 4);
  if (magician.coins === 0) magician.coins = 4;

  // 国王对象
  const king = players[0];

  // 魔法师信息弹窗
  let html = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:380px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:8px;">
        <img class="player-role-img" src="assets/roles/magician.jpg" alt="魔法师" style="height:60px;width:60px;">
        <span style="font-weight:bold;font-size:1.2rem;color:#ffe6b3;">施佳颖（魔法师）</span>
        <button class="skill-btn" title="查看技能" style="margin-left:6px;width:28px;height:28px;font-size:1.2rem;border-radius:50%;background:#ffe6b3;color:#3b2c23;border:none;cursor:pointer;" onclick="showSkillPopup('magician')">？</button>
      </div>
      <div style="margin-bottom:6px;">
        <img src="assets/others/coin.jpg" style="width:22px;vertical-align:middle;"> <span style="margin-left:2px;">×${magician.coins}</span>
      </div>
      <div style="margin-bottom:6px;cursor:pointer;" title="点击查看手牌" id="magician-hand-area">
        <img src="assets/others/card_back.jpg" style="width:28px;height:40px;vertical-align:middle;border-radius:4px;box-shadow:0 1px 4px #0006;">
        <span style="color:#ffe6b3;">×${magician.hand.length}</span>
      </div>
      <div style="margin-bottom:10px;">
        <span style="color:#aaa;font-size:0.95rem;">（暂无已建造地区）</span>
      </div>
      <button class="main-btn" id="magician-skill-btn" style="margin-top:10px;">魔法师选择与国王交换手牌</button>
    </div>
  `;

  // 弹窗
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = html;
  document.body.appendChild(popup);

  // 禁止查看魔法师手牌
  setTimeout(() => {
    const handArea = document.getElementById('magician-hand-area');
    if (handArea) {
      handArea.onclick = () => {
        const tip = document.createElement('div');
        tip.style.position = 'fixed';
        tip.style.left = '0'; tip.style.top = '0'; tip.style.right = '0'; tip.style.bottom = '0';
        tip.style.background = 'rgba(0,0,0,0.85)';
        tip.style.zIndex = '6000';
        tip.style.display = 'flex';
        tip.style.alignItems = 'center';
        tip.style.justifyContent = 'center';
        tip.innerHTML = `
          <div style="background:#2d1c13;padding:18px 16px 12px 16px;border-radius:12px;max-width:320px;box-shadow:0 2px 16px #000a;text-align:center;">
            <div style="color:#ffe6b3;font-size:1.1rem;margin-bottom:12px;">没有特殊技能的您不能查看他人卡牌哦~</div>
            <button class="main-btn" onclick="this.parentNode.parentNode.remove()">关闭</button>
          </div>
        `;
        document.body.appendChild(tip);
        playSound('notification');
      };
    }
  }, 0);

  // 技能按钮
  document.getElementById('magician-skill-btn').onclick = () => {
    playSound('magic');
    // 展示双方手牌
    popup.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
        <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">魔法师与国王交换所有手牌</div>
        <div style="width:100vw;max-width:420px;">
          <div style="color:#ffe6b3;font-weight:bold;margin-bottom:6px;text-align:center;">魔法师原手牌</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:12px;">
            ${magician.hand.map(card => `
              <div style="display:flex;flex-direction:column;align-items:center;">
                <img src="${card.img}" style="width:70px;height:100px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
                <span style="color:#ffe6b3;font-size:0.95rem;margin-top:2px;">${districtNameMap[card.name] || card.name}</span>
                <span style="color:#ffe6b3;font-size:0.9rem;">${card.score}金币</span>
              </div>
            `).join('')}
          </div>
          <div style="color:#ffe6b3;font-weight:bold;margin-bottom:6px;text-align:center;">国王原手牌</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:12px;">
            ${king.hand.map(card => `
              <div style="display:flex;flex-direction:column;align-items:center;">
                <img src="${card.img}" style="width:70px;height:100px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
                <span style="color:#ffe6b3;font-size:0.95rem;margin-top:2px;">${districtNameMap[card.name] || card.name}</span>
                <span style="color:#ffe6b3;font-size:0.9rem;">${card.score}金币</span>
              </div>
            `).join('')}
          </div>
        </div>
        <button class="main-btn" id="magician-exchange-btn">确定交换</button>
      </div>
    `;
    document.getElementById('magician-exchange-btn').onclick = () => {
      playSound('magic');
      // 交换手牌
      const temp = magician.hand;
      magician.hand = king.hand;
      king.hand = temp;
      renderPlayerPanel(currentPlayerIdx); // 刷新面板
      // 提示
      popup.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
          <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">魔法师与国王交换了所有手牌</div>
          <button class="main-btn" id="magician-bless-btn">魔法师：“这次交换是双赢吗？”</button>
        </div>
      `;
      document.getElementById('magician-bless-btn').onclick = () => {
        showMagicianBlessingVideo(() => {
          // 祝福视频关闭后，进入拿金币
          popup.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
              <button class="main-btn" id="magician-get-coin-btn">魔法师选择拿取4枚金币</button>
            </div>
          `;
          document.getElementById('magician-get-coin-btn').onclick = () => {
            playSound('coin');
            magician.coins += 4;
            popup.innerHTML = `
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
                <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">魔法师获得4枚金币，现在有${magician.coins}枚金币</div>
                <button class="main-btn" id="magician-build-btn">魔法师开始建造地区</button>
              </div>
            `;
            document.getElementById('magician-build-btn').onclick = () => {
              // 自动建造1~2个地区，总花费不超过魔法师当前金币
              let total = 0, built = [];
              for (let i = 0; i < magician.hand.length; i++) {
                if (built.length < 2 && total + magician.hand[i].score <= magician.coins) {
                  built.push(magician.hand[i]);
                  total += magician.hand[i].score;
                }
              }
              magician.built = built;
              magician.coins -= total;
              // 建造动画
              popup.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
                  <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">
                    魔法师建造了${built.length}个地区，总花费${total}金币，剩余${magician.coins}金币
                  </div>
                  <div style="display:flex;gap:10px;margin-bottom:12px;">
                    ${built.map(card => `<div style="display:flex;flex-direction:column;align-items:center;animation:fadeInCard 0.7s;">
                      <img src="${card.img}" style="width:60px;height:90px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
                      <span style="color:#ffe6b3;font-size:0.95rem;">${districtNameMap[card.name] || card.name}</span>
                    </div>`).join('')}
                  </div>
                  <button class="main-btn" id="magician-end-btn">魔法师行动结束</button>
                </div>
              `;
              playSound('construct');
              document.getElementById('magician-end-btn').onclick = () => {
                popup.remove();
                // 进入下一个角色流程
                startKingTurn();
              };
            };
          };
        });
      };
    };
  };
}

function showMagicianBlessingVideo(onClose) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.95)';
  popup.style.zIndex = '5000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:10px 10px 10px 10px;border-radius:14px;max-width:98vw;max-height:98vh;box-shadow:0 2px 16px #000a;text-align:center;display:flex;flex-direction:column;align-items:center;">
      <video id="magician-bless-video" src="assets/videos/magician.mp4" style="width:100vw;max-width:420px;height:70vh;border-radius:10px;background:#000;" controls poster="" preload="auto"></video>
      <div style="margin-top:10px;display:flex;gap:16px;justify-content:center;">
        <button id="magician-bless-play" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">▶</button>
        <button id="magician-bless-close" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  playSound('notification');
  const video = document.getElementById('magician-bless-video');
  document.getElementById('magician-bless-play').onclick = () => {
    video.currentTime = 0;
    video.play();
  };
  document.getElementById('magician-bless-close').onclick = () => {
    popup.remove();
    if (onClose) onClose();
  };
  video.onended = () => {
    // 播放完毕后出现“再次播放”和“关闭”按钮
    popup.querySelector('div[style*="margin-top:10px"]').innerHTML = `
      <button id="magician-bless-replay" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">⟳ 再次播放</button>
      <button id="magician-bless-close2" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖ 关闭</button>
    `;
    document.getElementById('magician-bless-replay').onclick = () => {
      video.currentTime = 0;
      video.play();
    };
    document.getElementById('magician-bless-close2').onclick = () => {
      popup.remove();
      if (onClose) onClose();
    };
  };
}

function startKingTurn() {
  showKingPanel();
}

function showKingPanel() {
  cardArea.innerHTML = '';
  playerInfo.textContent = '';
  playerInfo.style.display = 'none';
  coinInfo.style.display = 'none';
  const king = players[0];
  // 1. 皇冠飞入动画
  animateCrownToKing(() => {
    // 2. 拿金币
    showKingGetCoins(king);
  });
}

function animateCrownToKing(callback) {
  // 动画皇冠飞到国王头像旁
  const kingPanel = document.querySelectorAll('.player-block')[0];
  const header = kingPanel ? kingPanel.querySelector('.player-header') : null;
  if (!header) { if (callback) callback(); return; }

  // 创建皇冠图片
  const crown = document.createElement('img');
  crown.src = 'assets/others/crown.jpg';
  crown.style.position = 'fixed';
  crown.style.left = '50vw';
  crown.style.top = '10vh';
  crown.style.width = '48px';
  crown.style.height = '48px';
  crown.style.zIndex = '9999';
  crown.style.transition = 'all 0.8s cubic-bezier(.4,2,.6,1)';
  document.body.appendChild(crown);

  // 计算目标位置
  const rect = header.getBoundingClientRect();
  const targetLeft = rect.left + 10;
  const targetTop = rect.top - 30;

  setTimeout(() => {
    crown.style.left = `${targetLeft}px`;
    crown.style.top = `${targetTop}px`;
    crown.style.transform = 'scale(1.1) rotate(-10deg)';
  }, 80);

  setTimeout(() => {
    // 动画结束后，把皇冠插入到国王头像旁
    document.body.removeChild(crown);
    if (!header.querySelector('.crown-img')) {
      const crownImg = document.createElement('img');
      crownImg.src = 'assets/others/crown.jpg';
      crownImg.className = 'crown-img';
      crownImg.style.width = '32px';
      crownImg.style.height = '32px';
      crownImg.style.marginLeft = '2px';
      crownImg.style.verticalAlign = 'middle';
      header.appendChild(crownImg);
    }
    playSound('success');
    if (callback) callback();
  }, 1000);
}

function showKingGetCoins(king) {
  // 弹窗提示
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.7)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:340px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="font-size:1.2rem;color:#ffe6b3;margin-bottom:18px;">国王选择拿取4枚金币</div>
      <button class="main-btn" id="king-get-coin-btn">拿金币</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById('king-get-coin-btn').onclick = () => {
    playSound('coin');
    king.coins += 4;
    renderPlayerPanel(0);
    popup.remove();
    showKingBuild(king);
  };
}

function showKingBuild(king) {
  // 自动建造1~2个地区，总花费不超过当前金币
  let total = 0, built = [];
  for (let i = 0; i < king.hand.length; i++) {
    if (built.length < 2 && total + king.hand[i].score <= king.coins) {
      built.push(king.hand[i]);
      total += king.hand[i].score;
    }
  }
  king.built = built;
  king.coins -= total;

  // 弹窗提示建造结果+角色图
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.7)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:380px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:12px;">国王发动技能</div>
      <img src="assets/roles/king.jpg" style="width:120px;height:180px;border-radius:14px;box-shadow:0 2px 16px #000a;margin-bottom:18px;">
      <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">
        国王建造了${built.length}个地区，总花费${total}金币，剩余${king.coins}金币
      </div>
      <div style="display:flex;gap:10px;margin-bottom:12px;justify-content:center;">
        ${built.map(card => `<div style="display:flex;flex-direction:column;align-items:center;animation:fadeInCard 0.7s;">
          <img src="${card.img}" style="width:60px;height:90px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
          <span style="color:#ffe6b3;font-size:0.95rem;">${districtNameMap[card.name] || card.name}</span>
        </div>`).join('')}
      </div>
      <button class="main-btn" id="king-bonus-btn">结算贵族奖励</button>
    </div>
  `;
  playSound('magic');
  document.body.appendChild(popup);
  playSound('construct');

  document.getElementById('king-bonus-btn').onclick = () => {
    popup.remove();
    showKingNobleBonus(king);
  };
}

function showKingNobleBonus(king) {
  // 统计黄色（贵族）地区数量
  const nobleCount = king.built.filter(card => card.color === 'yellow').length;
  let bonus = nobleCount;
  king.coins += bonus;

  // 弹窗提示
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.7)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:340px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">
        国王已建造${nobleCount}个贵族地区（金色），获得${bonus}枚金币奖励
      </div>
      <button class="main-btn" id="king-end-btn">国王回合结束</button>
    </div>
  `;
  document.body.appendChild(popup);
  playSound('coin');

  document.getElementById('king-end-btn').onclick = () => {
    popup.remove();
    renderPlayerPanel(0);
    // 进入下一个角色流程
    startBishopTurn();
  };
}

function startBishopTurn() {
  // TODO: 这里进入主教流程
  // showBishopPanel();
}

function startBishopTurn() {
  showBishopPanel();
}

function showBishopPanel() {
  playSound('magic');
  cardArea.innerHTML = '';
  playerInfo.textContent = '';
  playerInfo.style.display = 'none';
  coinInfo.style.display = 'none';

  // 主教虚拟玩家对象
  const bishop = players.find(p => p.roleKey === 'bishop');
  if (bishop.hand.length === 0) bishop.hand = generateDistrictDeck().slice(0, 4);
  if (bishop.coins === 0) bishop.coins = 4;

  // 主教信息弹窗
  let html = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:380px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:8px;">
        <img class="player-role-img" src="assets/roles/bishop.jpg" alt="主教" style="height:60px;width:60px;">
        <span style="font-weight:bold;font-size:1.2rem;color:#ffe6b3;">宋卓宣（主教）</span>
        <button class="skill-btn" title="查看技能" style="margin-left:6px;width:28px;height:28px;font-size:1.2rem;border-radius:50%;background:#ffe6b3;color:#3b2c23;border:none;cursor:pointer;" onclick="showSkillPopup('bishop')">？</button>
      </div>
      <div style="margin-bottom:6px;">
        <img src="assets/others/coin.jpg" style="width:22px;vertical-align:middle;"> <span style="color:#ffe6b3;">×${bishop.coins}</span>
      </div>
      <div style="margin-bottom:6px;cursor:pointer;" title="点击查看手牌" id="bishop-hand-area">
        <img src="assets/others/card_back.jpg" style="width:28px;height:40px;vertical-align:middle;border-radius:4px;box-shadow:0 1px 4px #0006;">
        <span style="color:#ffe6b3;">×${bishop.hand.length}</span>
      </div>
      <div style="margin-bottom:10px;">
        <span style="color:#aaa;font-size:0.95rem;">（暂无已建造地区）</span>
      </div>
      <button class="main-btn" id="bishop-get-coin-btn" style="margin-top:10px;">主教选择拿取4枚金币</button>
    </div>
  `;

  // 弹窗
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = html;
  document.body.appendChild(popup);


  // 禁止查看主教手牌
  setTimeout(() => {
    const handArea = document.getElementById('bishop-hand-area');
    if (handArea) {
      handArea.onclick = () => {
        const tip = document.createElement('div');
        tip.style.position = 'fixed';
        tip.style.left = '0'; tip.style.top = '0'; tip.style.right = '0'; tip.style.bottom = '0';
        tip.style.background = 'rgba(0,0,0,0.85)';
        tip.style.zIndex = '6000';
        tip.style.display = 'flex';
        tip.style.alignItems = 'center';
        tip.style.justifyContent = 'center';
        tip.innerHTML = `
          <div style="background:#2d1c13;padding:18px 16px 12px 16px;border-radius:12px;max-width:320px;box-shadow:0 2px 16px #000a;text-align:center;">
            <div style="color:#ffe6b3;font-size:1.1rem;margin-bottom:12px;">没有特殊技能的您不能查看他人卡牌哦~</div>
            <button class="main-btn" onclick="this.parentNode.parentNode.remove()">关闭</button>
          </div>
        `;
        document.body.appendChild(tip);
        playSound('notification');
      };
    }
  }, 0);

  // 拿金币按钮
  document.getElementById('bishop-get-coin-btn').onclick = () => {
    playSound('coin');
    bishop.coins += 4;
    popup.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
        <button class="main-btn" id="bishop-bless-btn">主教：“以主教之名——”</button>
      </div>
    `;
    document.getElementById('bishop-bless-btn').onclick = () => {
      showBishopBlessingVideo(() => {
        // 祝福视频关闭后，主教建造
        popup.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
            <button class="main-btn" id="bishop-build-btn">主教开始建造地区</button>
          </div>
        `;
        document.getElementById('bishop-build-btn').onclick = () => {
          // 自动建造1~2个地区，总花费不超过当前金币
          let total = 0, built = [];
          for (let i = 0; i < bishop.hand.length; i++) {
            if (built.length < 2 && total + bishop.hand[i].score <= bishop.coins) {
              built.push(bishop.hand[i]);
              total += bishop.hand[i].score;
            }
          }
          bishop.built = built;
          bishop.coins -= total;
          popup.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
              <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:12px;">主教发动技能</div>
              <img src="assets/roles/bishop.jpg" style="width:120px;height:180px;border-radius:14px;box-shadow:0 2px 16px #000a;margin-bottom:18px;">
              <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">
                主教建造了${built.length}个地区，总花费${total}金币，剩余${bishop.coins}金币
              </div>
              <div style="display:flex;gap:10px;margin-bottom:12px;">
                ${built.map(card => `<div style="display:flex;flex-direction:column;align-items:center;animation:fadeInCard 0.7s;">
                  <img src="${card.img}" style="width:60px;height:90px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
                  <span style="color:#ffe6b3;font-size:0.95rem;">${districtNameMap[card.name] || card.name}</span>
                </div>`).join('')}
              </div>
              <button class="main-btn" id="bishop-bonus-btn">结算宗教奖励</button>
            </div>
          `;
          playSound('magic');
          playSound('construct');
          document.getElementById('bishop-bonus-btn').onclick = () => {
            // 结算蓝色奖励
            const blueCount = bishop.built.filter(card => card.color === 'blue').length;
            let bonus = blueCount;
            bishop.coins += bonus;
            popup.innerHTML = `
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
                <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">
                  主教已建造${blueCount}个宗教地区（蓝色），获得${bonus}枚金币奖励
                </div>
                <button class="main-btn" id="bishop-end-btn">主教行动结束</button>
              </div>
            `;
            playSound('coin');
            document.getElementById('bishop-end-btn').onclick = () => {
              popup.remove();
              // 进入下一个角色流程
              startMerchantTurn();
            };
          };
        };
      });
    };
  };
}

function showBishopBlessingVideo(onClose) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.95)';
  popup.style.zIndex = '5000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:10px 10px 10px 10px;border-radius:14px;max-width:98vw;max-height:98vh;box-shadow:0 2px 16px #000a;text-align:center;display:flex;flex-direction:column;align-items:center;">
      <video id="bishop-bless-video" src="assets/videos/bishop.mp4" style="width:100vw;max-width:420px;height:70vh;border-radius:10px;background:#000;" controls poster="" preload="auto"></video>
      <div style="margin-top:10px;display:flex;gap:16px;justify-content:center;">
        <button id="bishop-bless-play" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">▶</button>
        <button id="bishop-bless-close" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  playSound('notification');
  const video = document.getElementById('bishop-bless-video');
  document.getElementById('bishop-bless-play').onclick = () => {
    video.currentTime = 0;
    video.play();
  };
  document.getElementById('bishop-bless-close').onclick = () => {
    popup.remove();
    if (onClose) onClose();
  };
  video.onended = () => {
    // 播放完毕后出现“再次播放”和“关闭”按钮
    popup.querySelector('div[style*="margin-top:10px"]').innerHTML = `
      <button id="bishop-bless-replay" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">⟳ 再次播放</button>
      <button id="bishop-bless-close2" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖ 关闭</button>
    `;
    document.getElementById('bishop-bless-replay').onclick = () => {
      video.currentTime = 0;
      video.play();
    };
    document.getElementById('bishop-bless-close2').onclick = () => {
      popup.remove();
      if (onClose) onClose();
    };
  };
}

function startMerchantTurn() {
  // TODO: 这里进入商人流程
  // showMerchantPanel();
}

function startMerchantTurn() {
  showMerchantPanel();
}

function showMerchantPanel() {
  playSound('notification'); // 进入商人回合音效
  cardArea.innerHTML = '';
  playerInfo.textContent = '';
  playerInfo.style.display = 'none';
  coinInfo.style.display = 'none';

  // 商人虚拟玩家对象
  const merchant = players.find(p => p.roleKey === 'merchant');
  if (merchant.hand.length === 0) merchant.hand = generateDistrictDeck().slice(0, 4);
  if (merchant.coins === 0) merchant.coins = 4;

  // 商人信息弹窗
  let html = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:380px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:8px;">
        <img class="player-role-img" src="assets/roles/merchant.jpg" alt="商人" style="height:60px;width:60px;">
        <span style="font-weight:bold;font-size:1.2rem;color:#ffe6b3;">CursorAI（商人）</span>
        <button class="skill-btn" title="查看技能" style="margin-left:6px;width:28px;height:28px;font-size:1.2rem;border-radius:50%;background:#ffe6b3;color:#3b2c23;border:none;cursor:pointer;" onclick="showSkillPopup('merchant')">？</button>
      </div>
      <div style="margin-bottom:6px;">
        <img src="assets/others/coin.jpg" style="width:22px;vertical-align:middle;"> <span style="color:#ffe6b3;">×${merchant.coins}</span>
      </div>
      <div style="margin-bottom:6px;cursor:pointer;" title="点击查看手牌" id="merchant-hand-area">
        <img src="assets/others/card_back.jpg" style="width:28px;height:40px;vertical-align:middle;border-radius:4px;box-shadow:0 1px 4px #0006;">
        <span style="color:#ffe6b3;">×${merchant.hand.length}</span>
      </div>
      <div style="margin-bottom:10px;">
        <span style="color:#aaa;font-size:0.95rem;">（暂无已建造地区）</span>
      </div>
      <div style="color:#ffb347;font-size:1.15rem;font-weight:bold;margin:18px 0 12px 0;">
        本轮商人已被刺杀，不能行动
      </div>
      <button class="main-btn" id="merchant-end-btn" style="margin-top:10px;">商人行动结束</button>
    </div>
  `;

  // 弹窗
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = html;
  document.body.appendChild(popup);

  // 禁止查看商人手牌
  setTimeout(() => {
    const handArea = document.getElementById('merchant-hand-area');
    if (handArea) {
      handArea.onclick = () => {
        const tip = document.createElement('div');
        tip.style.position = 'fixed';
        tip.style.left = '0'; tip.style.top = '0'; tip.style.right = '0'; tip.style.bottom = '0';
        tip.style.background = 'rgba(0,0,0,0.85)';
        tip.style.zIndex = '6000';
        tip.style.display = 'flex';
        tip.style.alignItems = 'center';
        tip.style.justifyContent = 'center';
        tip.innerHTML = `
          <div style="background:#2d1c13;padding:18px 16px 12px 16px;border-radius:12px;max-width:320px;box-shadow:0 2px 16px #000a;text-align:center;">
            <div style="color:#ffe6b3;font-size:1.1rem;margin-bottom:12px;">没有特殊技能的您不能查看他人卡牌哦~</div>
            <button class="main-btn" onclick="this.parentNode.parentNode.remove()">关闭</button>
          </div>
        `;
        document.body.appendChild(tip);
        playSound('notification');
      };
    }
  }, 0);

  // 被刺杀提示音效
  setTimeout(() => {
    playSound('magic');
  }, 400);

  // 行动结束按钮
  document.getElementById('merchant-end-btn').onclick = () => {
    popup.remove();
    // 进入下一个角色流程
    startArchitectTurn();
  };
}

function startArchitectTurn() {
  // TODO: 这里进入建筑师流程
  // showArchitectPanel();
}

function startArchitectTurn() {
  showArchitectPanel();
}

function showArchitectPanel() {
  playSound('magic');
  cardArea.innerHTML = '';
  playerInfo.textContent = '';
  playerInfo.style.display = 'none';
  coinInfo.style.display = 'none';

  // 建筑师虚拟玩家对象
  const architect = players.find(p => p.roleKey === 'architect');
  if (architect.hand.length === 0) architect.hand = generateDistrictDeck().slice(0, 4);
  if (architect.coins === 0) architect.coins = 4;

  // 建筑师信息弹窗
  let html = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:380px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:8px;">
        <img class="player-role-img" src="assets/roles/architect.jpg" alt="建筑师" style="height:60px;width:60px;">
        <span style="font-weight:bold;font-size:1.2rem;color:#ffe6b3;">李琪（建筑师）</span>
        <button class="skill-btn" title="查看技能" style="margin-left:6px;width:28px;height:28px;font-size:1.2rem;border-radius:50%;background:#ffe6b3;color:#3b2c23;border:none;cursor:pointer;" onclick="showSkillPopup('architect')">？</button>
      </div>
      <div style="margin-bottom:6px;">
        <img src="assets/others/coin.jpg" style="width:22px;vertical-align:middle;"> <span style="color:#ffe6b3;">×${architect.coins}</span>
      </div>
      <div style="margin-bottom:6px;cursor:pointer;" title="点击查看手牌" id="architect-hand-area">
        <img src="assets/others/card_back.jpg" style="width:28px;height:40px;vertical-align:middle;border-radius:4px;box-shadow:0 1px 4px #0006;">
        <span style="color:#ffe6b3;">×${architect.hand.length}</span>
      </div>
      <div style="margin-bottom:10px;">
        <span style="color:#aaa;font-size:0.95rem;">（暂无已建造地区）</span>
      </div>
      <button class="main-btn" id="architect-skill-btn" style="margin-top:10px;">建筑师发动技能</button>
    </div>
  `;

  // 弹窗
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = html;
  document.body.appendChild(popup);

  // 禁止查看建筑师手牌
  setTimeout(() => {
    const handArea = document.getElementById('architect-hand-area');
    if (handArea) {
      handArea.onclick = () => {
        const tip = document.createElement('div');
        tip.style.position = 'fixed';
        tip.style.left = '0'; tip.style.top = '0'; tip.style.right = '0'; tip.style.bottom = '0';
        tip.style.background = 'rgba(0,0,0,0.85)';
        tip.style.zIndex = '6000';
        tip.style.display = 'flex';
        tip.style.alignItems = 'center';
        tip.style.justifyContent = 'center';
        tip.innerHTML = `
          <div style="background:#2d1c13;padding:18px 16px 12px 16px;border-radius:12px;max-width:320px;box-shadow:0 2px 16px #000a;text-align:center;">
            <div style="color:#ffe6b3;font-size:1.1rem;margin-bottom:12px;">没有特殊技能的您不能查看他人卡牌哦~</div>
            <button class="main-btn" onclick="this.parentNode.parentNode.remove()">关闭</button>
          </div>
        `;
        document.body.appendChild(tip);
        playSound('notification');
      };
    }
  }, 0);

  // 技能按钮
  document.getElementById('architect-skill-btn').onclick = () => {
    playSound('magic');
    // 弹窗提示技能发动
   popup.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
        <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:12px;">建筑师发动技能</div>
        <img src="assets/roles/architect.jpg" style="width:120px;height:180px;border-radius:14px;box-shadow:0 2px 16px #000a;margin-bottom:18px;">
        <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">额外抽2张地区卡</div>
        <div id="architect-draw-cards" style="display:flex;gap:10px;margin-bottom:18px;"></div>
        <button class="main-btn" id="architect-bless-btn">建筑师：“谢绝甜豆腐脑工程。”</button>
      </div>
    `;
    playSound('magic');
    // 动画抽2张卡
    setTimeout(() => {
      const deck = generateDistrictDeck();
      const newCards = [deck.pop(), deck.pop()];
      architect.hand.push(...newCards);
      const drawDiv = document.getElementById('architect-draw-cards');
      if (drawDiv) {
        newCards.forEach(card => {
          const cardDiv = document.createElement('div');
          cardDiv.style.display = 'flex';
          cardDiv.style.flexDirection = 'column';
          cardDiv.style.alignItems = 'center';
          cardDiv.innerHTML = `
            <img src="${card.img}" style="width:60px;height:90px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;animation:fadeInCard 0.7s;">
            <span style="color:#ffe6b3;font-size:0.95rem;">${districtNameMap[card.name] || card.name}</span>
          `;
          drawDiv.appendChild(cardDiv);
        });
      }
      // 手牌数量动画
      setTimeout(() => {
        playSound('success');
        // 可以在信息面板刷新手牌数量
        renderPlayerPanel(currentPlayerIdx);
      }, 400);
    }, 400);

    document.getElementById('architect-bless-btn').onclick = () => {
      showArchitectBlessingVideo(() => {
        // 祝福视频关闭后，建筑师拿金币
        popup.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
            <button class="main-btn" id="architect-get-coin-btn">建筑师选择拿取4枚金币</button>
          </div>
        `;
        document.getElementById('architect-get-coin-btn').onclick = () => {
          playSound('coin');
          architect.coins += 4;
          popup.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
              <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">建筑师获得4枚金币，现在有${architect.coins}枚金币</div>
              <button class="main-btn" id="architect-build-btn">建筑师开始建造地区</button>
            </div>
          `;
          document.getElementById('architect-build-btn').onclick = () => {
            // 自动建造最多3个地区，总花费不超过当前金币
            let total = 0, built = [];
            for (let i = 0; i < architect.hand.length; i++) {
              if (built.length < 3 && total + architect.hand[i].score <= architect.coins) {
                built.push(architect.hand[i]);
                total += architect.hand[i].score;
              }
            }
            architect.built = built;
            architect.coins -= total;
            popup.innerHTML = `
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
                <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">
                  建筑师建造了${built.length}个地区，总花费${total}金币，剩余${architect.coins}金币
                </div>
                <div style="display:flex;gap:10px;margin-bottom:12px;">
                  ${built.map(card => `<div style="display:flex;flex-direction:column;align-items:center;animation:fadeInCard 0.7s;">
                    <img src="${card.img}" style="width:60px;height:90px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
                    <span style="color:#ffe6b3;font-size:0.95rem;">${districtNameMap[card.name] || card.name}</span>
                  </div>`).join('')}
                </div>
                <button class="main-btn" id="architect-end-btn">建筑师行动结束</button>
              </div>
            `;
            playSound('construct');
            document.getElementById('architect-end-btn').onclick = () => {
              popup.remove();
              // 进入下一个角色流程
              startWarlordTurn();
            };
          };
        };
      });
    };
  };
}

function showArchitectBlessingVideo(onClose) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.95)';
  popup.style.zIndex = '5000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:10px 10px 10px 10px;border-radius:14px;max-width:98vw;max-height:98vh;box-shadow:0 2px 16px #000a;text-align:center;display:flex;flex-direction:column;align-items:center;">
      <video id="architect-bless-video" src="assets/videos/architect.mp4" style="width:100vw;max-width:420px;height:70vh;border-radius:10px;background:#000;" controls poster="" preload="auto"></video>
      <div style="margin-top:10px;display:flex;gap:16px;justify-content:center;">
        <button id="architect-bless-play" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">▶</button>
        <button id="architect-bless-close" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  playSound('notification');
  const video = document.getElementById('architect-bless-video');
  document.getElementById('architect-bless-play').onclick = () => {
    video.currentTime = 0;
    video.play();
  };
  document.getElementById('architect-bless-close').onclick = () => {
    popup.remove();
    if (onClose) onClose();
  };
  video.onended = () => {
    // 播放完毕后出现“再次播放”和“关闭”按钮
    popup.querySelector('div[style*="margin-top:10px"]').innerHTML = `
      <button id="architect-bless-replay" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">⟳ 再次播放</button>
      <button id="architect-bless-close2" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖ 关闭</button>
    `;
    document.getElementById('architect-bless-replay').onclick = () => {
      video.currentTime = 0;
      video.play();
    };
    document.getElementById('architect-bless-close2').onclick = () => {
      popup.remove();
      if (onClose) onClose();
    };
  };
}

function startWarlordTurn() {
  // TODO: 这里进入军阀流程
  // showWarlordPanel();
}

function startWarlordTurn() {
  showWarlordPanel();
}

function showWarlordPanel() {
  playSound('magic');
  cardArea.innerHTML = '';
  playerInfo.textContent = '';
  playerInfo.style.display = 'none';
  coinInfo.style.display = 'none';

  // 军阀虚拟玩家对象
 const warlord = players.find(p => p.roleKey === 'warlord');
  if (warlord.hand.length === 0) warlord.hand = generateDistrictDeck().slice(0, 4);
  if (warlord.coins === 0) warlord.coins = 4;

  // 军阀信息弹窗
  let html = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:380px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:8px;">
        <img class="player-role-img" src="assets/roles/warlord.jpg" alt="军阀" style="height:60px;width:60px;">
        <span style="font-weight:bold;font-size:1.2rem;color:#ffe6b3;">焦傲然（军阀）</span>
        <button class="skill-btn" title="查看技能" style="margin-left:6px;width:28px;height:28px;font-size:1.2rem;border-radius:50%;background:#ffe6b3;color:#3b2c23;border:none;cursor:pointer;" onclick="showSkillPopup('warlord')">？</button>
      </div>
      <div style="margin-bottom:6px;">
        <img src="assets/others/coin.jpg" style="width:22px;vertical-align:middle;"> <span style="color:#ffe6b3;">×${warlord.coins}</span>
      </div>
      <div style="margin-bottom:6px;cursor:pointer;" title="点击查看手牌" id="warlord-hand-area">
        <img src="assets/others/card_back.jpg" style="width:28px;height:40px;vertical-align:middle;border-radius:4px;box-shadow:0 1px 4px #0006;">
        <span style="color:#ffe6b3;">×${warlord.hand.length}</span>
      </div>
      <div style="margin-bottom:10px;">
        <span style="color:#aaa;font-size:0.95rem;">（暂无已建造地区）</span>
      </div>
      <button class="main-btn" id="warlord-skill-btn" style="margin-top:10px;">军阀选择是否发动攻打技能</button>
    </div>
  `;

  // 弹窗
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = html;
  document.body.appendChild(popup);

  // 禁止查看军阀手牌
  setTimeout(() => {
    const handArea = document.getElementById('warlord-hand-area');
    if (handArea) {
      handArea.onclick = () => {
        const tip = document.createElement('div');
        tip.style.position = 'fixed';
        tip.style.left = '0'; tip.style.top = '0'; tip.style.right = '0'; tip.style.bottom = '0';
        tip.style.background = 'rgba(0,0,0,0.85)';
        tip.style.zIndex = '6000';
        tip.style.display = 'flex';
        tip.style.alignItems = 'center';
        tip.style.justifyContent = 'center';
        tip.innerHTML = `
          <div style="background:#2d1c13;padding:18px 16px 12px 16px;border-radius:12px;max-width:320px;box-shadow:0 2px 16px #000a;text-align:center;">
            <div style="color:#ffe6b3;font-size:1.1rem;margin-bottom:12px;">没有特殊技能的您不能查看他人卡牌哦~</div>
            <button class="main-btn" onclick="this.parentNode.parentNode.remove()">关闭</button>
          </div>
        `;
        document.body.appendChild(tip);
        playSound('notification');
      };
    }
  }, 0);

  // 技能按钮
  document.getElementById('warlord-skill-btn').onclick = () => {
    playSound('notification');
    // 军阀决定暂不发动攻击技能
    popup.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
        <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:12px;"></div>
        <img src="assets/roles/warlord.jpg" style="width:120px;height:180px;border-radius:14px;box-shadow:0 2px 16px #000a;margin-bottom:18px;">
        <div style="color:#ffe6b3;font-size:1.15rem;margin-bottom:18px;">
          军阀决定，本轮暂不启动对他人建筑的攻打与破坏。<br>当第一回合临近结束时，再发动该技能。
        </div>
        <button class="main-btn" id="warlord-bless-btn">军阀：“艺术，就是爆炸！”</button>
      </div>
    `;
    playSound('magic');
    document.getElementById('warlord-bless-btn').onclick = () => {
      showWarlordBlessingVideo(() => {
        // 祝福视频关闭后，军阀拿金币
        popup.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
            <button class="main-btn" id="warlord-get-coin-btn">军阀选择拿取4枚金币</button>
          </div>
        `;
        document.getElementById('warlord-get-coin-btn').onclick = () => {
          playSound('coin');
          warlord.coins += 4;
          popup.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
              <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">军阀获得4枚金币，现在有${warlord.coins}枚金币</div>
              <button class="main-btn" id="warlord-build-btn">军阀开始建造地区</button>
            </div>
          `;
          document.getElementById('warlord-build-btn').onclick = () => {
            // 自动建造1~2个地区，总花费不超过当前金币
            let total = 0, built = [];
            for (let i = 0; i < warlord.hand.length; i++) {
              if (built.length < 2 && total + warlord.hand[i].score <= warlord.coins) {
                built.push(warlord.hand[i]);
                total += warlord.hand[i].score;
              }
            }
            warlord.built = built;
            warlord.coins -= total;
            popup.innerHTML = `
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
                <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">
                  军阀建造了${built.length}个地区，总花费${total}金币，剩余${warlord.coins}金币
                </div>
                <div style="display:flex;gap:10px;margin-bottom:12px;">
                  ${built.map(card => `<div style="display:flex;flex-direction:column;align-items:center;animation:fadeInCard 0.7s;">
                    <img src="${card.img}" style="width:60px;height:90px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
                    <span style="color:#ffe6b3;font-size:0.95rem;">${districtNameMap[card.name] || card.name}</span>
                  </div>`).join('')}
                </div>
                <button class="main-btn" id="warlord-bonus-btn">结算军事奖励</button>
              </div>
            `;
            playSound('construct');
            document.getElementById('warlord-bonus-btn').onclick = () => {
              // 结算红色奖励
              const redCount = warlord.built.filter(card => card.color === 'red').length;
              let bonus = redCount;
              warlord.coins += bonus;
              popup.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
                  <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">
                    军阀已建造${redCount}个军事地区（红色），获得${bonus}枚金币奖励
                  </div>
                  <button class="main-btn" id="warlord-end-btn">军阀行动结束</button>
                </div>
              `;
              playSound('coin');
              document.getElementById('warlord-end-btn').onclick = () => {
                popup.remove();
                // 进入下一个角色流程
                startQueenTurn();
              };
            };
          };
        };
      });
    };
  };
}

function showWarlordBlessingVideo(onClose) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.95)';
  popup.style.zIndex = '5000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:10px 10px 10px 10px;border-radius:14px;max-width:98vw;max-height:98vh;box-shadow:0 2px 16px #000a;text-align:center;display:flex;flex-direction:column;align-items:center;">
      <video id="warlord-bless-video" src="assets/videos/warlord.mp4" style="width:100vw;max-width:420px;height:70vh;border-radius:10px;background:#000;" controls poster="" preload="auto"></video>
      <div style="margin-top:10px;display:flex;gap:16px;justify-content:center;">
        <button id="warlord-bless-play" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">▶</button>
        <button id="warlord-bless-close" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  playSound('notification');
  const video = document.getElementById('warlord-bless-video');
  document.getElementById('warlord-bless-play').onclick = () => {
    video.currentTime = 0;
    video.play();
  };
  document.getElementById('warlord-bless-close').onclick = () => {
    popup.remove();
    if (onClose) onClose();
  };
  video.onended = () => {
    // 播放完毕后出现“再次播放”和“关闭”按钮
    popup.querySelector('div[style*="margin-top:10px"]').innerHTML = `
      <button id="warlord-bless-replay" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">⟳ 再次播放</button>
      <button id="warlord-bless-close2" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖ 关闭</button>
    `;
    document.getElementById('warlord-bless-replay').onclick = () => {
      video.currentTime = 0;
      video.play();
    };
    document.getElementById('warlord-bless-close2').onclick = () => {
      popup.remove();
      if (onClose) onClose();
    };
  };
}

function startQueenTurn() {
  // TODO: 这里进入皇后流程
  // showQueenPanel();
}

function startQueenTurn() {
  showQueenPanel();
}

function showQueenPanel() {
  playSound('magic');
  cardArea.innerHTML = '';
  playerInfo.textContent = '';
  playerInfo.style.display = 'none';
  coinInfo.style.display = 'none';
  // 高亮皇后信息面板
  currentPlayerIdx = 1; // 假设players[1]是皇后
  renderPlayerPanel(currentPlayerIdx);

  // 先弹窗提示被动技能
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:340px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:12px;">皇后发动技能</div>
      <img src="assets/roles/queen.jpg" style="width:120px;height:180px;border-radius:14px;box-shadow:0 2px 16px #000a;margin-bottom:18px;">
      <div style="color:#ffe6b3;font-size:1.15rem;margin-bottom:18px;">
        由于皇后在物理意义上坐在国王旁边，<br>触发被动技能，皇后获得3枚金币
      </div>
      <button class="main-btn" id="queen-passive-btn">获得3枚金币</button>
    </div>
  `;
  playSound('magic');
  document.body.appendChild(popup);

  // 被动技能：获得3金币
  document.getElementById('queen-passive-btn').onclick = () => {
    playSound('coin');
    players[1].coins += 3;
    renderPlayerPanel(1);

    // 弹窗提示主动拿4金币
    popup.innerHTML = `
      <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:340px;box-shadow:0 2px 16px #000a;text-align:center;">
        <div style="color:#ffe6b3;font-size:1.15rem;margin-bottom:18px;">
          皇后选择拿取4枚金币
        </div>
        <button class="main-btn" id="queen-get-coin-btn">获得4枚金币</button>
      </div>
    `;

    // 主动拿4金币
    document.getElementById('queen-get-coin-btn').onclick = () => {
      playSound('coin');
      players[1].coins += 4;
      renderPlayerPanel(1);

      // 进入建造环节（见下半部分）
      showQueenBuildStep(popup);
    };
  };
}
// 自动建造和结束环节
function showQueenBuildStep(popup) {
  // 自动建造1~2个地区，总花费不超过当前金币
  const queen = players[1];
  let total = 0, built = [];
  for (let i = 0; i < queen.hand.length; i++) {
    if (built.length < 2 && total + queen.hand[i].score <= queen.coins) {
      built.push(queen.hand[i]);
      total += queen.hand[i].score;
    }
  }
  queen.built = built;
  queen.coins -= total;

  // 从手牌移除已建造的卡
  queen.hand = queen.hand.filter(card => !built.includes(card));

  // 刷新主页面面板
  renderPlayerPanel(1);

  // 弹窗展示建造结果
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:380px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="color:#ffe6b3;font-size:1.15rem;margin-bottom:18px;">
        皇后建造了${built.length}个地区，总花费${total}金币，剩余${queen.coins}金币
      </div>
      <div style="display:flex;gap:10px;margin-bottom:12px;justify-content:center;">
        ${built.map(card => `<div style="display:flex;flex-direction:column;align-items:center;animation:fadeInCard 0.7s;">
          <img src="${card.img}" style="width:60px;height:90px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
          <span style="color:#ffe6b3;font-size:0.95rem;">${districtNameMap[card.name] || card.name}</span>
        </div>`).join('')}
      </div>
      <button class="main-btn" id="queen-end-btn">皇后行动结束</button>
    </div>
  `;
  playSound('construct');

  // 结束按钮
  document.getElementById('queen-end-btn').onclick = () => {
    popup.remove();
    // 进入下一个角色流程
    startAlchemistTurn();
  };
}

function startAlchemistTurn() {
  showAlchemistPanel();
}

function showAlchemistPanel() {
  // 清理主区，隐藏顶部信息
  cardArea.innerHTML = '';
  playerInfo.textContent = '';
  playerInfo.style.display = 'none';
  coinInfo.style.display = 'none';

  // 高亮炼金术士信息面板（假设players[2]是炼金术士）
  currentPlayerIdx = 2;
  // 如果你没有players[2]，可以用临时对象，或直接用下面的alchemist对象
  // renderPlayerPanel(currentPlayerIdx);

  // 虚拟玩家对象
  const alchemist = players.find(p => p.roleKey === 'alchemist');
  if (alchemist.hand.length === 0) alchemist.hand = generateDistrictDeck().slice(0, 4);
  if (alchemist.coins === 0) alchemist.coins = 4;

  // 1. 拿4金币
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:340px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="color:#ffe6b3;font-size:1.15rem;margin-bottom:18px;">
        炼金术士选择拿取4枚金币
      </div>
      <button class="main-btn" id="alchemist-get-coin-btn">获得4枚金币</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById('alchemist-get-coin-btn').onclick = () => {
    playSound('coin');
    alchemist.coins += 4;
    // 2. 自动建造1~2个地区，总花费不超过当前金币
    let total = 0, built = [];
    for (let i = 0; i < alchemist.hand.length; i++) {
      if (built.length < 2 && total + alchemist.hand[i].score <= alchemist.coins) {
        built.push(alchemist.hand[i]);
        total += alchemist.hand[i].score;
      }
    }
    alchemist.built = built;
    alchemist.coins -= total;
    // 从手牌移除已建造的卡
    alchemist.hand = alchemist.hand.filter(card => !built.includes(card));

    // 3. 发动技能，拿回建造花费
    popup.innerHTML = `
      <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:380px;box-shadow:0 2px 16px #000a;text-align:center;">
        <div style="color:#ffe6b3;font-size:1.15rem;margin-bottom:18px;">
          炼金术士建造了${built.length}个地区，总花费${total}金币，剩余${alchemist.coins}金币
        </div>
        <div style="display:flex;gap:10px;margin-bottom:12px;justify-content:center;">
          ${built.map(card => `<div style="display:flex;flex-direction:column;align-items:center;animation:fadeInCard 0.7s;">
            <img src="${card.img}" style="width:60px;height:90px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
            <span style="color:#ffe6b3;font-size:0.95rem;">${districtNameMap[card.name] || card.name}</span>
          </div>`).join('')}
        </div>
        <button class="main-btn" id="alchemist-skill-btn">发动技能：拿回建筑花费</button>
      </div>
    `;
    playSound('construct');

    document.getElementById('alchemist-skill-btn').onclick = () => {
      playSound('coin');
      alchemist.coins += total;
      // 展示技能效果
      popup.innerHTML = `
        <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:340px;box-shadow:0 2px 16px #000a;text-align:center;">
          <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:12px;">炼金术士发动技能</div>
          <img src="assets/roles/alchemist.jpg" style="width:120px;height:180px;border-radius:14px;box-shadow:0 2px 16px #000a;margin-bottom:18px;">
          <div style="color:#ffe6b3;font-size:1.15rem;margin-bottom:18px;">
            拿回${total}金币，现在有${alchemist.coins}金币
          </div>
          <button class="main-btn" id="alchemist-bless-btn">炼金术士：“拿回属于我的一切”（握爪）</button>
        </div>
      `;
      playSound('magic');

      // 4. 祝福视频
      document.getElementById('alchemist-bless-btn').onclick = () => {
        showAlchemistBlessingVideo(() => {
          // 5. 行动结束
          popup.innerHTML = `
            <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:340px;box-shadow:0 2px 16px #000a;text-align:center;">
              <div style="color:#ffe6b3;font-size:1.15rem;margin-bottom:18px;">
                炼金术士行动结束
              </div>
              <button class="main-btn" id="alchemist-end-btn">进入下一个角色</button>
            </div>
          `;
          document.getElementById('alchemist-end-btn').onclick = () => {
            popup.remove();
            startNavigatorTurn();
          };
        });
      };
    };
  };
}

function showAlchemistBlessingVideo(onClose) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.95)';
  popup.style.zIndex = '5000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:10px 10px 10px 10px;border-radius:14px;max-width:98vw;max-height:98vh;box-shadow:0 2px 16px #000a;text-align:center;display:flex;flex-direction:column;align-items:center;">
      <video id="alchemist-bless-video" src="assets/videos/alchemist.mp4" style="width:100vw;max-width:420px;height:70vh;border-radius:10px;background:#000;" controls poster="" preload="auto"></video>
      <div style="margin-top:10px;display:flex;gap:16px;justify-content:center;">
        <button id="alchemist-bless-play" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">▶</button>
        <button id="alchemist-bless-close" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  playSound('notification');
  const video = document.getElementById('alchemist-bless-video');
  document.getElementById('alchemist-bless-play').onclick = () => {
    video.currentTime = 0;
    video.play();
  };
  document.getElementById('alchemist-bless-close').onclick = () => {
    popup.remove();
    if (onClose) onClose();
  };
  video.onended = () => {
    // 播放完毕后出现“再次播放”和“关闭”按钮
    popup.querySelector('div[style*="margin-top:10px"]').innerHTML = `
      <button id="alchemist-bless-replay" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">⟳ 再次播放</button>
      <button id="alchemist-bless-close2" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖ 关闭</button>
    `;
    document.getElementById('alchemist-bless-replay').onclick = () => {
      video.currentTime = 0;
      video.play();
    };
    document.getElementById('alchemist-bless-close2').onclick = () => {
      popup.remove();
      if (onClose) onClose();
    };
  };
}


function startNavigatorTurn() {
  showNavigatorPanel();
}

function showNavigatorPanel() {
  // 清理主区，隐藏顶部信息
  cardArea.innerHTML = '';
  playerInfo.textContent = '';
  playerInfo.style.display = 'none';
  coinInfo.style.display = 'none';

  // 虚拟玩家对象
  const navigator = players.find(p => p.roleKey === 'navigator');
  if (navigator.hand.length === 0) navigator.hand = generateDistrictDeck().slice(0, 4);
  if (navigator.coins === 0) navigator.coins = 4;

  // 1. 拿4金币
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:340px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="color:#ffe6b3;font-size:1.15rem;margin-bottom:18px;">
        航海家选择拿取4枚金币
      </div>
      <button class="main-btn" id="navigator-get-coin-btn">获得4枚金币</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById('navigator-get-coin-btn').onclick = () => {
    playSound('coin');
    navigator.coins += 4;
    // 2. 自动建造1~2个地区，总花费不超过当前金币
    let total = 0, built = [];
    for (let i = 0; i < navigator.hand.length; i++) {
      if (built.length < 2 && total + navigator.hand[i].score <= navigator.coins) {
        built.push(navigator.hand[i]);
        total += navigator.hand[i].score;
      }
    }
    navigator.built = built;
    navigator.coins -= total;
    // 从手牌移除已建造的卡
    navigator.hand = navigator.hand.filter(card => !built.includes(card));

    // 3. 发动技能（再拿4金币，带角色图+音效）
    popup.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
        <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:12px;"></div>
        <img src="assets/roles/navigator.jpg" style="width:120px;height:180px;border-radius:14px;box-shadow:0 2px 16px #000a;margin-bottom:18px;">
        <div style="color:#ffe6b3;font-size:1.15rem;margin-bottom:18px;">
          航海家建造了${built.length}个地区，总花费${total}金币，剩余${navigator.coins}金币<br>
          <br>发动技能：再次拿取4枚金币
        </div>
        <div style="display:flex;gap:10px;margin-bottom:12px;justify-content:center;">
          ${built.map(card => `<div style="display:flex;flex-direction:column;align-items:center;animation:fadeInCard 0.7s;">
            <img src="${card.img}" style="width:60px;height:90px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
            <span style="color:#ffe6b3;font-size:0.95rem;">${districtNameMap[card.name] || card.name}</span>
          </div>`).join('')}
        </div>
        <button class="main-btn" id="navigator-skill-btn">再次获得4枚金币</button>
      </div>
    `;
    playSound('magic');

    document.getElementById('navigator-skill-btn').onclick = () => {
      playSound('coin');
      navigator.coins += 4;
      // 4. 祝福视频
      popup.innerHTML = `
        <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:340px;box-shadow:0 2px 16px #000a;text-align:center;">
          <div style="color:#ffe6b3;font-size:1.15rem;margin-bottom:18px;">
            发动技能后，航海家获得4枚金币，现在有${navigator.coins}金币
          </div>
          <button class="main-btn" id="navigator-bless-btn">航海家：“我们的征途是星辰大海！”</button>
        </div>
      `;
      document.getElementById('navigator-bless-btn').onclick = () => {
        showNavigatorBlessingVideo(() => {
          // 5. 行动结束
          popup.innerHTML = `
            <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:340px;box-shadow:0 2px 16px #000a;text-align:center;">
              <div style="color:#ffe6b3;font-size:1.15rem;margin-bottom:18px;">
                航海家行动结束
              </div>
              <button class="main-btn" id="navigator-end-btn">进入下一个角色</button>
            </div>
          `;
          document.getElementById('navigator-end-btn').onclick = () => {
            popup.remove();
            // 进入下一个角色流程
            startArtistTurn(); // 你后续角色的函数
          };
        });
      };
    };
  };
}

function showNavigatorBlessingVideo(onClose) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.95)';
  popup.style.zIndex = '5000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:10px 10px 10px 10px;border-radius:14px;max-width:98vw;max-height:98vh;box-shadow:0 2px 16px #000a;text-align:center;display:flex;flex-direction:column;align-items:center;">
      <video id="navigator-bless-video" src="assets/videos/navigator.mp4" style="width:100vw;max-width:420px;height:70vh;border-radius:10px;background:#000;" controls poster="" preload="auto"></video>
      <div style="margin-top:10px;display:flex;gap:16px;justify-content:center;">
        <button id="navigator-bless-play" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">▶</button>
        <button id="navigator-bless-close" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  playSound('notification');
  const video = document.getElementById('navigator-bless-video');
  document.getElementById('navigator-bless-play').onclick = () => {
    video.currentTime = 0;
    video.play();
  };
  document.getElementById('navigator-bless-close').onclick = () => {
    popup.remove();
    if (onClose) onClose();
  };
  video.onended = () => {
    // 播放完毕后出现“再次播放”和“关闭”按钮
    popup.querySelector('div[style*="margin-top:10px"]').innerHTML = `
      <button id="navigator-bless-replay" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">⟳ 再次播放</button>
      <button id="navigator-bless-close2" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖ 关闭</button>
    `;
    document.getElementById('navigator-bless-replay').onclick = () => {
      video.currentTime = 0;
      video.play();
    };
    document.getElementById('navigator-bless-close2').onclick = () => {
      popup.remove();
      if (onClose) onClose();
    };
  };
}

function startArtistTurn() {
  showArtistPanel();
}

function showArtistPanel() {
  // 清理主区，隐藏顶部信息
  cardArea.innerHTML = '';
  playerInfo.textContent = '';
  playerInfo.style.display = 'none';
  coinInfo.style.display = 'none';

  // 虚拟玩家对象
  const artist = players.find(p => p.roleKey === 'artist');
  if (artist.hand.length === 0) artist.hand = generateDistrictDeck().slice(0, 4);
  if (artist.coins === 0) artist.coins = 4;
  if (!artist.beautified) artist.beautified = [];

  // 1. 拿4金币
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:340px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="color:#ffe6b3;font-size:1.15rem;margin-bottom:18px;">
        美术家选择拿取4枚金币
      </div>
      <button class="main-btn" id="artist-get-coin-btn">获得4枚金币</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById('artist-get-coin-btn').onclick = () => {
    playSound('coin');
    artist.coins += 4;
    // 2. 自动建造1~2个地区，总花费不超过当前金币
    let total = 0, built = [];
    for (let i = 0; i < artist.hand.length; i++) {
      if (built.length < 2 && total + artist.hand[i].score <= artist.coins) {
        built.push(artist.hand[i]);
        total += artist.hand[i].score;
      }
    }
    artist.built = built;
    artist.coins -= total;
    // 从手牌移除已建造的卡
    artist.hand = artist.hand.filter(card => !built.includes(card));

    // 3. 发动技能：美化1~2个地区
    let beautified = [];
    for (let i = 0; i < built.length && beautified.length < 2 && artist.coins > 0; i++) {
      beautified.push(i); // 记录被美化的 built 索引
      artist.coins -= 1;
    }
    artist.beautified = beautified;

    popup.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
        <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:12px;"></div>
        <img src="assets/roles/artist.jpg" style="width:120px;height:180px;border-radius:14px;box-shadow:0 2px 16px #000a;margin-bottom:18px;">
        <div style="color:#ffe6b3;font-size:1.15rem;margin-bottom:18px;">
          美术家建造了${built.length}个地区，总花费${total}金币，剩余${artist.coins}金币<br>
          <br>发动技能：美化${beautified.length}个地区
        </div>
        <div style="display:flex;gap:10px;margin-bottom:12px;justify-content:center;">
          ${built.map((card, idx) => `
            <div style="display:flex;flex-direction:column;align-items:center;position:relative;animation:fadeInCard 0.7s;">
              <img src="${card.img}" style="width:60px;height:90px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
              ${beautified.includes(idx) ? `<img src="assets/others/coin.jpg" style="width:22px;position:absolute;top:4px;right:4px;" title="已美化">` : ''}
              <span style="color:#ffe6b3;font-size:0.95rem;">${districtNameMap[card.name] || card.name}</span>
            </div>
          `).join('')}
        </div>
        <button class="main-btn" id="artist-bless-btn">美术家：“艺术即生活！”</button>
      </div>
    `;
    playSound('magic');

    // 4. 祝福视频
    document.getElementById('artist-bless-btn').onclick = () => {
      showArtistBlessingVideo(() => {
        // 祝福视频关闭后，直接进入下一个角色
        if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
        startWizardTurn();
      });
    };
  };
}

function showArtistBlessingVideo(onClose) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.95)';
  popup.style.zIndex = '5000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:10px 10px 10px 10px;border-radius:14px;max-width:98vw;max-height:98vh;box-shadow:0 2px 16px #000a;text-align:center;display:flex;flex-direction:column;align-items:center;">
      <video id="artist-bless-video" src="assets/videos/artist.mp4" style="width:100vw;max-width:420px;height:70vh;border-radius:10px;background:#000;" controls poster="" preload="auto"></video>
      <div style="margin-top:10px;display:flex;gap:16px;justify-content:center;">
        <button id="artist-bless-play" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">▶</button>
        <button id="artist-bless-close" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  playSound('notification');
  const video = document.getElementById('artist-bless-video');
  document.getElementById('artist-bless-play').onclick = () => {
    video.currentTime = 0;
    video.play();
  };
  document.getElementById('artist-bless-close').onclick = () => {
    if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
    if (onClose) onClose();
  };
  video.onended = () => {
    // 播放完毕后出现“再次播放”和“关闭”按钮
    popup.querySelector('div[style*="margin-top:10px"]').innerHTML = `
      <button id="artist-bless-replay" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">⟳ 再次播放</button>
      <button id="artist-bless-close2" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖ 关闭</button>
    `;
    document.getElementById('artist-bless-replay').onclick = () => {
      video.currentTime = 0;
      video.play();
    };
    document.getElementById('artist-bless-close2').onclick = () => {
      if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
      if (onClose) onClose();
    };
  };
}

function startWizardTurn() {
  showWizardPanel();
}

function showRoleActionPopup({role, name, text, btn, onConfirm, customContent}) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '5000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:380px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:12px;">${name || ''}</div>
      <div style="color:#ffe6b3;font-size:1.1rem;margin-bottom:18px;">${text || ''}</div>
      ${customContent || ''}
      <button class="main-btn" id="role-action-confirm-btn">${btn || '确定'}</button>
    </div>
  `;
  document.body.appendChild(popup);
  document.getElementById('role-action-confirm-btn').onclick = () => {
    popup.remove();
    if (onConfirm) onConfirm();
  };
}

function renderHandCards(hand) {
  return `<div style="display:flex;gap:8px;justify-content:center;">
    ${hand.map(card => `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <img src="${card.img || ''}" style="width:60px;height:90px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #0006;">
        <span style="color:#ffe6b3;font-size:0.95rem;">${card.name || ''}</span>
      </div>
    `).join('')}
  </div>`;
}

function autoBuildDistricts(player, maxCost, callback) {
  let total = 0, built = [];
  for (let i = 0; i < player.hand.length; i++) {
    if (built.length < 2 && total + (player.hand[i].score || 0) <= maxCost) {
      built.push(player.hand[i]);
      total += player.hand[i].score || 0;
    }
  }
  player.built = built;
  player.coins -= total;
  player.hand = player.hand.filter(card => !built.includes(card));
  if (callback) callback();
}

function showWizardPanel() {
  playSound('magic');
  cardArea.innerHTML = '';
  playerInfo.textContent = '';
  playerInfo.style.display = 'none';
  coinInfo.style.display = 'none';

  // 巫师虚拟玩家对象
 const wizard = players.find(p => p.roleKey === 'wizard');
  // 如果第一次进入回合，初始化手牌和金币
  if (wizard.hand.length === 0) wizard.hand = generateDistrictDeck().slice(0, 4);
  if (wizard.coins === 0) wizard.coins = 4;

  // 1. 信息弹窗
  let html = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:380px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:8px;">
        <img class="player-role-img" src="assets/roles/wizard.jpg" alt="巫师" style="height:60px;width:60px;">
        <span style="font-weight:bold;font-size:1.2rem;color:#ffe6b3;">李青政（巫师）</span>
        <button class="skill-btn" title="查看技能" style="margin-left:6px;width:28px;height:28px;font-size:1.2rem;border-radius:50%;background:#ffe6b3;color:#3b2c23;border:none;cursor:pointer;" onclick="showSkillPopup('wizard')">？</button>
      </div>
      <div style="margin-bottom:6px;">
        <img src="assets/others/coin.jpg" style="width:22px;vertical-align:middle;"> <span style="color:#ffe6b3;">×${wizard.coins}</span>
      </div>
      <div style="margin-bottom:6px;cursor:pointer;" title="点击查看手牌" id="wizard-hand-area">
        <img src="assets/others/card_back.jpg" style="width:28px;height:40px;vertical-align:middle;border-radius:4px;box-shadow:0 1px 4px #0006;">
        <span style="color:#ffe6b3;">×${wizard.hand.length}</span>
      </div>
      <div style="margin-bottom:10px;">
        <span style="color:#aaa;font-size:0.95rem;">（暂无已建造地区）</span>
      </div>
      <button class="main-btn" id="wizard-get-coin-btn" style="margin-top:10px;">巫师选择拿取4枚金币</button>
    </div>
  `;

  // 弹窗
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = html;
  document.body.appendChild(popup);

  // 禁止查看巫师手牌
  setTimeout(() => {
    const handArea = document.getElementById('wizard-hand-area');
    if (handArea) {
      handArea.onclick = () => {
        const tip = document.createElement('div');
        tip.style.position = 'fixed';
        tip.style.left = '0'; tip.style.top = '0'; tip.style.right = '0'; tip.style.bottom = '0';
        tip.style.background = 'rgba(0,0,0,0.85)';
        tip.style.zIndex = '6000';
        tip.style.display = 'flex';
        tip.style.alignItems = 'center';
        tip.style.justifyContent = 'center';
        tip.innerHTML = `
          <div style="background:#2d1c13;padding:18px 16px 12px 16px;border-radius:12px;max-width:320px;box-shadow:0 2px 16px #000a;text-align:center;">
            <div style="color:#ffe6b3;font-size:1.1rem;margin-bottom:12px;">没有特殊技能的您不能查看他人卡牌哦~</div>
            <button class="main-btn" onclick="this.parentNode.parentNode.remove()">关闭</button>
          </div>
        `;
        document.body.appendChild(tip);
        playSound('notification');
      };
    }
  }, 0);

  // 拿金币按钮
  document.getElementById('wizard-get-coin-btn').onclick = () => {
    playSound('coin');
    wizard.coins += 4;
    // 技能自动执行
    setTimeout(() => {
      showWizardSkill(wizard, popup);
    }, 600);
  };
}

function showWizardSkill(wizard, popup) {
  playSound('magic');
  // 选择目标玩家（手牌最多的，多个则随机）
  const candidates = players.filter(p => p.roleKey !== 'wizard' && p.hand && p.hand.length > 0);
  let maxHand = Math.max(...candidates.map(p => p.hand.length));
  let targets = candidates.filter(p => p.hand.length === maxHand);
  let targetPlayer = targets[Math.floor(Math.random() * targets.length)];

  // 随机拿走一张卡牌
  let cardIdx = Math.floor(Math.random() * targetPlayer.hand.length);
  let card = targetPlayer.hand[cardIdx];

  // 立即建造 or 加入手牌
  let msg = '';
  if (wizard.coins >= card.score) {
    wizard.coins -= card.score;
    wizard.built.push(card);
    msg = `巫师从${targetPlayer.role}手牌中拿走了${districtNameMap[card.name] || card.name}，并立即建造（花费${card.score}金币）`;
  } else {
    wizard.hand.push(card);
    msg = `巫师从${targetPlayer.role}手牌中拿走了${districtNameMap[card.name] || card.name}，金币不足，加入手牌`;
  }
  // 目标玩家手牌移除
  targetPlayer.hand.splice(cardIdx, 1);

  // 巫师还可以正常建造一个地区（自动建造）
  let canBuild = wizard.hand.find(card => wizard.coins >= card.score);
  if (canBuild) {
    wizard.coins -= canBuild.score;
    wizard.built.push(canBuild);
    wizard.hand = wizard.hand.filter(c => c !== canBuild);
    msg += `，随后又建造了【${districtNameMap[canBuild.name] || canBuild.name}】（花费${canBuild.score}金币）`;
  }

  // 弹窗展示技能结果
  popup.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
      <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:12px;">${msg}</div>
      <img src="assets/roles/wizard.jpg" style="width:120px;height:180px;border-radius:14px;box-shadow:0 2px 16px #000a;margin-bottom:18px;">
      <button class="main-btn" id="wizard-bless-btn">巫师：“昨晚夜观天象，今天适合吃甜口。”</button>
    </div>
  `;
  document.getElementById('wizard-bless-btn').onclick = () => {
    showWizardBlessingVideo(() => {
      if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
      // 巫师行动结束，进入下一个角色
      startDiplomatTurn();
    });
  };
}

function showWizardBlessingVideo(onClose) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.95)';
  popup.style.zIndex = '5000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:10px 10px 10px 10px;border-radius:14px;max-width:98vw;max-height:98vh;box-shadow:0 2px 16px #000a;text-align:center;display:flex;flex-direction:column;align-items:center;">
      <video id="wizard-bless-video" src="assets/videos/wizard.mp4" style="width:100vw;max-width:420px;height:70vh;border-radius:10px;background:#000;" controls poster="" preload="auto"></video>
      <div style="margin-top:10px;display:flex;gap:16px;justify-content:center;">
        <button id="wizard-bless-play" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">▶</button>
        <button id="wizard-bless-close" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  playSound('notification');
  const video = document.getElementById('wizard-bless-video');
  document.getElementById('wizard-bless-play').onclick = () => {
    video.currentTime = 0;
    video.play();
  };
  document.getElementById('wizard-bless-close').onclick = () => {
    if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
    if (onClose) onClose();
  };
  video.onended = () => {
    // 播放完毕后出现“再次播放”和“关闭”按钮
    popup.querySelector('div[style*="margin-top:10px"]').innerHTML = `
      <button id="wizard-bless-replay" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">⟳ 再次播放</button>
      <button id="wizard-bless-close2" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖ 关闭</button>
    `;
    document.getElementById('wizard-bless-replay').onclick = () => {
      video.currentTime = 0;
      video.play();
    };
    document.getElementById('wizard-bless-close2').onclick = () => {
      if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
      if (onClose) onClose();
    };
  };
}

function startDiplomatTurn() {
  showDiplomatPanel();
}

function showDiplomatPanel() {
  playSound('magic');
  cardArea.innerHTML = '';
  playerInfo.textContent = '';
  playerInfo.style.display = 'none';
  coinInfo.style.display = 'none';

  // 外交官虚拟玩家对象
  const diplomat = players.find(p => p.roleKey === 'diplomat');
  if (diplomat.hand.length === 0) diplomat.hand = generateDistrictDeck().slice(0, 4);
  if (diplomat.coins === 0) diplomat.coins = 4;

  // 信息弹窗
  let html = `
    <div style="background:#2d1c13;padding:22px 18px 16px 18px;border-radius:14px;max-width:380px;box-shadow:0 2px 16px #000a;text-align:center;">
      <div style="display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:8px;">
        <img class="player-role-img" src="assets/roles/diplomat.jpg" alt="外交官" style="height:60px;width:60px;">
        <span style="font-weight:bold;font-size:1.2rem;color:#ffe6b3;">赵方强（外交官）</span>
        <button class="skill-btn" title="查看技能" style="margin-left:6px;width:28px;height:28px;font-size:1.2rem;border-radius:50%;background:#ffe6b3;color:#3b2c23;border:none;cursor:pointer;" onclick="showSkillPopup('diplomat')">？</button>
      </div>
      <div style="margin-bottom:6px;">
        <img src="assets/others/coin.jpg" style="width:22px;vertical-align:middle;"> <span style="color:#ffe6b3;">×${diplomat.coins}</span>
      </div>
      <div style="margin-bottom:6px;cursor:pointer;" title="点击查看手牌" id="diplomat-hand-area">
        <img src="assets/others/card_back.jpg" style="width:28px;height:40px;vertical-align:middle;border-radius:4px;box-shadow:0 1px 4px #0006;">
        <span style="color:#ffe6b3;">×${diplomat.hand.length}</span>
      </div>
      <div style="margin-bottom:10px;">
        <span style="color:#aaa;font-size:0.95rem;">（暂无已建造地区）</span>
      </div>
      <button class="main-btn" id="diplomat-get-coin-btn" style="margin-top:10px;">外交官选择拿取4枚金币</button>
    </div>
  `;

  // 弹窗
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.85)';
  popup.style.zIndex = '4000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = html;
  document.body.appendChild(popup);

  // 禁止查看外交官手牌
  setTimeout(() => {
    const handArea = document.getElementById('diplomat-hand-area');
    if (handArea) {
      handArea.onclick = () => {
        const tip = document.createElement('div');
        tip.style.position = 'fixed';
        tip.style.left = '0'; tip.style.top = '0'; tip.style.right = '0'; tip.style.bottom = '0';
        tip.style.background = 'rgba(0,0,0,0.85)';
        tip.style.zIndex = '6000';
        tip.style.display = 'flex';
        tip.style.alignItems = 'center';
        tip.style.justifyContent = 'center';
        tip.innerHTML = `
          <div style="background:#2d1c13;padding:18px 16px 12px 16px;border-radius:12px;max-width:320px;box-shadow:0 2px 16px #000a;text-align:center;">
            <div style="color:#ffe6b3;font-size:1.1rem;margin-bottom:12px;">没有特殊技能的您不能查看他人卡牌哦~</div>
            <button class="main-btn" onclick="this.parentNode.parentNode.remove()">关闭</button>
          </div>
        `;
        document.body.appendChild(tip);
        playSound('notification');
      };
    }
  }, 0);

  // 拿金币按钮
  document.getElementById('diplomat-get-coin-btn').onclick = () => {
    playSound('coin');
    diplomat.coins += 4;
    // 自动建造1~2个地区，总花费≤8金币
    setTimeout(() => {
      let total = 0, built = [];
      for (let i = 0; i < diplomat.hand.length; i++) {
        if (built.length < 2 && total + diplomat.hand[i].score <= 8 && diplomat.coins >= diplomat.hand[i].score) {
          built.push(diplomat.hand[i]);
          total += diplomat.hand[i].score;
          diplomat.coins -= diplomat.hand[i].score;
        }
      }
      diplomat.built = built;
      diplomat.hand = diplomat.hand.filter(card => !built.includes(card));
      showDiplomatRedBonus(diplomat, popup, total, built);
    }, 600);
  };
}

function showDiplomatRedBonus(diplomat, popup, buildTotal, built) {
  // 统计红色（军事）地区数量
  const redCount = diplomat.built.filter(card => card.color === 'red').length;
  let bonus = redCount;
  diplomat.coins += bonus;

  let buildMsg = built && built.length > 0
    ? `外交官建造了${built.length}个地区（总花费${buildTotal}金币），`
    : '外交官本回合未建造地区，';

  popup.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
      <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:12px;">
        ${buildMsg}获得${bonus}枚红色地区奖励金币
      </div>
      <img src="assets/roles/diplomat.jpg" style="width:120px;height:180px;border-radius:14px;box-shadow:0 2px 16px #000a;margin-bottom:18px;">
      <button class="main-btn" id="diplomat-skill-btn">发动技能</button>
    </div>
  `;
  document.getElementById('diplomat-skill-btn').onclick = () => {
    showDiplomatSkill(diplomat, popup);
  };
}

function showDiplomatSkill(diplomat, popup) {
  playSound('magic');
  // 技能：自动选择自己和其他玩家各一个地区（优先高分），如果金币足够则交换（支付差额），否则放弃技能
  let msg = '';
  // 只考虑有已建造地区的玩家
  const candidates = players.filter(p => p.roleKey !== 'diplomat' && p.built && p.built.length > 0);
  if (diplomat.built.length > 0 && candidates.length > 0) {
    // 自己最高分的地区
    let myIdx = diplomat.built.reduce((maxIdx, card, idx, arr) => card.score > arr[maxIdx].score ? idx : maxIdx, 0);
    let myCard = diplomat.built[myIdx];
    // 目标玩家及其最高分地区
    let targetPlayer = candidates[Math.floor(Math.random() * candidates.length)];
    let targetIdx = targetPlayer.built.reduce((maxIdx, card, idx, arr) => card.score > arr[maxIdx].score ? idx : maxIdx, 0);
    let targetCard = targetPlayer.built[targetIdx];
    // 计算差额
    let diff = Math.max(0, targetCard.score - myCard.score);
    if (diplomat.coins >= diff) {
      diplomat.coins -= diff;
      // 交换
      diplomat.built[myIdx] = targetCard;
      targetPlayer.built[targetIdx] = myCard;
      msg = `外交官用${districtNameMap[myCard.name] || myCard.name}与${targetPlayer.role}的${districtNameMap[targetCard.name] || targetCard.name}交换，支付${diff}金币`;
    } else {
      msg = `外交官金币不足，无法发动技能交换地区`;
    }
  } else {
    msg = `没有可交换的地区，外交官放弃技能`;
  }

  // 弹窗展示技能结果
  popup.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
      <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:12px;">${msg}</div>
      <img src="assets/roles/diplomat.jpg" style="width:120px;height:180px;border-radius:14px;box-shadow:0 2px 16px #000a;margin-bottom:18px;">
      <button class="main-btn" id="diplomat-bless-btn">外交官：“能动手绝不动口。”</button>
    </div>
  `;
  document.getElementById('diplomat-bless-btn').onclick = () => {
    showDiplomatBlessingVideo(() => {
      if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
      // 外交官行动结束，进入下一个角色或结算
      // 你可以在这里跳转到下一个角色，如 showAllPlayersPanel() 或 showGameResult()
      showAllPlayersPanel(players, () => {
        showWarlordSkill(players, () => {
          showGameResult();
        });
      });
    });
  };
}

function showDiplomatBlessingVideo(onClose) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.95)';
  popup.style.zIndex = '5000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#2d1c13;padding:10px 10px 10px 10px;border-radius:14px;max-width:98vw;max-height:98vh;box-shadow:0 2px 16px #000a;text-align:center;display:flex;flex-direction:column;align-items:center;">
      <video id="diplomat-bless-video" src="assets/videos/diplomat.mp4" style="width:100vw;max-width:420px;height:70vh;border-radius:10px;background:#000;" controls poster="" preload="auto"></video>
      <div style="margin-top:10px;display:flex;gap:16px;justify-content:center;">
        <button id="diplomat-bless-play" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">▶</button>
        <button id="diplomat-bless-close" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  playSound('notification');
  const video = document.getElementById('diplomat-bless-video');
  document.getElementById('diplomat-bless-play').onclick = () => {
    video.currentTime = 0;
    video.play();
  };
  document.getElementById('diplomat-bless-close').onclick = () => {
    if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
    if (onClose) onClose();
  };
  video.onended = () => {
    // 播放完毕后出现“再次播放”和“关闭”按钮
    popup.querySelector('div[style*="margin-top:10px"]').innerHTML = `
      <button id="diplomat-bless-replay" class="main-btn" style="padding:6px 18px;font-size:1.1rem;">⟳ 再次播放</button>
      <button id="diplomat-bless-close2" class="main-btn" style="padding:6px 18px;font-size:1.1rem;background:#a33;color:#fff;">✖ 关闭</button>
    `;
    document.getElementById('diplomat-bless-replay').onclick = () => {
      video.currentTime = 0;
      video.play();
    };
    document.getElementById('diplomat-bless-close2').onclick = () => {
      if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
      if (onClose) onClose();
    };
  };
}

function showAllPlayersPanel(players, onContinue) {
  playSound('cover');
  // 计算分数并排序
  const results = players.map((p, idx) => {
    const districtScore = (p.built || []).reduce((sum, card) => sum + (card.score || 0), 0);
    return {
      idx,
      name: p.name,
      role: p.role,
      roleKey: p.roleKey,
      coins: p.coins || 0,
      built: p.built || [],
      hand: p.hand || [],
      score: districtScore + (p.coins || 0)
    };
  });
  results.sort((a, b) => b.score - a.score);

  // 构建HTML
  let html = `<div style="max-height:70vh;overflow-y:auto;padding:20px 0;">`;
  results.forEach((p, rank) => {
    html += `
      <div class="player-summary-block" style="
        display:flex;align-items:center;gap:18px;margin-bottom:18px;
        background:${rank === 0 ? '#3b2c23' : '#2d1c13'};
        padding:14px 18px;border-radius:12px;box-shadow:0 2px 8px #0005;
        position:relative;${rank === 0 ? 'border:2.5px solid #ffe6b3;' : ''}
      ">
        <img src="assets/roles/${p.roleKey}.jpg" style="width:54px;height:54px;border-radius:10px;box-shadow:0 1px 4px #0006;">
        <div style="flex:1;">
          <div style="font-weight:bold;font-size:1.15rem;color:#ffe6b3;">
            ${rank + 1}. ${p.name}（${p.role}）
            ${rank === 0 ? '<span id="crown-placeholder" style="display:inline-block;width:32px;height:32px;vertical-align:middle;"></span>' : ''}
          </div>
          <div style="color:#ffe6b3;font-size:1.05rem;">
            金币：${p.coins}　已建造：${p.built.length}　手牌：${p.hand.length}　总分：<b style="color:#ffd700;">${p.score}</b>
          </div>
          <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
            ${p.built.map(card => `
              <div style="display:flex;flex-direction:column;align-items:center;">
                <img src="${card.img}" title="${districtNameMap[card.name] || card.name}" style="width:32px;height:40px;border-radius:4px;box-shadow:0 1px 4px #0006;">
                <span style="color:#ffe6b3;font-size:0.92rem;">${districtNameMap[card.name] || card.name}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  });
  html += `</div>
    <div style="text-align:center;margin-top:10px;">
      <button class="main-btn" id="all-players-continue-btn" style="font-size:1.15rem;padding:12px 38px;">继续</button>
    </div>
  `;

  // 弹窗
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.92)';
  popup.style.zIndex = '5000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#1a1a1a;padding:24px 18px 16px 18px;border-radius:16px;max-width:540px;width:98vw;box-shadow:0 2px 16px #000a;">
      <div style="font-size:1.3rem;color:#ffe6b3;text-align:center;margin-bottom:18px;">所有角色行动回合已结束<br>当前得分排名</div>
      ${html}
    </div>
  `;
  document.body.appendChild(popup);

  // 动画准备：皇冠飞入
  setTimeout(() => {
    const placeholder = document.getElementById('crown-placeholder');
    if (placeholder) {
      const crown = document.createElement('img');
      crown.src = 'assets/others/crown.jpg';
      crown.className = 'crown-img';
      crown.style.width = '32px';
      crown.style.height = '32px';
      crown.style.marginLeft = '2px';
      crown.style.verticalAlign = 'middle';
      crown.style.position = 'relative';
      crown.style.top = '-8px';
      crown.style.left = '2px';
      crown.style.filter = 'drop-shadow(0 2px 6px #ffe6b3cc)';
      crown.style.opacity = '0';
      placeholder.appendChild(crown);
      setTimeout(() => {
        crown.style.transition = 'opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1)';
        crown.style.opacity = '1';
        crown.style.transform = 'scale(1.2) rotate(-10deg)';
      }, 200);
    }
  }, 400);

  document.getElementById('all-players-continue-btn').onclick = () => {
    document.body.removeChild(popup);
    if (onContinue) onContinue();
  };
}

function showWarlordSkill(players, onFinish) {
  // 找到军阀对象
  const warlord = players.find(p => p.roleKey === 'warlord');
  // 不能破坏主教的地区
  const bishop = players.find(p => p.roleKey === 'bishop');
  // 收集所有可被破坏的地区
  let bestTarget = null;
  let bestValue = -Infinity;
  players.forEach(p => {
    if (p === warlord) return;
    if (bishop && p === bishop) return; // 不能破坏主教
    p.built.forEach((card, idx) => {
      // 破坏价值=地区分数-破坏成本
      const cost = Math.max(0, card.score - 1);
      if (warlord.coins >= cost) {
        // 优先炸第一名的高分建筑
        const value = card.score + (p === players[0] ? 2 : 0); // 炸第一名加权
        if (value > bestValue) {
          bestValue = value;
          bestTarget = { player: p, card, idx, cost };
        }
      }
    });
  });

  // 弹窗
  let html = `<div style="text-align:center;">
    <img src="assets/roles/warlord.jpg" style="width:60px;height:60px;border-radius:10px;"><br>
    <div style="font-size:1.1rem;color:#ffe6b3;margin:10px 0 8px 0;">军阀正在思考要攻打谁…</div>
  `;
  if (bestTarget) {
    html += `
      <div style="color:#ffe6b3;margin-bottom:8px;">
        军阀决定攻打 <b>${bestTarget.player.name}</b> 的地区
        <img src="${bestTarget.card.img}" title="${districtNameMap[bestTarget.card.name] || bestTarget.card.name}" style="width:32px;height:44px;vertical-align:middle;border-radius:4px;">
        <b>${districtNameMap[bestTarget.card.name] || bestTarget.card.name}</b>，支付${bestTarget.cost}金币。
      </div>
      <button class="main-btn" id="warlord-skill-confirm-btn">执行破坏</button>
    `;
  } else {
    html += `<div style="color:#ffe6b3;">没有可破坏的地区，军阀放弃技能。</div>
      <button class="main-btn" id="warlord-skill-confirm-btn">继续</button>
    `;
  }
  html += `</div>`;

  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.92)';
  popup.style.zIndex = '6000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#1a1a1a;padding:24px 18px 16px 18px;border-radius:16px;max-width:420px;width:92vw;box-shadow:0 2px 16px #000a;">
      ${html}
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById('warlord-skill-confirm-btn').onclick = () => {
    if (bestTarget) {
      // 动画高亮被炸建筑
      playSound('magic');
      // 扣金币，移除地区
      warlord.coins -= bestTarget.cost;
      bestTarget.player.built.splice(bestTarget.idx, 1);
    }
    document.body.removeChild(popup);
    if (onFinish) onFinish();
  };
}

function showGameResult() {
  // 计算分数
  const results = players.map(p => {
    const districtScore = (p.built || []).reduce((sum, card) => sum + (card.score || 0), 0);
    return {
      name: p.name,
      role: p.role,
      roleKey: p.roleKey,
      score: districtScore + (p.coins || 0)
    };
  });

  // 按分数降序排序
  results.sort((a, b) => b.score - a.score);

  // 展示结果
  let html = `<div style="font-size:1.3rem;color:#ffe6b3;text-align:center;margin-bottom:18px;">游戏结算</div>`;
  html += `<table style="width:100%;color:#ffe6b3;font-size:1.1rem;text-align:center;border-collapse:separate;border-spacing:0 8px;">`;
  html += `<tr><th>排名</th><th>姓名</th><th>角色</th><th>总分</th></tr>`;
  results.forEach((r, idx) => {
    html += `<tr style="${idx === 0 ? 'background:#3b2c23;font-weight:bold;color:#ffd700;' : ''}">
      <td style="padding:6px 0;position:relative;">
        ${idx+1}
        ${idx === 0 ? '<span id="crown-final-placeholder" style="display:inline-block;width:32px;height:32px;vertical-align:middle;"></span>' : ''}
      </td>
      <td>${r.name}</td>
      <td>${r.role}</td>
      <td>${r.score}</td>
    </tr>`;
  });
  html += `</table>
    <div style="text-align:center;margin-top:18px;">
      <button class="main-btn" onclick="location.reload()">再玩一次</button>
    </div>
  `;

  // 弹窗
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '0'; popup.style.top = '0'; popup.style.right = '0'; popup.style.bottom = '0';
  popup.style.background = 'rgba(0,0,0,0.92)';
  popup.style.zIndex = '7000';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.innerHTML = `
    <div style="background:#1a1a1a;padding:24px 18px 16px 18px;border-radius:16px;max-width:520px;width:96vw;box-shadow:0 2px 16px #000a;">
      ${html}
    </div>
  `;
  document.body.appendChild(popup);

  // 动画：皇冠飞到第一名
  setTimeout(() => {
    const placeholder = document.getElementById('crown-final-placeholder');
    if (placeholder) {
      const crown = document.createElement('img');
      crown.src = 'assets/others/crown.jpg';
      crown.className = 'crown-img';
      crown.style.width = '32px';
      crown.style.height = '32px';
      crown.style.marginLeft = '2px';
      crown.style.verticalAlign = 'middle';
      crown.style.position = 'relative';
      crown.style.top = '-8px';
      crown.style.left = '2px';
      crown.style.filter = 'drop-shadow(0 2px 6px #ffe6b3cc)';
      crown.style.opacity = '0';
      placeholder.appendChild(crown);
      setTimeout(() => {
        crown.style.transition = 'opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1)';
        crown.style.opacity = '1';
        crown.style.transform = 'scale(1.2) rotate(-10deg)';
      }, 200);
    }
  }, 400);
}


