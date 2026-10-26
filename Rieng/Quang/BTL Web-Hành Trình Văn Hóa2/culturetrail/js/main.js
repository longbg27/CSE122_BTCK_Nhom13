/**
 * Hành Trình Văn Hóa – Shared UI helpers
 */

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-main');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-main a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPath)) {
      link.classList.add('active');
    }
  });

  
  const user = window.API ? API.getCurrentUser() : null;
  const avatarEl = document.querySelector('.user-avatar');
  if (avatarEl && user) {
    avatarEl.src = user.avatar || 'https://i.pravatar.cc/150?img=1';
    avatarEl.alt = user.name;
  }
});


function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast alert alert-${type}`;
  toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;min-width:220px;max-width:calc(100vw - 48px);box-shadow:0 4px 16px rgba(0,0,0,0.15);background:#fff;';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}


function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const errorEl = field.parentElement.querySelector('.form-error');
    if (!field.value.trim()) {
      field.classList.add('is-invalid');
      if (errorEl) errorEl.textContent = 'Trường này là bắt buộc.';
      valid = false;
    } else {
      field.classList.remove('is-invalid');
    }
  });
  return valid;
}


document.addEventListener('input', (e) => {
  if (e.target.classList.contains('form-control')) {
    e.target.classList.remove('is-invalid');
  }
});

window.showToast = showToast;
window.formatDate = formatDate;
window.delay = delay;
window.escapeHtml = escapeHtml;
window.validateForm = validateForm;



const FALLBACK_IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">' +
  '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
  '<stop offset="0" stop-color="#c45c26"/><stop offset="1" stop-color="#1a5f4a"/>' +
  '</linearGradient></defs><rect width="800" height="500" fill="url(#g)"/></svg>'
);


function imgTag(src, alt, cls, style) {
  return `<img src="${src || FALLBACK_IMG}" alt="${escapeHtml(alt)}" class="${cls || ''}" ` +
         `style="${style || ''}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK_IMG">`;
}


function storyCard(s, place) {
  return `
    <article class="card">
      ${imgTag(s.image, s.title, 'card-img')}
      <div class="card-body">
        <div class="tag-list mb-1">
          ${(s.tags || []).slice(0, 2).map(t => `<span class="badge badge-primary">${escapeHtml(t)}</span>`).join('')}
        </div>
        <h3 class="card-title"><a href="explorer-story-detail.html?id=${s.id}">${escapeHtml(s.title)}</a></h3>
        <p class="card-text">${escapeHtml(s.summary)}</p>
        <div class="card-meta">
          ${place ? `<span>📍 ${escapeHtml(place.name)}</span>` : ''}
          <span>👁 ${(s.views || 0).toLocaleString('vi-VN')}</span>
          <span>❤️ ${s.likes || 0}</span>
        </div>
      </div>
    </article>`;
}


function placeCard(p) {
  return `
    <article class="card">
      ${imgTag(p.image, p.name, 'card-img')}
      <div class="card-body">
        <div class="tag-list mb-1">
          ${(p.tags || []).slice(0, 2).map(t => `<span class="badge badge-primary">${escapeHtml(t)}</span>`).join('')}
        </div>
        <h3 class="card-title"><a href="explorer-place-detail.html?id=${p.id}">${escapeHtml(p.name)}</a></h3>
        <p class="card-text">${escapeHtml(p.description)}</p>
        <div class="card-meta">
          <span>📍 ${escapeHtml(p.region)}</span>
          <span>📖 ${p.storyCount || 0} câu chuyện</span>
        </div>
      </div>
    </article>`;
}


function setupAuthUI() {
  const user = window.API ? API.getCurrentUser() : null;
  const btn = document.getElementById('auth-btn');
  const av = document.getElementById('user-avatar');
  if (user && btn && av) {
    btn.classList.add('hidden');
    av.classList.remove('hidden');
    av.src = user.avatar;
    av.alt = user.name;
    av.title = user.name + ' – bấm để xem hồ sơ';
    av.style.cursor = 'pointer';
    av.onclick = () => { location.href = 'profile.html'; };
  }
}
document.addEventListener('DOMContentLoaded', setupAuthUI);