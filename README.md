Overview
This is a website for an electro music festival that will take place in La Teste de Buch from June 15th to June 17th, 2025. The website provides information about the event, artists, services, and includes an audio player for festival-related tracks. Additionally, there is a filter system to sort concerts by date and availability.

File Structure
index.html: The main page of the website.
css/: Contains the stylesheets.
style.min.css: The main stylesheet for the site.
image/: Contains images used throughout the website.
favicon.png, banniere.jpg, affiche.jpg, etc.
son/: Contains the audio file used for the player.
loop.mp3: The background music for the website.
script.js: JavaScript file for additional functionalities such as the audio player, burger menu, concert filters, and concert display.
Key Sections
Navbar: The navigation bar with links to different sections of the site (Home, Artists, Services).
Banner: A large image at the top of the page displaying the festival’s banner.
Main Content: This includes a welcoming text with the festival's details, dates, and a list of performing artists like L'impératrice, Kavinsky, M83, Wax Taylor, Bonobo, and Chinese Man.
Artists Cards: A section showcasing the performing artists with their names and images.
Audio Player: A music player that automatically starts playing a track (loop.mp3).
Equalizer Bars: Animated bars that move in sync with the audio to create a dynamic visual effect.
Concert Filters: A section where users can filter concerts by date and availability. The dates available are June 15, 16, and 17, 2025, and users can choose between "Sold-out" or "Available" concerts.
Concerts Section: Concerts will be dynamically displayed based on the selected filters using JavaScript.
Festival Details:
Dates and Location: Provides details about the festival’s location and opening times.
Program: Displays the festival program, with dates and performing artists.
Food: Lists the available food menus for the festival.
Access: Information about how to get to the festival site, including transport options and parking.
Tickets: Provides details about ticket types and prices.
Prohibited and Allowed Items: Lists items that are allowed and prohibited on the festival grounds.
Security: Describes the security measures in place for the event.
Footer: Contains the festival’s logo and copyright information.
Installation
To use the website locally:

Clone the repository or download the project folder.
Open the index.html file in any modern web browser.
Technologies Used
HTML5
CSS3
JavaScript
Responsive design

This project features a responsive web design using Sass for styling. It includes a flexible and modern layout with a sticky navbar, interactive elements, and various sections tailored for mobile, tablet, and desktop views. The design uses a custom color scheme and incorporates the Google Fonts "Poppins" and "Arima" for typography.

## Sass Structure

### Variables

- **Fonts:**
  - `$font-poppins: "Poppins", sans-serif;`
  - `$font-arima: "Arima", sans-serif;`

- **Colors:**
  - `$color-primary: #2e2a39;`
  - `$color-secondary: #fd55b7;`
  - `$color-accent: #83feff;`
  - `$color-background: #e8ffff;`

### Global Styles

- **Universal Styling:** `*` selector for margin, padding, and box-sizing reset.
- **Body:** Background color set to `$color-background`, using `$font-poppins` for typography.

### Navbar

- **Sticky Navbar:** The navbar is fixed to the top of the page with space-between alignment of logo, burger menu, and buttons.
- **Buttons:** Styled with the `$color-secondary` background and transition on hover.
- **Burger Menu:** Hidden by default and displayed on mobile screens, with a transition effect.

### Banner

- **Image Styling:** Banner image covers the full width and height, using `object-fit: cover` to maintain aspect ratio.

### Container Layout

- **Flexbox Layout:** The `.container` block uses flexbox to arrange sections (left, center, and right) with equal distribution of space.
- **Responsive Images and Text:** Images scale responsively, and text adjusts to screen size.

### Footer

- **Footer Styling:** A footer section with a background of `$color-accent`, containing text and an image, with a flexbox layout for responsive design.

### Artists Cards Section

- **Cards Layout:** Each artist's card is styled with a shadow, hover effects (translate and box-shadow), and responsive images.
- **Card Content:** Each card contains an image, name, and hover interaction.

### Audio Player and Equalizer

- **Audio Player:** A custom audio player styled with buttons and hidden native controls.
- **Equalizer:** A flex layout for bars with alternating colors and animations based on the audio level.

### Filters

- **Filters Section:** Buttons for filtering content styled with `$color-secondary`, `$color-accent`, and `$color-primary` colors.

### Concert Section

- **Concert Cards:** Cards are displayed with responsive grid layouts. Each card contains concert details and a progress bar showing concert availability.
- **Progress Bar:** Styled with `$color-accent` for available and `$color-secondary` for sold-out concerts.

### Festival Services

- **Festival Blocks:** Sections like program, food, access, tickets, and security, all with padding, borders, and hover effects for interactive toggles.

### Media Queries

- **Responsive Design:** Includes specific breakpoints for mobile (320px-425px), tablet (768px), and large screens (1440px), adjusting layout, text size, and image sizes for optimal user experience across devices.

# JavaScript Functionality Overview

This project includes interactive JavaScript features that enhance the user experience on the website. Here's an overview of the key functionalities:

## 1. Burger Menu Toggle
- A toggle function to show/hide the navigation links when the burger icon is clicked.
- Uses `querySelector` to select the burger and the buttons, and the `classList.toggle` method to toggle the visibility of the menu.

```js
const burger = document.querySelector(".navbar__burger");
const navButtons = document.querySelector(".navbar__buttons");

burger.addEventListener("click", () => {
  navButtons.classList.toggle("navbar__buttons--active");
});
function toggleContent(id) {
  const content = document.getElementById(id);
  content.classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.querySelector(".audio-player__audio");
  const bars = document.querySelectorAll(".bar");
  let audioContext, analyser, bufferLength, dataArray;

  function setupEqualizer() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

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
    requestAnimationFrame(updateEqualizer);
  }

  setupEqualizer();
  updateEqualizer();
});
const concertsData = [
  {
    artist: "L'impératrice",
    price: 38,
    date: "2025-06-15",
    time: "19:00",
    ticketsSold: 1000,
    image: "image/imperatrice.jpg",
    description: "L'impératrice est un groupe français aux influences disco...",
  },
  // More concert objects...
];

const renderConcerts = (concerts) => {
  container.innerHTML = "";
  concerts.forEach((concert) => {
    const percentageSold = ((concert.ticketsSold / maxCapacity) * 100).toFixed(0);
    const card = document.createElement("div");
    card.classList.add("card");
    if (concert.ticketsSold === maxCapacity) {
      card.classList.add("card--sold-out");
    }
    card.innerHTML = `
      <div class="card__image">
        <img src="${concert.image}" alt="${concert.artist}">
        ${concert.ticketsSold === maxCapacity ? '<div class="card__badge">Sold Out</div>' : ""}
      </div>
      <h3>${concert.artist}</h3>
      <p class="description">${concert.description}</p>
      <p class="price">Prix : ${concert.price}€</p>
      <p class="date">Date : ${concert.date}</p>
      <p class="horaire">Horaire : ${concert.time}</p>
      <div class="progress-bar">
        <div class="progress" style="width: ${percentageSold}%">
          <span>${percentageSold}%</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
};
const filterButtons = document.querySelectorAll(".filters__button");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterType = button.dataset.date ? "date" : "status";
    const filterValue = button.dataset.date || button.dataset.status;
    applyFilters(filterType, filterValue);
  });
});

resetFilters.addEventListener("click", () => {
  filteredData = [...concertsData];
  renderConcerts(filteredData);
});
