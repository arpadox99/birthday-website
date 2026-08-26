// Reasons database
const reasons = [
  {
    text: "Semoga ke depannya usi selalu dikelilingi hal-hal baik, dipertemukan dengan orang-orang yang tulus, dan diberikan banyak alasan untuk tersenyum setiap hari. ❤️ ",
    emoji: "🌷",
    gif: "gif1.gif",
  },
  {
    text: "Semoga semua yang sedang usi perjuangkan perlahan menemukan jalannya, satu per satu yang usi harapkan bisa terwujud, dan semoga hasilnya nanti setimpal dengan samua usaha yang sudah usi kasih. 💫 ",
    emoji: "✨",
    gif: "gif2.gif",
  },
  {
    text: "3. Semoga usi selalu sehat, bahagia, dan panjang umur, supaya masih bisa ketawa-ketawa deng hal-hal seng penting, marah-marah dikit, tapi jang terlalu pukul-pukul orang e 😭😂 Tetap jadi usi yang seru, jangan lupa bahagia, dan semoga selalu ada alasan for ketawa setiap hari. 🌸 ",
    emoji: "💕",
    gif: "gif1.gif",
  },
  {
    text: "Semoga hati usi selalu dipenuhi ketenangan, langkah usi dipertemukan dengan banyak hal baik, dan samua yang datang dalam hidup usi bisa membawa kebahagiaan. Tetap jadi usi yang sekarang, karena ada banyak hal baik yang Tuhan sedang siapkan di depan. Tuhan Yesus berkati selalu. 🤍🙏 ",
    emoji: "🌟",
    gif: "gif2.gif",
  },
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById("reasons-container");
const shuffleButton = document.querySelector(".shuffle-button");
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason, index) {
  const card = document.createElement("div");
  card.className = "reason-card";

  // Reason counter di dalam card
  const counter = document.createElement("div");
  counter.className = "reason-counter";
  counter.textContent = `Harapan ${index + 1} dari ${reasons.length}`;

  // Reason text
  const text = document.createElement("div");
  text.className = "reason-text";
  text.innerHTML = `${reason.emoji} ${reason.text}`;

  // GIF
  const gifOverlay = document.createElement("div");
  gifOverlay.className = "gif-overlay";
  gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;

  card.appendChild(counter);
  card.appendChild(text);
  card.appendChild(gifOverlay);

  gsap.from(card, {
    opacity: 0,
    y: 50,
    duration: 0.5,
    ease: "back.out",
  });

  return card;
}

// Display new reason
function displayNewReason() {
  if (isTransitioning) return;
  isTransitioning = true;

  if (currentReasonIndex < reasons.length) {
    const card = createReasonCard(
      reasons[currentReasonIndex],
      currentReasonIndex,
    );

    reasonsContainer.appendChild(card);

    currentReasonIndex++;

    // Jika sudah Reason terakhir, sembunyikan tombol
    if (currentReasonIndex === reasons.length) {
      gsap.to(shuffleButton, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        onComplete: () => {
          shuffleButton.style.display = "none";
        },
      });
    }

    // Create floating elements
    createFloatingElement();

    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
}

// Initialize button click
shuffleButton.addEventListener("click", () => {
  gsap.to(shuffleButton, {
    scale: 0.9,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
  });

  displayNewReason();
});

// Floating elements function
function createFloatingElement() {
  const elements = ["🌸", "✨", "💖", "🦋", "⭐", "🎂", "💐", "🎉", "🎁"];

  const element = document.createElement("div");
  element.className = "floating";
  element.textContent = elements[Math.floor(Math.random() * elements.length)];

  element.style.left = Math.random() * window.innerWidth + "px";
  element.style.top = Math.random() * window.innerHeight + "px";
  element.style.fontSize = Math.random() * 20 + 10 + "px";

  document.body.appendChild(element);

  gsap.to(element, {
    y: -500,
    duration: Math.random() * 10 + 10,
    opacity: 0,
    onComplete: () => element.remove(),
  });
}

// Custom cursor
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX - 15,
    y: e.clientY - 15,
    duration: 0.2,
  });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);
