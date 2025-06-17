// UI-related functionality

// State
let isStartMenuOpen = false;

// Toggle start menu visibility
function toggleStartMenu() {
  try {
    isStartMenuOpen = !isStartMenuOpen;
    document.querySelector('.start-menu').classList.toggle('active', isStartMenuOpen);
  } catch (e) {
    console.error("Error toggling start menu:", e);
  }
}

// Handle global click to close start menu when clicking outside
function handleGlobalClick(e) {
  try {
    if (isStartMenuOpen && !e.target.closest('.start-button') && !e.target.closest('.start-menu')) {
      isStartMenuOpen = false;
      document.querySelector('.start-menu').classList.remove('active');
    }
  } catch (e) {
    console.error("Error in handleGlobalClick:", e);
  }
}

// Handle start menu item click
function handleStartMenuItem(name) {
  try {
    isStartMenuOpen = false;
    document.querySelector('.start-menu').classList.remove('active');
    
    switch(name) {
      case 'Programs':
        openProgram('File Explorer', 'Programs');
        break;
      case 'Documents':
        openProgram('File Explorer', 'Documents');
        break;
      case 'Settings':
        openProgram('Settings');
        break;
      case 'Find':
        openProgram('Find');
        break;
      case 'Help':
        openProgram('Help');
        break;
      case 'Run...':
        openProgram('Run');
        break;
      case 'Shut Down...':
        confirmShutdown();
        break;
    }
  } catch (e) {
    console.error(`Error handling start menu item ${name}:`, e);
  }
}

// Create a start menu item
function createStartMenuItem(item) {
  try {
    const menuItem = document.createElement('div');
    menuItem.className = 'start-menu-item';
    menuItem.innerHTML = `
      <div class="start-menu-icon">${getIconSVG(item.icon)}</div>
      <div>${item.name}</div>
    `;
    menuItem.addEventListener('click', () => handleStartMenuItem(item.name));
    document.querySelector('.start-menu').appendChild(menuItem);
  } catch (e) {
    console.error(`Error creating start menu item for ${item.name}:`, e);
  }
}

// Create floating hallucinatory objects
function createFloatingObjects() {
  try {
    const floatingObjects = [
      { type: "eye", size: 40, x: 300, y: 200, delay: 0 },
      { type: "clock", size: 50, x: 500, y: 100, delay: 5000 },
      { type: "spiral", size: 30, x: 200, y: 300, delay: 8000 },
      { type: "eye", size: 20, x: 700, y: 400, delay: 12000 }
    ];
    floatingObjects.forEach(obj => {
      setTimeout(() => {
        try {
          const element = document.createElement('div');
          element.className = 'floating-object';
          element.style.left = `${obj.x}px`;
          element.style.top = `${obj.y}px`;
          element.style.width = `${obj.size}px`;
          element.style.height = `${obj.size}px`;
          element.style.animationDelay = `${Math.random() * 5}s`;
          
          // Different types of floating objects
          if (obj.type === "eye") {
            element.innerHTML = `
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="50" cy="50" rx="45" ry="25" fill="white" stroke="black" stroke-width="2" />
                <circle cx="50" cy="50" r="15" fill="black" />
                <circle cx="45" cy="45" r="5" fill="white" />
              </svg>
            `;
          } else if (obj.type === "clock") {
            element.innerHTML = `
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="melting-clock">
                <circle cx="50" cy="50" r="45" fill="#f0f0f0" stroke="black" stroke-width="2" />
                <line x1="50" y1="50" x2="50" y2="20" stroke="black" stroke-width="2" transform="rotate(${Math.random() * 360} 50 50)" />
                <line x1="50" y1="50" x2="70" y2="50" stroke="black" stroke-width="1.5" transform="rotate(${Math.random() * 360} 50 50)" />
              </svg>
            `;
          } else if (obj.type === "spiral") {
            element.innerHTML = `
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50,50 m0,-45 a45,45 0 1,1 0,90 a45,45 0 1,1 0,-90" fill="none" stroke="black" stroke-width="2" />
                <path d="M50,50 m0,-35 a35,35 0 1,1 0,70 a35,35 0 1,1 0,-70" fill="none" stroke="black" stroke-width="2" />
                <path d="M50,50 m0,-25 a25,25 0 1,1 0,50 a25,25 0 1,1 0,-50" fill="none" stroke="black" stroke-width="2" />
                <path d="M50,50 m0,-15 a15,15 0 1,1 0,30 a15,15 0 1,1 0,-30" fill="none" stroke="black" stroke-width="2" />
              </svg>
            `;
          }
          
          document.querySelector('.desktop').appendChild(element);
        } catch (e) {
          console.error("Error creating floating object:", e);
        }
      }, obj.delay);
    });
  } catch (e) {
    console.error("Error in createFloatingObjects:", e);
  }
}

// getIconSVG function
function getIconSVG(type) {
  try {
    const icons = {
      'folder': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="28" height="24" fill="#FFD700" stroke="#000" stroke-width="1" />
          <rect x="2" y="4" width="28" height="4" fill="#FFECAA" stroke="#000" stroke-width="1" />
        </svg>
      `,
      'computer': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="24" height="16" fill="#c0c0c0" stroke="#000" stroke-width="1" />
          <rect x="6" y="6" width="20" height="12" fill="#000080" stroke="#000" stroke-width="1" />
          <rect x="8" y="22" width="16" height="6" fill="#c0c0c0" stroke="#000" stroke-width="1" />
          <rect x="14" y="20" width="4" height="2" fill="#c0c0c0" stroke="#000" stroke-width="0.5" />
        </svg>
      `,
      'music': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="#9370DB" stroke="#000" stroke-width="1" />
          <circle cx="10" cy="20" r="4" fill="#000" />
          <circle cx="22" cy="20" r="4" fill="#000" />
          <path d="M10 20 L10 8 L22 8 L22 20 Z" fill="#000" stroke="#000" stroke-width="2" />
          <rect x="8" y="6" width="16" height="4" fill="#9370DB" stroke="#000" stroke-width="1" />
        </svg>
      `,
      'recycle-bin': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="4" width="12" height="4" fill="#c0c0c0" stroke="#000" stroke-width="1" />
          <rect x="6" y="8" width="20" height="20" fill="#c0c0c0" stroke="#000" stroke-width="1" />
          <line x1="10" y1="12" x2="10" y2="24" stroke="#000" />
          <line x1="16" y1="12" x2="16" y2="24" stroke="#000" />
          <line x1="22" y1="12" x2="22" y2="24" stroke="#000" />
        </svg>
      `,
      'ie': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" fill="#0000AA" stroke="#000" stroke-width="1" />
          <circle cx="16" cy="16" r="6" fill="#FFFF00" stroke="#000" stroke-width="1" />
          <ellipse cx="20" cy="7" rx="9" ry="3" fill="#00FFFF" opacity="0.5" />
        </svg>
      `,
      'terminal': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="24" height="24" fill="#000" stroke="#fff" stroke-width="1" />
          <text x="8" y="18" fill="#00ff00" font-family="monospace" font-size="12">></text>
        </svg>
      `,
      'settings': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="8" fill="#c0c0c0" stroke="#000" stroke-width="1" />
          <rect x="15" y="4" width="2" height="6" fill="#c0c0c0" stroke="#000" stroke-width="0.5" />
          <rect x="15" y="22" width="2" height="6" fill="#c0c0c0" stroke="#000" stroke-width="0.5" />
          <rect x="22" y="15" width="6" height="2" fill="#c0c0c0" stroke="#000" stroke-width="0.5" />
          <rect x="4" y="15" width="6" height="2" fill="#c0c0c0" stroke="#000" stroke-width="0.5" />
        </svg>
      `,
      'search': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="8" fill="none" stroke="#000" stroke-width="2" />
          <line x1="20" y1="20" x2="26" y2="26" stroke="#000" stroke-width="2" />
        </svg>
      `,
      'help': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" fill="#c0c0c0" stroke="#000" stroke-width="1" />
          <text x="12" y="24" fill="#000" font-family="sans-serif" font-size="20">?</text>
        </svg>
      `,
      'run': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <polygon points="8,8 24,16 8,24" fill="#000" />
        </svg>
      `,
      'shutdown': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" fill="#ff0000" stroke="#000" stroke-width="1" />
          <rect x="14" y="8" width="4" height="12" fill="#fff" />
        </svg>
      `,
      'document': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M6,4 L20,4 L26,10 L26,28 L6,28 Z" fill="white" stroke="#000" stroke-width="1" />
          <path d="M20,4 L20,10 L26,10" fill="none" stroke="#000" stroke-width="1" />
          <line x1="10" y1="15" x2="22" y2="15" stroke="#000" stroke-width="1" />
          <line x1="10" y1="19" x2="22" y2="19" stroke="#000" stroke-width="1" />
          <line x1="10" y1="23" x2="22" y2="23" stroke="#000" stroke-width="1" />
        </svg>
      `,
      'wake': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="24" height="24" fill="#000" stroke="#fff" stroke-width="1" />
          <text x="6" y="18" fill="#ff0000" font-family="monospace" font-size="10">WAKE</text>
        </svg>
      `,
      '3d': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <polygon points="16,4 28,12 28,24 16,28 4,24 4,12" fill="#5E35B1" stroke="#000" stroke-width="1" />
          <line x1="16" y1="4" x2="16" y2="28" stroke="#000" stroke-width="1" />
          <line x1="4" y1="12" x2="28" y2="12" stroke="#000" stroke-width="1" />
          <line x1="4" y1="24" x2="28" y2="24" stroke="#000" stroke-width="1" />
        </svg>
      `,
      'assistant': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="#4CAF50" stroke="#000" stroke-width="1" />
          <circle cx="11" cy="13" r="2" fill="black" />
          <circle cx="21" cy="13" r="2" fill="black" />
          <path d="M 10 20 Q 16 26 22 20" stroke="#000" stroke-width="2" fill="none" />
        </svg>
      `,
      'mind': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="#8b008b" stroke="#000" stroke-width="1" />
          <path d="M8,16 C12,8 20,8 24,16 S20,24 16,16 S12,24 8,16" fill="none" stroke="#fff" stroke-width="1.5" />
          <circle cx="16" cy="16" r="4" fill="#fff" stroke="#000" stroke-width="0.5" />
          <circle cx="16" cy="16" r="2" fill="#000" />
        </svg>
      `,
      'race': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="16" width="24" height="12" rx="2" ry="2" fill="#c0c0c0" stroke="#000" stroke-width="1" />
          <circle cx="8" cy="28" r="3" fill="#333" stroke="#000" stroke-width="0.5" />
          <circle cx="24" cy="28" r="3" fill="#333" stroke="#000" stroke-width="0.5" />
          <path d="M4,18 L28,18 L24,10 L8,10 Z" fill="#ff4500" stroke="#000" stroke-width="1" />
          <rect x="10" y="12" width="4" height="4" fill="#00bfff" />
          <rect x="18" y="12" width="4" height="4" fill="#00bfff" />
        </svg>
      `,
      'sidewalk': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="20" width="32" height="8" fill="#999" stroke="#000" stroke-width="0.5" />
          <line x1="4" y1="20" x2="4" y2="28" stroke="#666" stroke-width="0.5" />
          <line x1="12" y1="20" x2="12" y2="28" stroke="#666" stroke-width="0.5" />
          <line x1="20" y1="20" x2="20" y2="28" stroke="#666" stroke-width="0.5" />
          <line x1="28" y1="20" x2="28" y2="28" stroke="#666" stroke-width="0.5" />
          <path d="M0,20 C8,16 24,16 32,20" fill="none" stroke="#000" stroke-width="1" />
          <circle cx="16" cy="10" r="4" fill="#fc0" stroke="#000" stroke-width="0.5" />
          <line x1="16" y1="6" x2="16" y2="0" stroke="#fc0" stroke-width="1" />
        </svg>
      `,
      'trophy': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="20" width="12" height="8" fill="#c0c0c0" stroke="#000" stroke-width="1" />
          <ellipse cx="16" cy="20" rx="8" ry="2" fill="#c0c0c0" stroke="#000" stroke-width="1" />
          <path d="M10,6 L10,14 A6,6 0 0,0 22,14 L22,6 Z" fill="#FFD700" stroke="#000" stroke-width="1" />
          <rect x="10" y="4" width="12" height="2" fill="#FFD700" stroke="#000" stroke-width="1" />
          <path d="M22,8 L24,8 L24,12 L22,12 Z" fill="#FFD700" stroke="#000" stroke-width="1" />
          <path d="M8,8 L10,8 L10,12 L8,12 Z" fill="#FFD700" stroke="#000" stroke-width="1" />
        </svg>
      `,
      'archive': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="24" height="20" fill="#996633" stroke="#000" stroke-width="1" />
          <rect x="8" y="10" width="16" height="12" fill="#e0e0e0" stroke="#000" stroke-width="1" />
          <line x1="8" y1="14" x2="24" y2="14" stroke="#000" stroke-width="1" />
          <line x1="8" y1="18" x2="24" y2="18" stroke="#000" stroke-width="1" />
          <rect x="4" y="4" width="24" height="2" fill="#aa7744" stroke="#000" stroke-width="1" />
        </svg>
      `,
      'profile': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="10" r="6" fill="#c0c0c0" stroke="#000" stroke-width="1" />
          <path d="M8,26 C8,20 24,20 24,26" fill="#c0c0c0" stroke="#000" stroke-width="1" />
          <rect x="6" y="4" width="20" height="24" fill="none" stroke="#000" stroke-width="1" rx="2" ry="2" />
        </svg>
      `,
      'discord': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="24" height="24" rx="5" ry="5" fill="#5865F2" stroke="#000" stroke-width="1" />
          <path d="M23,10 C21.5,9 20,8.5 18.5,8.2 C18.4,8.5 18.2,8.8 18,9.2 C16.4,9 14.8,9 13.3,9.2 C13.1,8.8 12.9,8.5 12.7,8.2 C11.2,8.5 9.7,9 8.2,10 C6,13.2 5.5,16.3 5.8,19.3 C7.7,20.7 9.6,21.5 11.4,22 C11.8,21.4 12.2,20.8 12.5,20.1 C11.9,19.9 11.3,19.6 10.8,19.3 C11,19.2 11.1,19.1 11.3,19 C14.4,20.4 17.8,20.4 20.9,19 C21,19.1 21.2,19.2 21.3,19.3 C20.8,19.6 20.2,19.9 19.6,20.1 C19.9,20.8 20.3,21.4 20.7,22 C22.6,21.5 24.5,20.7 26.3,19.3 C26.7,15.7 25.8,12.7 23,10 Z M12,17.5 C11,17.5 10.2,16.6 10.2,15.5 C10.2,14.4 11,13.5 12,13.5 C13,13.5 13.8,14.4 13.8,15.5 C13.8,16.6 13,17.5 12,17.5 Z M20,17.5 C19,17.5 18.2,16.6 18.2,15.5 C18.2,14.4 19,13.5 20,13.5 C21,13.5 21.8,14.4 21.8,15.5 C21.8,16.6 21,17.5 20,17.5 Z" fill="white" />
        </svg>
      `,
      'os': `
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="24" height="24" rx="2" ry="2" fill="#483d8b" stroke="#000" stroke-width="1" />
          <circle cx="16" cy="16" r="8" fill="#ffcc00" stroke="#000" stroke-width="1" opacity="0.8" />
          <path d="M12,12 L20,20 M12,20 L20,12" stroke="#000" stroke-width="1.5" />
          <circle cx="16" cy="16" r="2" fill="#483d8b" stroke="#000" stroke-width="0.5" />
        </svg>
      `
    };
    
    return icons[type] || icons['folder'];
  } catch (e) {
    console.error("Error in getIconSVG:", e);
    // Return a simple fallback icon
    return `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="24" height="24" fill="#c0c0c0"/></svg>`;
  }
}