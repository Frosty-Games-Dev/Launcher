document.getElementById('close-win-id').addEventListener('click', () => {
    window.electronAPI.destroyWindow()
});