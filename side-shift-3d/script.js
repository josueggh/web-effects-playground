document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const page = document.querySelector('.page');
  const navItems = document.querySelectorAll('.nav-item');

  function closeMenu() {
    sidebar.classList.remove('open');
    page.classList.remove('open');
    menuBtn.classList.remove('open');
  }

  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    page.classList.toggle('open');
    menuBtn.classList.toggle('open');
  });

  navItems.forEach(item => {
    item.addEventListener('click', closeMenu);
  });
});
