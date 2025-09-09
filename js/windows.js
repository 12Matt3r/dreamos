import { openProgram } from './programs.js';
import { processTerminalCommand, addToTaskbar, removeFromTaskbar } from './ui.js';
import { createErrorMessage } from './ui_utils.js';

// --- HELPERS ---
function cloneTemplate(id) {
    return document.getElementById(id).content.cloneNode(true);
}

// Module-level state for window management
let activeWindow = null;
let windowZIndex = 100;

function bringToFront(win) {
  win.style.zIndex = ++windowZIndex;
  activeWindow = win;
}

function makeDraggable(win) {
  const titlebar = win.querySelector('.window-titlebar');
  let offsetX, offsetY;

  const onMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    bringToFront(win);
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, { once: true });
  };

  const onMouseMove = (e) => {
    win.style.left = `${e.clientX - offsetX}px`;
    win.style.top = `${e.clientY - offsetY}px`;
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
  };

  titlebar.addEventListener('mousedown', onMouseDown);
}

export function createWindow({ title, content = '', url = null, width = 400, height = 300, isModal = false }) {
  try {
    const clone = cloneTemplate('window-template');
    const win = clone.querySelector('.window');
    const titleId = `window-title-${Date.now()}`;

    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-labelledby', titleId);
    if (isModal) {
        win.classList.add('modal');
        win.setAttribute('aria-modal', 'true');
    }

    win.style.width = `${width}px`;
    win.style.height = `${height}px`;
    win.style.left = `${(window.innerWidth - width) / 2 + (Math.random() - 0.5) * 100}px`;
    win.style.top = `${(window.innerHeight - height) / 2 + (Math.random() - 0.5) * 100}px`;

    bringToFront(win);

    const titleEl = win.querySelector('.window-title');
    titleEl.id = titleId;
    titleEl.textContent = title;

    const contentEl = win.querySelector('.window-content');

    if (url) {
      contentEl.innerHTML = `<div class="loading-spinner"></div>`;
      setTimeout(() => {
        try {
          contentEl.innerHTML = `
            <iframe src="${url}"
                    allow="fullscreen; xr-spatial-tracking; autoplay; encrypted-media"
                    sandbox="allow-scripts allow-forms allow-pointer-lock allow-popups"
                    style="width:100%;height:100%;border:none;background:#000"></iframe>`;
        } catch (e) {
          console.error(`Error loading iframe for ${title}:`, e);
          contentEl.innerHTML = `<div class="iframe-error">Error loading content.</div>`;
        }
      }, 500);
    } else if (typeof content === 'string') {
      contentEl.innerHTML = content;
    } else {
      contentEl.appendChild(content);
    }

    addToTaskbar(title, win);
    document.querySelector('.window-container').appendChild(clone);

    makeDraggable(win);
    win.addEventListener('mousedown', () => bringToFront(win));

    const closeBtn = win.querySelector('.window-close');
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.addEventListener('click', () => {
      win.remove();
      removeFromTaskbar(win);
    });

    setTimeout(() => {
      setupWindowContentEventListeners(win);
    }, 100);

    return win;

  } catch (e) {
    console.error(`Error creating window for ${title}:`, e);
    return null;
  }
}

export function createWebSimWindow(title, url, width, height) {
    return createWindow({ title, url, width, height });
}

function setupWindowContentEventListeners(win) {
    const fileItems = win.querySelectorAll('.file-item');
    fileItems.forEach(item => {
      item.addEventListener('dblclick', () => {
        const fileName = item.querySelector('.file-name').textContent;
        openProgram(fileName);
      });
    });

    const terminalInput = win.querySelector('.terminal-command');
    if (terminalInput) {
      terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const command = terminalInput.value;
          processTerminalCommand(command, win);
          terminalInput.value = '';
        }
      });
    }

    const errorOkBtn = win.querySelector('#error-ok-btn');
    if (errorOkBtn) {
      errorOkBtn.addEventListener('click', () => {
        win.remove();
        removeFromTaskbar(win);
      });
    }
}

export function confirmShutdown() {
    const clone = cloneTemplate('shutdown-confirm-template');
    const win = createWindow({ title: 'Shut Down Windows', content: clone, width: 300, height: 150, isModal: true });
    const yesBtn = win.querySelector('#shutdown-yes-btn');
    const noBtn = win.querySelector('#shutdown-no-btn');

    yesBtn.addEventListener('click', () => {
      document.body.innerHTML = `<div class="shutdown-screen"><p>It is now safe to turn off your computer.</p><button onclick="window.location.reload()">Restart</button></div>`;
    });

    noBtn.addEventListener('click', () => {
      win.remove();
      removeFromTaskbar(win);
    });
}
