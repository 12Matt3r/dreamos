import { gameState } from './state.js';
import { playGlitchSound, playSecretFoundSound, playCreepySound } from './audio.js';
import { showBSOD, showCompletionMessage } from './ui.js';

// Create a hidden file with static that appears randomly on the desktop
export function createHiddenArtifact() {
  try {
    if (gameState.artifacts.length >= 5) return; // Limit number of artifacts

    const artifact = document.createElement('div');
    artifact.className = 'hidden-artifact glitch';

    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 150;
    const x = 50 + Math.floor(Math.random() * (maxX - 100));
    const y = 50 + Math.floor(Math.random() * (maxY - 100));

    artifact.style.left = `${x}px`;
    artifact.style.top = `${y}px`;
    artifact.innerHTML = `<svg>...</svg>`; // content omitted

    artifact.addEventListener('click', function() {
      document.querySelector('.desktop').removeChild(artifact);
      gameState.corruption += 0.5;
      gameState.artifacts.push({x, y, found: true});
      gameState.discoveredSecrets++;
      playGlitchSound(true);
      checkGameCompletion();
      saveGameState();
    });

    const index = gameState.artifacts.length;
    gameState.artifacts.push({x, y, found: false});

    document.querySelector('.desktop').appendChild(artifact);

    setTimeout(() => {
      if (artifact.parentNode) {
        document.querySelector('.desktop').removeChild(artifact);
        if (!gameState.artifacts[index].found) {
          gameState.artifacts[index].disappeared = true;
        }
      }
    }, 5000 + Math.random() * 5000);
  } catch (e) {
    console.error("Error creating hidden artifact:", e);
  }
}

// Track game time and progress
export function updateGameTimer() {
  gameState.timePlayed++;

  if (gameState.timePlayed % 30 === 0) {
    gameState.corruption += 0.1;
  }

  if (Math.random() < 0.05 + (gameState.corruption * 0.01)) {
    createHiddenArtifact();
  }

  if (gameState.corruption > 5 && Math.random() < 0.02) {
    addSystemError();
  }

  updateCorruptionEffects();

  if (gameState.timePlayed % 60 === 0) {
    saveGameState();
  }
}

function addSystemError() {
  const errorCodes = [
    "MEMORY_REALITY_CORRUPTION",
    "REALITY_BREACH_DETECTED",
  ];

  const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
  const timestamp = new Date().toLocaleTimeString();

  gameState.systemErrors.push({
    code: errorCode,
    timestamp: timestamp,
    message: "System integrity compromised"
  });

  if (gameState.systemErrors.length > 10) {
    gameState.systemErrors.shift();
  }

  if (gameState.systemErrors.length > 3 && Math.random() < 0.1) {
    showBSOD(errorCode);
  }
}

export function checkGameCompletion() {
  try {
    const terminalCondition = gameState.foundClues.terminal;
    const folderCondition = gameState.foundClues.folder;
    const musicCondition = gameState.foundClues.music;
    const secretsCondition = gameState.discoveredSecrets >= 3;

    if (terminalCondition && folderCondition && musicCondition && secretsCondition && !gameState.messageShown) {
      gameState.messageShown = true;
      showCompletionMessage();
      saveGameState();
    }
  } catch (e) {
    console.error("Error checking game completion:", e);
  }
}

// Map special keys for hidden interactions
let keySequence = [];
const secretSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function handleKeyDown(e) {
  keySequence.push(e.key);
  if (keySequence.length > secretSequence.length) {
    keySequence.shift();
  }

  if (arraysEqual(keySequence, secretSequence)) {
    gameState.discoveredSecrets++;
    gameState.foundClues.desktop = true;
    createHiddenArtifact();
    createHiddenArtifact();
    playSecretFoundSound();
    checkGameCompletion();

    const desktop = document.querySelector('.desktop');
    desktop.classList.add('screen-flicker');
    setTimeout(() => desktop.classList.remove('screen-flicker'), 1000);

    saveGameState();
  }

  if (e.ctrlKey && e.altKey && e.key === 'Delete') {
    showBSOD();
  }
}

export function saveGameState() {
  try {
    localStorage.setItem('dreamOSState', JSON.stringify(gameState));
  } catch (e) {
    console.error("Error saving game state:", e);
  }
}

export function loadGameState() {
  try {
    const savedState = localStorage.getItem('dreamOSState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);

      gameState.corruption = parsedState.corruption || 0;
      gameState.awareness = parsedState.awareness || 0;
      // ...

      updateCorruptionEffects();

      console.log("Game state loaded:", gameState);
    }
  } catch (e) {
    console.error("Error loading game state:", e);
  }
}

export function updateCorruptionEffects() {
    // ...
}
