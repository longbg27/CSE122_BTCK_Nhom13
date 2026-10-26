/**
 * Hành Trình Văn Hóa – Data API (mock)
 * Sử dụng fetch local JSON + LocalStorage để mô phỏng CRUD
 */

const DATA_BASE = '../assets/data/';

const STORE_KEYS = {
  stories: 'ct_stories',
  places: 'ct_places',
  creators: 'ct_creators',
  events: 'ct_events',
  collections: 'ct_collections',
  trails: 'ct_trails',
  users: 'ct_users',
  tags: 'ct_tags',
  currentUser: 'ct_current_user'
};

// Đổi số phiên bản này mỗi khi sửa file JSON để trình duyệt tải lại dữ liệu mới
const DATA_VERSION = '5';
(function () {
  if (localStorage.getItem('ct_data_version') !== DATA_VERSION) {
    Object.entries(STORE_KEYS).forEach(([name, key]) => {
      if (name !== 'currentUser') localStorage.removeItem(key);
    });
    localStorage.setItem('ct_data_version', DATA_VERSION);
  }
})();

async function loadJSON(filename) {
  try {
    const res = await fetch(DATA_BASE + filename);
    if (!res.ok) throw new Error('Failed to load ' + filename);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getData(key, filename) {
  const cached = localStorage.getItem(STORE_KEYS[key]);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // fall through
    }
  }
  const data = await loadJSON(filename);
  localStorage.setItem(STORE_KEYS[key], JSON.stringify(data));
  return data;
}

function saveData(key, data) {
  localStorage.setItem(STORE_KEYS[key], JSON.stringify(data));
}

// ========== Public API ==========

const API = {
  // Stories
  async getStories() {
    return getData('stories', 'stories.json');
  },
  async getStory(id) {
    const list = await this.getStories();
    return list.find(s => s.id === id) || null;
  },
  async createStory(story) {
    const list = await this.getStories();
    const newStory = {
      ...story,
      id: 'story-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      status: story.status || 'pending'
    };
    list.unshift(newStory);
    saveData('stories', list);
    return newStory;
  },
  async updateStory(id, updates) {
    const list = await this.getStories();
    const idx = list.findIndex(s => s.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
    saveData('stories', list);
    return list[idx];
  },
  async deleteStory(id) {
    let list = await this.getStories();
    list = list.filter(s => s.id !== id);
    saveData('stories', list);
    return true;
  },

  // Places
  async getPlaces() {
    return getData('places', 'places.json');
  },
  async getPlace(id) {
    const list = await this.getPlaces();
    return list.find(p => p.id === id) || null;
  },

  // Creators
  async getCreators() {
    return getData('creators', 'creators.json');
  },
  async getCreator(id) {
    const list = await this.getCreators();
    return list.find(c => c.id === id) || null;
  },

  // Events
  async getEvents() {
    return getData('events', 'events.json');
  },
  async getEvent(id) {
    const list = await this.getEvents();
    return list.find(e => e.id === id) || null;
  },
  async createEvent(event) {
    const list = await this.getEvents();
    const newEvent = {
      ...event,
      id: 'event-' + Date.now(),
      registered: 0,
      status: event.status || 'upcoming'
    };
    list.unshift(newEvent);
    saveData('events', list);
    return newEvent;
  },
  async updateEvent(id, updates) {
    const list = await this.getEvents();
    const idx = list.findIndex(e => e.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    saveData('events', list);
    return list[idx];
  },
  async deleteEvent(id) {
    let list = await this.getEvents();
    list = list.filter(e => e.id !== id);
    saveData('events', list);
    return true;
  },

  // Collections
  async getCollections() {
    return getData('collections', 'collections.json');
  },
  async getCollection(id) {
    const list = await this.getCollections();
    return list.find(c => c.id === id) || null;
  },
  async createCollection(col) {
    const list = await this.getCollections();
    const newCol = {
      ...col,
      id: 'col-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      status: col.status || 'draft'
    };
    list.unshift(newCol);
    saveData('collections', list);
    return newCol;
  },
  async updateCollection(id, updates) {
    const list = await this.getCollections();
    const idx = list.findIndex(c => c.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
    saveData('collections', list);
    return list[idx];
  },
  async deleteCollection(id) {
    let list = await this.getCollections();
    list = list.filter(c => c.id !== id);
    saveData('collections', list);
    return true;
  },

  // Trails
  async getTrails() {
    return getData('trails', 'trails.json');
  },
  async getTrail(id) {
    const list = await this.getTrails();
    return list.find(t => t.id === id) || null;
  },
  async createTrail(trail) {
    const list = await this.getTrails();
    const newTrail = {
      ...trail,
      id: 'trail-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    };
    list.unshift(newTrail);
    saveData('trails', list);
    return newTrail;
  },
  async updateTrail(id, updates) {
    const list = await this.getTrails();
    const idx = list.findIndex(t => t.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
    saveData('trails', list);
    return list[idx];
  },
  async deleteTrail(id) {
    let list = await this.getTrails();
    list = list.filter(t => t.id !== id);
    saveData('trails', list);
    return true;
  },

  // Tags
  async getTags() {
    return getData('tags', 'tags.json');
  },

  // Users
  async getUsers() {
    return getData('users', 'users.json');
  },
  async getUser(id) {
    const list = await this.getUsers();
    return list.find(u => u.id === id) || null;
  },
  async updateUser(id, updates) {
    const list = await this.getUsers();
    const idx = list.findIndex(u => u.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    saveData('users', list);
    return list[idx];
  },

  // Auth mock
  getCurrentUser() {
    const raw = localStorage.getItem(STORE_KEYS.currentUser);
    return raw ? JSON.parse(raw) : null;
  },
  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(STORE_KEYS.currentUser, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORE_KEYS.currentUser);
    }
  },
  async login(email, password) {
    // Mock: any password works for demo
    const users = await this.getUsers();
    const user = users.find(u => u.email === email);
    if (user) {
      this.setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: 'Email không tồn tại trong hệ thống demo.' };
  },
  async register({ name, email, password }) {
    const users = await this.getUsers();
    const mail = String(email || '').trim().toLowerCase();
    if (users.some(u => String(u.email).toLowerCase() === mail)) {
      return { success: false, message: 'Email này đã được đăng ký.' };
    }
    const newUser = {
      id: 'user-' + Date.now(),
      name: String(name || '').trim(),
      email: mail,
      role: 'explorer',
      avatar: 'https://i.pravatar.cc/150?u=' + encodeURIComponent(mail),
      joinedAt: new Date().toISOString(),
      status: 'active'
    };
    users.push(newUser);
    saveData('users', users);
    this.setCurrentUser(newUser);
    return { success: true, user: newUser };
  },
  logout() {
    this.setCurrentUser(null);
  },

  // Reset data (for demo)
  resetAll() {
    Object.values(STORE_KEYS).forEach(k => localStorage.removeItem(k));
  }
};

// Export for modules
window.API = API;
