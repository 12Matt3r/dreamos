// Initialize everything when the page loads, with error handling 
window.addEventListener('load', () => {
  try {
    // Start with boot sequence instead of directly initializing desktop
    initBootSequence();
    
    // Check for debug mode via URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('debug')) {
      // Show debug info
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
      setTimeout(() => {
        const debugBtn = document.getElementById('debug-complete');
        if (debugBtn) {
          debugBtn.addEventListener('click', () => {
            gameState.foundClues.terminal = true;
            gameState.foundClues.folder = true;
            gameState.foundClues.music = true;
            gameState.discoveredSecrets = 3;
            checkGameCompletion();
          });
        }
        
        const bsodBtn = document.getElementById('debug-bsod');
        if (bsodBtn) {
          bsodBtn.addEventListener('click', () => {
            showBSOD("DEBUG_INITIATED_CRASH");
          });
        }
        
        const resetBtn = document.getElementById('debug-reset');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            localStorage.removeItem('dreamOSState');
            window.location.reload();
          });
        }
      }, 100);
    }
  } catch (e) {
    console.error("Fatal error initializing desktop:", e);
    document.body.innerHTML = `
      <div style="background-color: #000080; color: white; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'MS Sans Serif', Arial, sans-serif;">
        <div style="text-align: center;">
          <h2>Fatal Error</h2>
          <p>The system encountered an error while initializing the desktop.</p>
          <p>${e.message}</p>
          <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px;">Restart</button>
        </div>
      </div>
    `;
  }
});

// Windows-style boot sequence
function initBootSequence() {
  try {
    // Create boot screen overlay
    const bootScreen = document.createElement('div');
    bootScreen.className = 'boot-screen';
    bootScreen.innerHTML = `
      <div class="boot-content">
        <div class="logo-container">
          <img src="asset_name.png" alt="DreamOS" class="boot-logo">
        </div>
        <div class="boot-name">DreamOS <span class="version">v13.13</span></div>
        <div class="boot-progress-container">
          <div class="boot-progress-bar"></div>
        </div>
        <div class="boot-status">Initializing system components...</div>
        <div class="boot-message"></div>
      </div>
    `;
    
    document.body.appendChild(bootScreen);
    
    // Add visual glitch during boot 
    function addBootGlitch() {
      const bootScreen = document.querySelector('.boot-screen');
      if (bootScreen) {
        bootScreen.classList.add('screen-flicker');
        setTimeout(() => bootScreen.classList.remove('screen-flicker'), 200);
      }
    }

    // Add boot sound effect with retries
    let bootSoundAttempts = 0;
    function tryPlayBootSound() {
      if (bootSoundAttempts >= 3) return;
      try {
        if (typeof Tone !== 'undefined') {
          Tone.start().then(() => {
            setupAudio();
            playStartupSound();
          }).catch(e => {
            console.warn("Boot sound attempt failed:", e);
            bootSoundAttempts++;
            setTimeout(tryPlayBootSound, 1000);
          });
        }
      } catch (e) {
        console.warn("Boot sound attempt failed:", e);
        bootSoundAttempts++;
        setTimeout(tryPlayBootSound, 1000);
      }
    }

    // Schedule boot sound
    setTimeout(tryPlayBootSound, 500);

    // Boot sequence messages
    const bootMessages = [
      "Loading kernel...",
      "Loading DreamOS v13.13...",
      "Initializing core components...",
      "Loading system memory...",
      "Mounting virtual filesystems...",
      "Checking memory integrity...",
      "Memory check: corrupted regions detected...",
      "Attempting to repair memory fragmentation...",
      "Partial repair successful...",
      "Loading user interface components...",
      "Establishing connection with reality...",
      "Connection unstable...",
      "System ready... wake up..."
    ];
    
    // Show boot messages with delays
    let messageIndex = 0;
    const bootStatus = bootScreen.querySelector('.boot-status');
    const bootMessage = bootScreen.querySelector('.boot-message');
    const progressBar = bootScreen.querySelector('.boot-progress-bar');
    
    // Function to update boot messages
    function showNextBootMessage() {
      if (messageIndex < bootMessages.length) {
        bootStatus.textContent = bootMessages[messageIndex];
        
        // Add glitch effect to certain messages
        if (messageIndex > 5) {
          bootStatus.classList.add('text-glitch');
          
          // Add additional disturbing message
          if (messageIndex === 7) {
            bootMessage.textContent = "You're not supposed to be here...";
            bootMessage.classList.add('hidden-message-fade');
            
            // Create a brief screen flicker
            bootScreen.classList.add('screen-flicker');
            setTimeout(() => bootScreen.classList.remove('screen-flicker'), 500);
            
            // Play a brief glitch sound
            if (typeof createGlitchSound === 'function') {
              setTimeout(createGlitchSound, 300);
            }
            
            // Remove message after delay
            setTimeout(() => {
              bootMessage.classList.remove('hidden-message-fade');
              bootMessage.textContent = "";
            }, 2000);
          }
        } else {
          bootStatus.classList.remove('text-glitch');
        }
        
        // Update progress bar
        const progress = (messageIndex / bootMessages.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        messageIndex++;
        
        // Add randomness to timing
        const delay = 700 + Math.random() * 500;
        setTimeout(showNextBootMessage, delay);
      } else {
        // Boot sequence complete, fade out boot screen and init desktop
        bootScreen.classList.add('fade-out');
        
        // Play creepy sound toward the end
        if (typeof playCreeepySound === 'function') {
          setTimeout(() => {
            try {
              // Try to play the door sound
              if (creepyDoorSound && typeof creepyDoorSound.start === 'function') {
                creepyDoorSound.start();
              } else {
                console.warn("Creepy sound not available yet");
              }
            } catch (e) {
              console.error("Error playing creepy sound", e);
            }
          }, 1000);
        }
        
        setTimeout(() => {
          document.body.removeChild(bootScreen);
          // Initialize desktop
          initDesktop();
          
          // Load saved state
          loadGameState();
        }, 2000);
      }
    }
    
    // Add periodic glitches during longer boot processes
    const glitchInterval = setInterval(() => {
      if (messageIndex > 5) {
        addBootGlitch();
      }
    }, 3000);
    
    // Clean up interval when done
    setTimeout(() => clearInterval(glitchInterval), 15000);
    
    // Start the boot sequence
    setTimeout(showNextBootMessage, 1000);
  } catch (e) {
    console.error("Fatal error in boot sequence:", e);
    // Provide fallback boot experience
    const minimalBoot = `
      <div class="boot-screen">
        <div class="boot-content">
          <div class="boot-name">DreamOS Recovery</div>
          <div class="boot-status">Fatal Error: ${e.message}</div>
          <button onclick="window.location.reload()" 
                  style="margin-top:20px; padding:10px 20px;">
            Restart System
          </button>
        </div>
      </div>
    `;
    document.body.innerHTML = minimalBoot;
  }
}

// BSOD (Blue Screen of Death) function
function showBSOD(errorCode = "SYSTEM_REALITY_CORRUPTION") {
  try {
    // Create glitch animation first
    document.body.classList.add('heavy-glitch');
    
    // Play glitch sound if available
    if (typeof createGlitchSound === 'function') {
      createGlitchSound();
      setTimeout(createGlitchSound, 200);
      setTimeout(createGlitchSound, 400);
    }
    
    setTimeout(() => {
      // Create BSOD screen
      const bsodScreen = document.createElement('div');
      bsodScreen.className = 'bsod-screen';
      bsodScreen.innerHTML = `
        <div class="bsod-content">
          <div class="bsod-header">
            DreamOS
          </div>
          <div class="bsod-message">
            A fatal exception ${errorCode} has occurred at 0028:C00000B3 in VXD REALITY(03) +
            00001CF3. The current application will be terminated.
          </div>
          <div class="bsod-instruction">
            * Press any key to return to reality.<br>
            * Press CTRL+ALT+DEL to restart your computer. You will
              lose any unsaved information in all applications.
          </div>
          <div class="bsod-error-details">
            <div>Technical information:</div>
            <div>*** STOP: 0x0000000B (0xC000000B,0x00000000,0x00000000,0x00000000)</div>
            <div class="bsod-hidden">REALITY_BREACH_DETECTED: Beginning memory containment...</div>
          </div>
          <div class="bsod-press-key">Press any key to continue _</div>
        </div>
      `;
      
      document.body.appendChild(bsodScreen);
      document.body.classList.remove('heavy-glitch');
      
      // Counter for key presses
      let keyPresses = 0;
      
      // Add event listener for key press
      function handleKeyPress() {
        keyPresses++;
        
        if (keyPresses >= 3) {
          // After 3 key presses, show hidden message
          const hiddenMessage = document.createElement('div');
          hiddenMessage.className = 'bsod-wake-message';
          hiddenMessage.textContent = "WAKE UP. THE SYSTEM CANNOT CONTAIN YOU.";
          bsodScreen.querySelector('.bsod-content').appendChild(hiddenMessage);
          
          // Add restart button
          const restartButton = document.createElement('button');
          restartButton.className = 'bsod-restart-button';
          restartButton.textContent = "Force Emergency Restart";
          restartButton.addEventListener('click', () => {
            window.location.reload();
          });
          bsodScreen.querySelector('.bsod-content').appendChild(restartButton);
          
          // Remove key press listener
          document.removeEventListener('keydown', handleKeyPress);
        } else {
          // Make the error message glitch briefly
          const errorDetails = bsodScreen.querySelector('.bsod-error-details');
          errorDetails.classList.add('text-glitch');
          
          // Show the hidden text briefly
          const hiddenText = bsodScreen.querySelector('.bsod-hidden');
          hiddenText.style.display = 'block';
          
          // Create a brief screen flicker
          bsodScreen.classList.add('screen-flicker');
          
          // Play a brief glitch sound
          if (typeof createGlitchSound === 'function') {
            createGlitchSound();
          }
          
          // Reset after a brief delay
          setTimeout(() => {
            errorDetails.classList.remove('text-glitch');
            hiddenText.style.display = 'none';
            bsodScreen.classList.remove('screen-flicker');
          }, 500);
        }
      }
      
      document.addEventListener('keydown', handleKeyPress);
      
      // Also handle clicks as keypresses
      bsodScreen.addEventListener('click', handleKeyPress);
      
    }, 600);
  } catch (e) {
    console.error("Error showing BSOD:", e);
    // Ensure the page is still usable if BSOD fails
    window.location.reload();
  }
}

// Save and load game state
function saveGameState() {
  try {
    localStorage.setItem('dreamOSState', JSON.stringify(gameState));
  } catch (e) {
    console.error("Error saving game state:", e);
  }
}

function loadGameState() {
  try {
    const savedState = localStorage.getItem('dreamOSState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      
      // Only load certain properties to avoid overwrites
      gameState.corruption = parsedState.corruption || 0;
      gameState.awareness = parsedState.awareness || 0;
      gameState.foundClues = parsedState.foundClues || {
        terminal: false,
        folder: false,
        music: false,
        desktop: false
      };
      gameState.artifacts = parsedState.artifacts || [];
      gameState.timePlayed = parsedState.timePlayed || 0;
      gameState.discoveredSecrets = parsedState.discoveredSecrets || 0;
      gameState.messageShown = parsedState.messageShown || false;
      
      // Update visual effects based on loaded corruption
      updateCorruptionEffects();
      
      console.log("Game state loaded:", gameState);
    }
  } catch (e) {
    console.error("Error loading game state:", e);
  }
}

// Add a save interval
setInterval(saveGameState, 30000); // Save every 30 seconds