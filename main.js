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
    // TODO: 进入主游戏区
    showSection('game-section');
    // 后续主游戏流程待补充
  }
});
