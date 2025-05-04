// ========== 角色技能描述和祝福视频 ==========
const roleSkills = {
  assassin: "选择一个角色 (而非玩家) 并将其干掉。被暗杀的角色不可以出声。被干掉的角色因此而少了一个回合。",
  thief: "选择并洗劫一个角色 (而非玩家)。当读出角色名字时，这名玩家要将自己所有金币交给盗贼。注意： 盗贼不能打劫刺客或者被刺客暗杀的角色。",
  magician: "魔法师在自己回合任何时间都可以执行以下其中一项行动：1.与另一名玩家交换所有手牌(不包括桌子上已打出的地区卡)。如果魔法师手上没有牌，则当作是拿走任何一个玩家的手牌。或者2.选择弃掉手上一定数量的地区卡，然后从牌迭顶方抽回同等数量的地区卡。被弃掉的地区卡要放在牌堆最底处。",
  king: "做国王的玩家首先拿取皇冠，在下一个回合国王是起始玩家。国王计算自己已经建设了的贵族地区 (金色)，每有一个贵族地区可得一枚金币。如果下一个回合没有人选择做国王，这个回合的国王可以在下一个回合继续持有皇冠。",
  bishop: "做主教的玩家计算自己已经建设了的宗教地区 (蓝色)，每有一个宗教地区可得一枚金币。此外，军阀不可以攻打主教。",
  merchant: "在回合开始时，除了选择拿2枚金币或者抽地区卡之外，商人还可以额外获得1枚金币。然后，商人计算自己已经建设了的商业地区 (绿色)，每有一个商业地区可得一枚金币。",
  architect: "在回合开始时，建筑师除了选择拿2枚金币或者抽地区卡之外，还可以额外再抽2张地区卡。此外，建筑师可以在自己回合建设最多3个地区。",
  warlord: "选择做军阀的玩家数自己已经建设了的军事地区(红色)，每有一个军事地区可得一枚金币。在回合结束时，军阀能够选择攻打并破坏任何一个地区。破坏价值1元的地区是免费的，破坏其它建筑费用较昂贵的地区则需要支付『建筑费用-1』的金币。例：领主破坏一个价值2枚金币的地区要支付1枚金币；领主破坏一个价值5枚金币的地区要支付4枚金币，如此类推。不过，正式规则中，如果有玩家已经建立了8个地区(将要完结游戏)，军阀就不能攻打该名玩家。",
  queen: "如果皇后坐在国王旁边，就可以获得3枚金币，即使国王被暗杀了，你仍然可以使用这项能力。",
  alchemist: "炼金术士可以拿回在这个回合中，建筑地区所需要的所有金币 (不包括其它开 支，例如不能拿回给税务员的1枚金币)。例：如果只得4枚金币，不可以先付4元，取回4元，再给4元去建设8元的地区，炼金术士最多只能建4元的地区，然后拿回4 元。",
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
    assassin: "刺客", thief: "盗贼", magician: "魔术师", king: "国王", bishop: "主教", merchant: "商人",
    architect: "建筑师", warlord: "军阀", queen: "皇后", alchemist: "炼金术士", navigator: "航海家",
    artist: "美术家", wizard: "巫师", diplomat: "外交官"
  };
  return map[role] || role;
}

// 玩家信息面板渲染
function renderPlayerPanel(currentIdx = 0) {
  const panel = document.getElementById('player-panel');
  panel.innerHTML = '';
  players.forEach((p, idx) => {
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
1. 游戏开始时，每位玩家将从三张神秘的角色卡中各自抽取一张，开启属于自己的角色身份。<br>
2. 本局游戏共有14种不同角色，角色的行动顺序依次为：刺客、盗贼、魔法师、国王、主教、商人、建筑师、军阀、皇后、炼金术士、航海家、美术师、巫师、外交官。<br>
3. 回合开始前，每位玩家会获得4张随机地区卡和4枚金币。<br>
4. 游戏将依次模拟每个角色的行动，每位角色可通过抽卡、拿金币、建造地区等方式发展自己的城市。<br>
5. 第一回合结束后，根据已建造地区和剩余金币计算分数，公布最终排名。<br><br>
祝你们在富饶之城中收获幸福与美好回忆！<br><br>
<b>地区卡说明：</b><br>
1. 每张地区卡左上角的数字，表示建造该地区所需的金币数，同时也是该地区的分数。<br>
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
  {
    name: "彭青",
    role: "国王",
    roleKey: "king",
    coins: 4,
    hand: [],
    built: []
  },
  {
    name: "吴璨",
    role: "皇后",
    roleKey: "queen",
    coins: 4,
    hand: [],
    built: []
  }
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
    players[i].hand = [];
    for (let j = 0; j < 4; j++) {
      players[i].hand.push(deck.pop());
    }
    players[i].coins = 4;
    players[i].built = [];
  }
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

  const hand = players[currentPlayerIdx].hand;
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
      nextBtn.textContent = '接下来，请 彭青 获得4枚金币';
    } else {
      nextBtn.textContent = '接下来，请 吴璨 获得4枚金币';
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
  // 假设刺客是虚拟玩家
  const assassin = {
    name: "GPT老师",
    role: "刺客",
    roleKey: "assassin",
    coins: 4,
    hand: generateDistrictDeck().slice(0, 4), // 随机4张
    built: []
  };

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
        <img src="assets/others/coin.jpg" style="width:22px;vertical-align:middle;"> <span style="color:#ffe6b3;">${assassin.coins}</span>
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
        <button class="main-btn" id="assassin-kill-btn">刺客选择刺杀【商人】</button>
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
          // 随机建造1~2个地区，总花费≤8
          let total = 0, built = [];
          for (let i = 0; i < assassin.hand.length; i++) {
            if (built.length < 2 && total + assassin.hand[i].score <= 8) {
              built.push(assassin.hand[i]);
              total += assassin.hand[i].score;
            }
          }
          assassin.built = built;
          popup.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
              <div style="color:#ffe6b3;font-size:1.2rem;margin-bottom:18px;">刺客建造了${built.length}个地区，总花费${total}金币</div>
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


