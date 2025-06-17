// Desktop-related functionality

// State for desktop items
let desktopItems = [
  { name: "My Computer", icon: "computer", x: 20, y: 20 },
  { name: "Recycle Bin", icon: "recycle-bin", x: 20, y: 100 },
  { name: "Old Desktop Files", icon: "folder", x: 100, y: 20, className: "old-desktop-files-icon" },
  { name: "Internet Explorer", icon: "ie", x: 20, y: 180 },
  { name: "TERMINAL.sys", icon: "terminal", x: 20, y: 260 },
  { name: "Lofi Chillin", icon: "music", x: 20, y: 340, className: "music-player-icon" },
  { name: "The Crawling Mind", icon: "mind", x: 20, y: 420, className: "crawling-mind-icon" },
  { name: "Multiplayer Race Game", icon: "race", x: 20, y: 500, className: "race-game-icon" },
  { name: "Discord App", icon: "discord", x: 20, y: 660, className: "discord-app-icon" },
  { name: "DreamOS", icon: "os", x: 20, y: 580, className: "dream-os-icon" },
  { name: "AI Companion", icon: "assistant", x: window.innerWidth - 100, y: 20, className: "assistant-icon" },
  
  // Wake Up folder positioned at bottom center
  { name: "Wake Up Collection", icon: "folder", x: window.innerWidth/2 - 35, y: window.innerHeight - 150, className: "wake-up-folder-icon" },
  
  // Add the new folder icons
  { name: "SHOWCASE GALLERY", icon: "folder", x: 100, y: 100, className: "showcase-folder-icon" },
  { name: "SOFA CERTIFIED", icon: "folder", x: 100, y: 180, className: "certified-folder-icon" }
];

// Start menu items
let startMenuItems = [
  { name: "Programs", icon: "folder" },
  { name: "Documents", icon: "folder" },
  { name: "Settings", icon: "settings" },
  { name: "Find", icon: "search" },
  { name: "Help", icon: "help" },
  { name: "Run...", icon: "run" },
  { name: "Shut Down...", icon: "shutdown" }
];

// Floating objects for the hallucination effect
let floatingObjects = [
  { type: "eye", size: 40, x: 300, y: 200, delay: 0 },
  { type: "clock", size: 50, x: 500, y: 100, delay: 5000 },
  { type: "spiral", size: 30, x: 200, y: 300, delay: 8000 },
  { type: "THE WORDS \"PLEASE WAKE UP \"", size: 20, x: 700, y: 400, delay: 12000 }
];

// State for game world
let worldState = {
  corruption: 0,
  awareness: 0
};

// Flag to track game status
let gameStarted = false;

// Create a desktop icon (return the created element)
function createDesktopIcon(item) {
  try {
    const icon = document.createElement('div');
    icon.className = 'desktop-icon' + (item.className ? ' ' + item.className : '');
    icon.style.left = `${item.x}px`;
    icon.style.top = `${item.y}px`;
    icon.innerHTML = `
      <div class="desktop-icon-img">${getIconSVG(item.icon)}</div>
      <div class="desktop-icon-label">${item.name}</div>
    `;
    const dblclickHandler = () => openProgram(item.name);
    icon.dblclickHandler = dblclickHandler; // Store reference to handler
    icon.addEventListener('dblclick', dblclickHandler);
    document.querySelector('.desktop').appendChild(icon);
    return icon;
  } catch (e) {
    console.error(`Error creating desktop icon for ${item.name}:`, e);
    return null;
  }
}

// Initialize the desktop
function initDesktop() {
  try {
    // Setup audio
    setupAudio();
    
    // Adjust icon positions based on window size
    adjustIconPositions();
    window.addEventListener('resize', adjustIconPositions);
    
    // Create floating objects
    createFloatingObjects();
    
    // Create wake up doorway
    createWakeUpDoorway();
    
    // Create desktop icons
    desktopItems.forEach(item => {
      // Special handling for DreamOS icon
      if (item.name === "DreamOS") {
        const icon = createDesktopIcon(item);
        if (icon) {
          icon.removeEventListener('dblclick', icon.dblclickHandler); // Remove default handler
          icon.addEventListener('dblclick', () => {
            createWebSimWindow('DreamOS', 'https://dream-os--sofakingsadboi.on.websim.ai/?v=8', 800, 600);
          });
        }
      } else {
        createDesktopIcon(item);
      }
    });
    
    // Create start menu items
    startMenuItems.forEach(item => createStartMenuItem(item));
    
    // Initialize the clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Setup event listeners
    document.querySelector('.start-button').addEventListener('click', toggleStartMenu);
    document.addEventListener('click', handleGlobalClick);
    
    // Add key sequence listener
    document.addEventListener('keydown', handleKeyDown);
    
    // Play startup sound
    playStartupSound();
    
    // Start ambient sounds
    playAmbientSound();
    
    // Add glitch effects randomly
    setInterval(addRandomGlitch, 10000);
    
    // Start game timer
    setInterval(updateGameTimer, 1000);
    
    // Initialize Discord Service in the background
    initDiscordService();
    
    // Add a small chance of creating a hidden artifact on initialization
    if (Math.random() < 0.3) {
      setTimeout(() => {
        createHiddenArtifact();
      }, 10000 + Math.random() * 20000);
    }
    // Set game started flag
    gameStarted = true;
  } catch (e) {
    console.error("Error initializing desktop:", e);
  }
}

// Create the wake up doorway element
function createWakeUpDoorway() {
  try {
    const doorway = document.createElement('div');
    doorway.className = 'wake-up-doorway';
    
    doorway.innerHTML = `
      <div class="doorway-frame">
        <div class="doorway-text">WAKE</div>
        <div class="doorway-text">UP</div>
      </div>
    `;
    
    doorway.addEventListener('click', () => {
      showWakeUpCollection();
      
      // Create a creepy sound and glitch effect when clicking the door
      if (typeof createGlitchSound === 'function') {
        createGlitchSound();
      }
      
      // Play door sound
      if (typeof playDoorSound === 'function') {
        playDoorSound();
      }
      
      // Briefly flicker the screen
      const desktop = document.querySelector('.desktop');
      desktop.classList.add('screen-flicker');
      setTimeout(() => {
        desktop.classList.remove('screen-flicker');
      }, 500);
    });
    
    document.querySelector('.desktop').appendChild(doorway);
    
    // Add subtle animation to make the doorway feel alive
    setInterval(() => {
      if (Math.random() < 0.3) {
        doorway.style.transform = `translate(-50%, -50%) scale(${1 + Math.random() * 0.05})`;
        setTimeout(() => {
          doorway.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 500);
      }
    }, 4000);
  } catch (e) {
    console.error("Error creating wake up doorway:", e);
  }
}

// Show the wake up collection dialog
function showWakeUpCollection() {
  try {
    // Remove any existing dialog
    const existingDialog = document.querySelector('.wake-up-dialog');
    if (existingDialog) {
      document.body.removeChild(existingDialog);
    }
    
    // Create new dialog
    const dialog = document.createElement('div');
    dialog.className = 'wake-up-dialog';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'wake-up-dialog-header';
    header.innerHTML = `
      <div>WAKE UP COLLECTION (${wakeUpWebsims.length} entries)</div>
      <div class="wake-up-dialog-close">×</div>
    `;
    
    // Create content area
    const content = document.createElement('div');
    content.className = 'wake-up-dialog-content';
    
    // Add each wake up item
    wakeUpWebsims.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'wake-up-folder-item';
      itemElement.innerHTML = `
        <div class="wake-up-folder-icon">${getIconSVG('wake')}</div>
        <div class="wake-up-folder-label">${item.name}</div>
      `;
      
      itemElement.addEventListener('dblclick', () => {
        // Close the dialog
        document.body.removeChild(dialog);
        
        // Open the selected item
        createWebSimWindow(item.name, item.url, 800, 600);
      });
      
      content.appendChild(itemElement);
    });
    
    // Add header and content to dialog
    dialog.appendChild(header);
    dialog.appendChild(content);
    
    // Add close button functionality
    header.querySelector('.wake-up-dialog-close').addEventListener('click', () => {
      document.body.removeChild(dialog);
    });
    
    // Make dialog draggable
    let isDragging = false;
    let offsetX, offsetY;
    
    header.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - dialog.offsetLeft;
      offsetY = e.clientY - dialog.offsetTop;
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        dialog.style.top = `${e.clientY - offsetY}px`;
        dialog.style.left = `${e.clientX - offsetX}px`;
        dialog.style.transform = 'none';
      }
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Add to body and show
    document.body.appendChild(dialog);
    dialog.style.display = 'block';
    
    // Add a creepy effect to the dialog
    dialog.classList.add('glitch');
    setTimeout(() => {
      dialog.classList.remove('glitch');
    }, 1000);
  } catch (e) {
    console.error("Error showing wake up collection:", e);
  }
}

// Function to adjust wake up folder position on window resize
function adjustWakeUpFolderPosition() {
  const wakeUpFolder = document.querySelector('.wake-up-folder-icon');
  if (wakeUpFolder) {
    wakeUpFolder.style.left = `${window.innerWidth/2 - 35}px`;
    wakeUpFolder.style.top = `${window.innerHeight - 150}px`;
  }
}

// Add resize listener for wake up folder positioning
window.addEventListener('resize', () => {
  adjustIconPositions(); // Existing resize handler
  adjustWakeUpFolderPosition(); // New wake up folder positioning
});