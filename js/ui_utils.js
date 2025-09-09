import { gameState, desktopItems } from './state.js';
import { createWindow } from './windows.js';
import { createGlitchSound } from './audio.js';

// Error handling
export function createErrorMessage(message) {
  return `
    <div style="text-align: center; padding: 20px;">
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="width: 32px; height: 32px; margin-bottom: 10px;">
        <circle cx="16" cy="16" r="14" fill="#ff0000" stroke="#000" stroke-width="1" />
        <rect x="14" y="8" width="4" height="12" fill="#fff" />
        <circle cx="16" cy="24" r="2" fill="#fff" />
      </svg>
      <p>${message}</p>
      <button id="error-ok-btn" style="margin-top: 10px; padding: 5px 15px;">OK</button>
    </div>
  `;
}

// Function to update the clock
export function updateClock() {
  try {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    document.querySelector('.clock').textContent = `${hours}:${minutes} ${ampm}`;
  } catch (e) {
    console.error("Error updating clock:", e);
  }
}

// Function to adjust icon positions based on window size
export function adjustIconPositions() {
  try {
    const iconSpacing = 80;
    const windowHeight = window.innerHeight;
    const taskbarHeight = 40;
    const usableHeight = windowHeight - taskbarHeight;
    const maxIconsPerColumn = Math.floor(usableHeight / iconSpacing);

    // Position icons in a grid layout
    desktopItems.forEach((item, index) => {
      // Calculate position to ensure icons don't touch the taskbar
      const column = Math.floor(index / maxIconsPerColumn);
      const row = index % maxIconsPerColumn;

      item.x = 20 + (column * iconSpacing);
      item.y = 20 + (row * iconSpacing);

      // Make sure we don't place icons too close to the bottom
      if (item.y > usableHeight - 80) {
        item.y = usableHeight - 80;
      }
    });

    // Update existing icons if they exist
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    if (desktopIcons.length > 0) {
      desktopIcons.forEach((iconElement, index) => {
        if (index < desktopItems.length) {
          iconElement.style.left = `${desktopItems[index].x}px`;
          iconElement.style.top = `${desktopItems[index].y}px`;
        }
      });
    }
  } catch (e) {
    console.error("Error adjusting icon positions:", e);
  }
}

// Add random glitch effect
export function addRandomGlitch() {
  try {
    if (gameState.corruption > 3) {
      if (Math.random() < gameState.corruption * 0.02) {
        // Apply brief glitch effect
        document.querySelector('.desktop').style.filter = `hue-rotate(${Math.random() * 360}deg) blur(${Math.random() * 5}px)`;

        // Play glitch sound
        createGlitchSound(gameState.corruption * 0.2);

        // Reset after a short time
        setTimeout(() => {
          document.querySelector('.desktop').style.filter = '';
        }, 200);
      }
    }
  } catch (e) {
    console.error("Error adding random glitch:", e);
  }
}

// Generate a random system info window
export function showSystemInfo() {
  try {
    const window = createWindow('System Information', `
      <div style="font-family: 'Courier New', monospace; padding: 20px; background-color: #000080; color: white; height: 100%;">
        <h3>DreamOS System Information</h3>
        <div style="margin-top: 20px; display: grid; grid-template-columns: 150px 1fr; gap: 5px;">
          <div>Memory:</div>
          <div>${gameState.hardwareInfo.memory}</div>

          <div>Processor:</div>
          <div>${gameState.hardwareInfo.processor}</div>

          <div>Graphics:</div>
          <div>${gameState.hardwareInfo.graphics}</div>

          <div>Storage:</div>
          <div>${gameState.hardwareInfo.storage}</div>

          <div>System Uptime:</div>
          <div>${Math.floor(gameState.timePlayed / 60)} minutes</div>

          <div>Memory Corruption:</div>
          <div>${(gameState.corruption * 10).toFixed(2)}%</div>

          <div style="grid-column: span 2; height: 10px;"></div>

          <div style="grid-column: span 2;"><strong>Recent System Errors:</strong></div>
          <div style="grid-column: span 2; color: #ff6666;">
            ${gameState.systemErrors.map(err => `
              [${err.timestamp}] ${err.code}: ${err.message}
            `).join('<br>')}
            ${gameState.systemErrors.length === 0 ? 'No system errors detected.' : ''}
          </div>
        </div>
      </div>
    `, 500, 400);

    return window;
  } catch (e) {
    console.error("Error showing system info:", e);
    return null;
  }
}
