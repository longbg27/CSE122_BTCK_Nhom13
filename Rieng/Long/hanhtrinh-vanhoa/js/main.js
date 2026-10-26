/**
 * CultureTrail – Shared UI helpers
 */

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-main');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Highlight active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-main a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPath)) {
      link.classList.add('active');
    }
  });

  // Update user avatar if logged in
  const user = window.API ? API.getCurrentUser() : null;
  const avatarEl = document.querySelector('.user-avatar');
  if (avatarEl && user) {
    avatarEl.src = user.avatar || 'https://i.pravatar.cc/150?img=1';
    avatarEl.alt = user.name;
  }
});

// Utility: show toast
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast alert alert-${type}`;
  toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;min-width:260px;box-shadow:0 4px 16px rgba(0,0,0,0.15);';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Utility: format date
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Utility: delay (for AI mock)
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Utility: escape HTML
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Simple form validation helper
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

// Clear validation on input
document.addEventListener('input', (e) => {
  if (e.target.classList.contains('form-control')) {
    e.target.classList.remove('is-invalid');
  }
});


// Vietnamese labels for status values
function statusLabel(status) {
  const map = {
    published: 'Đã xuất bản',
    pending: 'Chờ duyệt',
    draft: 'Nháp',
    rejected: 'Từ chối',
    archived: 'Đã lưu trữ',
    active: 'Hoạt động',
    locked: 'Đã khóa'
  };
  return map[status] || status || '';
}

function statusBadgeClass(status) {
  if (status === 'published' || status === 'active') return 'badge-success';
  if (status === 'pending' || status === 'draft') return 'badge-warning';
  if (status === 'rejected' || status === 'locked') return 'badge-error';
  return 'badge';
}
function roleLabel(role) {
  const map = {
    explorer: 'Người khám phá',
    creator: 'Nghệ nhân',
    curator: 'Biên tập',
    admin: 'Quản trị viên'
  };
  return map[role] || role || '';
}
window.roleLabel = roleLabel;

window.showToast = showToast;
window.statusLabel = statusLabel;
window.statusBadgeClass = statusBadgeClass;
window.formatDate = formatDate;
window.delay = delay;
window.escapeHtml = escapeHtml;
window.validateForm = validateForm;
