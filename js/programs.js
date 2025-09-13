import { createWindow, createWebSimWindow } from './windows.js';
import { gameState, wakeUpWebsims, or9Items } from './state.js';
import { playSecretFoundSound } from './audio.js';
import { checkGameCompletion } from './game.js';
import { toggleDiscordWindow } from './discord.js';
import { createErrorMessage } from './ui_utils.js';
import { openTerminal, showHiddenMessage, openOldDesktopFilesFolder, openShowcaseFolder, openCertifiedFolder, openOr9Folder, createBasicWindow, createInternetExplorer, openShaderBangersFolder, openGoogleExperimentsFolder } from './ui.js';

// Open program based on name
export function openProgram(name, path) {
  try {
    console.log(`Opening program: ${name}`);

    switch(name) {
      case 'Lofi Chillin':
        createWebSimWindow('Lofi Chillin', 'https://lofi-chillin.on.websim.ai/', 700, 550);
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
        break;
      case 'Discord App':
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
      case 'Shader Bangers':
        openShaderBangersFolder();
        break;
      case 'Google Experiments':
        openGoogleExperimentsFolder();
        break;
      default:
        const wakeUpGame = wakeUpWebsims.find(game => game.name === name);
        if (wakeUpGame) {
          createWebSimWindow(name, wakeUpGame.url, 800, 600);
        }
        else {
          const or9Item = or9Items.find(item => item.name === name);
          if (or9Item) {
            createWebSimWindow(name, or9Item.url, 800, 600);
          } else {
            createWindow({
                title: 'Not Implemented',
                content: createErrorMessage(`Program "${name}" is not yet implemented.`),
                width: 300,
                height: 150
            });
          }
        }
    }
  } catch (e) {
    console.error(`Error opening program ${name}:`, e);
    createWindow({
        title: 'Error',
        content: createErrorMessage(`Failed to open ${name}: ${e.message}`),
        width: 300,
        height: 150
    });
  }
}
