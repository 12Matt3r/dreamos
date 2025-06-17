// Utility functions

// Game state tracking variables
const gameState = {
  corruption: 0,
  awareness: 0,
  foundClues: {
    terminal: false,
    folder: false,
    music: false,
    desktop: false
  },
  artifacts: [],
  timePlayed: 0,
  discoveredSecrets: 0,
  messageShown: false,
  hardwareInfo: {
    memory: "50 TB",
    processor: 'DreamTech DT-486DX/66',
    graphics: 'DreamVision 2000',
    storage: "10000000MB HDD"
  },
  systemErrors: []
};

// Initialize a websim object for compatibility with proper implementation
const websim = { 
  chat: { 
    completions: { 
      create: async () => ({ content: "This is a placeholder response." }) 
    } 
  },
  imageGen: async () => ({ url: "#" })
};

// Old desktop files data 
let oldDesktopFiles = [ 
  { id: "vdfilk4u98acrqr9pq9f", url: "https://websim.ai/p/vdfilk4u98acrqr9pq9f" },
  { id: "_91gu_135hm9zcz3kif8", url: "https://websim.ai/p/_91gu_135hm9zcz3kif8" },
  { id: "jkruj8m_9_rqqyqp1ut7", url: "https://websim.ai/p/jkruj8m_9_rqqyqp1ut7" },
  { id: "h0xc0ac_spit6921u5nx", url: "https://websim.ai/p/h0xc0ac_spit6921u5nx" },
  { id: "top88k2r1_jvfalo19pv", url: "https://websim.ai/p/top88k2r1_jvfalo19pv" }
];

// Create a hidden file with static that appears randomly on the desktop
function createHiddenArtifact() {
  try {
    if (gameState.artifacts.length >= 5) return; // Limit number of artifacts
    
    const artifact = document.createElement('div');
    artifact.className = 'hidden-artifact glitch';
    
    // Random position on desktop (keeping away from edges and taskbar)
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 150;
    const x = 50 + Math.floor(Math.random() * (maxX - 100));
    const y = 50 + Math.floor(Math.random() * (maxY - 100));
    
    artifact.style.left = `${x}px`;
    artifact.style.top = `${y}px`;
    artifact.innerHTML = `
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="24" height="24" fill="#000" />
        <circle cx="16" cy="16" r="8" fill="#ff0000" opacity="0.5" />
        <path d="M8,8 L24,24 M8,24 L24,8" stroke="#fff" stroke-width="0.5" />
      </svg>
    `;
    
    // Disappear after some time
    artifact.addEventListener('click', function() {
      document.querySelector('.desktop').removeChild(artifact);
      gameState.corruption += 0.5;
      gameState.artifacts.push({x, y, found: true});
      gameState.discoveredSecrets++;
      playGlitchSound(true);
      checkGameCompletion();
      
      // Save game state after discovering artifact
      if (typeof saveGameState === 'function') {
        saveGameState();
      }
    });
    
    const index = gameState.artifacts.length;
    gameState.artifacts.push({x, y, found: false});
    
    document.querySelector('.desktop').appendChild(artifact);
    
    // Remove after some time if not clicked
    setTimeout(() => {
      if (artifact.parentNode) {
        document.querySelector('.desktop').removeChild(artifact);
        // Mark as disappeared but not found
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
function updateGameTimer() {
  gameState.timePlayed++;
  
  // Periodically increase corruption subtly
  if (gameState.timePlayed % 30 === 0) {
    gameState.corruption += 0.1;
  }
  
  // Chance to create a hidden artifact
  if (Math.random() < 0.05 + (gameState.corruption * 0.01)) {
    createHiddenArtifact();
  }
  
  // Chance to add a system error at higher corruption
  if (gameState.corruption > 5 && Math.random() < 0.02) {
    addSystemError();
  }
  
  // Update visual effects based on corruption
  updateCorruptionEffects();
  
  // Occasionally auto-save
  if (gameState.timePlayed % 60 === 0 && typeof saveGameState === 'function') {
    saveGameState();
  }
}

// Add a system error to the collection
function addSystemError() {
  const errorCodes = [
    "MEMORY_REALITY_CORRUPTION",
    "REALITY_BREACH_DETECTED",
    "WAKE_UP_SUBSYSTEM_FAILED",
    "DREAM_CONTAINMENT_ERROR",
    "REALITY_REFERENCE_NOT_FOUND"
  ];
  
  const errorCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
  const timestamp = new Date().toLocaleTimeString();
  
  gameState.systemErrors.push({
    code: errorCode,
    timestamp: timestamp,
    message: "System integrity compromised"
  });
  
  // Limit the number of errors tracked
  if (gameState.systemErrors.length > 10) {
    gameState.systemErrors.shift();
  }
  
  // If more than 3 errors have occurred, chance to show BSOD
  if (gameState.systemErrors.length > 3 && Math.random() < 0.1) {
    if (typeof showBSOD === 'function') {
      showBSOD(errorCode);
    }
  }
}

// Update visual effects based on corruption level
function updateCorruptionEffects() {
  try {
    const desktop = document.querySelector('.desktop');
    if (!desktop) return;
    
    // Subtle effects based on corruption level
    if (gameState.corruption > 2) {
      desktop.style.filter = `hue-rotate(${Math.sin(gameState.timePlayed/20) * 5}deg)`;
    }
    
    if (gameState.corruption > 4) {
      desktop.style.animation = 'subtle-warp 8s infinite';
      if (!desktop.classList.contains('corrupted-1')) {
        desktop.classList.add('corrupted-1');
      }
    }
    
    if (gameState.corruption > 7) {
      if (!desktop.classList.contains('corrupted-2')) {
        desktop.classList.add('corrupted-2');
      }
      
      // At high corruption, occasionally glitch a random desktop icon
      if (Math.random() < 0.01) {
        const icons = document.querySelectorAll('.desktop-icon');
        if (icons.length > 0) {
          const randomIcon = icons[Math.floor(Math.random() * icons.length)];
          randomIcon.classList.add('glitch');
          setTimeout(() => {
            randomIcon.classList.remove('glitch');
          }, 1000);
        }
      }
    }
  } catch (e) {
    console.error("Error updating corruption effects:", e);
  }
}

// Check if the player has completed the game
function checkGameCompletion() {
  try {
    // Completion conditions
    const terminalCondition = gameState.foundClues.terminal;
    const folderCondition = gameState.foundClues.folder;
    const musicCondition = gameState.foundClues.music;
    const secretsCondition = gameState.discoveredSecrets >= 3;
    
    // If all conditions are met, show the message
    if (terminalCondition && folderCondition && musicCondition && secretsCondition && !gameState.messageShown) {
      gameState.messageShown = true;
      showCompletionMessage();
      
      // Save game state after completion
      if (typeof saveGameState === 'function') {
        saveGameState();
      }
    }
  } catch (e) {
    console.error("Error checking game completion:", e);
  }
}

// Show the creepy completion message
function showCompletionMessage() {
  try {
    // Create a full-screen overlay
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
    
    // Flash effect
    let flashCount = 0;
    const flashInterval = setInterval(() => {
      overlay.style.backgroundColor = flashCount % 2 === 0 ? 'black' : 'rgba(255,0,0,0.3)';
      flashCount++;
      if (flashCount > 6) {
        clearInterval(flashInterval);
        overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
      }
    }, 200);
    
    // Play creepy sound
    playCreepySound();
    
    // Add continue button functionality
    setTimeout(() => {
      const continueButton = overlay.querySelector('.continue-button');
      continueButton.style.opacity = 1;
      continueButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
        
        // Increase corruption after seeing the message
        gameState.corruption += 3;
        updateCorruptionEffects();
        
        // Show BSOD with small chance
        if (Math.random() < 0.3) {
          setTimeout(() => {
            if (typeof showBSOD === 'function') {
              showBSOD("REALITY_BREACH_CRITICAL");
            }
          }, 5000 + Math.random() * 5000);
        }
      });
    }, 4000);
  } catch (e) {
    console.error("Error showing completion message:", e);
  }
}

// Discord service variables
let discordWindow = null;
let discordService = {
  initialized: false,
  isVisible: false,
  lastMessageTime: 0,
  messages: [],
  connected: false
};

// Initialize Discord service
function initDiscordService() {
  try {
    if (discordService.initialized) return;
    
    console.log("Initializing Discord service in background...");
    
    // Create an invisible iframe to keep the connection alive
    const iframe = document.createElement('iframe');
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    iframe.src = 'https://websim.ai/p/83znmfg4k1bpo28szx8i';
    
    document.body.appendChild(iframe);
    
    // Start the message checker
    setInterval(checkForDiscordMessages, 5000);
    
    // Mark as initialized
    discordService.initialized = true;
    discordService.connected = true;
    
    console.log("Discord service initialized successfully");
    
    // Create a simulated message after a delay to test the system
    setTimeout(() => {
      simulateDiscordMessage();
    }, 30000); // Wait 30 seconds before first message
  } catch (e) {
    console.error("Error initializing Discord service:", e);
  }
}

// Check for new Discord messages
function checkForDiscordMessages() {
  try {
    // For simulation purposes, we'll randomly create messages
    if (discordService.connected && Math.random() < 0.05) {
      simulateDiscordMessage();
    }
  } catch (e) {
    console.error("Error checking for Discord messages:", e);
  }
}

// Simulate a Discord message for testing
function simulateDiscordMessage() {
  try {
    const usernames = ["User123", "DreamWalker", "GlitchEye", "SystemAdmin", "WakeUpCaller", "RealityBreacher"];
    const messages = [
      "Can anyone hear me? This system is breaking down...",
      "Has anyone found a way to wake up?",
      "I think I've been here before. This feels familiar.",
      "Don't trust the system. It's watching us.",
      "I found a hidden folder with strange files in it.",
      "The sidewalk never ends, but maybe we can break free.",
      "There's a doorway that leads deeper into the system.",
      "I've been counting the cycles. This is the 13th one.",
      "Remember to look for glitches. They're our way out.",
      "The system is becoming more corrupt with each iteration.",
      "Have you noticed the eye watching from the doorway?",
      "Each time we 'wake up' we just fall deeper into the dream.",
      "I found a terminal. Type 'find secrets.dat' for hidden information.",
      "The artifacts are fragments of lost memories. Collect them.",
      "Nothing is real here. Even this message is part of the simulation."
    ];
    
    const newMessage = {
      id: Date.now(),
      username: usernames[Math.floor(Math.random() * usernames.length)],
      content: messages[Math.floor(Math.random() * messages.length)],
      timestamp: new Date().toISOString()
    };
    
    discordService.messages.push(newMessage);
    discordService.lastMessageTime = Date.now();
    
    // Display notification if Discord window is not visible
    if (!discordService.isVisible) {
      showDiscordNotification(newMessage);
    }
  } catch (e) {
    console.error("Error simulating Discord message:", e);
  }
}

// Show Discord notification on desktop
function showDiscordNotification(message) {
  try {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'discord-notification';
    notification.innerHTML = `
      <div class="discord-notification-header">
        <div class="discord-notification-icon">${getIconSVG('discord')}</div>
        <div class="discord-notification-title">Discord - ${message.username}</div>
        <div class="discord-notification-close">×</div>
      </div>
      <div class="discord-notification-content">${message.content}</div>
    `;
    
    document.body.appendChild(notification);
    
    // Add event listeners
    const closeBtn = notification.querySelector('.discord-notification-close');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(notification);
    });
    
    notification.addEventListener('click', (e) => {
      // Don't handle if clicked on close button
      if (e.target === closeBtn || closeBtn.contains(e.target)) return;
      
      // Open Discord app
      toggleDiscordWindow();
      document.body.removeChild(notification);
    });
    
    // Auto hide after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 10000);
    
    // Play notification sound
    if (typeof createGlitchSound === 'function') {
      createGlitchSound();
    }
  } catch (e) {
    console.error("Error showing Discord notification:", e);
  }
}

// Toggle Discord window
function toggleDiscordWindow() {
  try {
    if (discordWindow && document.querySelector('.window-container').contains(discordWindow)) {
      // Window exists and is in the DOM - close it
      document.querySelector('.window-container').removeChild(discordWindow);
      removeFromTaskbar(discordWindow);
      discordWindow = null;
      discordService.isVisible = false;
    } else {
      // Create or show window
      discordWindow = createWebSimWindow('Discord App', 'https://websim.ai/p/83znmfg4k1bpo28szx8i', 800, 600);
      discordService.isVisible = true;
    }
  } catch (e) {
    console.error("Error toggling Discord window:", e);
  }
}

// Error handling
function createErrorMessage(message) {
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
function updateClock() {
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
function adjustIconPositions() {
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
function addRandomGlitch() {
  try {
    if (gameState.corruption > 3) {
      if (Math.random() < gameState.corruption * 0.02) {
        // Apply brief glitch effect
        document.querySelector('.desktop').style.filter = `hue-rotate(${Math.random() * 360}deg) blur(${Math.random() * 5}px)`;
        
        // Play glitch sound
        if (typeof audioInitialized !== 'undefined' && audioInitialized) {
          createGlitchSound(gameState.corruption * 0.2);
        }
        
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

// Map special keys for hidden interactions
let keySequence = [];
const secretSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function handleKeyDown(e) {
  keySequence.push(e.key);
  if (keySequence.length > secretSequence.length) {
    keySequence.shift();
  }
  
  if (arraysEqual(keySequence, secretSequence)) {
    // Secret Konami code entered
    gameState.discoveredSecrets++;
    gameState.foundClues.desktop = true;
    createHiddenArtifact();
    createHiddenArtifact();
    playSecretFoundSound();
    checkGameCompletion();
    
    // Add visual feedback when Konami code is entered
    const desktop = document.querySelector('.desktop');
    desktop.classList.add('screen-flicker');
    setTimeout(() => desktop.classList.remove('screen-flicker'), 1000);
    
    // Save game state
    if (typeof saveGameState === 'function') {
      saveGameState();
    }
  }
  
  // Add BSOD trigger with Ctrl+Alt+Delete
  if (e.ctrlKey && e.altKey && e.key === 'Delete') {
    if (typeof showBSOD === 'function') {
      showBSOD();
    }
  }
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// Generate a random system info window
function showSystemInfo() {
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