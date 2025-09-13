import { openProgram } from './programs.js';
import { createWindow, createWebSimWindow, confirmShutdown } from './windows.js';
import { openLinkInventoryWindow } from './linkInventory.js';
import { getIconSVG } from './icons.js';
import { setupAudio, playStartupSound, createGlitchSound, playCreeepySound, playSecretFoundSound, playDoorSound } from './audio.js';
import { initDesktop } from './desktop.js';
import { loadGameState, checkGameCompletion, createHiddenArtifact, updateCorruptionEffects } from './game.js';
import { gameState, shaderBangers, googleExperiments } from './state.js';
import * as Tone from 'tone';

// ... (all other ui.js functions)

export function openShaderBangersFolder() {
    const folderContent = document.createElement('div');
    folderContent.className = 'file-explorer-content';

    shaderBangers.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'file-item';
        itemEl.innerHTML = `
            <div class="file-icon">${getIconSVG('3d')}</div>
            <div class="file-name">${item.name}</div>
        `;
        itemEl.addEventListener('dblclick', () => {
            createWebSimWindow(item.name, item.url, 800, 600);
        });
        folderContent.appendChild(itemEl);
    });

    createWindow({
        title: 'Shader Bangers',
        content: folderContent,
        width: 600,
        height: 400
    });
}

export function openGoogleExperimentsFolder() {
    const folderContent = document.createElement('div');
    folderContent.className = 'file-explorer-content';

    googleExperiments.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'file-item';
        itemEl.innerHTML = `
            <div class="file-icon">${getIconSVG('folder')}</div>
            <div class="file-name">${item.name}</div>
        `;
        itemEl.addEventListener('dblclick', () => {
            createWebSimWindow(item.name, item.url, 800, 600);
        });
        folderContent.appendChild(itemEl);
    });

    createWindow({
        title: 'Google Experiments',
        content: folderContent,
        width: 600,
        height: 400
    });
}

export function showCompletionMessage() {
  // ...
}
