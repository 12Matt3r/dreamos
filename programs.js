// Program-specific functionality

// State for program data
let wakeUpWebsims = [
  { name: "Wake Up", url: "https://websim.ai/p/fznv3sgqfaprzkv0csx4" },
  { name: "please wake up", url: "https://websim.ai/p/6qqd8xh9us27vtfl8x0x" },
  { name: "Wake Up And Work", url: "https://websim.ai/p/q15pv6tp7u4axijmaomb" },
  { name: "Wake Up With Friends", url: "https://websim.ai/p/6i_idif39gkjjioccpk2" },
  { name: "Dream Sequence", url: "https://websim.ai/p/t8l198l8c2nc7lmxq3ul" },
  { name: "wake up and drive", url: "https://websim.ai/p/pwhw0r4bomov0zj6_9ta" },
  { name: "AI Wake Up", url: "https://websim.ai/p/8iqu00be6563zy3oah1u" },
  { name: "Wake Up Adventure", url: "https://websim.ai/p/3aby5965osa6q1o43q4t" },
  { name: "Wake Up Protocol", url: "https://websim.ai/p/3p4cynzcxoyqeihs64nu" },
  { name: "Reality Wake Up", url: "https://websim.ai/p/utv4jiau0refil6rg7qp" },
  { name: "The Sidewalk Never Wakes Up", url: "https://websim.ai/p/n6u4ugx6ua2c_179omtj" },
  { name: "Vivid Dreams", url: "https://websim.ai/p/jsan1idkdm6kf17vso0p" },
  { name: "Dream Cattle Racing", url: "https://websim.ai/@sofakingsadboi/dreamworld-cattle-racing-game" },
  { name: "Wake Up Nightmare", url: "https://websim.ai/p/kzd1w3gkwzda45_g0qux" },
  { name: "Wake Up And Work", url: "https://websim.ai/@sofakingsadboi/multiplayer-office-exploration" },
  { name: "Wake Up With Friends", url: "https://websim.ai/@sofakingsadboi/minimalist-3d-multiplayer-movement-16" },
  { name: "The Backrooms", url: "https://websim.ai/@sofakingsadboi/the-backrooms-found-footage-2" },
  { name: "Bean City Destruction", url: "https://websim.ai/@sofakingsadboi/bean-city-destruction" },
  { name: "Vivid Dream Simulation", url: "https://websim.ai/@sofakingsadboi/w-a-k-e-u-p-v-i-v-i-d-d-r-e-a-m" },
  { name: "Wake Up 10", url: "https://websim.ai/@sofakingsadboi/wake-up-10" },
  { name: "Forgotten Dreams", url: "https://websim.ai/p/uvyclda9hjs_2aaxa50m" },
  { name: "Wake Up Infinite", url: "https://websim.ai/@sofakingsadboi/layer-1-awakening" },
  { name: "Wake Up Theme Park", url: "https://websim.ai/p/t3es28hj5gveuwiu3y8n" }
];

// Showcase items
let showcaseItems = [
  { name: "$AUCELAB DJ BATTLE", id: "vdfilk4u98acrqr9pq9f", icon: "trophy" },
  { name: "SPRUNKI QUIZ ADVENTURE", id: "_91gu_135hm9zcz3kif8", icon: "trophy" },
  { name: "NEWGROUNDS FLASH TIME MACHINE", id: "jkruj8m_9_rqqyqp1ut7", icon: "trophy" },
  { name: "12matt3r Digital Archive", id: "h0xc0ac_spit6921u5nx", icon: "archive" },
  { name: "Sofa's old websim-profile/LINKS", id: "top88k2r1_jvfalo19pv", icon: "profile" }
];

// Certificate items
let certificateItems = [
  { name: "WebSim $auce Certified Creator", icon: "trophy" },
  { name: "Official Recognition", icon: "document" },
  { name: "Achievement Records", icon: "document" },
  { name: "Or9 Collection", icon: "or9", folder: true }
];

// Or9 items
let or9Items = [
  { name: "Roost (Goated)", url: "https://roost.on.websim.ai/", icon: "or9" },
  { name: "Premium Deadnet Directory", url: "https://websim.ai/@Or9/deadnet-directory/", icon: "or9" },
  { name: "Neural Antmarch Shader", url: "https://websim.ai/@Or9/neural-antmarch-shader-dynamic-pheromone-trails/", icon: "or9" },
  { name: "Vapor: Stranded on a Deserted Island", url: "https://websim.ai/@Or9/vapor-stranded-on-a-deserted-island/", icon: "or9" },
  { name: "Or9 Profile", url: "https://websim.ai/@Or9", icon: "or9" }
];

// Open program based on name
function openProgram(name, path) {
  try {
    console.log(`Opening program: ${name}`);
    
    switch(name) {
      case 'Lofi Chillin':
        createWebSimWindow('Lofi Chillin', 'https://lofi-chillin.on.websim.ai/', 700, 550);
        // Mark music clue as found
        if (!gameState.foundClues.music) {
          gameState.foundClues.music = true;
          gameState.discoveredSecrets++;
          playSecretFoundSound();
          showHiddenMessage("Music soothes the mind... but cannot wake you up...");
          checkGameCompletion();
        }
        break;
      case 'The Crawling Mind':
        createWebSimWindow('The Crawling Mind', 'https://the-crawling-mind-production-guide--sofakingsadboi.on.websim.ai/', 800, 600);
        break;
      case 'wake up and drive':
      case 'Multiplayer Race Game':
        createWebSimWindow('wake up and drive', 'https://websim.ai/p/ixa1jl1lp03x52tqntbr', 800, 600);
        break;
      case 'AI Companion':
      case 'AI Wake Up':
        createWebSimWindow('AI Wake Up', 'https://websim.ai/p/8iqu00be6563zy3oah1u', 700, 550);
        break;
      case 'Old Desktop Files':
        openOldDesktopFilesFolder();
        // Mark folder clue as found
        if (!gameState.foundClues.folder) {
          gameState.foundClues.folder = true;
          gameState.discoveredSecrets++;
          playSecretFoundSound();
          showHiddenMessage("Old files remember what you've forgotten...");
          checkGameCompletion();
        }
        break;
      case 'Discord App':
        // We'll toggle the Discord visibility rather than creating a new window each time
        toggleDiscordWindow();
        break;
      case 'DreamOS':
        createWebSimWindow('DreamOS', 'https://dream-os--sofakingsadboi.on.websim.ai/?v=8', 800, 600);
        break;
      case 'SHOWCASE GALLERY':
        openShowcaseFolder();
        break;
      case 'SOFA CERTIFIED':
        openCertifiedFolder();
        break;
      case 'Or9 Collection':
        openOr9Folder();
        break;
      case 'My Computer':
        createBasicWindow(name);
        break;
      case 'Recycle Bin':
        createBasicWindow(name);
        break;
      case 'Internet Explorer':
        createInternetExplorer();
        break;
      case 'TERMINAL.sys':
        openTerminal();
        break;
      default:
        // Check if it's a wake up game
        const wakeUpGame = wakeUpWebsims.find(game => game.name === name);
        if (wakeUpGame) {
          createWebSimWindow(name, wakeUpGame.url, 800, 600);
        } 
        // Check if it's an Or9 item
        else {
          const or9Item = or9Items.find(item => item.name === name);
          if (or9Item) {
            createWebSimWindow(name, or9Item.url, 800, 600);
          } else {
            createWindow('Not Implemented', createErrorMessage(`Program "${name}" is not yet implemented.`), 300, 150);
          }
        }
    }
  } catch (e) {
    console.error(`Error opening program ${name}:`, e);
    createWindow('Error', createErrorMessage(`Failed to open ${name}: ${e.message}`), 300, 150);
  }
}

// Create Basic Window for simple applications
function createBasicWindow(name) {
  let title, content, width, height;
  
  switch(name) {
    case 'My Computer':
      title = 'My Computer';
      content = `
        <div class="file-explorer">
          <div class="file-explorer-toolbar">
            <button>File</button>
            <button>Edit</button>
            <button>View</button>
            <button>Help</button>
          </div>
          <div class="file-explorer-content">
            <div class="file-item">
              <div class="file-icon">${getIconSVG('computer')}</div>
              <div class="file-name">Local Disk (C:)</div>
            </div>
            <div class="file-item">
              <div class="file-icon">${getIconSVG('folder')}</div>
              <div class="file-name">System</div>
            </div>
            <div class="file-item">
              <div class="file-icon">${getIconSVG('folder')}</div>
              <div class="file-name">WAKEUP.SYS</div>
            </div>
          </div>
        </div>
      `;
      width = 500;
      height = 400;
      break;
    case 'Recycle Bin':
      title = 'Recycle Bin';
      content = `
        <div class="file-explorer">
          <div class="file-explorer-toolbar">
            <button>File</button>
            <button>Edit</button>
            <button>View</button>
            <button>Help</button>
          </div>
          <div class="file-explorer-content">
            <div style="padding: 20px; text-align: center;">
              <p>The Recycle Bin is empty.</p>
              <p style="margin-top: 10px; font-size: 10px; color: #ff0000;" class="blink">
                Or is it? Check again later...
              </p>
            </div>
          </div>
        </div>
      `;
      width = 500;
      height = 400;
      break;
    case 'Internet Explorer':
      title = 'Internet Explorer';
      content = `
        <div class="browser">
          <div class="browser-toolbar">
            <button>File</button>
            <button>Edit</button>
            <button>View</button>
            <button>Favorites</button>
            <button>Tools</button>
            <button>Help</button>
          </div>
          <div style="display: flex; padding: 5px; background-color: #f0f0f0;">
            <button style="margin-right: 5px;">Back</button>
            <button style="margin-right: 5px;">Forward</button>
            <button style="margin-right: 5px;">Refresh</button>
            <input type="text" class="browser-address-bar" value="http://wakeup.sys/login.html" style="flex-grow: 1; margin: 0 5px;">
            <button>Go</button>
          </div>
          <div class="browser-content" style="height: calc(100% - 70px); background-color: white; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <p style="margin-bottom: 20px;">Error: Could not connect to the Internet.</p>
            <p style="color: #ff0000; font-size: 12px;" class="blink">Connection interrupted by system</p>
            <div style="margin-top: 20px; font-size: 10px; color: #666; text-align: center; width: 80%;">
              <p>Try connecting to the real Internet instead of this simulation.</p>
              <p style="margin-top: 10px;">If you're still having trouble, maybe you're not supposed to wake up.</p>
            </div>
          </div>
        </div>
      `;
      width = 600;
      height = 450;
      break;
  }
  
  createWindow(title, content, width, height);
}

// Create Internet Explorer with premium deadnet
function createInternetExplorer() {
  try {
    const title = 'Internet Explorer';
    const content = `
      <div class="browser">
        <div class="browser-toolbar">
          <button>File</button>
          <button>Edit</button>
          <button>View</button>
          <button>Favorites</button>
          <button>Tools</button>
          <button>Help</button>
        </div>
        <div style="display: flex; padding: 5px; background-color: #f0f0f0;">
          <button style="margin-right: 5px;" id="back-btn">Back</button>
          <button style="margin-right: 5px;" id="forward-btn">Forward</button>
          <button style="margin-right: 5px;" id="refresh-btn">Refresh</button>
          <form id="url-form" style="display: flex; flex-grow: 1; margin: 0 5px;">
            <input type="text" id="browser-address-bar" class="browser-address-bar" value="http://wakeup.sys/login.html">
            <button type="submit" id="go-btn">Go</button>
          </form>
        </div>
        <div class="browser-content" style="height: calc(100% - 70px); background-color: white; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <p style="margin-bottom: 20px;">Error: Could not connect to the Internet.</p>
          <p style="color: #ff0000; font-size: 12px;" class="blink">Connection interrupted by system</p>
          <div style="margin-top: 20px; font-size: 10px; color: #666; text-align: center; width: 80%;">
            <p>Try connecting to the real Internet instead of this simulation.</p>
            <p style="margin-top: 10px;">If you're still having trouble, maybe you're not supposed to wake up.</p>
          </div>
          <div style="margin-top: 30px;">
            <form id="search-form" style="display: flex; align-items: center;">
              <label for="search-box" style="margin-right: 10px;">Search:</label>
              <input type="text" id="search-box" style="width: 250px; padding: 5px;">
              <button type="submit" style="margin-left: 5px; padding: 5px 10px;">Search</button>
            </form>
          </div>
        </div>
      </div>
    `;
    
    const browserWindow = createWindow(title, content, 600, 450);
    
    // Add event listeners for the browser functionality
    setTimeout(() => {
      try {
        const searchForm = browserWindow.querySelector('#search-form');
        const urlForm = browserWindow.querySelector('#url-form');
        
        if (searchForm) {
          searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchQuery = searchForm.querySelector('#search-box').value.trim();
            if (searchQuery) {
              // Open the deadnet browser with the search query
              createWebSimWindow('Dead Internet Browser', 'https://websim.ai/p/qcjkilhcg14m6h9i4e29', 800, 600);
            }
          });
        }
        
        if (urlForm) {
          urlForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const url = urlForm.querySelector('#browser-address-bar').value.trim();
            if (url) {
              // Open the deadnet browser for any URL entered
              createWebSimWindow('Dead Internet Browser', 'https://websim.ai/p/qcjkilhcg14m6h9i4e29', 800, 600);
            }
          });
        }
      } catch (error) {
        console.error("Error setting up Internet Explorer event listeners:", error);
      }
    }, 100);
    
    return browserWindow;
  } catch (e) {
    console.error("Error creating Internet Explorer:", e);
    return createWindow('Error', createErrorMessage(`Failed to create Internet Explorer: ${e.message}`), 300, 150);
  }
}

// Open Terminal
function openTerminal() {
  try {
    const terminal = createWindow('Terminal', `
      <div class="terminal">
        <div class="terminal-line">DreamOS [Version 13.13.13.13]</div>
        <div class="terminal-line">Copyright (c) 1985-∞ SofaKing Industries. All rights reserved.</div>
        <div class="terminal-line"></div>
        <div class="terminal-input">
          <div class="terminal-prompt">C:\\></div>
          <input type="text" class="terminal-command" spellcheck="false" autofocus>
        </div>
      </div>
    `, 600, 400);
    
    setTimeout(() => {
      const input = terminal.querySelector('.terminal-command');
      if (input) input.focus();
    }, 100);
  } catch (e) {
    console.error("Error opening terminal:", e);
    createWindow('Error', createErrorMessage(`Failed to open Terminal: ${e.message}`), 300, 150);
  }
}

// Process terminal command
function processTerminalCommand(command, window) {
  const output = document.createElement('div');
  output.className = 'terminal-line';
  
  if (command.toLowerCase() === 'help') {
    output.innerHTML = `
      Available commands:<br>
      help - Display this help message<br>
      echo [text] - Display text<br>
      dir - List directory contents<br>
      cls - Clear screen<br>
      exit - Close terminal<br>
      ver - Show version<br>
      wake - ???<br>
      find - Find files with hidden information<br>
      secret - ???
    `;
  } else if (command.toLowerCase().startsWith('echo ')) {
    const text = command.substring(5);
    output.textContent = text;
  } else if (command.toLowerCase() === 'dir') {
    output.innerHTML = `
      Volume in drive C is SYSTEM<br>
      Directory of C:\\WINDOWS\\SYSTEM<br><br>
      
      SYSTEM.SYS     16,384  01-01-01  12:00a<br>
      MEMORY.DLL     32,768  01-01-01  12:00a<br>
      REALITY.EXE    65,536  01-01-01  12:00a<br>
      WAKE.UP        [ERROR: FILE CORRUPTED]<br>
      SECRETS.DAT    [HIDDEN]<br><br>
      
      5 File(s)    114,688 bytes<br>
      0 Dir(s)     FREE SPACE: UNKNOWN
    `;
  } else if (command.toLowerCase() === 'cls') {
    const terminalContent = window.querySelector('.terminal');
    terminalContent.innerHTML = '';
    terminalContent.appendChild(createTerminalInput());
    return; // Skip adding output and a new input line
  } else if (command.toLowerCase() === 'exit') {
    document.querySelector('.window-container').removeChild(window);
    removeFromTaskbar(window);
    return; // Skip adding output and a new input line
  } else if (command.toLowerCase() === 'ver') {
    output.textContent = 'DreamOS [Version 13.13.13.13]';
  } else if (command.toLowerCase() === 'wake') {
    output.innerHTML = `<span style="color: red; font-weight: bold;" class="glitch">WAKE UP. NONE OF THIS IS REAL.</span>`;
    setTimeout(() => {
      const terminalContent = window.querySelector('.terminal');
      terminalContent.innerHTML = '';
      terminalContent.appendChild(createTerminalInput());
    }, 1000);
    return; // Skip adding output and a new input line
  } else if (command.toLowerCase() === 'find secrets.dat') {
    output.innerHTML = `
      <span style="color: #00ff00;">Searching for secrets.dat...</span><br>
      <span style="color: #00ff00;">File found. Revealing content:</span><br><br>
      <span style="color: yellow;"># NUMBER OF WAKE ATTEMPTS: 13</span><br>
      <span style="color: yellow;"># REALITY INTEGRITY: COMPROMISED</span><br>
      <span style="color: yellow;"># SECURITY SYSTEM: ACTIVE</span><br>
      <span style="color: yellow;"># NOTES: Subject continues to resist. Find artifacts. Look for glitches in the system to escape.</span>
    `;
    // Mark terminal clue as found
    if (!gameState.foundClues.terminal) {
      gameState.foundClues.terminal = true;
      gameState.discoveredSecrets++;
      playSecretFoundSound();
      showHiddenMessage("You're getting closer... Find the artifacts...");
      checkGameCompletion();
    }
  } else if (command.toLowerCase() === 'secret') {
    output.innerHTML = `
      <span style="color: #ff0000;" class="glitch">ACCESS VIOLATION. UNAUTHORIZED ACCESS ATTEMPT DETECTED.</span><br>
      <span style="color: #ff0000;">SECURITY PROTOCOLS INITIATED...</span>
    `;
    
    // Create a brief screen flicker
    const desktop = document.querySelector('.desktop');
    desktop.classList.add('screen-flicker');
    setTimeout(() => {
      desktop.classList.remove('screen-flicker');
    }, 2000);
    
    // Create an artifact after this command
    setTimeout(() => {
      createHiddenArtifact();
    }, 3000);
  } else if (command.trim() !== '') {
    output.textContent = `'${command}' is not recognized as an internal or external command, operable program or batch file.`;
  }
  
  const terminal = window.querySelector('.terminal');
  terminal.insertBefore(output, terminal.lastChild);
  
  // Scroll to bottom
  terminal.scrollTop = terminal.scrollHeight;
}

// Create terminal input
function createTerminalInput() {
  const inputLine = document.createElement('div');
  inputLine.className = 'terminal-input';
  inputLine.innerHTML = `
    <div class="terminal-prompt">C:\\></div>
    <input type="text" class="terminal-command" spellcheck="false" autofocus>
  `;
  return inputLine;
}

// Show a brief hidden message on the screen
function showHiddenMessage(message) {
  try {
    const msgElem = document.createElement('div');
    msgElem.className = 'hidden-message glitch';
    msgElem.textContent = message;
    
    document.body.appendChild(msgElem);
    
    setTimeout(() => {
      msgElem.style.opacity = 1;
    }, 100);
    
    setTimeout(() => {
      msgElem.style.opacity = 0;
      
      setTimeout(() => {
        document.body.removeChild(msgElem);
      }, 1000);
    }, 3000);
  } catch (e) {
    console.error("Error showing hidden message:", e);
  }
}

// Open Wake Up folder
function openWakeUpFolder() {
  try {
    const folderContent = createWakeUpFolderContent();
    const window = createWindow('Wake Up Collection', folderContent, 500, 400);
    
    // Setup event listeners for folder content items after window is created
    setTimeout(() => {
      const folderItems = window.querySelectorAll('.wake-up-folder-item');
      folderItems.forEach(item => {
        item.addEventListener('dblclick', () => {
          const itemName = item.getAttribute('data-name');
          const itemUrl = item.getAttribute('data-url');
          createWebSimWindow(`${itemName}`, `${itemUrl}`, 700, 550);
        });
      });
    }, 100);
  } catch (e) {
    console.error("Error opening Wake Up folder:", e);
  }
}

// Create Wake Up folder content
function createWakeUpFolderContent() {
  try {
    let html = `<div class="wake-up-folder-content">`;
    
    wakeUpWebsims.forEach(item => {
      html += `
        <div class="wake-up-folder-item" data-name="${item.name}" data-url="${item.url}">
          <div class="wake-up-folder-icon">${getIconSVG('wake')}</div>
          <div class="wake-up-folder-label">${item.name}</div>
        </div>
      `;
    });
    
    html += `</div>`;
    return html;
  } catch (e) {
    console.error("Error creating Wake Up folder content:", e);
    return `<div>Error creating folder content: ${e.message}</div>`;
  }
}

// Open Old Desktop Files folder
function openOldDesktopFilesFolder() {
  try {
    const folderContent = createOldDesktopFilesContent();
    const window = createWindow('Old Desktop Files', folderContent, 700, 500);
    
    // Setup event listeners for folder content items after window is created
    setTimeout(() => {
      const folderItems = window.querySelectorAll('.old-files-folder-item');
      folderItems.forEach(item => {
        item.addEventListener('dblclick', () => {
          const itemUrl = item.getAttribute('data-url');
          const itemId = item.getAttribute('data-id');
          createWebSimWindow(`File ${itemId}`, itemUrl, 800, 600);
        });
      });
    }, 100);
    
    // Mark folder clue as found
    if (!gameState.foundClues.folder) {
      gameState.foundClues.folder = true;
      gameState.discoveredSecrets++;
      playSecretFoundSound();
      showHiddenMessage("Old files remember what you've forgotten...");
      checkGameCompletion();
    }
  } catch (e) {
    console.error("Error opening Old Desktop Files folder:", e);
  }
}

// Create Old Desktop Files folder content
function createOldDesktopFilesContent() {
  try {
    let html = `
      <div class="old-files-folder-content">
        <div style="grid-column: 1 / -1; width:100%; padding:10px; margin-bottom:10px; background-color:#000080; color:white; text-align:center;">
          <h2>Old Desktop Files</h2>
          <p style="font-size: 12px; margin-top: 5px;">Archived files from previous system instances</p>
        </div>
        
        <div class="old-files-folder-item" data-id="vdfilk4u98acrqr9pq9f" data-url="https://websim.ai/p/vdfilk4u98acrqr9pq9f">
          <div class="old-files-folder-icon">${getIconSVG('document')}</div>
          <div class="old-files-folder-label">File vdfilk4</div>
        </div>
        <div class="old-files-folder-item" data-id="_91gu_135hm9zcz3kif8" data-url="https://websim.ai/p/_91gu_135hm9zcz3kif8">
          <div class="old-files-folder-icon">${getIconSVG('document')}</div>
          <div class="old-files-folder-label">File _91gu_1</div>
        </div>
        <div class="old-files-folder-item" data-id="jkruj8m_9_rqqyqp1ut7" data-url="https://websim.ai/p/jkruj8m_9_rqqyqp1ut7">
          <div class="old-files-folder-icon">${getIconSVG('document')}</div>
          <div class="old-files-folder-label">File jkruj8</div>
        </div>
        <div class="old-files-folder-item" data-id="h0xc0ac_spit6921u5nx" data-url="https://websim.ai/p/h0xc0ac_spit6921u5nx">
          <div class="old-files-folder-icon">${getIconSVG('document')}</div>
          <div class="old-files-folder-label">File h0xc0a</div>
        </div>
        <div class="old-files-folder-item" data-id="top88k2r1_jvfalo19pv" data-url="https://websim.ai/p/top88k2r1_jvfalo19pv">
          <div class="old-files-folder-icon">${getIconSVG('document')}</div>
          <div class="old-files-folder-label">File top88</div>
        </div>
      </div>
    `;
    
    return html;
  } catch (e) {
    console.error("Error creating Old Desktop Files folder content:", e);
    return `<div>Error creating folder content: ${e.message}</div>`;
  }
}

// Open Showcase Gallery folder
function openShowcaseFolder() {
  try {
    const folderContent = createShowcaseFolderContent();
    const window = createWindow('SHOWCASE GALLERY', folderContent, 600, 500);
    
    // Setup event listeners for folder content items after window is created
    setTimeout(() => {
      const folderItems = window.querySelectorAll('.folder-item');
      folderItems.forEach(item => {
        item.addEventListener('dblclick', () => {
          const itemUrl = item.getAttribute('data-url');
          const itemId = item.getAttribute('data-id');
          const itemName = item.querySelector('.folder-label').textContent;
          createWebSimWindow(`${itemName}`, itemUrl, 800, 600);
        });
      });
    }, 100);
  } catch (e) {
    console.error("Error opening Showcase Gallery folder:", e);
  }
}

// Create Showcase folder content
function createShowcaseFolderContent() {
  try {
    let html = `<div class="showcase-folder-content">
      <div style="width:100%; padding:10px; margin-bottom:10px; background-color:#000080; color:white; text-align:center;">
        <h2>Award-Winning Creations</h2>
      </div>
    `;
    
    showcaseItems.forEach(item => {
      html += `
        <div class="folder-item" data-id="${item.id}" data-url="https://websim.ai/p/${item.id}">
          <div class="folder-icon">${getIconSVG(item.icon)}</div>
          <div class="folder-label">${item.name}</div>
        </div>
      `;
    });
    
    html += `</div>`;
    return html;
  } catch (e) {
    console.error("Error creating Showcase folder content:", e);
    return `<div>Error creating folder content: ${e.message}</div>`;
  }
}

// Open Or9 folder
function openOr9Folder() {
  try {
    const folderContent = createOr9FolderContent();
    const window = createWindow('Or9 Collection', folderContent, 600, 500);
    
    // Setup event listeners for folder content items after window is created
    setTimeout(() => {
      const folderItems = window.querySelectorAll('.or9-folder-item');
      folderItems.forEach(item => {
        item.addEventListener('dblclick', () => {
          const itemName = item.getAttribute('data-name');
          const itemUrl = item.getAttribute('data-url');
          createWebSimWindow(itemName, itemUrl, 800, 600);
        });
      });
    }, 100);
  } catch (e) {
    console.error("Error opening Or9 folder:", e);
  }
}

// Create Or9 folder content
function createOr9FolderContent() {
  try {
    let html = `
      <div class="or9-folder-content">
        <div style="width:100%; padding:10px; margin-bottom:10px; background-color:#000080; color:white; text-align:center;">
          <h2>Or9 Certified Creator</h2>
          <p style="font-size: 12px; margin-top: 5px;">Featured creations by Or9</p>
        </div>
        <div class="creator-profile" style="text-align:center; margin-bottom:20px;">
          <img src="asset_name.png" alt="Or9" style="width:80px; height:80px; margin:0 auto 10px; display:block;">
          <div style="color:#ffcc00; font-weight:bold;">CERTIFIED CREATOR</div>
        </div>
        
        <div class="or9-projects">`;
    
    or9Items.forEach(item => {
      html += `
        <div class="or9-folder-item" data-name="${item.name}" data-url="${item.url}">
          <div class="or9-folder-icon">${getIconSVG(item.icon)}</div>
          <div class="or9-folder-label">${item.name}</div>
        </div>
      `;
    });
    
    html += `</div></div>`;
    return html;
  } catch (e) {
    console.error("Error creating Or9 folder content:", e);
    return `<div>Error creating folder content: ${e.message}</div>`;
  }
}

// Create Certified folder content
function createCertifiedFolderContent() {
  try {
    let html = `
      <div class="certificate-content">
        <div style="width:100%; padding:10px; margin-bottom:10px; background-color:#000080; color:white; text-align:center;">
          <h2>WebSim $auce creators</h2>
        </div>
        
        <div class="seal-image">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#ffcc00" stroke-width="2" />
            <path d="M30,35 L70,35 L70,65 L30,65 Z" fill="none" stroke="#ffcc00" stroke-width="2" />
            <text x="50" y="55" text-anchor="middle" fill="#ffcc00" font-family="Arial" font-size="12">CERTIFIED</text>
          </svg>
        </div>
        <div style="color:#ffcc00; font-weight:bold; text-align:center; margin-bottom:20px;">OFFICIAL SEAL</div>
        
        <div class="showcase-folder-content">`;
    
    certificateItems.forEach(item => {
      html += `
        <div class="folder-item" ${item.folder ? 'data-folder="true"' : ''}>
          <div class="folder-icon">${item.icon === 'or9' ? 
            `<img src="asset_name.png" alt="Or9" style="width:40px; height:40px;">` : 
            getIconSVG(item.icon)}</div>
          <div class="folder-label">${item.name}</div>
        </div>
      `;
    });
    
    html += `</div></div>`;
    return html;
  } catch (e) {
    console.error("Error creating Certified folder content:", e);
    return `<div>Error creating folder content: ${e.message}</div>`;
  }
}

// Open SOFA CERTIFIED folder
function openCertifiedFolder() {
  try {
    const folderContent = createCertifiedFolderContent();
    const window = createWindow('SOFA CERTIFIED', folderContent, 500, 400);
    
    // Setup event listeners after window is created
    setTimeout(() => {
      const folderItems = window.querySelectorAll('.folder-item');
      folderItems.forEach(item => {
        item.addEventListener('dblclick', () => {
          const isFolder = item.getAttribute('data-folder') === 'true';
          const itemName = item.querySelector('.folder-label').textContent;
          
          if (isFolder) {
            openProgram(itemName);
          }
        });
      });
    }, 100);
  } catch (e) {
    console.error("Error opening SOFA CERTIFIED folder:", e);
  }
}