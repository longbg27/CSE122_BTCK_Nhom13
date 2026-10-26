/**
 * CultureTrail – Data API (mock)
 * Sử dụng fetch local JSON + LocalStorage để mô phỏng CRUD
 */

const DATA_BASE = '../assets/data/';
const DATA_VERSION = '2';
const VERSION_KEY = 'ct_data_version';

const STORE_KEYS = {
  stories: 'ct_stories',
  places: 'ct_places',
  creators: 'ct_creators',
  events: 'ct_events',
  collections: 'ct_collections',
  trails: 'ct_trails',
  users: 'ct_users',
  tags: 'ct_tags',
  notifications: 'ct_notifications',
  currentUser: 'ct_current_user'
};

const loadErrors = {};

// Bump DATA_VERSION whenever assets/data/*.json changes so stale LocalStorage
// from an older demo does not hide the new mock data.
function ensureDataVersion() {
  if (localStorage.getItem(VERSION_KEY) === DATA_VERSION) return;
  Object.entries(STORE_KEYS).forEach(([key, storeKey]) => {
    if (key !== 'currentUser') localStorage.removeItem(storeKey);
  });
  localStorage.setItem(VERSION_KEY, DATA_VERSION);
}
ensureDataVersion();

async function loadJSON(filename) {
  try {
    const res = await fetch(DATA_BASE + filename);
    if (!res.ok) throw new Error('Failed to load ' + filename);
    const data = await res.json();
    delete loadErrors[filename];
    return data;
  } catch (err) {
    loadErrors[filename] = err;
    console.error(err);
    return null;
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
  if (!data) return [];
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
  async createCreator(creator) {
    const list = await this.getCreators();
    const newCreator = {
      storyCount: 0,
      eventCount: 0,
      followers: 0,
      status: 'active',
      joinedAt: new Date().toISOString(),
      ...creator,
      id: creator.id || 'creator-' + Date.now()
    };
    list.push(newCreator);
    saveData('creators', list);
    return newCreator;
  },
  async updateCreator(id, updates) {
    const list = await this.getCreators();
    const idx = list.findIndex(c => c.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    saveData('creators', list);
    return list[idx];
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

  // Notifications
  async getNotifications(userId) {
    const list = await getData('notifications', 'notifications.json');
    return list
      .filter(n => !userId || n.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  async markNotificationRead(id) {
    const list = await getData('notifications', 'notifications.json');
    const item = list.find(n => n.id === id);
    if (!item || item.read) return item || null;
    item.read = true;
    saveData('notifications', list);
    return item;
  },
  async markAllNotificationsRead(userId) {
    const list = await getData('notifications', 'notifications.json');
    list.forEach(n => {
      if (!userId || n.userId === userId) n.read = true;
    });
    saveData('notifications', list);
    return true;
  },
  async getUnreadNotificationCount(userId) {
    const list = await this.getNotifications(userId);
    return list.filter(n => !n.read).length;
  },

  // Users
  async getUsers() {
    return getData('users', 'users.json');
  },
  async createUser(user) {
    const list = await this.getUsers();
    const newUser = {
      status: 'active',
      joinedAt: new Date().toISOString(),
      ...user,
      id: user.id || 'user-' + Date.now()
    };
    list.push(newUser);
    saveData('users', list);
    return newUser;
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
  logout() {
    this.setCurrentUser(null);
  },

  getLoadError(filename) {
    return loadErrors[filename] || null;
  },

  // Reset data (for demo)
  resetAll() {
    Object.values(STORE_KEYS).forEach(k => localStorage.removeItem(k));
    localStorage.removeItem(VERSION_KEY);
    Object.keys(loadErrors).forEach(k => delete loadErrors[k]);
  }
};

// Export for modules
window.API = API;
