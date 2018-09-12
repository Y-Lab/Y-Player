class y-nfoPanel {
    constructor (player) {
        this.container = player.template.infoPanel;
        this.template = player.template;
        this.video = player.video;
        this.player = player;

        this.template.infoPanelClose.addEventListener('click', () => {
            this.hide();
        });
    }

    show () {
        this.beginTime = Date.now();
        this.update();
        this.player.timer.enable('info');
        this.player.timer.enable('fps');
        this.container.classList.remove('y-player-info-panel-hide');
    }

    hide () {
        this.player.timer.disable('info');
        this.player.timer.disable('fps');
        this.container.classList.add('y-player-info-panel-hide');
    }

    triggle () {
        if (this.container.classList.contains('y-player-info-panel-hide')) {
            this.show();
        }
        else {
            this.hide();
        }
    }

    update () {
        this.template.infoVersion.innerHTML = `v${Y_PLAYER_VERSION} ${GIT_HASH}`;
        this.template.infoType.innerHTML = this.player.type;
        this.template.infoUrl.innerHTML = this.player.options.video.url;
        this.template.infoResolution.innerHTML = `${this.player.video.videoWidth} x ${this.player.video.videoHeight}`;
        this.template.infoDuration.innerHTML = this.player.video.duration;
    }

    fps (value) {
        this.template.infoFPS.innerHTML = `${value.toFixed(1)}`;
    }
}

export default InfoPanel;
