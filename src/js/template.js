import Icons from './icons';
import templatePlayer from '../templates/player.art';

class Template {
    constructor (options) {
        this.container = options.container;
        this.options = options.options;
        this.index = options.index;
        this.tran = options.tran;
        this.init();
    }

    init () {
        this.container.innerHTML = templatePlayer({
            options: this.options,
            index: this.index,
            tran: this.tran,
            icons: Icons,
            video: {
                current: true,
                pic: this.options.video.pic,
                preload: this.options.preload,
                url: this.options.video.url,
            }
        });

        this.volumeBar = this.container.querySelector('.y-player-volume-bar-inner');
        this.volumeBarWrap = this.container.querySelector('.y-player-volume-bar');
        this.volumeBarWrapWrap = this.container.querySelector('.y-player-volume-bar-wrap');
        this.volumeButton = this.container.querySelector('.y-player-volume');
        this.volumeButtonIcon = this.container.querySelector('.y-player-volume-icon');
        this.volumeIcon = this.container.querySelector('.y-player-volume-icon .y-player-icon-content');
        this.playedBar = this.container.querySelector('.y-player-played');
        this.loadedBar = this.container.querySelector('.y-player-loaded');
        this.playedBarWrap = this.container.querySelector('.y-player-bar-wrap');
        this.playedBarTime = this.container.querySelector('.y-player-bar-time');
        this.video = this.container.querySelector('.y-player-video-current');
        this.bezel = this.container.querySelector('.y-player-bezel-icon');
        this.playButton = this.container.querySelector('.y-player-play-icon');
        this.videoWrap = this.container.querySelector('.y-player-video-wrap');
        this.controllerMask = this.container.querySelector('.y-player-controller-mask');
        this.ptime = this.container.querySelector('.y-player-ptime');
        this.mask = this.container.querySelector('.y-player-mask');
        this.dtime = this.container.querySelector('.y-player-dtime');
        this.controller = this.container.querySelector('.y-player-controller');
        this.theaterButton = this.container.querySelector('.y-player-theater-icon');
        this.theaterOffButton = this.container.querySelector('.y-player-theater-off-icon');
        this.fullButton = this.container.querySelector('.y-player-full-icon');
        this.fullOffButton = this.container.querySelector('.y-player-full-off-icon');
        this.menu = this.container.querySelector('.y-player-menu');
        this.menuItem = this.container.querySelectorAll('.y-player-menu-item');
        this.backwardButton = this.container.querySelector('.y-player-backward-icon');
        this.forwardButton = this.container.querySelector('.y-player-forward-icon');
        this.speedButton = this.container.querySelector('.y-player-speed-icon');
        this.speedDownButton = this.container.querySelector('.y-player-speed-down-icon');
        this.speedUpButton = this.container.querySelector('.y-player-speed-up-icon');
        this.qualityList = this.container.querySelector('.y-player-quality-list');
        this.qualityButton = this.container.querySelector('.y-player-quality-icon');
        this.barPreview = this.container.querySelector('.y-player-bar-preview');
        this.barWrap = this.container.querySelector('.y-player-bar-wrap');
        this.notice = this.container.querySelector('.y-player-notice');
        this.infoPanel = this.container.querySelector('.y-player-info-panel');
        this.infoPanelClose = this.container.querySelector('.y-player-info-panel-close');
        this.infoVersion = this.container.querySelector('.y-player-info-panel-item-version .y-player-info-panel-item-data');
        this.infoFPS = this.container.querySelector('.y-player-info-panel-item-fps .y-player-info-panel-item-data');
        this.infoType = this.container.querySelector('.y-player-info-panel-item-type .y-player-info-panel-item-data');
        this.infoUrl = this.container.querySelector('.y-player-info-panel-item-url .y-player-info-panel-item-data');
        this.infoResolution = this.container.querySelector('.y-player-info-panel-item-resolution .y-player-info-panel-item-data');
        this.infoDuration = this.container.querySelector('.y-player-info-panel-item-duration .y-player-info-panel-item-data');
    }
}

export default Template;
