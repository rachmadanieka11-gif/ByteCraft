/* ============================================================
   EDIT BAGIAN INI 👇
   ============================================================ */

const namaPengirim = "Aku";

const pesanPenutup = {
  judul: "Thanks a bunch!",
  isi: "Hope this little message brightens up your day.<br>Don't forget to stay happy! ✨"
};

const daftarMenu = [
  {
    ikon: "🌸",
    judul: "HOW",
    kecil: "Checking in here",
    emojiBesar: "🌷",
    pesan: "Hi there! <br> How is your world spinning today? <br> I hope you're taking good care of yourself remember <br> that even the brightest stars need to recharge their light🤠",
    lagu: "moments.mp3"
  },
  {
    ikon: "💭",
    judul: "WHAT",
    kecil: "What's on your mind?",
    emojiBesar: "📌",
    pesan: "Whatever is filling your thoughts today <br>I hope your heart finds a way to feel light and calm. <br> Take it easy step by step ✨",
    lagu: "peace.mp3"
  },
  {
    ikon: "🌟",
    judul: "がんばって！",
    kecil: "For your journey today",
    emojiBesar: "🌻",
    pesan: "Your journey isn't a race it's a canvas <br> Paint it gently, one brushstroke at a time 💪",
    lagu: "photo.mp3"
  }
];

/* ============================================================
   DI BAWAH INI JANGAN DIUBAH
   ============================================================ */

// --- Jam & Tanggal ---
function updateWaktu() {
  const now = new Date();
  const jam = String(now.getHours()).padStart(2, '0') + ':' +
              String(now.getMinutes()).padStart(2, '0');
  const opsi = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  document.getElementById('jam').textContent = jam;
  document.getElementById('tanggal').textContent = now.toLocaleDateString('id-ID', opsi);
}
updateWaktu();
setInterval(updateWaktu, 1000);

// --- Render menu ---
const menuList = document.getElementById('menuList');

daftarMenu.forEach((item, i) => {
  const div = document.createElement('div');
  div.className = 'menu-item';
  div.onclick = () => bukaPesan(i);
  div.innerHTML = `
    <span class="ikon">${item.ikon}</span>
    <span class="judul-menu">${item.judul}</span>
    <span class="teks-kecil">${item.kecil}</span>
  `;
  menuList.appendChild(div);
});

// Menu ke-4: Pesan Penutup
const divPenutup = document.createElement('div');
divPenutup.className = 'menu-item spesial';
divPenutup.onclick = () => bukaPenutup();
divPenutup.innerHTML = `
  <span class="ikon">🎊</span>
  <span class="judul-menu">One Last Thing</span>
  <span class="teks-kecil">Leave this for the end</span>
`;
menuList.appendChild(divPenutup);

// --- Navigasi slide ---
function nextSlide(nomor) {
  document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
  document.getElementById('slide' + nomor).classList.add('active');

  // Atur efek sesuai layar
  if (nomor === 3) {
    stopCahaya();
    spawnBintang();
  } else {
    stopBintang();
    mulaiCahaya();
  }
}

// --- Timer ---
function mulaiTimer() {
  const btnBuka = document.getElementById('btnBuka');
  btnBuka.disabled = true;

  nextSlide('Timer');

  const elAngka = document.getElementById('timerAngka');
  const elTeks = document.querySelector('.timer-teks');
  let hitung = 3;

  elAngka.textContent = hitung;
  elAngka.classList.remove('finally');
  elTeks.textContent = 'Hold tight...';

  const interval = setInterval(() => {
    hitung--;
    if (hitung > 0) {
      elAngka.textContent = hitung;
      elAngka.style.animation = 'none';
      setTimeout(() => { elAngka.style.animation = ''; }, 10);
    } else {
      clearInterval(interval);
      elAngka.textContent = '✨';
      elAngka.classList.add('finally');
      elTeks.textContent = 'Here we go!';

      setTimeout(() => {
        nextSlide(2);
        btnBuka.disabled = false;
      }, 800);
    }
  }, 1000);
}

// --- Buka pesan biasa ---
let laguSekarang = "";
function bukaPesan(index) {
  const item = daftarMenu[index];
  document.getElementById('emojiPesan').textContent = item.emojiBesar;
  document.getElementById('judulPesan').textContent = item.judul;
  document.getElementById('isiPesan').innerHTML = item.pesan;

  if (item.lagu && item.lagu !== laguSekarang) {
    gantiLagu(item.lagu);
    laguSekarang = item.lagu;
  }

  const musik = document.getElementById('musik');
  if (musik.paused) {
    musik.play().then(() => {
      const btn1 = document.getElementById('btnMusik');
      if (btn1) btn1.textContent = '🔊 Matikan Lagu';
    }).catch(() => {});
  }

  nextSlide(3);
}

// --- Buka pesan penutup ---
function bukaPenutup() {
  document.getElementById('judulPenutup').textContent = pesanPenutup.judul;
  document.getElementById('isiPenutup').innerHTML = pesanPenutup.isi;
  document.getElementById('namaPengirim').textContent = namaPengirim;

  const musik = document.getElementById('musik');
  const source = musik.querySelector('source');
  const btn1 = document.getElementById('btnMusik');
  const btn2 = document.getElementById('btnMusik2');

  if (source && !source.src.includes('blue.mp3')) {
    source.src = 'blue.mp3';
    musik.load();
  }

  musik.play().then(() => {
  if (btn1) btn1.textContent = '🔊 Turn Off';
  if (btn2) btn2.textContent = '🔊 Turn Off';
}).catch(() => {
  if (btn1) btn1.textContent = '🔇 Unmute';
  if (btn2) btn2.textContent = '🔇 Unmute';
});

  nextSlide(4);

  setTimeout(() => {
    tembakConfetti();
    tembakPetasan();
  }, 400);
}

// --- Ganti lagu ---
function gantiLagu(namaFile) {
  const musik = document.getElementById('musik');
  const source = musik.querySelector('source');
  if (!source) return;
  source.src = namaFile;
  musik.load();
  if (!musik.paused) {
    musik.play().catch(() => {});
  }
}

// --- Toggle lagu ON/OFF ---
function toggleMusic() {
  const musik = document.getElementById('musik');
  const btn1 = document.getElementById('btnMusik');
  const btn2 = document.getElementById('btnMusik2');

  if (musik.paused) {
    musik.play().then(() => {
      if (btn1) btn1.textContent = '🔊 Matikan Lagu';
      if (btn2) btn2.textContent = '🔊 Matikan Lagu';
    }).catch(() => {
      alert('Taruh file lagunya di folder yang sama ya!');
    });
  } else {
    musik.pause();
    if (btn1) btn1.textContent = '🔇 Putar Lagu';
    if (btn2) btn2.textContent = '🔇 Putar Lagu';
  }
}

// ============================================================
// BINTANG (layar 3) — kecil & blur
// ============================================================
let bintangInterval = null;

function spawnBintang() {
  const bintang = ['✨', '⭐', '🌟', '💫', '✩', '⋆'];
  const warna = ['#ffffff', '#ffe9a8', '#ffd6f0', '#d6e5ff', '#e8d6ff', '#fff4b8'];

  if (bintangInterval) clearInterval(bintangInterval);

  bintangInterval = setInterval(() => {
    const el = document.createElement('div');
    el.className = 'bintang';
    el.textContent = bintang[Math.floor(Math.random() * bintang.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.bottom = '-30px';
    // Ukuran lebih kecil (10-18px)
    el.style.fontSize = (10 + Math.random() * 8) + 'px';
    el.style.color = warna[Math.floor(Math.random() * warna.length)];
    el.style.animationDuration = (5 + Math.random() * 4) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 10000);
  }, 350);   // muncul tiap 350ms (lebih jarang)
}

function stopBintang() {
  if (bintangInterval) {
    clearInterval(bintangInterval);
    bintangInterval = null;
  }
  document.querySelectorAll('.bintang').forEach(el => el.remove());
}

// ============================================================
// CAHAYA PUTIH (layar lain) — kecil & blur
// ============================================================
let cahayaInterval = null;

function spawnCahaya() {
  const el = document.createElement('div');
  el.className = 'cahaya';
  el.style.left = Math.random() * 100 + 'vw';
  el.style.top = Math.random() * 100 + 'vh';
  // Ukuran lebih kecil (3-7px)
  const ukuran = 3 + Math.random() * 4;
  el.style.width = ukuran + 'px';
  el.style.height = ukuran + 'px';
  el.style.animationDuration = (2.5 + Math.random() * 2) + 's';
  el.style.animationDelay = (Math.random() * 2) + 's';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 6000);
}

function mulaiCahaya() {
  if (cahayaInterval) return;
  cahayaInterval = setInterval(spawnCahaya, 250);
}

function stopCahaya() {
  if (cahayaInterval) {
    clearInterval(cahayaInterval);
    cahayaInterval = null;
  }
  document.querySelectorAll('.cahaya').forEach(el => el.remove());
}

// Mulai cahaya dari awal
mulaiCahaya();

// --- Toggle Dark/Light ---
function toggleTema() {
  document.body.classList.toggle('dark');
  const btn = document.getElementById('btnTema');
  btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

// ============================================================
// CONFETTI & PETASAN
// ============================================================
const canvas = document.getElementById('canvasConfetti');
const ctx = canvas.getContext('2d');
let partikel = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const warnaConfetti = ['#ff6b9d', '#ffd93d', '#6bcbff', '#a18cd1', '#f06292', '#7bed9f', '#ffa502'];

function tembakConfetti() {
  for (let i = 0; i < 100; i++) {
    partikel.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14 - 3,
      size: 5 + Math.random() * 7,
      color: warnaConfetti[Math.floor(Math.random() * warnaConfetti.length)],
      rotasi: Math.random() * 360,
      vRotasi: (Math.random() - 0.5) * 15,
      hidup: 150,
      bentuk: Math.random() > 0.5 ? 'kotak' : 'bulat'
    });
  }
}

function tembakPetasan() {
  const titik = [
    { x: canvas.width * 0.2, y: canvas.height * 0.3, delay: 0 },
    { x: canvas.width * 0.8, y: canvas.height * 0.3, delay: 250 },
    { x: canvas.width * 0.5, y: canvas.height * 0.5, delay: 500 },
    { x: canvas.width * 0.3, y: canvas.height * 0.6, delay: 750 },
    { x: canvas.width * 0.7, y: canvas.height * 0.6, delay: 1000 }
  ];

  titik.forEach(t => {
    setTimeout(() => {
      for (let i = 0; i < 60; i++) {
        const sudut = (Math.PI * 2 * i) / 60;
        const kecepatan = 3 + Math.random() * 5;
        partikel.push({
          x: t.x,
          y: t.y,
          vx: Math.cos(sudut) * kecepatan,
          vy: Math.sin(sudut) * kecepatan,
          size: 3 + Math.random() * 5,
          color: warnaConfetti[Math.floor(Math.random() * warnaConfetti.length)],
          rotasi: 0,
          vRotasi: 0,
          hidup: 120,
          bentuk: 'bulat'
        });
      }
    }, t.delay);
  });
}

function animasiPartikel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  partikel = partikel.filter(p => p.hidup > 0);

  partikel.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15;
    p.vx *= 0.99;
    p.rotasi += p.vRotasi;
    p.hidup--;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotasi * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.min(1, p.hidup / 60);

    if (p.bentuk === 'kotak') {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });

  requestAnimationFrame(animasiPartikel);
}
animasiPartikel();

// ============================================================
// FORMSPREE - KIRIM BALASAN
// ============================================================
const FORMSPREE_ID = "mljgbqoo";

const formBalasan = document.getElementById('formBalasan');
const formStatus = document.getElementById('formStatus');
const btnKirim = document.getElementById('btnKirim');
const inputBalasan = document.getElementById('inputBalasan');

formBalasan.addEventListener('submit', async (e) => {
  e.preventDefault();

  const pesan = inputBalasan.value.trim();
  if (!pesan) {
    formStatus.textContent = '❌ Write your message first 😊';
    formStatus.className = 'form-status gagal';
    return;
  }

  btnKirim.disabled = true;
  btnKirim.textContent = 'Sending...';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  const data = new FormData(formBalasan);

  try {
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      formStatus.textContent = '✨ Your message has been sent! Thanks a lot 💖';
      formStatus.className = 'form-status sukses';
      formBalasan.reset();
      btnKirim.textContent = 'Sent ✅';

      if (typeof tembakConfetti === 'function') tembakConfetti();

      setTimeout(() => {
        btnKirim.disabled = false;
        btnKirim.textContent = 'Send Message 💫';
      }, 3000);
    } else {
      formStatus.textContent = '❌ Gagal kirim. Coba lagi ya.';
      formStatus.className = 'form-status gagal';
      btnKirim.disabled = false;
      btnKirim.textContent = 'Send Message 💫';
    }
  } catch (error) {
    formStatus.textContent = '❌ Koneksi bermasalah. Coba lagi.';
      formStatus.className = 'form-status gagal';
    btnKirim.disabled = false;
    btnKirim.textContent = 'Send Message 💫';
  }
});