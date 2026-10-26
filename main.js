/**
 * CultureTrail – Shared UI helpers
 */

const DEFAULT_AVATAR = 'https://i.pravatar.cc/150?img=12';

function getActiveCreatorId() {
  const user = window.API ? API.getCurrentUser() : null;
  return user && user.role === 'creator' ? user.id : 'creator-001';
}

// Mobile menu toggle + active nav link
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-main');
  if (toggle && nav) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-main a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPath)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  initHeader();
});

async function initHeader() {
  const avatar = document.querySelector('[data-user-avatar]');
  const user = (window.API && API.getCurrentUser()) || {
    id: 'creator-001',
    name: 'Nguyễn Văn Minh',
    avatar: DEFAULT_AVATAR
  };

  if (avatar) {
    avatar.src = user.avatar || DEFAULT_AVATAR;
    avatar.alt = `Ảnh đại diện của ${user.name}`;
  }

  if (document.querySelector('[data-notif-badge]')) {
    await updateNotifBadge();
  }
}

async function updateNotifBadge() {
  const badge = document.querySelector('[data-notif-badge]');
  if (!badge || !window.API) return;

  const unread = await API.getUnreadNotificationCount(getActiveCreatorId());
  badge.textContent = unread > 9 ? '9+' : String(unread);
  badge.classList.toggle('hidden', unread === 0);

  const link = badge.closest('a');
  if (link) {
    link.setAttribute('aria-label', unread ? `Thông báo, ${unread} chưa đọc` : 'Thông báo');
  }
}

// Utility: show toast
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast alert alert-${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;min-width:260px;max-width:calc(100vw - 48px);box-shadow:0 4px 16px rgba(0,0,0,0.15);';
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

function formatDateTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function relativeTime(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;

  return formatDate(iso);
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

const STATUS_LABELS = {
  published: 'Đã xuất bản',
  pending: 'Chờ duyệt',
  rejected: 'Bị từ chối',
  archived: 'Lưu trữ',
  upcoming: 'Sắp diễn ra',
  ongoing: 'Đang diễn ra',
  completed: 'Đã kết thúc',
  cancelled: 'Đã hủy',
  active: 'Đang hoạt động',
  draft: 'Bản nháp'
};

const STATUS_BADGES = {
  published: 'badge-success',
  pending: 'badge-warning',
  rejected: 'badge-error',
  archived: 'badge',
  upcoming: 'badge-primary',
  ongoing: 'badge-warning',
  completed: 'badge-success',
  cancelled: 'badge-error',
  active: 'badge-success',
  draft: 'badge'
};

function statusLabel(status) {
  return STATUS_LABELS[status] || status;
}

function statusBadgeClass(status) {
  return STATUS_BADGES[status] || 'badge';
}

function setFieldError(field, message) {
  field.classList.add('is-invalid');
  field.setAttribute('aria-invalid', 'true');
  const errorEl = field.parentElement.querySelector('.form-error');
  if (errorEl) {
    if (message) errorEl.textContent = message;
    errorEl.setAttribute('role', 'alert');
  }
}

function clearFieldError(field) {
  field.classList.remove('is-invalid');
  field.removeAttribute('aria-invalid');
}

function setLoading(button, isLoading, loadingText = 'Đang xử lý...') {
  if (!button) return;
  if (isLoading) {
    if (!button.dataset.originalText) button.dataset.originalText = button.textContent.trim();
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    button.textContent = loadingText;
  } else {
    button.disabled = false;
    button.removeAttribute('aria-busy');
    if (button.dataset.originalText) {
      button.textContent = button.dataset.originalText;
      delete button.dataset.originalText;
    }
  }
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// Simple form validation helper
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      setFieldError(field, 'Trường này là bắt buộc.');
      valid = false;
    } else {
      clearFieldError(field);
    }
  });
  return valid;
}

// Clear validation on input
document.addEventListener('input', (e) => {
  if (e.target.classList.contains('form-control')) {
    clearFieldError(e.target);
  }
});

window.getActiveCreatorId = getActiveCreatorId;
window.updateNotifBadge = updateNotifBadge;
window.showToast = showToast;
window.formatDate = formatDate;
window.formatDateTime = formatDateTime;
window.relativeTime = relativeTime;
window.delay = delay;
window.escapeHtml = escapeHtml;
window.statusLabel = statusLabel;
window.statusBadgeClass = statusBadgeClass;
window.setFieldError = setFieldError;
window.clearFieldError = clearFieldError;
window.setLoading = setLoading;
window.validateEmail = validateEmail;
window.isValidHttpUrl = isValidHttpUrl;
window.validateForm = validateForm;
