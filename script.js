// JavaScript to toggle burger menu
const burger = document.querySelector(".navbar__burger");
const navButtons = document.querySelector(".navbar__buttons");

burger.addEventListener("click", () => {
  navButtons.classList.toggle("navbar__buttons--active"); // Toggle class to show/hide links
});
function toggleContent(id) {
  const content = document.getElementById(id);
  content.classList.toggle("active");
}

// JavaScript for interactive equalizer
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.querySelector(".audio-player__audio");
  const bars = document.querySelectorAll(".bar");
  let audioContext, analyser, bufferLength, dataArray;

  // Set up AudioContext and analyser for the equalizer
  function setupEqualizer() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
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
      const barHeight = dataArray[i] / 2;
      bars[i].style.height = barHeight + "%";
    }

    // Call back the function to create a loop
    requestAnimationFrame(updateEqualizer);
  }

  // Initialisation
  setupEqualizer();
  updateEqualizer();
});

// Concert data
const concertsData = [
  {
    artist: "L'impératrice",
    price: 38,
    date: "2025-06-15",
    time: "19:00",
    ticketsSold: 1000,
    image: "image/imperatrice.jpg",
    description:
      "L'impératrice est un groupe français aux influences disco, pop et funk.<br> Leur musique mêle des rythmes entraînants avec des sonorités nostalgiques des années 70 et 80, créant une ambiance unique et dansante.",
  },
  {
    artist: "Kavinsky",
    price: 45,
    date: "2025-06-15",
    time: "21:30",
    ticketsSold: 1000,
    image: "image/kavinsky.jpg",
    description:
      "Kavinsky, connu pour son hit 'Nightcall', est un artiste français de musique électronique. Sa musique est souvent associée aux thèmes de la synthwave et s'inspire des films des années 80, avec des sons puissants et des ambiances cinématographiques.",
  },
  {
    artist: "M83",
    price: 32,
    date: "2025-06-16",
    time: "19:00",
    ticketsSold: 600,
    image: "image/m83.jpg",
    description:
      "M83, dirigé par Anthony Gonzalez, est un projet de musique électronique français. Connu pour des titres comme 'Midnight City', M83 crée des paysages sonores épiques et émotionnels, combinant synthétiseurs et sons atmosphériques.",
  },
  {
    artist: "Wax Taylor",
    price: 29,
    date: "2025-06-16",
    time: "22:00",
    ticketsSold: 350,
    image: "image/waxtaylor.jpg",
    description:
      "Wax Taylor est un producteur français de trip-hop et de hip-hop. Il mélange habilement des samples vintage avec des rythmes modernes, créant une musique cinématographique qui explore des thèmes variés et poétiques.",
  },
  {
    artist: "Bonobo",
    price: 50,
    date: "2025-06-17",
    time: "20:30",
    ticketsSold: 780,
    image: "image/bonobo.jpg",
    description:
      "Bonobo, alias Simon Green, est un artiste britannique de musique électronique. Connu pour ses sons downtempo, Bonobo crée des morceaux atmosphériques et immersifs, souvent influencés par le jazz, le trip-hop et les musiques du monde.",
  },
  {
    artist: "Chinese Man",
    price: 27,
    date: "2025-06-17",
    time: "22:00",
    ticketsSold: 640,
    image: "image/chineseman.jpg",
    description:
      "Chinese Man est un collectif de producteurs français de musique électro et hip-hop. Leur style unique mélange des influences allant du reggae au jazz, avec des beats puissants et des samples originaux, offrant une expérience musicale riche et dynamique.",
  },
];

// Target the necessary elements
const container = document.getElementById("concerts-container");
const resetFilters = document.getElementById("reset-filters");
const filterButtons = document.querySelectorAll(".filters__button");

const maxCapacity = 1000;

let filteredData = [...concertsData];

// Afficher les concerts
const renderConcerts = (concerts) => {
  container.innerHTML = ""; // Empty the container
  concerts.forEach((concert) => {
    const percentageSold = ((concert.ticketsSold / maxCapacity) * 100).toFixed(
      0
    );

    const card = document.createElement("div");
    card.classList.add("card");

    // Add the 'sold-out' class if the concert is sold out
    if (concert.ticketsSold === maxCapacity) {
      card.classList.add("card--sold-out");
    }

    // Determine the background color based on the percentage of tickets sold
    const progressColor =
      concert.ticketsSold === maxCapacity ? "#e91e63" : "#0288d1"; // Rose si complet, bleu sinon

    card.innerHTML = `
      <div class="card__image">
        <img src="${concert.image}" alt="${concert.artist}">
        ${
          concert.ticketsSold === maxCapacity
            ? '<div class="card__badge">Sold Out</div>'
            : ""
        }
      </div>
      <h3>${concert.artist}</h3>
      <p class="description">${concert.description}</p>
      <p class="price">Prix : ${concert.price}€</p>
      <p class="date">Date : ${concert.date}</p>
      <p class="horaire">Horaire : ${concert.time}</p>
      <div class="progress-bar">
        <div class="progress" style="width: ${percentageSold}%; background-color: ${progressColor}">
          <span>${percentageSold}%</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
};

// Apply filters
const applyFilters = (filterType, filterValue) => {
  if (filterType === "date") {
    filteredData = concertsData.filter(
      (concert) => concert.date === filterValue
    );
  } else if (filterType === "status") {
    filteredData = concertsData.filter((concert) =>
      filterValue === "sold-out"
        ? concert.ticketsSold === maxCapacity
        : concert.ticketsSold < maxCapacity
    );
  }
  renderConcerts(filteredData);
};

// Reset filters
resetFilters.addEventListener("click", () => {
  filteredData = [...concertsData];
  renderConcerts(filteredData);
});

// Add events to filter buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterType = button.dataset.date ? "date" : "status";
    const filterValue = button.dataset.date || button.dataset.status;
    applyFilters(filterType, filterValue);
  });
});

// Show concerts on loading
renderConcerts(concertsData);
