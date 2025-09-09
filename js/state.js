// Centralized state management for the application

export const gameState = {
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

export const websim = {
  chat: {
    completions: {
      create: async () => ({ content: "This is a placeholder response." })
    }
  },
  imageGen: async () => ({ url: "#" })
};

export let wakeUpWebsims = [];
export let showcaseItems = [];
export let certificateItems = [];
export let or9Items = [];
export let desktopItems = [];
export let startMenuItems = [];

export let discordService = {
  initialized: false,
  isVisible: false,
  lastMessageTime: 0,
  messages: [],
  connected: false
};

export let discordWindow = null;

export function setDiscordWindow(win) {
  discordWindow = win;
}
