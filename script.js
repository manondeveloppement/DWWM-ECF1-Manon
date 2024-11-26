   // JavaScript to toggle burger menu
   const burger = document.querySelector('.navbar__burger');
   const navButtons = document.querySelector('.navbar__buttons');
 
   burger.addEventListener('click', () => {
     navButtons.classList.toggle('navbar__buttons--active'); // Toggle class to show/hide links
   });
   const audioPlayer = document.getElementById("audioPlayer");
      const playButton = document.getElementById("playButton");

      // Toggle play/pause when the button is clicked
      playButton.addEventListener("click", function () {
        if (audioPlayer.paused) {
          audioPlayer.play();
          playButton.textContent = "⬛"; // Change button text to "Pause"
        } else {
          audioPlayer.pause();
          playButton.textContent = "▶"; // Change button text to "Play"
        }
      });