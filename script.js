/* script.js - Comportamento interativo e animações */
const reasons = [
  {
    title: 'quando você tá bem, eu fico bem',
    description: 'é meio automático… ver você sorrindo já muda meu dia, e eu sinto falta disso quando a gente não tá bem.'
  },
  {
    title: 'eu podia ter sido melhor',
    description: 'em várias coisas… e isso é o que mais me incomoda pensando agora.'
  },
  {
    title: 'eu devia ter te ouvido mais',
    description: 'tem coisa que você já tinha falado e eu não dei atenção… hoje eu vejo isso.'
  },
  {
    title: 'eu não desacreditei da gente',
    description: 'mesmo com tudo, em nenhum momento eu pensei “já era”… eu sempre quis que desse certo.'
  },
  {
    title: 'eu sempre penso na nossa Lua',
    description: 'eu imagino ela pela casa, com os cachinhos dourados, brincando… e a gente ali. é simples, mas era algo que eu quero viver com você.'
  },
  {
    title: 'eu me sinto eu mesmo com você',
    description: 'só sendo eu, e isso não acontece com qualquer pessoa.'
  },
  {
    title: 'eu reparo nas coisas suas',
    description: 'nos jeitos, nas manias… são coisas pequenas, mas que fazem você ser você.'
  },
  {
    title: 'a gente ainda tem muita coisa pra viver',
    description: 'desde coisas simples... sair, rir, fazer nada juntos. Até coisas grandes, tipo viajar, morar junto, ter a Lua… tem muita coisa que eu quero viver com você.'
  },
  {
    title: 'eu não tô falando da boca pra fora',
    description: 'eu realmente fiquei mal com tudo isso.'
  },
  {
    title: 'eu amo você',
    description: 'e só ficou mais claro depois que eu vi o risco de te perder.'
  }
];

const typewriterText = `Meu coração sabe exatamente o que quer:
ser seu abrigo, ser seu amigo fiel e cuidar da nossa história.
Quero construir um futuro incrível ao seu lado.`;

const reasonsGrid = document.getElementById('reasonsGrid');
const readMoreBtn = document.getElementById('readMoreBtn');
const forgiveMeBtn = document.getElementById('forgiveMeBtn');
const modal = document.getElementById('forgivenessModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const finalToast = document.getElementById('finalToast');
const typewriterElement = document.getElementById('typewriterText');
const musicToggle = document.getElementById('musicToggle');
const heartField = document.querySelector('.heart-field');

let toastShown = false;
let musicPlaying = false;

/* =========================
   MÚSICA (MELHORADA)
========================= */
const bgMusic = document.getElementById("bgMusic");

// volume padrão (0 a 1)
bgMusic.volume = 0.2;

// fade-in suave
function fadeInAudio() {
  let vol = 0;
  const interval = setInterval(() => {
    if (vol < 0.2) {
      vol += 0.02;
      bgMusic.volume = vol;
    } else {
      clearInterval(interval);
    }
  }, 200);
}

function toggleMusic() {
  if (!musicPlaying) {
    bgMusic.volume = 0;
    bgMusic.play().then(() => {
      fadeInAudio();
      musicToggle.textContent = 'Pausar música';
      musicPlaying = true;
    }).catch(err => {
      console.log("Erro ao tocar:", err);
    });
  } else {
    bgMusic.pause();
    musicToggle.textContent = 'Tocar música';
    musicPlaying = false;
  }
}
/* ========================= */

function createReasonCards() {
  reasons.forEach((reason, index) => {
    const card = document.createElement('article');
    card.className = 'card section-fade';
    card.innerHTML = `
      <h3>${reason.title}</h3>
      <p>${reason.description}</p>
    `;
    card.style.transitionDelay = `${index * 80}ms`;
    reasonsGrid.appendChild(card);
  });
}

function typeWriterEffect(text, element, speed = 45) {
  let index = 0;
  const interval = setInterval(() => {
    element.textContent += text[index] === '\n' ? '\n' : text[index];
    index += 1;
    if (index === text.length) {
      clearInterval(interval);
    }
  }, speed);
}

function openModal() {
  modal.classList.remove('hidden');
  spawnFloatingHearts(10);
}

function closeModal() {
  modal.classList.add('hidden');
}

function createFloatingHeart(x, delay, scale = 1) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = `${x}%`;
  heart.style.bottom = '-10px';
  heart.style.animationDelay = `${delay}s`;
  heart.style.transform = `rotate(-45deg) scale(${scale})`;
  heartField.appendChild(heart);
  setTimeout(() => heart.remove(), 6500);
}

function spawnFloatingHearts(amount = 6) {
  for (let i = 0; i < amount; i += 1) {
    const x = Math.random() * 100;
    const delay = Math.random() * 1.8;
    const scale = 0.9 + Math.random() * 0.7;
    createFloatingHeart(x, delay, scale);
  }
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.2,
  });

  document.querySelectorAll('.section-fade').forEach((section) => {
    observer.observe(section);
  });
}

function checkFinalSection() {
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  if (!toastShown && scrollPosition >= documentHeight - 120) {
    finalToast.classList.remove('hidden');
    toastShown = true;
    setTimeout(() => finalToast.classList.add('hidden'), 6000);
  }
}

/* EVENTOS */
readMoreBtn.addEventListener('click', () => {
  document.getElementById('motivos').scrollIntoView({ behavior: 'smooth' });
});

forgiveMeBtn.addEventListener('click', () => {
  openModal();
});

closeModalBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

musicToggle.addEventListener('click', toggleMusic);

window.addEventListener('scroll', checkFinalSection);

window.addEventListener('DOMContentLoaded', () => {
  createReasonCards();
  spawnFloatingHearts(12);
  initScrollAnimations();
  typeWriterEffect(typewriterText, typewriterElement);
});
