// 네이버 검색 결과 순위 배지 삽입
// fds-web-doc-root + ugcItem = 통합검색 동일 스트림 → 하나의 순위 시퀀스

const AD_PARENT_IDS = new Set(['power_link_body', 'sp_npad']);
const AD_CHILD_SELS = [
  'div.fds-ugc-green-ad-badge',
  'a[data-heatmap-target="articleSourceJSX_adtag"]',
  'a.Mc9HIJyhZZ2sN6p9IMT0',
];

// 통합 결과 아이템 선택자 (NaverCrawlingService: kin/web/review/ugcItem/fds-web-doc-root)
const RESULT_SEL = [
  'div[data-template-id="ugcItem"]',
  'div.fds-web-doc-root',
  'div[data-meta-ssuid="kin"]',
  'div[data-meta-ssuid="web"]',
  'div[data-meta-ssuid="review"]',
].join(', ');

function isAd(el) {
  if (AD_CHILD_SELS.some(s => el.querySelector(s))) return true;
  let node = el.parentElement;
  while (node && node !== document.body) {
    if (node.id && AD_PARENT_IDS.has(node.id)) return true;
    node = node.parentElement;
  }
  return false;
}

function createBadge(rank) {
  const badge = document.createElement('span');
  badge.className = 'naver-rank-badge';
  badge.dataset.rank = rank <= 3 ? String(rank) : 'other';
  badge.textContent = rank;
  return badge;
}

function insertBadge(item, rank) {
  // 직접 자식 배지만 확인 (중첩 항목 오탐 방지)
  if ([...item.children].some(c => c.classList.contains('naver-rank-badge'))) return;
  // 카드 바깥으로 absolute 배치하려면 부모가 relative여야 함
  if (getComputedStyle(item).position === 'static') {
    item.style.position = 'relative';
  }
  item.appendChild(createBadge(rank));
}

function applyRanks() {
  const allItems = [...document.querySelectorAll(RESULT_SEL)].filter(el => !isAd(el));

  // 중첩 제거: 다른 결과 항목 안에 포함된 것은 제외 (최상위 항목만 유지)
  const topItems = allItems.filter(item =>
    !allItems.some(other => other !== item && other.contains(item))
  );

  topItems.forEach((item, i) => insertBadge(item, i + 1));

  // fallback: li.bx.color_blue (위 선택자에 해당 안 되는 영역)
  const liItems = [...document.querySelectorAll('li.bx.color_blue')].filter(li => !isAd(li));
  const groups = new Map();
  liItems.forEach(li => {
    let el = li.parentElement, key = '__root__';
    while (el && el !== document.body) {
      if (el.id) { key = el.id; break; }
      el = el.parentElement;
    }
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(li);
  });
  groups.forEach(items => items.forEach((li, i) => insertBadge(li, i + 1)));
}

applyRanks();

const observer = new MutationObserver(() => applyRanks());
observer.observe(document.body, { childList: true, subtree: true });
