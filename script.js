document.addEventListener('DOMContentLoaded', function() {
  // Audio element
  const audio = new Audio();
  
  // Playlista s ispravnim nazivima pjesama
  const playlist = [
    { title: "1. Rim Tim Tagi Dim", src: "./Muzika/Baby Lasagna- Rim Tim Tagi Dim (Official Video).mp3" },
    { title: "2. LAZES ME LJUBAVI", src: "./Muzika/BARBARA BOBAK - LAZES ME LJUBAVI (OFFICIAL VIDEO).mp3" },
    { title: "3. KUME MOJ", src: "./Muzika/BRESKVICA - KUME MOJ (OFFICIAL VIDEO).mp3" },
    { title: "4. PREZIME", src: "./Muzika/DARKO LAZIC FEAT. ZERA - PREZIME (OFFICIAL VIDEO).mp3" },
    { title: "5. Nešto lijepo treba da se desi i Danas sam OK", src: "./Muzika/Dino Merlin - Nešto lijepo treba da se desi i Danas sam OK (Koševo 2008).mp3" },
    { title: "6. Sredinom", src: "./Muzika/Dino Merlin - Sredinom (Beograd 2011).mp3" },
    { title: "7. Supermen", src: "./Muzika/Dino Merlin & Željko Joksimović - Supermen (Beograd 2011).mp3" },
    { title: "8. Cik Cik Pogodi", src: "./Muzika/Dj Adel - Cik Cik Pogodi Remix 2005.mp3" },
    { title: "9. DOBRO JUTRO MOJA VOLJENA", src: "./Muzika/JUSUF & BARBARA - DOBRO JUTRO MOJA VOLJENA(cover) STUDIO DALAS 2021.mp3" },
    { title: "10. Seceru", src: "./Muzika/LUNA - Seceru - (Official Video 2005).mp3" },
    { title: "11. SALJI BROJ", src: "./Muzika/MC STOJAN - SALJI BROJ (OFFICIAL VIDEO).mp3" },
    { title: "12. OTKAZ", src: "./Muzika/MC STOJAN X ANASTASIJA - OTKAZ (OFFICIAL VIDEO).mp3" },
    { title: "13. ZIVOT SI MOJ", src: "./Muzika/MC STOJAN x BRESKVICA - ZIVOT SI MOJ (OFFICIAL VIDEO).mp3" },
    { title: "14. BOING 747", src: "./Muzika/MINISTARKE - BOING 747 (OFFICIAL VIDEO 2015).mp3" },
    { title: "15. Cirkus Kolorado", src: "./Muzika/Nervozni postar Cirkus Kolorado - ( Narodni Hitovi Nek ljubav traje PB ).mp3" },
    { title: "16. Rajske kise", src: "./Muzika/NUCCI - RAJSKE KISE (OFFICIAL VIDEO) Prod. by Jhinsen.mp3" },
    { title: "17. Ruzmarin", src: "./Muzika/Sanja Vučić x Nucci - Ruzmarin (Official Video  Album Remek-Delo).mp3" },
    { title: "18. Falis mi", src: "./Muzika/SEVERINA X AZIS - FALIŠ MI.mp3" },
    { title: "19. Metak", src: "./Muzika/SEVERINA X NUCCI - METAK, OFFICIAL VIDEO.mp3" },
    { title: "20. Dragi Boze", src: "./Muzika/Siniša Vuco & Halid Bešlić - Dragi Bože (Official video).mp3" },
    { title: "21. Olovo", src: "./Muzika/SLOBA RADANOVIC X BRESKVICA & DEJAN PETROVIC - OLOVO (OFFICIAL VIDEO).mp3" },
    { title: "22. Igra bez granica", src: "./Muzika/Toše Proeski - Igra bez granica (OFFICIAL VIDEO).mp3" },
    { title: "23. Pile moje", src: "./Muzika/VALENTINO - Pile Moje (Official Video).mp3" },
    { title: "24. Čerge", src: "./Muzika/Zlatko Pejaković - Čerge (Official lyric video).mp3" }
  ];

  // DOM elementi
  const playlistEl = document.getElementById('playlist');
  const playBtn = document.getElementById('play');
  const pauseBtn = document.getElementById('pause');
  const stopBtn = document.getElementById('stop');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const progressBar = document.getElementById('progress');

  let currentTrackIndex = 0;
  let isPlaying = false;

  // Inicijalizacija playlista
  function renderPlaylist() {
    playlistEl.innerHTML = playlist.map((track, index) => `
      <li class="playlist__item ${index === currentTrackIndex ? 'active' : ''}">
        <a href="#" data-index="${index}">${track.title}</a>
      </li>
    `).join('');
  }

  // Učitaj pjesmu
  function loadTrack(index) {
    if (index < 0 || index >= playlist.length) return;

    currentTrackIndex = index;
    audio.src = playlist[index].src;
    
    audio.addEventListener('canplaythrough', function() {
      durationEl.textContent = formatTime(audio.duration);
      highlightCurrentTrack();
    }, { once: true });

    audio.load();
    
    if (isPlaying) {
      audio.play().catch(e => console.error("Greška pri reprodukciji:", e));
    }
  }

  // Ažuriraj vrijeme
  function updateTime() {
    currentTimeEl.textContent = formatTime(audio.currentTime);
    progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  }

  // Označi trenutnu pjesmu
  function highlightCurrentTrack() {
    document.querySelectorAll('.playlist__item').forEach((item, index) => {
      item.classList.toggle('active', index === currentTrackIndex);
    });
  }

  // Formatiraj vrijeme (MM:SS)
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Event listeneri
  playBtn.addEventListener('click', function() {
    isPlaying = true;
    audio.play().catch(e => console.error("Greška pri reprodukciji:", e));
  });

  pauseBtn.addEventListener('click', function() {
    isPlaying = false;
    audio.pause();
  });

  stopBtn.addEventListener('click', function() {
    isPlaying = false;
    audio.pause();
    audio.currentTime = 0;
    updateTime();
  });

  nextBtn.addEventListener('click', function() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
  });

  prevBtn.addEventListener('click', function() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
  });

  // Klik na pjesmu u playlisti
  playlistEl.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      currentTrackIndex = parseInt(e.target.dataset.index);
      loadTrack(currentTrackIndex);
      isPlaying = true;
      audio.play().catch(e => console.error("Greška pri reprodukciji:", e));
    }
  });

  // Premotavanje
  progressBar.addEventListener('input', function() {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  });

  // Automatsko ažuriranje vremena
  audio.addEventListener('timeupdate', updateTime);

  // Kraj pjesme
  audio.addEventListener('ended', function() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
  });

  // Inicijalizacija
  renderPlaylist();
  loadTrack(0);
});