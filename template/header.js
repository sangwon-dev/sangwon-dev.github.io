document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburgerMenu.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
  });

  const mobileMenuItems = document.querySelectorAll('.mobile-menu li');

  mobileMenuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', function () {
      const submenu = menuItem.querySelector('.submenu');
      if (submenu) {
        submenu.classList.toggle('active');
      }
    });
  });
});
