// JavaScript to toggle burger menu
const burger = document.querySelector(".navbar__burger");
const navButtons = document.querySelector(".navbar__buttons");

burger.addEventListener("click", () => {
  navButtons.classList.toggle("navbar__buttons--active"); // Toggle class to show/hide links
});
const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");

function toggleContent(id) {
  const content = document.getElementById(id);
  content.classList.toggle("active");
}
// Select all reserve buttons
document.querySelectorAll(".card__btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Add an "active" class for the animation
    button.classList.add("active");

    // Optional: Remove the "active" class after the animation ends (0.3s)
    setTimeout(() => {
      button.classList.remove("active");
    }, 300); // Timeout should match the duration of the animation (0.3s)
  });
});
// JavaScript pour l'égaliseur interactif
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.querySelector(".audio-player__audio");
  const bars = document.querySelectorAll(".bar");
  let audioContext, analyser, bufferLength, dataArray;

  // Set up AudioContext and analyser for the equalizer
  function setupEqualizer() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; // Taille de l'analyseur (plus petite = plus de bars)
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    // Connect audio source to analyser
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  function updateEqualizer() {
    analyser.getByteFrequencyData(dataArray);

    for (let i = 0; i < bars.length; i++) {
      const barHeight = dataArray[i] / 2; // Normalisation de la valeur pour avoir des barres visibles
      bars[i].style.height = barHeight + "%";
    }

    // Rappeler la fonction pour créer une boucle
    requestAnimationFrame(updateEqualizer);
  }

  // Initialisation
  setupEqualizer();
  updateEqualizer();
});
