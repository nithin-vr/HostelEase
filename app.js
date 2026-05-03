// ── Storage ──
const Store = {
  get: (key) => JSON.parse(localStorage.getItem(key) || '[]'),
  set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  add: (key, item) => { const a = Store.get(key); a.unshift(item); Store.set(key, a); return item; },
  update: (key, id, patch) => Store.set(key, Store.get(key).map(i => i.id === id ? { ...i, ...patch } : i)),
  remove: (key, id) => Store.set(key, Store.get(key).filter(i => i.id !== id)),
  getObj: (key) => JSON.parse(localStorage.getItem(key) || 'null'),
  setObj: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
};

// ── Auth ──
const Auth = {
  login: (user) => Store.setObj('he_session', user),
  logout: () => { localStorage.removeItem('he_session'); window.location.href = rootPath() + 'login.html'; },
  current: () => Store.getObj('he_session'),
  require: (role) => {
    const u = Auth.current();
    if (!u) { window.location.href = rootPath() + 'login.html'; return null; }
    if (role && u.role !== role) { window.location.href = rootPath() + 'login.html'; return null; }
    return u;
  },
};

function rootPath() {
  const p = window.location.pathname;
  if (p.includes('/student/') || p.includes('/warden/') || p.includes('/admin/')) return '../';
  return '';
}

// ── Helpers ──
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const fmt = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const diffDays = (a, b) => Math.max(1, Math.round((new Date(b) - new Date(a)) / 86400000) + 1);
const today = () => new Date().toISOString().split('T')[0];

// ── Toast ──
function toast(msg, type = 'success') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = `show ${type}`;
  setTimeout(() => (el.className = ''), 3000);
}

// ── Badge ──
function badge(status) {
  const map = {
    Pending: 'badge-pending', Approved: 'badge-approved', Rejected: 'badge-rejected',
    Resolved: 'badge-resolved', Open: 'badge-open', 'In Progress': 'badge-inprogress',
  };
  return `<span class="badge ${map[status] || 'badge-pending'}">${status}</span>`;
}

// ── Modal ──
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ── Sidebar user info ──
function initSidebar() {
  const u = Auth.current();
  if (!u) return;
  const nameEl = document.getElementById('sb-name');
  const roleEl = document.getElementById('sb-role');
  const avatarEl = document.getElementById('sb-avatar');
  const tbAvatarEl = document.getElementById('tb-avatar');
  const tbGreetEl = document.getElementById('tb-greet');
  if (nameEl) nameEl.textContent = u.name;
  if (roleEl) roleEl.textContent = u.role;
  if (avatarEl) avatarEl.textContent = u.name.charAt(0).toUpperCase();
  if (tbAvatarEl) tbAvatarEl.textContent = u.name.charAt(0).toUpperCase();
  if (tbGreetEl) tbGreetEl.textContent = `Welcome back, ${u.name.split(' ')[0]}!`;
  initParticles();
}

// ── Floating Particles Background ──
function initParticles() {
  if (document.getElementById('he-particles')) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'he-particles';
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '0', opacity: '0.45'
  });
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  const dots = Array.from({ length: 70 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 2 + 0.8,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    hue: [220, 250, 270, 190][Math.floor(Math.random()*4)]
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(d => {
      d.x += d.dx; d.y += d.dy;
      if (d.x < 0 || d.x > canvas.width) d.dx *= -1;
      if (d.y < 0 || d.y > canvas.height) d.dy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${d.hue}, 75%, 65%, 0.55)`;
      ctx.fill();
    });
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ── Seed demo users ──
(function seedUsers() {
  let users = Store.get('he_users');
  // Always ensure admin@gmail.com exists with correct credentials
  const hasAdmin = users.find(u => u.role === 'Admin' && u.email === 'admin@gmail.com');
  if (!hasAdmin) {
    // Remove any old admin entries
    users = users.filter(u => u.role !== 'Admin');
    users.unshift({ id: 'u1', name: 'Admin User', email: 'admin@gmail.com', password: 'admin', role: 'Admin', room: '', block: '' });
    Store.set('he_users', users);
  }
  if (!users.find(u => u.email === 'warden@hostel.com')) {
    Store.add('he_users', { id: 'u2', name: 'Mr. Sharma', email: 'warden@hostel.com', password: 'warden123', role: 'Warden', room: '', block: 'A' });
  }
  if (!users.find(u => u.email === 'student@hostel.com')) {
    Store.add('he_users', { id: 'u3', name: 'Rahul Kumar', email: 'student@hostel.com', password: 'student123', role: 'Student', room: 'A-204', block: 'A' });
  }
  if (!Store.getObj('he_admin_safe_pass')) Store.setObj('he_admin_safe_pass', 'admin');
})();
