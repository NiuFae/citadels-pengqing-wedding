// ========== 资源数据 ==========
const rulesText = `欢迎来到富饶之城！<br><br>
你和你的伴侣与其他12位玩家将作为本局游戏的主角，体验一场充满策略与惊喜的桌游之旅。<br><br>
<b>游戏流程如下：</b><br>
1. 游戏开始时，每位玩家将从三张神秘的角色卡中各自抽取一张，开启属于自己的角色身份。<br>
2. 本局游戏共有14种不同角色，角色的行动顺序依次为：刺客、盗贼、魔法师、国王、主教、商人、建筑师、军阀、皇后、炼金术士、航海家、美术师、巫师、外交官。<br>
3. 回合开始前，每位玩家会获得4张随机地区卡和4枚金币。<br>
4. 游戏将依次模拟每个角色的行动，每位角色可通过抽卡、拿金币、建造地区等方式发展自己的城市。<br>
5. 回合结束后，根据已建造地区和剩余金币计算分数，公布最终排名。<br><br>
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
  // 自动播放封面音效
  setTimeout(() => {
    coverAudio.volume = 0.7;
    coverAudio.play().catch(() => {});
  }, 400);
});

startBtn.addEventListener('click', () => {
  playSound('click');
  showSection('rules-section');
  // 填充规则内容
  document.getElementById('rules-content').innerHTML = rulesText;
  renderBackToCoverBtn();
});

// ========== 规则简介区 ==========
const toRoleBtn = document.getElementById('to-role-btn');
function renderBackToCoverBtn() {
  // 避免重复添加
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
  // 插入到规则按钮下方
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

// 角色抽取顺序：P抽国王，W抽皇后
const roleDrawOrder = [
  { player: '彭青', role: '国王', img: 'assets/roles/king.jpg' },
  { player: '吴璨', role: '皇后', img: 'assets/roles/queen.jpg' },
];
let currentDraw = 0;
let drawTip = null;

function renderRoleDraw() {
  roleDrawArea.innerHTML = '';
  roleResult.classList.add('hidden');
  // 只显示“请玩家 XX 抽取角色”
  if (!drawTip) {
    drawTip = document.createElement('div');
    drawTip.className = 'draw-tip';
    roleSection.insertBefore(drawTip, roleDrawArea);
  }
  drawTip.textContent = `请玩家 ${roleDrawOrder[currentDraw].player} 抽取角色`;
  drawTip.style.display = '';
  // 生成三张背面卡
  for (let i = 0; i < 3; i++) {
    const card = document.createElement('div');
    card.className = 'role-card-back';
    card.addEventListener('click', () => handleRoleCardClick(card));
    roleDrawArea.appendChild(card);
  }
}

function handleRoleCardClick(card) {
  playSound('shuffle');
  // 翻转动画
  card.classList.add('flipped');
  setTimeout(() => {
    card.className = 'role-card-front';
    card.innerHTML = `<img src="${roleDrawOrder[currentDraw].img}" alt="${roleDrawOrder[currentDraw].role}" style="width:92%;height:92%;border-radius:12px;">`;
    // 只保留当前卡
    Array.from(roleDrawArea.children).forEach((c, idx) => {
      if (c !== card) c.style.display = 'none';
    });
    // 隐藏上方提示
    if (drawTip) drawTip.style.display = 'none';
    // 展示结果
    setTimeout(() => {
      // 只在角色名加粗加大，其他正常
      roleResultText.innerHTML = `${roleDrawOrder[currentDraw].player} 抽到的角色是 <span style="font-weight:bold;font-size:2.1rem;color:#ffe6b3;">${roleDrawOrder[currentDraw].role}</span>！`;
      roleResult.classList.remove('hidden');
      playSound('notification');
      // 放大结果卡牌
      card.style.width = '56vw';
      card.style.height = '76vw';
      card.style.maxWidth = '340px';
      card.style.maxHeight = '440px';
      card.style.minWidth = '180px';
      card.style.minHeight = '220px';
      // 结果提示字体适当缩小，始终一行
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

// 地区卡英文名到中文名映射
const districtNameMap = {
  palace: "宫殿", castle: "城堡", manor: "庄园", fortress: "要塞", battlefield: "战场", prison: "监狱", watchtower: "了望塔",
  cathedral: "大教堂", monastery: "修道院", church: "教堂", temple: "神庙", townhall: "市政厅", harbor: "港口",
  docks: "船坞", tradingpost: "商栈", market: "集市", tavern: "酒馆", dragongate: "巨龙门", university: "大学",
  greatwall: "长城", library: "图书馆", school: "学校", graveyard: "墓地", laboratory: "实验室", observatory: "天文台",
  smithy: "铁匠铺", keep: "堡垒", hauntedciry: "鬼城"
};

// 玩家数据结构
const players = [
  {
    name: "彭青",
    role: "国王",
    coins: 4,
    hand: [],
    built: []
  },
  {
    name: "吴璨",
    role: "皇后",
    coins: 4,
    hand: [],
    built: []
  }
];

// 洗牌算法
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 生成完整的地区卡牌堆
const districtCards = [
  { name: "palace", score: 5, color: "yellow", img: "assets/cards/palace.jpg", count: 3 },
  { name: "castle", score: 4, color: "yellow", img: "assets/cards/castle.jpg", count: 4 },
  { name: "manor", score: 3, color: "yellow", img: "assets/cards/manor.jpg", count: 5 },
  { name: "fortress", score: 5, color: "red", img: "assets/cards/fortress.jpg", count: 2 },
  { name: "battlefield", score: 3, color: "red", img: "assets/cards/battlefield.jpg", count: 3 },
  { name: "prison", score: 2, color: "red", img: "assets/cards/prison.jpg", count: 3 },
  { name: "watchtower", score: 1, color: "red", img: "assets/cards/watchtower.jpg", count: 3 },
  { name: "cathedral", score: 5, color: "blue", img: "assets/cards/cathedral.jpg", count: 2 },
  { name: "monastery", score: 3, color: "blue", img: "assets/cards/monastery.jpg", count: 3 },
  { name: "church", score: 2, color: "blue", img: "assets/cards/church.jpg", count: 3 },
  { name: "temple", score: 1, color: "blue", img: "assets/cards/temple.jpg", count: 3 },
  { name: "townhall", score: 5, color: "green", img: "assets/cards/townhall.jpg", count: 2 },
  { name: "harbor", score: 4, color: "green", img: "assets/cards/harbor.jpg", count: 3 },
  { name: "docks", score: 3, color: "green", img: "assets/cards/docks.jpg", count: 3 },
  { name: "tradingpost", score: 2, color: "green", img: "assets/cards/tradingpost.jpg", count: 3 },
  { name: "market", score: 2, color: "green", img: "assets/cards/market.jpg", count: 4 },
  { name: "tavern", score: 1, color: "green", img: "assets/cards/tavern.jpg", count: 5 }
  // ... 可继续补充紫色卡等
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

// 发牌：每位玩家4张手牌
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

let currentPlayerIdx = 0; // 0: 彭青, 1: 吴璨

function enterGameMain() {
  dealInitialCards();
  currentPlayerIdx = 0;
  showDealIntro();
}

// 发牌引导语和按钮
function showDealIntro() {
  cardArea.innerHTML = '';
  actionArea.innerHTML = '';
  playerInfo.textContent = '';
  document.getElementById('coin-count').textContent = '4';

  // 引导语
  const intro = document.createElement('div');
  intro.className = 'rules-content';
  intro.innerHTML = `回合开始前，每位玩家会获得4张随机地区卡和4枚金币。`;
  cardArea.appendChild(intro);

  // “返回查看游戏规则”按钮
  const backBtn = document.createElement('button');
  backBtn.className = 'main-btn';
  backBtn.textContent = '返回查看游戏规则';
  backBtn.onclick = () => {
    playSound('click');
    showSection('rules-section');
  };
  actionArea.appendChild(backBtn);

  // “看看 XX 的运气如何”按钮
  const dealBtn = document.createElement('button');
  dealBtn.className = 'main-btn';
  dealBtn.style.marginTop = '18px';
  dealBtn.textContent = `看看 ${players[currentPlayerIdx].name} 的运气如何`;
  dealBtn.onclick = () => {
    playSound('shuffle');
    showDealAnimation();
  };
  actionArea.appendChild(dealBtn);
}

// ========== 主游戏区：发牌动画 ==========

function showDealAnimation() {
  cardArea.innerHTML = '';
  actionArea.innerHTML = '';
  playerInfo.textContent = `当前玩家：${players[currentPlayerIdx].name}（${players[currentPlayerIdx].role}）`;
  document.getElementById('coin-count').textContent = players[currentPlayerIdx].coins;

  // 卡牌背面
  const hand = players[currentPlayerIdx].hand;
  const cardGrid = document.createElement('div');
  cardGrid.style.display = 'grid';
  cardGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
  cardGrid.style.gridGap = '18px';
  cardGrid.style.justifyItems = 'center';
  cardGrid.style.margin = '24px 0 12px 0';
  cardGrid.style.width = '100%';

  // 先渲染4张背面
  for (let i = 0; i < 4; i++) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'district-card';
    cardDiv.style.background = `url('assets/others/card_back.jpg') center/cover no-repeat`;
    cardDiv.style.width = '90px';
    cardDiv.style.height = '130px';
    cardDiv.style.position = 'relative';
    cardGrid.appendChild(cardDiv);
  }
  cardArea.appendChild(cardGrid);

  // 动画依次翻转
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
        <img src="${hand[idx].img}" alt="${districtNameMap[hand[idx].name] || hand[idx].name}" style="width:100%;height:80px;object-fit:cover;border-radius:8px 8px 0 0;">
        <div class="district-info" style="font-size:1.1rem;font-weight:bold;color:#ffe6b3;">${districtNameMap[hand[idx].name] || hand[idx].name}</div>
      `;
      cardDiv.style.transform = 'rotateY(0deg)';
      playSound('shuffle');
      setTimeout(() => flipCard(idx + 1), 350);
    }, 200);
  }

  // 显示卡牌中文名
  function showCardNames() {
    // “继续获得4枚金币”按钮
    actionArea.innerHTML = '';
    const nextBtn = document.createElement('button');
    nextBtn.className = 'main-btn';
    nextBtn.textContent = '继续获得4枚金币';
    nextBtn.onclick = () => {
      playSound('click');
      showCoinAnimation();
    };
    actionArea.appendChild(nextBtn);

    // “返回查看游戏规则”按钮
    const backBtn = document.createElement('button');
    backBtn.className = 'main-btn';
    backBtn.style.marginTop = '12px';
    backBtn.textContent = '返回查看游戏规则';
    backBtn.onclick = () => {
      playSound('click');
      showSection('rules-section');
    };
    actionArea.appendChild(backBtn);
  }
}

// ========== 主游戏区：金币动画 ==========

function showCoinAnimation() {
  cardArea.innerHTML = '';
  actionArea.innerHTML = '';
  playerInfo.textContent = `当前玩家：${players[currentPlayerIdx].name}（${players[currentPlayerIdx].role}）`;

  // 动画区域
  const coinArea = document.createElement('div');
  coinArea.style.display = 'flex';
  coinArea.style.justifyContent = 'center';
  coinArea.style.alignItems = 'center';
  coinArea.style.margin = '40px 0 24px 0';
  coinArea.style.height = '100px';
  cardArea.appendChild(coinArea);

  // 动画依次出现金币
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

  // 合并金币为x4
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

    // 更新金币数
    document.getElementById('coin-count').textContent = players[currentPlayerIdx].coins;

    // “继续”按钮
    actionArea.innerHTML = '';
    const nextBtn = document.createElement('button');
    nextBtn.className = 'main-btn';
    if (currentPlayerIdx === 0) {
      nextBtn.textContent = '轮到 吴璨 发牌';
    } else {
      nextBtn.textContent = '进入主游戏操作区';
    }
    nextBtn.onclick = () => {
      playSound('click');
      if (currentPlayerIdx === 0) {
        currentPlayerIdx = 1;
        showDealIntro();
      } else {
        // 这里后续可进入主操作区
        // renderGameMain();
        // 你可以在这里继续开发主操作区
      }
    };
    actionArea.appendChild(nextBtn);

    // “返回查看游戏规则”按钮
    const backBtn = document.createElement('button');
    backBtn.className = 'main-btn';
    backBtn.style.marginTop = '12px';
    backBtn.textContent = '返回查看游戏规则';
    backBtn.onclick = () => {
      playSound('click');
      showSection('rules-section');
    };
    actionArea.appendChild(backBtn);
  }
}
