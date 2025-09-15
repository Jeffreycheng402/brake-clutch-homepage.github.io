const nav = document.getElementById('mainNav');
if (nav) {
  const bar = nav.querySelector('.hover-bar');
  const topLinks = nav.querySelectorAll(':scope > .cs-li > .cs-li-link'); // 仅顶级链接

  function moveBarTo(el) {
    const nr = nav.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    bar.style.left = `${r.left - nr.left}px`;
    bar.style.width = `${r.width}px`;
  }

  topLinks.forEach(link => {
    link.addEventListener('mouseenter', () => moveBarTo(link));
  });

  nav.addEventListener('mouseleave', () => {
    bar.style.width = '0';
  });
}

// 营业时间表（24小时制）
const HOURS = {
  mon: [8, 17],        // 周一到周五 8:00–17:00
  tue: [8, 17],
  wed: [8, 17],
  thu: [8, 17],
  fri: [8, 17],
  sat: [8.5, 12],      // 周六 8:30–12:00 (8.5 表示 8:30)
  sun: null            // 周日休息
};

function isOpenNow(date = new Date()) {
  const day = ['sun','mon','tue','wed','thu','fri','sat'][date.getDay()];
  const span = HOURS[day];
  if (!span) return false;
  const h = date.getHours() + date.getMinutes()/60;
  return h >= span[0] && h < span[1];
}

(function updateStatus(){
  const statusEl = document.getElementById('store-status');
  if (!statusEl) return;
  const open = isOpenNow();
  statusEl.textContent = open ? 'Open Now' : 'Closed';
  statusEl.classList.add(open ? 'open' : 'closed');
})();
