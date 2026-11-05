/* ===================== THEME ===================== */
const root = document.documentElement;
const themeButtons = document.querySelectorAll('.theme-btn');

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {}
}

try {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    root.setAttribute('data-theme', savedTheme);
  }
} catch (e) {}

for (let i = 0; i < themeButtons.length; i++) {
  themeButtons[i].addEventListener('click', function () {
    const current = root.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* ===================== MOBILE MENU ===================== */
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');
const drawerClose = document.getElementById('drawer-close');
const drawerLinks = document.querySelectorAll('.drawer-link');

function openMenu() {
  drawer.classList.add('open');
  overlay.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  burger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

burger.addEventListener('click', openMenu);
drawerClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

for (let j = 0; j < drawerLinks.length; j++) {
  drawerLinks[j].addEventListener('click', closeMenu);
}

window.addEventListener('resize', function () {
  if (window.innerWidth > 860) {
    closeMenu();
  }
});

/* ===================== SCROLL TO TOP ===================== */
const toTop = document.getElementById('to-top');

window.addEventListener('scroll', function () {
  if (window.scrollY > 400) {
    toTop.classList.add('show');
  } else {
    toTop.classList.remove('show');
  }
});

toTop.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ===================== COPY BUTTONS ===================== */
const copyButtons = document.querySelectorAll('.copy-btn');

function markCopied(btn) {
  btn.classList.add('done');
  setTimeout(function () {
    btn.classList.remove('done');
  }, 1200);
}

function fallbackCopy(text) {
  const area = document.createElement('textarea');
  area.value = text;
  document.body.appendChild(area);
  area.select();
  document.body.removeChild(area);
}

for (let r = 0; r < copyButtons.length; r++) {
  copyButtons[r].addEventListener('click', function () {
    const btn = this;
    const text = btn.getAttribute('data-copy');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () {
        markCopied(btn);
      }, function () {
        fallbackCopy(text);
        markCopied(btn);
      });
    } else {
      fallbackCopy(text);
      markCopied(btn);
    }
  });
}
