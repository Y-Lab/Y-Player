// common.js

// copyright year
$('#copyright-year').text(function () {
    return new Date().getFullYear();
});

// player
const player = new Player({
    container: document.getElementById('player'),
    screenshot: true,
    video: {
        url: 'demo.mp4'
    }
});