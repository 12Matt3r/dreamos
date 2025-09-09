import { openProgram } from './programs.js';
import { createWindow, createWebSimWindow, confirmShutdown } from './windows.js';
import { openLinkInventoryWindow } from './linkInventory.js';
import { getIconSVG } from './icons.js';
import { setupAudio, playStartupSound, createGlitchSound, playCreeepySound, playSecretFoundSound, playDoorSound } from './audio.js';
import { initDesktop } from './desktop.js';
import { loadGameState, checkGameCompletion, createHiddenArtifact, updateCorruptionEffects } from './game.js';
import { gameState } from './state.js';
import { wakeUpWebsims, showcaseItems, certificateItems, or9Items } from './program_data.js';
import * as Tone from 'tone';

// ... (all other ui.js functions)

export function showCompletionMessage() {
  try {
    const overlay = document.createElement('div');
    overlay.className = 'message-overlay';

    overlay.innerHTML = `
      <div class="message-content">
        <div class="eye-image">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50" cy="50" rx="45" ry="30" fill="white" stroke="black" stroke-width="2" />
            <circle cx="50" cy="50" r="20" fill="black" />
            <circle cx="44" cy="45" r="5" fill="white" />
          </svg>
        </div>
        <div class="creepy-message">eye still see you .........</div>
        <div class="creepy-message">youll never wake up........</div>
        <div class="creepy-message">youll make sure of that........</div>
        <button class="continue-button">Continue</button>
      </div>
    `;

    document.body.appendChild(overlay);

    let flashCount = 0;
    const flashInterval = setInterval(() => {
      overlay.style.backgroundColor = flashCount % 2 === 0 ? 'black' : 'rgba(255,0,0,0.3)';
      flashCount++;
      if (flashCount > 6) {
        clearInterval(flashInterval);
        overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
      }
    }, 200);

    playCreepySound();

    setTimeout(() => {
      const continueButton = overlay.querySelector('.continue-button');
      continueButton.style.opacity = 1;
      continueButton.addEventListener('click', () => {
        document.body.removeChild(overlay);

        gameState.corruption += 3;
        updateCorruptionEffects();

        if (Math.random() < 0.3) {
          setTimeout(() => {
            showBSOD("REALITY_BREACH_CRITICAL");
          }, 5000 + Math.random() * 5000);
        }
      });
    }, 4000);
  } catch (e) {
    console.error("Error showing completion message:", e);
  }
}
