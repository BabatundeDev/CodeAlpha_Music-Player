const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const playIcon = playButton.querySelector('i');
const seekBar = document.getElementById('seek');
const volumeControl = document.getElementById('volume');
const songName = document.getElementById('song-name');
const songArtist = document.getElementById('song-artist');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const playlist = document.getElementById('playlist');
const songImage = document.getElementById('song-image');
const cover = document.querySelector(".cover");

let isPlaying = false;

let songs = [
  {
    title: 'Dreamscape',
    artist: 'omarfarukjafree',
    file: 'assests/audio/dreamscape-209170.mp3',
    image: 'assests/images/image1.webp'
  },
  {
    title: 'Love Like This',
    artist: 'TadashiKeiji',
    file: 'assests/audio/love-like-this-328518.mp3',
    image: 'assests/images/image2.jpg'
  },
  {
    title: 'Calm Mind - Chill Lofi Beat Background Music',
    artist: 'FASSounds',
    file: 'assests/audio/calm-mind-chill-lofi-beat-background-music-259700.mp3',
    image: 'assests/images/image3.jpg'
  },
  {
    title: 'Smooth Acoustic and Electro beat for intro music',
    artist: 'beechbeatz',
    file: 'assests/audio/smooth-acoustic-and-electro-beat-for-intro-music-132310.mp3',
    image: 'assests/images/image4.jpg'
  },
  {
    title: 'Nightfall / Future Bass Music',
    artist: 'SoulProdMusic',
    file: 'assests/audio/nightfall-future-bass-music-228100.mp3',
    image: 'assests/images/image5.jpg'
  },
  {
    title: 'neon nights',
    artist: 'Partyton',
    file: 'assests/audio/neon-nights-111723.mp3',
    image: 'assests/images/image6.jpg'
  },
  {
    title: 'Miyagisama - Late Night Drive',
    artist: 'Miyagisama',
    file: 'assests/audio/miyagisama-late-night-drive-9987.mp3',
    image: 'assests/images/image7.jpg'
  },
  {
    title: 'Coffee Shop',
    artist: 'CryptologyMedia',
    file: 'assests/audio/coffee-shop-189585.mp3',
    image: 'assests/images/image8.jpg'
  },
  {
    title: 'Abstract Future Bass_Pursit',
    artist: 'QubeSounds',
    file: 'assests/audio/abstract-future-bass_pursit-162604.mp3',
    image: 'assests/images/image9.jpg'
  },
  {
    title: 'Skyline',
    artist: 'augustynengty',
    file: 'assests/audio/skyline-214368.mp3',
    image: 'assests/images/image10.jpg'
  }
];

let currentSongIndex = 0;

function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  songName.textContent = song.title;
  songArtist.textContent = song.artist;
  songImage.src = song.image;
  seekBar.value = 0;
  currentTimeDisplay.textContent = '0:00';
  durationDisplay.textContent = '0:00';
  cover.classList.remove('rotate');
}

function highlightActiveSong(index) {
  const items = playlist.querySelectorAll("li");
  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    updatePlayIcon(true);
    cover.classList.add('rotate');
    isPlaying = true;
  } else {
    audio.pause();
    updatePlayIcon(false);
    cover.classList.remove('rotate');
    isPlaying = false;
  }
}

function updatePlayIcon(isPlaying) {
  if (isPlaying) {
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
  } else {
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
  }
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  highlightActiveSong(currentSongIndex);
  audio.play();
  updatePlayIcon(true);
  cover.classList.add('rotate');
  isPlaying = true;
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  highlightActiveSong(currentSongIndex);
  audio.play();
  updatePlayIcon(true);
  cover.classList.add('rotate');
  isPlaying = true;
}

function formatTime(seconds) {
  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

audio.addEventListener('loadedmetadata', () => {
  durationDisplay.textContent = formatTime(audio.duration);
  seekBar.value = 0;
});

audio.addEventListener('timeupdate', () => {
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
  if (!isNaN(audio.duration) && audio.duration > 0) {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
  }
});

seekBar.addEventListener('input', () => {
  audio.currentTime = (seekBar.value / 100) * audio.duration;
});

volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value / 100;
});

audio.addEventListener('ended', () => {
  nextSong();
});

songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.title} - ${song.artist}`;
  li.onclick = () => {
    currentSongIndex = index;
    loadSong(index);
    highlightActiveSong(index);
    audio.play();
    updatePlayIcon(true);
    cover.classList.add('rotate');
    isPlaying = true;
  };
  playlist.appendChild(li);
});

// Load first song and highlight it
loadSong(currentSongIndex);
highlightActiveSong(currentSongIndex);
