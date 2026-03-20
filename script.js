/* ============================================
   CHANNEL 2K26 — Script
   Particle background, countdown, modals,
   FAQ accordion, smooth scroll, navbar, reveal
   ============================================ */

// ==========================================
// EVENT DATA
// ==========================================
const eventData = {
  paper: {
    title: 'Paper Presentation',
    icon: '<i class="fas fa-file-alt"></i>',
    badge: 'Technical',
    badgeClass: '',
    fee: '₹150 per head (Max 4 members)',
    description: 'Present your cutting-edge research papers on topics spanning electronics, communication systems, embedded technology, renewable energy, AI/ML applications, and more. A panel of expert judges will evaluate your innovation, clarity, and depth of analysis. Showcase your ideas on the grand stage and inspire the next generation of engineers!',
    coord1: { name: 'A. Priya Dharshini', phone: '+91 93456 78901' },
    coord2: { name: 'R. Vishnu Kumar', phone: '+91 94567 89012' }
  },
  quiz: {
    title: 'Technical Quiz',
    icon: '<i class="fas fa-brain"></i>',
    badge: 'Technical',
    badgeClass: '',
    fee: '₹150 per head (2 members)',
    description: 'Think fast, answer faster! Put your technical knowledge to the ultimate test in this electrifying quiz competition. Covering a wide range of topics from electrical engineering fundamentals to the latest tech trends, participants will face multiple challenging rounds including rapid-fire, buzzer rounds, and visual identification. Only the sharpest minds will survive!',
    coord1: { name: 'K. Sathya Narayanan', phone: '+91 97654 32101' },
    coord2: { name: 'M. Kavitha', phone: '+91 98765 12345' }

  },
  circuitdebug: {
    title: 'Circuit/Code Debugging',
    icon: '<i class="fas fa-tools"></i>',
    badge: 'Technical',
    badgeClass: '',
    fee: '₹150 per head',
    description: 'Test your practical electronics skills! Participants will be given faulty circuits and must identify, troubleshoot, and fix the issues within a given time limit. Perfect for hardware enthusiasts who know their way around breadboards, multimeters, and components.'
  },
  connections: {
    title: 'Connections',
    icon: '<i class="fas fa-puzzle-piece"></i>',
    badge: 'Non-Technical',
    badgeClass: 'non-tech',
    fee: '₹100 per team',
    description: 'Connect the visual clues to guess the right word or phrase. This event tests your lateral thinking, quick reflexes, and pop-culture knowledge. Form a team, buzz in fast, and crack the ultimate Connections challenge!'
  },
  nontechquiz: {
    title: 'Non-Technical Quiz',
    icon: '<i class="fas fa-question-circle"></i>',
    badge: 'Non-Technical',
    badgeClass: 'non-tech',
    fee: '₹100 per team',
    description: 'Take a break from the technical concepts and join our fun-filled Non-Technical Quiz! Test your knowledge across general awareness, movies, sports, science, history, and current affairs. A high-energy event with exciting rounds!'
  }
};

// ==========================================
// LOADING SCREEN
// ==========================================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

// ==========================================
// PARTICLE BACKGROUND
// ==========================================
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      // Randomize color between blue and violet
      const colors = [
        '0, 212, 255',   // neon blue
        '0, 245, 212',   // neon cyan
        '123, 47, 247',  // neon violet
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticleArray() {
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 150);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    connectParticles();
    animationId = requestAnimationFrame(animate);
  }

  initParticleArray();
  animate();

  // reinitialize on resize (debounced)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      cancelAnimationFrame(animationId);
      initParticleArray();
      animate();
    }, 250);
  });
})();

// ==========================================
// COUNTDOWN TIMER
// ==========================================
(function initCountdown() {
  const targetDate = new Date('March 25, 2026 09:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

// ==========================================
// NAVBAR
// ==========================================
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
})();

// ==========================================
// EVENT MODAL
// ==========================================
function openEventModal(eventKey) {
  const data = eventData[eventKey];
  if (!data) return;

  document.getElementById('modalIcon').innerHTML = data.icon;
  document.getElementById('modalTitle').textContent = data.title;

  const badge = document.getElementById('modalBadge');
  badge.textContent = data.badge;
  badge.className = 'event-badge modal-badge ' + data.badgeClass;

  document.getElementById('modalDescription').textContent = data.description;
  document.getElementById('modalFee').textContent = data.fee;

  const rulesBtn = document.getElementById('modalRulesBtn');
  if (rulesBtn) {
    rulesBtn.style.display = eventKey === 'paper' ? 'inline-flex' : 'none';
  }

  const themesBtn = document.getElementById('modalThemesBtn');
  if (themesBtn) {
    themesBtn.style.display = eventKey === 'paper' ? 'inline-flex' : 'none';
  }

  document.getElementById('eventModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeEventModal() {
  document.getElementById('eventModal').classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalOutside(event) {
  if (event.target === event.currentTarget) {
    closeEventModal();
  }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeEventModal();
});

// ==========================================
// FAQ ACCORDION
// ==========================================
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isActive = item.classList.contains('active');

  // Close all
  document.querySelectorAll('.faq-item').forEach(faq => {
    faq.classList.remove('active');
  });

  // Toggle current
  if (!isActive) {
    item.classList.add('active');
  }
}

// ==========================================
// SCROLL REVEAL
// ==========================================
(function initReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
})();

// ==========================================
// SMOOTH SCROLL (polyfill for older browsers)
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
