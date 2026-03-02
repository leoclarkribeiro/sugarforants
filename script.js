// Sugar for Ants: Interactive enhancements

function formatTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

document.addEventListener('DOMContentLoaded', () => {
  // ===== Audio Player =====
  const audio = document.getElementById('audioElement');
  const player = document.getElementById('audioPlayer');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const trackNameEl = document.getElementById('playerTrackName');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const playerTime = document.getElementById('playerTime');
  const playerDuration = document.getElementById('playerDuration');
  const volumeBtn = document.getElementById('volumeBtn');
  const volumeSlider = document.getElementById('volumeSlider');

  const trackItems = document.querySelectorAll('.track-item');

  trackItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.button !== 0) return; // Only left click
      e.preventDefault();
      const src = item.getAttribute('href');
      const name = item.getAttribute('data-track') || item.querySelector('.track-name')?.textContent || 'Track';
      playTrack(src, name, item);
    });
  });

  function playTrack(src, name, trackEl) {
    trackItems.forEach((t) => t.classList.remove('playing'));
    if (trackEl) trackEl.classList.add('playing');

    audio.src = src;
    trackNameEl.textContent = name;
    audio.play();
    player.classList.add('visible', 'playing');
  }

  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      if (audio.src) {
        audio.play();
        player.classList.add('playing');
      }
    } else {
      audio.pause();
      player.classList.remove('playing');
    }
  });

  audio.addEventListener('timeupdate', () => {
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progressFill.style.width = `${pct}%`;
    playerTime.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
    playerDuration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('ended', () => {
    player.classList.remove('playing');
    trackItems.forEach((t) => t.classList.remove('playing'));
  });

  progressBar.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  });

  volumeSlider.addEventListener('input', (e) => {
    audio.volume = parseFloat(e.target.value);
  });

  volumeBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    volumeBtn.querySelector('.volume-icon').textContent = audio.muted ? '🔇' : '🔊';
  });
  // Intersection observer for section fade-in
  const sections = document.querySelectorAll('.section');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });

  // Add visible class styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .section.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Track items stagger fade-in on scroll
  const trackObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `trackFadeIn 0.5s ease ${Math.min(index * 0.05, 0.4)}s forwards`;
      }
    });
  }, { threshold: 0.1 });

  trackItems.forEach((item) => {
    item.style.opacity = '0';
    trackObserver.observe(item);
  });

  const trackStyle = document.createElement('style');
  trackStyle.textContent = `
    @keyframes trackFadeIn {
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(trackStyle);
});
