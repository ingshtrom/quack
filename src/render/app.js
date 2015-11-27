(function () {
    'use strict';

    const ipc = require('electron').ipcRenderer;
    const elems = {
        getRepositoryUrlInput: function () { return document.getElementById('repository-url'); },
        getSubmitButton: function () { return document.getElementById('submit-button'); },
        getSaveSettingsButton: function () { return document.getElementById('save-settings'); }
    };

    window.onload = function () {


        let settings = {
            repository_url: ''
        };

        ipc.send('get-settings');
        ipc.on('send-settings', function (event, args) {
            var settings = JSON.parse(args);
            console.log('received settings from main proc', settings);

            if (settings.repositoryUrl) {
                elems.getRepositoryUrlInput().value = settings.repositoryUrl;
            }
        });

        elems.getSaveSettingsButton().onclick = saveSettingsClickHandler;
        elems.getSubmitButton().onclick = submitButtonClickHandler;
    }

    function submitButtonClickHandler () {
        // elems.getRepositoryUrlInpu
    }

    function saveSettingsClickHandler () {
        const settingsJSON = JSON.stringify({
            repositoryUrl: elems.getRepositoryUrlInput().value
        });
        console.info('saving settings', settingsJSON);

        ipc.send('save-settings', settingsJSON);
    }
})();