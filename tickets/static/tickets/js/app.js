function toggleSidebar(){document.getElementById('sidebar')?.classList.toggle('open')}
function togglePassword(){const input=document.getElementById('password');if(!input)return;const show=input.type==='password';input.type=show?'text':'password';const button=document.getElementById('password-toggle');if(button){button.innerHTML=show?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8"></path><path d="M9.9 5.2A10.8 10.8 0 0112 5c6.4 0 10 7 10 7a15.4 15.4 0 01-3.1 3.9M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7a10.7 10.7 0 004.1-.8"></path></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"></path><circle cx="12" cy="12" r="3"></circle></svg>';button.setAttribute('aria-label',show?'Hide password':'Show password');button.setAttribute('title',show?'Hide password':'Show password')}}
function toast(message){const old=document.querySelector('.toast');if(old)old.remove();const el=document.createElement('div');el.className='toast';el.textContent=message;document.body.appendChild(el);setTimeout(()=>el.remove(),2800)}
let activeTicketStatus='all';
function filterRows(status){activeTicketStatus=status;applyTicketFilters()}
function searchTickets(){applyTicketFilters()}
function applyTicketFilters(){const table=document.getElementById('ticketTable');if(!table)return;const query=(document.getElementById('ticketSearch')?.value||'').trim().toLowerCase();const rows=table.querySelectorAll('tbody tr[data-status]');let visible=0;rows.forEach(row=>{const statusMatch=activeTicketStatus==='all'||row.dataset.status===activeTicketStatus;const searchMatch=!query||(row.dataset.search||'').toLowerCase().includes(query);row.hidden=!(statusMatch&&searchMatch);if(!row.hidden)visible++});const empty=table.querySelector('#ticketSearchEmpty');if(empty)empty.hidden=rows.length===0||visible>0}
function initUserMenu(){
  const userButton = document.getElementById('userMenuButton');
  const userDropdown = document.getElementById('userMenuDropdown');

  if (!userButton || !userDropdown) return;

  userButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = userButton.getAttribute('aria-expanded') === 'true';
    userButton.setAttribute('aria-expanded', String(!isOpen));
    userDropdown.classList.toggle('show', !isOpen);
  });

  document.addEventListener('click', (event) => {
    if (!userDropdown.contains(event.target) && !userButton.contains(event.target)) {
      userDropdown.classList.remove('show');
      userButton.setAttribute('aria-expanded', 'false');
    }
  });

  userDropdown.querySelectorAll('a').forEach((item) => {
    item.addEventListener('click', () => {
      userDropdown.classList.remove('show');
      userButton.setAttribute('aria-expanded', 'false');
    });
  });
}

function setTheme(theme){
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';

  try {
    localStorage.setItem('nexora-theme', isDark ? 'dark' : 'light');
  } catch {}

  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.querySelector('[data-theme-icon]').textContent = isDark ? '☀' : '☾';
  themeToggle.querySelector('[data-theme-label]').textContent = isDark ? 'Light mode' : 'Dark mode';
}

function initTheme(){
  const themeToggle = document.getElementById('themeToggle');
  const initialTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

  setTheme(initialTheme);
  themeToggle?.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.alert').forEach(a=>setTimeout(()=>a.remove(),4500));
  initUserMenu();
  initTheme();
});

if (document.readyState !== 'loading') {
  initUserMenu();
  initTheme();
}
