// Window management functionality

// State variables for windows
let activeWindow = null;
let windowZIndex = 100;

// Create a window
function createWindow(title, content, width, height) {
  try {
    const window = document.createElement('div');
    window.className = 'window';
    window.style.width = `${width}px`;
    window.style.height = `${height}px`;
    window.style.left = `${50 + Math.random() * 100}px`;
    window.style.top = `${50 + Math.random() * 100}px`;
    window.style.zIndex = windowZIndex++;
    
    window.innerHTML = `
      <div class="window-titlebar">
        <div class="window-title">${title}</div>
        <div class="window-controls">
          <div class="window-control window-minimize">_</div>
          <div class="window-control window-maximize">□</div>
          <div class="window-control window-close">×</div>
        </div>
      </div>
      <div class="window-content">${content}</div>
    `;
    
    // Add to taskbar
    addToTaskbar(title, window);
    
    // Make window draggable
    const titlebar = window.querySelector('.window-titlebar');
    let isDragging = false;
    let offsetX, offsetY;
    
    titlebar.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - window.offsetLeft;
      offsetY = e.clientY - window.offsetTop;
      window.style.zIndex = windowZIndex++;
      activeWindow = window;
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        window.style.left = `${e.clientX - offsetX}px`;
        window.style.top = `${e.clientY - offsetY}px`;
      }
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Add window control functionality
    const closeBtn = window.querySelector('.window-close');
    closeBtn.addEventListener('click', () => {
      document.querySelector('.window-container').removeChild(window);
      removeFromTaskbar(window);
    });
    
    // Set as active window
    window.addEventListener('mousedown', () => {
      window.style.zIndex = windowZIndex++;
      activeWindow = window;
    });
    
    document.querySelector('.window-container').appendChild(window);
    
    // Setup event listeners for content elements
    setTimeout(() => {
      try {
        const fileItems = window.querySelectorAll('.file-item');
        fileItems.forEach(item => {
          item.addEventListener('dblclick', () => {
            const fileName = item.querySelector('.file-name').textContent;
            openProgram(fileName);
          });
        });
        
        const terminalInput = window.querySelector('.terminal-command');
        if (terminalInput) {
          terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              const command = terminalInput.value;
              processTerminalCommand(command, window);
              terminalInput.value = '';
            }
          });
        }
        
        const errorOkBtn = window.querySelector('#error-ok-btn');
        if (errorOkBtn) {
          errorOkBtn.addEventListener('click', () => {
            document.querySelector('.window-container').removeChild(window);
            removeFromTaskbar(window);
          });
        }
      } catch (e) {
        console.error("Error setting up window event listeners:", e);
      }
    }, 100);
    
    return window;
  } catch (e) {
    console.error(`Error creating window for ${title}:`, e);
    return null;
  }
}

// Create a window for external WebSim content
function createWebSimWindow(title, url, width, height) {
  try {
    const window = document.createElement('div');
    window.className = 'window';
    window.style.width = `${width}px`;
    window.style.height = `${height}px`;
    window.style.left = `${50 + Math.random() * 100}px`;
    window.style.top = `${50 + Math.random() * 100}px`;
    window.style.zIndex = windowZIndex++;
    
    window.innerHTML = `
      <div class="window-titlebar">
        <div class="window-title">${title}</div>
        <div class="window-controls">
          <div class="window-control window-minimize">_</div>
          <div class="window-control window-maximize">□</div>
          <div class="window-control window-close">×</div>
        </div>
      </div>
      <div class="window-content">
        <div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; background:#000;">
          <div class="loading"></div>
        </div>
      </div>
    `;
    
    // Add to taskbar
    addToTaskbar(title, window);
    
    // Make window draggable
    const titlebar = window.querySelector('.window-titlebar');
    let isDragging = false;
    let offsetX, offsetY;
    
    titlebar.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - window.offsetLeft;
      offsetY = e.clientY - window.offsetTop;
      window.style.zIndex = windowZIndex++;
      activeWindow = window;
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        window.style.left = `${e.clientX - offsetX}px`;
        window.style.top = `${e.clientY - offsetY}px`;
      }
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Add window control functionality
    const closeBtn = window.querySelector('.window-close');
    closeBtn.addEventListener('click', () => {
      document.querySelector('.window-container').removeChild(window);
      removeFromTaskbar(window);
    });
    
    // Set as active window
    window.addEventListener('mousedown', () => {
      window.style.zIndex = windowZIndex++;
      activeWindow = window;
    });
    
    document.querySelector('.window-container').appendChild(window);
    
    // Load WebSim in iframe after a short delay (to simulate loading)
    setTimeout(() => {
      try {
        const windowContent = window.querySelector('.window-content');
        windowContent.innerHTML = `<iframe src="${url}" allowfullscreen sandbox="allow-scripts allow-same-origin allow-forms"></iframe>`;
      } catch (e) {
        console.error(`Error loading iframe for ${title}:`, e);
        const windowContent = window.querySelector('.window-content');
        windowContent.innerHTML = `<div style="padding: 20px; color: white; background: black; height: 100%;">
          Error loading content. Please try again later.<br>
          ${e.message}
        </div>`;
      }
    }, 1500);
    
    return window;
  } catch (e) {
    console.error(`Error creating WebSim window for ${title}:`, e);
    // Create a fallback error window
    return createWindow("Error", createErrorMessage(`Failed to open ${title}: ${e.message}`), 300, 150);  
  }
}

// Add window to taskbar
function addToTaskbar(title, windowElement) {
  try {
    const taskbarItem = document.createElement('div');
    taskbarItem.className = 'taskbar-item';
    taskbarItem.textContent = title.length > 10 ? title.substring(0, 10) + '...' : title;
    taskbarItem.style.padding = '2px 8px';
    taskbarItem.style.backgroundColor = '#c0c0c0';
    taskbarItem.style.borderTop = '1px solid #ffffff';
    taskbarItem.style.borderLeft = '1px solid #ffffff';
    taskbarItem.style.borderRight = '1px solid #848484';
    taskbarItem.style.borderBottom = '1px solid #848484';
    taskbarItem.style.marginLeft = '2px';
    taskbarItem.style.height = '22px';
    taskbarItem.style.fontSize = '11px';
    taskbarItem.style.display = 'flex';
    taskbarItem.style.alignItems = 'center';
    taskbarItem.style.cursor = 'pointer';
    
    // Store reference to window
    taskbarItem.windowRef = windowElement;
    
    taskbarItem.addEventListener('click', () => {
      windowElement.style.zIndex = windowZIndex++;
      activeWindow = windowElement;
    });
    
    document.querySelector('.taskbar-items').appendChild(taskbarItem);
  } catch (e) {
    console.error(`Error adding to taskbar for ${title}:`, e);
  }
}

// Remove window from taskbar
function removeFromTaskbar(windowElement) {
  try {
    const taskbarItems = document.querySelectorAll('.taskbar-item');
    taskbarItems.forEach(item => {
      if (item.windowRef === windowElement) {
        item.parentNode.removeChild(item);
      }
    });
  } catch (e) {
    console.error("Error removing from taskbar:", e);
  }
}

// Confirm shutdown function
function confirmShutdown() {
  const window = createWindow('Shut Down Windows', `
    <div style="text-align: center; padding: 20px;">
      <p>Are you sure you want to shut down the computer?</p>
      <div style="margin-top: 20px;">
        <button id="shutdown-yes-btn" style="margin-right: 10px; padding: 5px 15px;">Yes</button>
        <button id="shutdown-no-btn" style="padding: 5px 15px;">No</button>
      </div>
    </div>
  `, 300, 150);

  // Add event listeners after window is created
  setTimeout(() => {
    const yesBtn = window.querySelector('#shutdown-yes-btn');
    const noBtn = window.querySelector('#shutdown-no-btn');
    
    yesBtn.addEventListener('click', () => {
      document.body.innerHTML = `
        <div style="background-color: #000; color: white; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'MS Sans Serif', Arial, sans-serif;">
          <div style="text-align: center;">
            <p>It is now safe to turn off your computer.</p>
            <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px;">Restart</button>
          </div>
        </div>
      `;
    });
    
    noBtn.addEventListener('click', () => {
      document.querySelector('.window-container').removeChild(window);
      removeFromTaskbar(window);
    });
  }, 100);
}