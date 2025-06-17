// Audio-related functionality

// Audio variables
let startupSound, dialUpSound, ambientSound, artifactSound, completionSound, creepyDoorSound;
let audioInitialized = false;

// Setup audio with Tone.js
function setupAudio() {
  try {
    // Check if Tone is available
    if (typeof Tone === 'undefined') {
      console.warn("Tone.js not available, loading dynamically");
      
      // Create script tag to load Tone.js
      const script = document.createElement('script');
      script.src = 'https://cdn.skypack.dev/tone';
      script.onload = function() {
        console.log("Tone.js loaded successfully");
        initializeAudio();
      };
      script.onerror = function() {
        console.error("Failed to load Tone.js");
        // Create fallbacks for audio functions
        setupFallbackAudio();
      };
      document.head.appendChild(script);
      return;
    }
    
    // Initialize audio if Tone.js is already available
    initializeAudio();
  } catch (e) {
    console.error("Error setting up audio:", e);
    setupFallbackAudio();
  }
}

// Function to initialize audio once Tone.js is available
function initializeAudio() {
  try {
    console.log("Initializing audio system...");
    
    // Start audio context
    Tone.start().then(() => {
      console.log("Audio context started");
      
      // Startup sound (Windows 95-like with a weird twist)
      startupSound = new Tone.PolySynth(Tone.Synth).toDestination();
      startupSound.volume.value = -12; // Lower volume to avoid being too loud
      
      // Dial-up sound generator
      dialUpSound = new Tone.Noise("white").toDestination();
      dialUpSound.volume.value = -20;
      
      // Ambient sound (eerie pad)
      const reverb = new Tone.Reverb(5).toDestination();
      ambientSound = new Tone.FMSynth({
        harmonicity: 3,
        modulationIndex: 10,
        oscillator: {
          type: "sine"
        },
        envelope: {
          attack: 1,
          decay: 2,
          sustain: 0.8,
          release: 1
        },
        modulation: {
          type: "square"
        },
        modulationEnvelope: {
          attack: 0.5,
          decay: 0.5,
          sustain: 0.2,
          release: 0.5
        }
      }).connect(reverb);
      ambientSound.volume.value = -25;
      
      // Artifact found sound
      artifactSound = new Tone.Synth({
        oscillator: {
          type: "triangle"
        },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.2,
          release: 0.8
        }
      }).toDestination();
      artifactSound.volume.value = -15;
      
      // Creepy completion sound
      completionSound = new Tone.FMSynth({
        harmonicity: 0.5,
        modulationIndex: 10,
        oscillator: {
          type: "sawtooth"
        },
        envelope: {
          attack: 0.3,
          decay: 0.2,
          sustain: 0.8,
          release: 1.5
        }
      }).connect(reverb);
      completionSound.volume.value = -15;
      
      // Creepy door sound
      creepyDoorSound = new Tone.Player({
        url: '/creepy_sound.mp3',
        autostart: false,
        loop: false,
        volume: -10,
        onload: () => {
          console.log("Creepy door sound loaded");
        }
      }).toDestination();
      
      audioInitialized = true;
      console.log("Audio system initialized successfully");
    }).catch(err => {
      console.error("Could not start audio context:", err);
      setupFallbackAudio();
    });
  } catch (e) {
    console.error("Error initializing audio:", e);
    setupFallbackAudio();
  }
}

// Setup fallback audio for when Tone.js fails to load or initialize
function setupFallbackAudio() {
  console.warn("Setting up fallback audio system");
  
  // Create basic fallbacks using vanilla Web Audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  startupSound = {
    triggerAttackRelease: (note, duration, time, velocity) => {
      try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = 440; // A4
        gainNode.gain.value = 0.3;
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (e) {
        console.error("Fallback audio error:", e);
      }
    }
  };
  
  dialUpSound = {
    volume: { value: 0 },
    start: () => {},
    stop: () => {}
  };
  
  ambientSound = {
    triggerAttackRelease: () => {}
  };
  
  artifactSound = {
    triggerAttackRelease: () => {}
  };
  
  completionSound = {
    triggerAttackRelease: () => {}
  };
  
  // Create a simple HTMLAudioElement for the creepy door sound
  const audio = new Audio('/creepy_sound.mp3');
  creepyDoorSound = {
    start: () => {
      audio.currentTime = 0;
      audio.play().catch(e => console.error("Error playing audio:", e));
    }
  };
  
  audioInitialized = true;
}

// Play the door sound
function playDoorSound() {
  try {
    if (!audioInitialized) return;
    
    // Try to play the creepy door sound file
    try {
      creepyDoorSound.start();
    } catch (e) {
      console.error("Error playing door sound file:", e);
      
      // Fallback to synthesized sound
      const now = Tone.now();
      const synth = new Tone.FMSynth({
        harmonicity: 0.2,
        modulationIndex: 3,
        oscillator: {
          type: "sine"
        },
        envelope: {
          attack: 0.01,
          decay: 0.2,
          sustain: 0.3,
          release: 1.5
        },
        modulation: {
          type: "square"
        },
        modulationEnvelope: {
          attack: 0.5,
          decay: 0.01,
          sustain: 0.9,
          release: 0.5
        }
      }).toDestination();
      
      synth.volume.value = -15;
      synth.triggerAttackRelease("D2", "8n", now);
      synth.triggerAttackRelease("A1", "8n", now + 0.1);
      synth.triggerAttackRelease("E2", "4n", now + 0.3);
      
      // Clean up
      setTimeout(() => {
        synth.dispose();
      }, 2000);
    }
  } catch (e) {
    console.error("Error playing door sound:", e);
  }
}

// Enhanced Windows 95/98-style startup sound with glitch elements
function playStartupSound() {
  try {
    if (!audioInitialized) {
      console.warn("Audio not initialized yet");
      return;
    }
    
    const now = Tone.now();
    
    // Windows 95/98-style startup sequence with a twist
    startupSound.triggerAttackRelease("C4", "8n", now);
    startupSound.triggerAttackRelease("E4", "8n", now + 0.2);
    startupSound.triggerAttackRelease("G4", "8n", now + 0.4);
    startupSound.triggerAttackRelease("C5", "2n", now + 0.6);
    
    // Add a DreamOS glitchy twist after a delay
    setTimeout(() => {
      try {
        startupSound.triggerAttackRelease("Db5", "32n", now + 1.2);
        startupSound.triggerAttackRelease("A4", "32n", now + 1.3);
        startupSound.triggerAttackRelease("F#3", "16n", now + 1.4);
      } catch (e) {
        console.error("Error playing glitch twist:", e);
      }
      
      // Add a final corrupted chord
      setTimeout(() => {
        try {
          // Create a more dissonant chord to indicate corruption
          startupSound.triggerAttackRelease(["C4", "F#4", "Bb4"], "8n", Tone.now());
        } catch (e) {
          console.error("Error playing corrupted chord:", e);
        }
      }, 800);
    }, 1200);
  } catch (e) {
    console.error("Error playing startup sound:", e);
  }
}

// Play dial-up sound
function playDialUpSound() {
  try {
    if (!audioInitialized) return;
    
    const filter = new Tone.Filter(800, "bandpass").toDestination();
    const dialNoise = new Tone.Noise("white").connect(filter);
    dialNoise.volume.value = -15;
    
    dialNoise.start();
    
    // Automated filter sweeps to mimic dial-up sounds
    const filterSweep = new Tone.AutoFilter({
      frequency: 0.1,
      type: "sine",
      depth: 0.8,
      baseFrequency: 300,
      octaves: 4
    }).connect(filter);
    
    filterSweep.start();
    
    // Stop after 3 seconds
    setTimeout(() => {
      dialNoise.stop();
      filterSweep.stop();
    }, 3000);
  } catch (e) {
    console.error("Error playing dial-up sound:", e);
  }
}

// Play ambient sound
function playAmbientSound() {
  try {
    if (!audioInitialized) return;
    
    // Schedule some random eerie notes
    const playRandomNote = () => {
      try {
        const notes = ["C2", "Eb2", "G2", "Bb2", "D3", "F3"];
        const note = notes[Math.floor(Math.random() * notes.length)];
        const duration = 2 + Math.random() * 4;
        
        ambientSound.triggerAttackRelease(note, duration);
        
        // Schedule next note with intensity based on corruption
        const nextInterval = 3000 + Math.random() * 4000;
        const adjustedInterval = Math.max(1000, nextInterval - (gameState.corruption * 100));
        
        setTimeout(playRandomNote, adjustedInterval);
      } catch (e) {
        console.error("Error in random note generation:", e);
        // Retry after a delay
        setTimeout(playRandomNote, 5000);
      }
    };
    
    playRandomNote();
  } catch (e) {
    console.error("Error playing ambient sound:", e);
  }
}

// Create a glitch sound effect with more variation
function createGlitchSound(intensity = 1) {
  try {
    if (!audioInitialized) return;
    
    // Define the type of glitch randomly
    const glitchType = Math.random() < 0.7 ? 'noise' : 'tone';
    
    if (glitchType === 'noise') {
      // Noise-based glitch (static)
      const filter = new Tone.Filter(2000 * Math.random() + 500, "highpass").toDestination();
      const noise = new Tone.Noise("white").connect(filter);
      noise.volume.value = -20 + (intensity * 5); // Louder with higher intensity
      
      noise.start();
      
      // Variation in duration
      const duration = 50 + Math.random() * 200 * intensity;
      
      // Stop after a short time
      setTimeout(() => {
        noise.stop();
        filter.dispose();
      }, duration);
    } else {
      // Tone-based glitch (digital error sound)
      const synth = new Tone.Synth({
        oscillator: {
          type: "sawtooth"
        },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0.1,
          release: 0.1
        }
      }).toDestination();
      
      synth.volume.value = -20 + (intensity * 3);
      
      // Create a rapid sequence of random pitches
      const now = Tone.now();
      const numPitches = Math.floor(3 + intensity * 3);
      
      for (let i = 0; i < numPitches; i++) {
        const pitch = 1000 + Math.random() * 2000;
        const time = now + (i * 0.05);
        const duration = 0.05;
        
        synth.triggerAttackRelease(pitch, duration, time);
      }
      
      // Clean up
      setTimeout(() => {
        synth.dispose();
      }, 1000);
    }
  } catch (e) {
    console.error("Error creating glitch sound:", e);
  }
}

// Play a sound when an artifact/glitch is clicked
function playGlitchSound(isArtifact = false) {
  try {
    if (!audioInitialized) return;
    
    if (isArtifact && artifactSound) {
      const now = Tone.now();
      artifactSound.triggerAttackRelease("G5", "16n", now);
      artifactSound.triggerAttackRelease("D5", "8n", now + 0.1);
    } else {
      const filter = new Tone.Filter(1500, "bandpass").toDestination();
      const noise = new Tone.Noise("pink").connect(filter);
      noise.volume.value = -15;
      
      noise.start();
      
      // Stop after a short time
      setTimeout(() => {
        noise.stop();
      }, 300);
    }
  } catch (e) {
    console.error("Error playing glitch sound:", e);
  }
}

// Play a sound when secret is found
function playSecretFoundSound() {
  try {
    if (!audioInitialized) return;
    
    const now = Tone.now();
    startupSound.triggerAttackRelease("C5", "8n", now);
    startupSound.triggerAttackRelease("G5", "8n", now + 0.1);
    startupSound.triggerAttackRelease("C6", "4n", now + 0.2);
  } catch (e) {
    console.error("Error playing secret found sound:", e);
  }
}

// Play the creepy sound for the completion message
function playCreepySound() {
  try {
    if (!audioInitialized || !completionSound) return;
    
    const now = Tone.now();
    
    // First create an unsettling drone
    completionSound.triggerAttackRelease("D2", "4n", now);
    
    // Add more notes with delay
    setTimeout(() => {
      completionSound.triggerAttackRelease("F#2", "8n", Tone.now());
    }, 500);
    
    setTimeout(() => {
      completionSound.triggerAttackRelease("A2", "8n", Tone.now());
    }, 1000);
    
    setTimeout(() => {
      completionSound.triggerAttackRelease("C3", "2n", Tone.now());
    }, 1500);
    
    // Add a final unsettling note
    setTimeout(() => {
      completionSound.triggerAttackRelease("C#2", "4n", Tone.now());
    }, 3000);
  } catch (e) {
    console.error("Error playing creepy sound:", e);
  }
}

// BSOD Sound - Windows-style system crash sound
function playBSODSound() {
  try {
    if (!audioInitialized) return;
    
    // Create a distorted version of the classic Windows error sound
    const synth = new Tone.Synth({
      oscillator: {
        type: "square"
      },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.3,
        release: 0.8
      }
    }).toDestination();
    
    synth.volume.value = -12;
    
    // Play the error chord with a slight detune
    const now = Tone.now();
    synth.triggerAttackRelease("D4", "8n", now);
    synth.triggerAttackRelease("A3", "8n", now + 0.1);
    synth.triggerAttackRelease("F3", "4n", now + 0.2);
    
    // Add a glitchy distortion effect after the main sound
    setTimeout(() => {
      const distortion = new Tone.Distortion(0.8).toDestination();
      const distoSynth = new Tone.Synth({
        oscillator: {
          type: "sawtooth"
        },
        envelope: {
          attack: 0.001,
          decay: 0.2,
          sustain: 0.3,
          release: 0.1
        }
      }).connect(distortion);
      
      distoSynth.volume.value = -18;
      distoSynth.triggerAttackRelease("A2", "32n");
      
      // Clean up
      setTimeout(() => {
        distortion.dispose();
        distoSynth.dispose();
      }, 500);
    }, 800);
    
    // Clean up
    setTimeout(() => {
      synth.dispose();
    }, 2000);
  } catch (e) {
    console.error("Error playing BSOD sound:", e);
  }
}