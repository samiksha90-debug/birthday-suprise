const screens = [...document.querySelectorAll(".screen")];
const music = document.getElementById("music");

let done = new Set();
let left = 3;

/* ================= PAGE NAVIGATION ================= */

function go(id) {
  // Remove active from EVERY page
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  // Add active only to the requested page
  const selectedScreen = document.getElementById(id);

  if (selectedScreen) {
    selectedScreen.classList.add("active");
  }

  // Return to top
  window.scrollTo(0, 0);
}

function start() {
  music.play().catch(() => {});
  go("q");
}

/* ================= QUESTION ================= */

function check() {
  const a = document.getElementById("ans").value.toLowerCase();

  if (a.includes("tuition") || a.includes("hall")) {
    document.getElementById("wrong").textContent =
      "ACCESS GRANTED ✅";

    setTimeout(() => go("levels"), 450);
  } else {
    document.getElementById("wrong").textContent =
      "ACCESS DENIED 😭 Hint: where were you going for classes?";
  }
}

document.getElementById("ans").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    check();
  }
});

/* ================= MEMORY FILES ================= */

function memory(title, emoji, text) {
  done.add(title);

  document.getElementById("content").innerHTML = `
    <h2>${emoji} ${title}</h2>
    <p>${text}</p>
  `;

  document.getElementById("modal").classList.add("show");

  status();
}

/* ================= PHOTO VAULT ================= */

function photos() {
  done.add("photos");

  document.getElementById("content").innerHTML = `
    <h2>📸 PHOTO VAULT</h2>

    <div class="gallery">
      <img src="photos/photo1.jpeg" alt="Memory 1">
      <img src="photos/photo2.jpeg" alt="Memory 2">
      <img src="photos/photo3.jpeg" alt="Memory 3">
      <img src="photos/photo4.jpeg" alt="Memory 4">
    </div>

    <p>Some classified memories of Samu & Pajju 😂❤️</p>
  `;

  document.getElementById("modal").classList.add("show");

  status();
}

/* ================= FILE STATUS ================= */

function status() {
  document.getElementById("status").textContent =
    `Files completed: ${done.size}/4`;

  if (done.size === 4) {
    document.getElementById("cakeBtn").classList.remove("hide");
  }
}

/* ================= CLOSE MODAL ================= */

function closeM() {
  document.getElementById("modal").classList.remove("show");
}

/* ================= CAKE ================= */

function candle(button) {
  if (button.classList.contains("off")) return;

  button.classList.add("off");

  left--;

  document.getElementById("count").textContent =
    left + " candle" + (left === 1 ? "" : "s") + " remaining...";

  burst(18);

  if (left === 0) {
    document.getElementById("count").textContent =
      "WISH PROTOCOL COMPLETE ❤️";

    document.getElementById("final").classList.remove("hide");

    burst(100);
  }
}

/* ================= FINAL PAGE ================= */

function reveal() {
  go("final");
  burst(250);
}

/* ================= CONFETTI ================= */

function burst(n) {
  const c = document.getElementById("confetti");
  const x = c.getContext("2d");

  c.width = window.innerWidth;
  c.height = window.innerHeight;

  const particles = Array.from(
    { length: n },
    () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 1) * 13,
      s: Math.random() * 7 + 3,
      r: Math.random() * 6
    })
  );

  let t = 0;

  function animate() {
    x.clearRect(0, 0, c.width, c.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18;
      p.r += 0.1;

      x.save();

      x.translate(p.x, p.y);
      x.rotate(p.r);

      x.fillStyle =
        `hsl(${Math.random() * 360}, 90%, 70%)`;

      x.fillRect(0, 0, p.s, p.s * 1.8);

      x.restore();
    });

    if (t++ < 110) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

/* ================= STARTUP ================= */

/* Force only the start page to be visible */
go("start");