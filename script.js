// ===================== EASY CUSTOMIZATION =====================
// Replace these messages with your own. Keep the quotes around text.
const birthdayLetter = "You know I love you, but you'll never know how much I love you, because my love for you can never be expressed in words. You are my heartbeat, my whole entire world, and one of the most beautiful people in my life. Alhamdulillah, I'm so lucky to have you in my life. Thank you for making my days brighter with your beautiful smile. You deserve all the happiness in the world, today and always. No amount of distance or pain can break our bond. You are rare and special to me, my everything. ❤️🫂";
const birthdaySongPath = "assets/audio/birthday-song.mp3"; // Put your chosen MP3 at this path.
const photoCaptions = [
  "My favourite person ❤️", "My whole world 🌏", "Forever special ✨",
  "Mera buguuuu 🧸", "My happy place 💞", "Just us, always 🔐"
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const screens = $$(".screen");
const mainScreen = $("#mainScreen");
const pages = $$(".page");
const song = $("#birthdaySong");
let girlfriendName = "";
let partnerName = "";
let currentPage = 0;
let letterOpened = false;
let toastTimer;

// Set path in one place so it's easy to change later.
song.src = birthdaySongPath;

function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  mainScreen.classList.toggle("active", id === "mainScreen");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
function startCountdown() {
  showScreen("introScreen");
  const number = $("#countdown");
  const introLine = $("#introLine");
  $("#introTitle").classList.add("hidden");
  $("#introCopy").classList.add("hidden");
  $("#openSurprise").classList.add("hidden");
  number.classList.remove("hidden");
  let count = 3;
  number.textContent = count;
  introLine.textContent = "Something lovely is waiting for you…";
  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      number.textContent = count;
      number.style.animation = "none";
      void number.offsetWidth;
      number.style.animation = "";
    } else {
      clearInterval(timer);
      number.classList.add("hidden");
      introLine.classList.add("hidden");
      $("#introTitle").classList.remove("hidden");
      $("#introCopy").classList.remove("hidden");
      $("#openSurprise").classList.remove("hidden");
    }
  }, 1000);
}
function renderDots() {
  const nav = $("#navDots");
  nav.replaceChildren();
  pages.forEach((page, index) => {
    const dot = document.createElement("button");
    dot.className = "nav-dot" + (index === currentPage ? " active" : "");
    dot.setAttribute("aria-label", `Go to page ${index + 1}`);
    dot.addEventListener("click", () => goToPage(index));
    nav.append(dot);
  });
}
function goToPage(index) {
  currentPage = Math.max(0, Math.min(pages.length - 1, index));
  pages.forEach((page, i) => page.classList.toggle("active-page", i === currentPage));
  $("#pageCounter").textContent = `${currentPage + 1} / ${pages.length}`;
  $("#prevBtn").disabled = currentPage === 0;
  $("#nextBtn").disabled = currentPage === pages.length - 1;
  $("#prevBtn").style.opacity = currentPage === 0 ? ".35" : "1";
  $("#nextBtn").style.opacity = currentPage === pages.length - 1 ? ".35" : "1";
  renderDots();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function updateNames() {
  $("#heroName").textContent = partnerName || "My Jaan";
  $("#personalWelcome").textContent = `Meri jaan ${partnerName} ❤️, Alhamdulillah, I'm so lucky to have you in my life. Today, every little sparkle is for you.`;
  $("#letterSign").textContent = `Forever yours, ${girlfriendName} 💗`;
  $("#finalTitle").innerHTML = `You're my whole<br><em>entire world, ${escapeHtml(partnerName)}.</em> 🌏`;
  $(".brand").textContent = `for ${partnerName} ♡`;
}
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}
function updateMusicButton(playing) {
  $("#musicControl").classList.toggle("playing", playing);
  $("#musicLabel").textContent = playing ? "Music on · pause" : "Music off · play";
}
async function startMusic() {
  try {
    await song.play();
    updateMusicButton(true);
  } catch {
    updateMusicButton(false);
    showToast("Music couldn't start. Add your MP3 to assets/audio/birthday-song.mp3.");
  }
}
function stopMusic() {
  song.pause();
  song.currentTime = 0;
  updateMusicButton(false);
}
function burstConfetti() {
  const zone = $("#confettiZone");
  const bits = ["💗", "✨", "💖", "🌸", "🎉", "💕"];
  for (let i = 0; i < 38; i++) {
    const bit = document.createElement("span");
    bit.className = "confetti";
    bit.textContent = bits[Math.floor(Math.random() * bits.length)];
    bit.style.left = `${Math.random() * 100}%`;
    bit.style.animationDelay = `${Math.random() * .8}s`;
    bit.style.fontSize = `${.8 + Math.random() * 1.2}rem`;
    zone.append(bit);
    setTimeout(() => bit.remove(), 4200);
  }
}
function makeHearts() {
  const ambient = $("#ambient");
  const heart = document.createElement("span");
  heart.className = "ambient-heart";
  heart.textContent = ["♡", "♥", "✦", "💗"][Math.floor(Math.random() * 4)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 22}px`;
  heart.style.animationDuration = `${8 + Math.random() * 8}s`;
  ambient.append(heart);
  setTimeout(() => heart.remove(), 17000);
}

$("#openSurprise").addEventListener("click", () => showScreen("welcomeScreen"));
$("#continueBtn").addEventListener("click", () => showScreen("loginScreen"));
$("#loginForm").addEventListener("submit", async event => {
  event.preventDefault();
  girlfriendName = $("#yourName").value.trim();
  partnerName = $("#partnerName").value.trim();
  if (!girlfriendName || !partnerName) {
    $("#formError").textContent = "Please enter both names to unlock your surprise.";
    return;
  }
  $("#formError").textContent = "";
  updateNames();
  showScreen("mainScreen");
  $("#musicControl").classList.remove("hidden");
  $("#logoutBtn").classList.remove("hidden");
  goToPage(0);
  await startMusic();
});
$("#musicControl").addEventListener("click", async () => {
  if (song.paused) await startMusic();
  else { song.pause(); updateMusicButton(false); }
});
song.addEventListener("error", () => updateMusicButton(false));
$("#logoutBtn").addEventListener("click", () => {
  stopMusic();
  girlfriendName = "";
  partnerName = "";
  $("#yourName").value = "";
  $("#partnerName").value = "";
  $("#musicControl").classList.add("hidden");
  $("#logoutBtn").classList.add("hidden");
  letterOpened = false;
  $("#letterCard").classList.add("hidden");
  $("#envelopeBtn").classList.remove("hidden");
  $("#extraSurprise").classList.add("hidden");
  startCountdown();
});
$("#prevBtn").addEventListener("click", () => goToPage(currentPage - 1));
$("#nextBtn").addEventListener("click", () => goToPage(currentPage + 1));
$("#homeBtn").addEventListener("click", () => goToPage(0));
$("#startAgainBtn").addEventListener("click", () => {
  stopMusic();
  $("#musicControl").classList.add("hidden");
  $("#logoutBtn").classList.add("hidden");
  girlfriendName = ""; partnerName = "";
  $("#yourName").value = ""; $("#partnerName").value = "";
  startCountdown();
});
$$("[data-goto]").forEach(button => button.addEventListener("click", () => goToPage(Number(button.dataset.goto))));

$("#envelopeBtn").addEventListener("click", () => {
  if (letterOpened) return;
  letterOpened = true;
  $("#letterText").textContent = "";
  $("#letterCard").classList.remove("hidden");
  $("#envelopeBtn").classList.add("hidden");
  let index = 0;
  const text = birthdayLetter;
  const type = () => {
    if (index < text.length) {
      $("#letterText").textContent += text.charAt(index++);
      setTimeout(type, 22);
    }
  };
  type();
});
$$(".photo-card").forEach((card, index) => card.addEventListener("click", () => {
  const image = $("img", card);
  $("#lightboxImage").src = image.src;
  $("#lightboxCaption").textContent = photoCaptions[index] || "A little memory 💗";
  $("#lightbox").classList.remove("hidden");
}));
function closeLightbox() { $("#lightbox").classList.add("hidden"); }
$("#lightboxClose").addEventListener("click", closeLightbox);
$("#lightbox").addEventListener("click", event => { if (event.target.id === "lightbox") closeLightbox(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeLightbox(); });
$$(".reason-card").forEach(card => card.addEventListener("click", () => card.classList.toggle("revealed")));
const cuteMessages = ["Meri makhan malaiii 🤭😘", "My attitude king 😎❤️", "Twinkle of my eyes ✨👀", "Meri chhoti si duniya aap se hi hai 🌏🫶🏻", "Love of my life 💞"];
let cuteIndex = 0;
$("#cuteBtn").addEventListener("click", () => {
  cuteIndex = (cuteIndex + 1) % cuteMessages.length;
  $("#cuteMessage").textContent = cuteMessages[cuteIndex];
  $("#sceneHeart").textContent = ["💞", "💖", "💘", "💕", "💗"][cuteIndex];
  $("#bearOne").style.transform = `rotate(${cuteIndex % 2 ? -8 : 8}deg) scale(1.08)`;
  $("#bearTwo").style.transform = `rotate(${cuteIndex % 2 ? 8 : -8}deg) scale(1.08)`;
});
$("#wishBtn").addEventListener("click", () => {
  $("#wishTitle").textContent = `A birthday dua for ${partnerName || "you"} 🤲🏻`;
  $("#wishCopy").textContent = "Ya Allah, meri jaan ko sehat, sukoon, kamyabi, halal khushiyan aur lambi zindagi ata farma. Har buri nazar se mehfooz rakh aur har aane wala din khair aur khushi se bhar de. Aameen Sum Aameen! ❤️";
  burstConfetti();
});
$("#finalSurpriseBtn").addEventListener("click", () => {
  $("#extraSurprise").classList.toggle("hidden");
  $("#finalSurpriseBtn").textContent = $("#extraSurprise").classList.contains("hidden") ? "One More Surprise 💌" : "A little more love 💗";
  burstConfetti();
});
setInterval(makeHearts, 900);
startCountdown();
