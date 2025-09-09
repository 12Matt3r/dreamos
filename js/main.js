import { initBootSequence } from './ui.js';
import { gameState, wakeUpWebsims, showcaseItems, certificateItems, or9Items, desktopItems, startMenuItems } from './state.js';
import { checkGameCompletion } from './game.js';
import { showBSOD } from './ui.js';

async function loadProgramData() {
    try {
        const response = await fetch('/programs.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        Object.assign(wakeUpWebsims, data.wakeUpWebsims);
        Object.assign(showcaseItems, data.showcaseItems);
        Object.assign(certificateItems, data.certificateItems);
        Object.assign(or9Items, data.or9Items);
        Object.assign(desktopItems, data.desktopItems);
        Object.assign(startMenuItems, data.startMenuItems);
        console.log("Program data loaded successfully.");
    } catch (e) {
        console.error("Failed to load program data:", e);
    }
}

// Initialize everything when the page loads
window.addEventListener('load', async () => {
  try {
    await loadProgramData();
    initBootSequence();

    // Check for debug mode via URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('debug')) {
      setupDebugPanel();
    }
  } catch (e) {
    console.error("Fatal error initializing application:", e);
    document.body.innerHTML = `
      <div style="background-color: #000080; color: white; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'MS Sans Serif', Arial, sans-serif;">
        <div style="text-align: center;">
          <h2>Fatal Error</h2>
          <p>The system encountered a critical error during startup.</p>
          <p>${e.message}</p>
          <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px;">Restart</button>
        </div>
      </div>
    `;
  }
});

function setupDebugPanel() {
  const debugPanel = document.createElement('div');
  debugPanel.className = 'debug-panel';
  debugPanel.innerHTML = `
    <h3>Debug Panel</h3>
    <p>Game Objective: Find 3 secrets and solve the puzzle</p>
    <ul>
      <li>Find a secret in the Terminal by typing 'find secrets.dat'</li>
      <li>Find a secret in the Old Desktop Files</li>
      <li>Find a secret in the Music Player</li>
      <li>Collect hidden artifacts (red glitching objects)</li>
      <li>Try the Konami code: ↑↑↓↓←→←→BA</li>
    </ul>
    <button id="debug-complete">Debug: Complete Game</button>
    <button id="debug-bsod">Debug: Trigger BSOD</button>
    <button id="debug-reset">Debug: Reset Game</button>
  `;
  document.body.appendChild(debugPanel);

  // Add debug button functionality
  const debugBtn = document.getElementById('debug-complete');
  debugBtn.addEventListener('click', () => {
    gameState.foundClues.terminal = true;
    gameState.foundClues.folder = true;
    gameState.foundClues.music = true;
    gameState.discoveredSecrets = 3;
    checkGameCompletion();
  });

  const bsodBtn = document.getElementById('debug-bsod');
  bsodBtn.addEventListener('click', () => {
    showBSOD("DEBUG_INITIATED_CRASH");
  });

  const resetBtn = document.getElementById('debug-reset');
  resetBtn.addEventListener('click', () => {
    localStorage.removeItem('dreamOSState');
    window.location.reload();
  });
}
