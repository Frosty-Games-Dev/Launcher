document.getElementById('close-win-id').addEventListener('click', () => {
    window.electronAPI.destroyWindow()
});

document.getElementById('start-update-id').addEventListener('click', () => {
    window.electronAPI.downloadUpdate()
});

document.getElementById('install-id').addEventListener('click', () => {
    window.electronAPI.installUpdate()
});