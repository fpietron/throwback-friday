define({
  configureAudioElement: (id) => {
    const sound = document.createElement('audio');
    sound.id = id;
    sound.setAttribute('preload', 'auto');
    sound.setAttribute('controls', 'none');
    sound.style.display = 'none';
    document.body.appendChild(sound);
    return sound;
  },
  play: (source, audioElement) => {
    audioElement.src = source;
    if(!audioElement.ended) {
      audioElement.load();
    }
    audioElement.play().catch(e => null);
  }
});
