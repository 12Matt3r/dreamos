import { discordService, setDiscordWindow, discordWindow } from './state.js';
import { createWebSimWindow } from './windows.js';
import { getIconSVG } from './icons.js';
import { createGlitchSound } from './audio.js';
import { removeFromTaskbar } from './ui.js';

// Initialize Discord service
export function initDiscordService() {
  try {
    if (discordService.initialized) return;

    console.log("Initializing Discord service in background...");

    const iframe = document.createElement('iframe');
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    iframe.src = 'https://websim.ai/p/83znmfg4k1bpo28szx8i';

    document.body.appendChild(iframe);

    setInterval(checkForDiscordMessages, 5000);

    discordService.initialized = true;
    discordService.connected = true;

    console.log("Discord service initialized successfully");

    setTimeout(() => {
      simulateDiscordMessage();
    }, 30000);
  } catch (e) {
    console.error("Error initializing Discord service:", e);
  }
}

function checkForDiscordMessages() {
  try {
    if (discordService.connected && Math.random() < 0.05) {
      simulateDiscordMessage();
    }
  } catch (e) {
    console.error("Error checking for Discord messages:", e);
  }
}

function simulateDiscordMessage() {
  try {
    const usernames = ["User123", "DreamWalker", "GlitchEye"];
    const messages = [
      "Can anyone hear me? This system is breaking down...",
      "Has anyone found a way to wake up?",
    ];

    const newMessage = {
      id: Date.now(),
      username: usernames[Math.floor(Math.random() * usernames.length)],
      content: messages[Math.floor(Math.random() * messages.length)],
      timestamp: new Date().toISOString()
    };

    discordService.messages.push(newMessage);
    discordService.lastMessageTime = Date.now();

    if (!discordService.isVisible) {
      showDiscordNotification(newMessage);
    }
  } catch (e) {
    console.error("Error simulating Discord message:", e);
  }
}

function showDiscordNotification(message) {
  try {
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

    const closeBtn = notification.querySelector('.discord-notification-close');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(notification);
    });

    notification.addEventListener('click', (e) => {
      if (e.target === closeBtn || closeBtn.contains(e.target)) return;

      toggleDiscordWindow();
      document.body.removeChild(notification);
    });

    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 10000);

    createGlitchSound();
  } catch (e) {
    console.error("Error showing Discord notification:", e);
  }
}

export function toggleDiscordWindow() {
  try {
    if (discordWindow && document.querySelector('.window-container').contains(discordWindow)) {
      document.querySelector('.window-container').removeChild(discordWindow);
      removeFromTaskbar(discordWindow);
      setDiscordWindow(null);
      discordService.isVisible = false;
    } else {
      const newWin = createWebSimWindow('Discord App', 'https://websim.ai/p/83znmfg4k1bpo28szx8i', 800, 600);
      setDiscordWindow(newWin);
      discordService.isVisible = true;
    }
  } catch (e) {
    console.error("Error toggling Discord window:", e);
  }
}
