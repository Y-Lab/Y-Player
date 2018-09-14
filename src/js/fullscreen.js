import utils from './utils';

class FullScreen {
    constructor (player) {
        this.player = player;

        this.player.events.on('theatermode', () => {
            this.player.resize();
        });
        this.player.events.on('theatermode_cancel', () => {
            this.player.resize();
            utils.setScrollPosition(this.lastScrollPosition);
        });

        const fullscreenchange = () => {
            this.player.resize();
            if (this.isFullScreen('full')) {
                this.player.events.trigger('fullscreen');
            }
            else {
                utils.setScrollPosition(this.lastScrollPosition);
                this.player.events.trigger('fullscreen_cancel');
            }
        };
        const docfullscreenchange = () => {
            const fullscreenElementRegister = document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
            if (fullscreenElementRegister && fullscreenElementRegister !== this.player.container) {
                return;
            }
            this.player.resize();
            if (fullscreenElementRegister) {
                this.player.events.trigger('fullscreen');
            } else {
                utils.setScrollPosition(this.lastScrollPosition);
                this.player.events.trigger('fullscreen_cancel');
            }
        };
        if (/Firefox/.test(navigator.userAgent)) {
            document.addEventListener('mozfullscreenchange', docfullscreenchange);
            document.addEventListener('fullscreenchange', docfullscreenchange);
        } else {
            this.player.container.addEventListener('fullscreenchange', fullscreenchange);
            this.player.container.addEventListener('webkitfullscreenchange', fullscreenchange);
            document.addEventListener('msfullscreenchange', docfullscreenchange);
            document.addEventListener('MSFullscreenChange', docfullscreenchange);
        }
    }

    isFullScreen (type = 'full') {
        switch (type) {
        case 'full':
            return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        case 'theater':
            return this.player.container.classList.contains('y-player-theater-mode');
        }
    }

    request (type = 'full') {
        const anotherType = type === 'full' ? 'theater' : 'full';
        const anotherTypeOn = this.isFullScreen(anotherType);
        if (!anotherTypeOn) {
            this.lastScrollPosition = utils.getScrollPosition();
        }

        switch (type) {
        case 'full':
            this.player.container.classList.add('y-player-full-screen');
            if (this.player.container.requestFullscreen) {
                this.player.container.requestFullscreen();
            }
            else if (this.player.container.mozRequestFullScreen) {
                this.player.container.mozRequestFullScreen();
            }
            else if (this.player.container.webkitRequestFullscreen) {
                this.player.container.webkitRequestFullscreen();
            }
            else if (this.player.video.webkitEnterFullscreen) {
                // Safari for iOS
                this.player.video.webkitEnterFullscreen();
            }
            else if (this.player.video.webkitEnterFullScreen) {
                this.player.video.webkitEnterFullScreen();
            }
            else if (this.player.container.msRequestFullscreen) {
                this.player.container.msRequestFullscreen();
            }
            break;
        case 'theater':
            this.player.container.classList.add('y-player-theater-mode');
            document.body.classList.add('y-player-theater-mode-fix');
            this.player.events.trigger('theatermode');
            break;
        }

        if (anotherTypeOn) {
            this.cancel(anotherType);
        }
    }

    cancel (type = 'full') {
        switch (type) {
        case 'full':
            this.player.container.classList.remove('y-player-full-screen');
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            else if (document.webkitCancelFullscreen) {
                document.webkitCancelFullscreen();
            }
            else if (document.msCancelFullScreen) {
                document.msCancelFullScreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            break;
        case 'theater':
            this.player.container.classList.remove('y-player-theater-mode');
            document.body.classList.remove('y-player-theater-mode-fix');
            this.player.events.trigger('theatermode_cancel');
            break;
        }
    }

    toggle (type = 'full') {
        if (this.isFullScreen(type)) {
            this.cancel(type);
        }
        else {
            this.request(type);
        }
    }
}

export default FullScreen;
