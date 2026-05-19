const guides = [
  {
    id: "wukong-start",
    game: "黑神话：悟空",
    title: "新手开荒路线",
    difficulty: "新手向",
    estimate: "15 分钟读完",
    summary: "适合第一次上手的玩家，先避开容易卡住的路线和资源浪费。",
    overview: "这篇攻略的重点不是把所有内容一次讲完，而是先帮玩家顺利度过前期，少走弯路。",
    keyPoints: [
      "优先熟悉闪避和识破节奏，不要急着追求高伤害。",
      "前期先把常用法术和回血手段稳定下来。",
      "卡关时先回头补资源，不要硬拼。"
    ],
    steps: [
      "先清理出生点附近小怪，熟悉轻攻击和重攻击衔接。",
      "遇到精英怪时，先观察一轮动作，再决定出手时机。",
      "把第一次拿到的强化材料优先投入常用武器。"
    ]
  },
  {
    id: "genshin-daily",
    game: "原神",
    title: "每日体力最省心分配",
    difficulty: "日常向",
    estimate: "8 分钟读完",
    summary: "想少花时间又不浪费体力，这篇适合做每日规划。",
    overview: "这个版本适合轻度玩家，核心目标是用最少时间拿到最稳定的养成收益。",
    keyPoints: [
      "先清体力，再做临时活动，避免收益溢出。",
      "角色材料和武器材料要按主力阵容排优先级。",
      "不要平均培养所有角色，先保 1 到 2 个主队。"
    ],
    steps: [
      "登录后先看今天开放的副本材料。",
      "如果主 C 缺突破材料，优先打角色突破本。",
      "剩余体力再投到圣遗物本，不追求一步毕业。"
    ]
  },
  {
    id: "zelda-beginner",
    game: "塞尔达传说",
    title: "前期探索避坑笔记",
    difficulty: "探索向",
    estimate: "10 分钟读完",
    summary: "给喜欢慢慢探索的玩家，重点是少错过关键道具和提示。",
    overview: "塞尔达的乐趣很大一部分在探索，但前期如果完全没方向，也可能会有点乱，这篇就是先给一个轻路线。",
    keyPoints: [
      "开塔优先于乱跑，这样地图信息更完整。",
      "看到神庙先标记，能过就过，过不了先记住位置。",
      "前期武器耐久很紧张，别把好武器浪费在小怪身上。"
    ],
    steps: [
      "先保证地图解锁节奏，再顺路拿神庙。",
      "做饭和耐寒准备要尽早学会。",
      "遇到暂时打不过的敌人，绕开并做地图标记。"
    ]
  }
];

const searchInput = document.getElementById("searchInput");
const guideCards = document.getElementById("guideCards");
const guideDetail = document.getElementById("guideDetail");

let activeGuideId = guides[0].id;

function renderCards(items) {
  if (items.length === 0) {
    guideCards.innerHTML = '<div class="empty-state">没有找到匹配的攻略。你可以稍后把关键词改短一点再试试。</div>';
    guideDetail.innerHTML = '<div class="empty-state">先从左侧重新选择一篇攻略。</div>';
    return;
  }

  if (!items.some((item) => item.id === activeGuideId)) {
    activeGuideId = items[0].id;
  }

  guideCards.innerHTML = items
    .map((guide) => `
      <article class="guide-card ${guide.id === activeGuideId ? "active" : ""}" data-guide-id="${guide.id}">
        <span class="tag">${guide.game}</span>
        <h3>${guide.title}</h3>
        <div class="meta">
          <span>${guide.difficulty}</span>
          <span>${guide.estimate}</span>
        </div>
        <p>${guide.summary}</p>
      </article>
    `)
    .join("");

  renderDetail(items.find((item) => item.id === activeGuideId));

  document.querySelectorAll(".guide-card").forEach((card) => {
    card.addEventListener("click", () => {
      activeGuideId = card.dataset.guideId;
      renderCards(items);
    });
  });
}

function renderDetail(guide) {
  guideDetail.innerHTML = `
    <p class="section-kicker">${guide.game}</p>
    <h2 class="detail-title">${guide.title}</h2>
    <p class="detail-lead">${guide.overview}</p>
    <div class="meta">
      <span>${guide.difficulty}</span>
      <span>${guide.estimate}</span>
    </div>

    <div class="detail-grid">
      <section class="detail-section">
        <h3>重点提醒</h3>
        <ul>
          ${guide.keyPoints.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>

      <section class="detail-section">
        <h3>推荐步骤</h3>
        <ul>
          ${guide.steps.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>
    </div>
  `;
}

function filterGuides(keyword) {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) {
    return guides;
  }

  return guides.filter((guide) => {
    const sourceText = [
      guide.game,
      guide.title,
      guide.summary,
      guide.overview,
      guide.keyPoints.join(" "),
      guide.steps.join(" ")
    ].join(" ").toLowerCase();

    return sourceText.includes(normalizedKeyword);
  });
}

searchInput.addEventListener("input", (event) => {
  renderCards(filterGuides(event.target.value));
});

renderCards(guides);
