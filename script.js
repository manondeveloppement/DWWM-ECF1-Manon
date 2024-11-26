   // JavaScript to toggle burger menu
   const burger = document.querySelector('.navbar__burger');
   const navButtons = document.querySelector('.navbar__buttons');
 
   burger.addEventListener('click', () => {
     navButtons.classList.toggle('navbar__buttons--active'); // Toggle class to show/hide links
   });
   