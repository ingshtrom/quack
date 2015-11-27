'use strict';
const settings = require('user-settings').file('.quack-settings');
const ipc = require('electron').ipcMain;
const REPOSITORY_URL = 'REPOSITORY_URL';

module.exports.init = init;

function init () {
    ipc.on('get-settings', getSettingsHandler);
    ipc.on('save-settings', saveSettingsHandler);
}

function getSettingsHandler (event, args) {
    const repositoryUrl = settings.get(REPOSITORY_URL);
    const settingsJSON = JSON.stringify({
        repositoryUrl: repositoryUrl
    });
    console.info('settings being returned', settingsJSON);
    event.sender.send('send-settings', settingsJSON);
};

function saveSettingsHandler (event, args) {
    console.info('saving settings', args);
    const settingsJSON = JSON.parse(args);

    if (settingsJSON.repositoryUrl) {
        settings.set(REPOSITORY_URL, settingsJSON.repositoryUrl);
    }
}
